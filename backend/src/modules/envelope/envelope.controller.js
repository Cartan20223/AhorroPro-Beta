const prisma = require('../../config/prisma');

const create = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { name, currency, targetAmount, target_amount, monthlySuggestion, monthly_suggestion } = req.body;

    const finalTarget = targetAmount ?? target_amount;
    const finalMonthly = monthlySuggestion ?? monthly_suggestion ?? Math.round((finalTarget / 30) * 100) / 100;

    if (!name || !currency || finalTarget === undefined) {
      return res.status(400).json({ message: 'name, currency and targetAmount are required' });
    }

    if (!['EUR', 'COP'].includes(currency)) {
      return res.status(400).json({ message: 'Currency must be EUR or COP' });
    }

    const activeCount = await prisma.envelopes.count({
      where: { user_id: userId, status: 'active' }
    });

    if (activeCount >= 10) {
      return res.status(400).json({ message: 'Maximum 10 active envelopes per user' });
    }

    const envelope = await prisma.envelopes.create({
      data: {
        user_id: userId,
        name,
        currency,
        target_amount: finalTarget,
        current_amount: 0,
        monthly_suggestion: finalMonthly,
        status: 'active'
      }
    });

    res.status(201).json({
      id: envelope.id,
      name: envelope.name,
      target_amount: Number(envelope.target_amount),
      current_amount: Number(envelope.current_amount),
      currency: envelope.currency,
      completed: envelope.status === 'completed',
      created_at: envelope.created_at
    });
  } catch (error) {
    next(error);
  }
};

const list = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { currency } = req.query;

    const where = { user_id: userId };

    if (currency) {
      if (!['EUR', 'COP'].includes(currency)) {
        return res.status(400).json({ message: 'Currency must be EUR or COP' });
      }
      where.currency = currency;
    }

    const envelopes = await prisma.envelopes.findMany({
      where,
      orderBy: { created_at: 'desc' }
    });

    const result = envelopes.map(envelope => ({
      id: envelope.id,
      name: envelope.name,
      target_amount: Number(envelope.target_amount),
      current_amount: Number(envelope.current_amount),
      currency: envelope.currency,
      completed: envelope.status === 'completed',
      created_at: envelope.created_at
    }));

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deposit = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { amount, method, source } = req.body;

    const finalMethod = method ?? source;

    if (amount === undefined || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    if (!['manual', 'balance'].includes(finalMethod)) {
      return res.status(400).json({ message: 'Method must be manual or balance' });
    }

    const envelope = await prisma.envelopes.findUnique({ where: { id: Number(id) } });

    if (!envelope || envelope.user_id !== userId) {
      return res.status(404).json({ message: 'Envelope not found' });
    }

    if (envelope.status !== 'active') {
      return res.status(400).json({ message: 'Envelope is not active' });
    }

    if (finalMethod === 'balance') {
      const userBalance = await prisma.user_balances.findUnique({
        where: { user_id_currency: { user_id: userId, currency: envelope.currency } }
      });

      if (!userBalance || Number(userBalance.balance) < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
    }

    const currentAmount = Number(envelope.current_amount);
    const targetAmount = Number(envelope.target_amount);

    if (currentAmount + amount > targetAmount) {
      return res.status(400).json({ message: 'Deposit would exceed envelope target' });
    }

    const newCurrentAmount = currentAmount + amount;
    const burst = newCurrentAmount >= targetAmount;

    const result = await prisma.$transaction(async (tx) => {
      if (finalMethod === 'balance') {
        await tx.user_balances.update({
          where: { user_id_currency: { user_id: userId, currency: envelope.currency } },
          data: { balance: { decrement: amount } }
        });
      }

      const updatedEnvelope = await tx.envelopes.update({
        where: { id: Number(id) },
        data: {
          current_amount: newCurrentAmount,
          ...(burst ? { status: 'completed', completed_at: new Date() } : {})
        }
      });

      await tx.transactions.create({
        data: {
          user_id: userId,
          envelope_id: Number(id),
          currency: envelope.currency,
          type: finalMethod === 'balance' ? 'transfer_balance_to_envelope' : 'deposit_envelope',
          amount
        }
      });

      return updatedEnvelope;
    });

    res.json({
      id: result.id,
      name: result.name,
      target_amount: Number(result.target_amount),
      current_amount: Number(result.current_amount),
      currency: result.currency,
      completed: result.status === 'completed',
      created_at: result.created_at
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, list, deposit };
