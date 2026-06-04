const jwt = require('jsonwebtoken');

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let authMiddleware;
  let req, res, next;

  beforeEach(() => {
    jest.clearAllMocks();
    authMiddleware = require('../auth.middleware');
    req = { cookies: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    process.env.JWT_SECRET = 'test-secret';
  });

  it('returns 401 if no token cookie', () => {
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: 'Unauthorized' })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 if token is invalid', () => {
    req.cookies.token = 'invalid-token';
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next and sets req.user if token is valid', () => {
    req.cookies.token = 'valid-token';
    jwt.verify.mockReturnValue({ userId: 1 });

    authMiddleware(req, res, next);
    expect(req.user).toEqual({ userId: 1 });
    expect(next).toHaveBeenCalled();
  });

  it('uses JWT_SECRET from env for verification', () => {
    req.cookies.token = 'valid-token';
    jwt.verify.mockReturnValue({ userId: 1 });

    authMiddleware(req, res, next);
    expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret');
  });
});
