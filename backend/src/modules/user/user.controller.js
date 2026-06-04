const prisma = require('../../config/prisma');

const getProfile = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: { user_balances: true }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const balances = user.user_balances.map(balance => ({
      currency: balance.currency,
      balance: Number(balance.balance)
    }));

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      balances
    });
  } catch (error) {
    next(error);
  }
};

const getBalance = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const balances = await prisma.user_balances.findMany({
      where: { user_id: userId }
    });

    const result = { eur: 0, cop: 0 };
    balances.forEach(b => {
      result[b.currency.toLowerCase()] = Number(b.balance);
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const depositBalance = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { currency, amount } = req.body;

    if (!['EUR', 'COP'].includes(currency)) {
      return res.status(400).json({ message: 'Currency must be EUR or COP' });
    }

    if (amount === undefined || amount <= 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const userBalance = await prisma.user_balances.findUnique({
      where: { user_id_currency: { user_id: userId, currency } }
    });

    if (!userBalance) {
      return res.status(404).json({ message: 'User balance not found' });
    }

    const result = await prisma.$transaction(async (tx) => {
      const updated = await tx.user_balances.update({
        where: { user_id_currency: { user_id: userId, currency } },
        data: { balance: { increment: amount } }
      });

      await tx.transactions.create({
        data: {
          user_id: userId,
          currency,
          type: 'deposit_balance',
          amount
        }
      });

      return updated;
    });

    res.json({
      currency: result.currency,
      newBalance: Number(result.balance)
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getProfile, getBalance, depositBalance };
