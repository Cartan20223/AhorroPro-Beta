const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../config/prisma');

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existingUser = await prisma.users.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    await prisma.user_balances.createMany({
      data: [
        { user_id: user.id, currency: 'EUR', balance: 0 },
        { user_id: user.id, currency: 'COP', balance: 0 }
      ]
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('❌ ERROR DETALLADO EN REGISTRO:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause,
    });
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await prisma.users.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';

    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email
    });
  } catch (error) {
    console.error('❌ ERROR DETALLADO EN LOGIN:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause,
    });
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';

    res.clearCookie('token', {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax'
    });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('❌ ERROR DETALLADO EN LOGOUT:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause,
    });
    next(error);
  }
};

module.exports = { register, login, logout };
