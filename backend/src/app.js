const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const allowedOrigins  = [
  'https://ahorro-pro-beta.vercel.app',
  'https://ahorro-pro-beta.vercel.app/'
];

const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/user/user.routes');
const envelopeRoutes = require('./modules/envelope/envelope.routes');
const { getBalance, depositBalance } = require('./modules/user/user.controller');
const authMiddleware = require('./middlewares/auth.middleware');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback){
    if (!origin || allowedOrigins.indexOf(origin)!== -1 || origin.endsWith('.vercel.app')){
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS'));
    }
  },
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/envelopes', envelopeRoutes);

app.get('/api/balance', authMiddleware, getBalance);
app.post('/api/balance/deposit', authMiddleware, depositBalance);

app.use(errorHandler);

module.exports = app;
