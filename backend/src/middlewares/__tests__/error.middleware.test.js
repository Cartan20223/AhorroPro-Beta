describe('Error Middleware', () => {
  let errorHandler;
  let req, res;

  beforeEach(() => {
    errorHandler = require('../error.middleware');
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('returns 500 with error message', () => {
    const error = new Error('Something went wrong');
    errorHandler(error, req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Something went wrong' })
    );
  });

  it('handles error with status property', () => {
    const error = new Error('Not found');
    error.status = 404;
    errorHandler(error, req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'Not found' })
    );
  });

  it('returns 500 for errors without status', () => {
    const error = new Error('Server crash');
    errorHandler(error, req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
