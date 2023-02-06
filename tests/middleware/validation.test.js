const { urlValidation, sectorNameValidation } = require('../../src/middleware/validation');

describe('Validation', () => {
  describe('Url link validation', () => {
    it('should successfully validate', () => {
      const mockReq = {
        body: {
          urlLink: 'https://www.google.com'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();
      urlValidation(mockReq, mockRes, mockNext);
      expect(mockNext).toBeCalled();
    });
  });
  describe('sector name validation', () => {
    it('should successfully validate', () => {
      const mockReq = {
        query: {
          sector: 'Software'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockNext = jest.fn();
      sectorNameValidation(mockReq, mockRes, mockNext);
      expect(mockNext).toBeCalled();
    });
  });
});