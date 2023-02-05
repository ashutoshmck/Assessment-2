const CompanyService = require('../../src/services/company');
const CompanyController = require('../../src/controllers/company');
describe('CompanyController', () => {
  describe('saveCompanyDetails', () => {
    it('should return expected response', async () => {
      const mockReq = {
        body: {
          urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(CompanyService, 'saveCompanyDetails').mockResolvedValue([{
        'id': 1,
        'name': 'Axis',
        'score': 26.65
      }]);
      await CompanyController.saveCompanyDetails(mockReq, mockRes);
      expect(mockRes.json).toBeCalledWith({
        status: 201, data: [{
          'id': 1,
          'name': 'Axis',
          'score': 26.65
        }], message: 'Saved Companies Data'
      });
    });
    it('should return 500 status code response when saveCompanyDetails function of CompanyService throws an error', async () => {
      const mockReq = {
        body: {
          urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(CompanyService, 'saveCompanyDetails').mockRejectedValue(new Error('error'));
      await CompanyController.saveCompanyDetails(mockReq, mockRes);
      expect(mockRes.json).toBeCalledWith({ status: 500, message: 'error' });
    });
  });
  describe('getTopRankedCompanies', () => {
    it('should return expected response', async () => {
      jest.spyOn(CompanyService, 'getTopRankedCompanies').mockResolvedValue([
        {
          'id': 43,
          'name': 'Apple',
          'ceo': 'Brenda Kilback',
          'score': 29.99,
          'rank': '1'
        },
        {
          'id': 52,
          'name': 'Microsoft',
          'ceo': 'Benjamin Abshire',
          'score': 21.32,
          'rank': '2'
        },
        {
          'id': 41,
          'name': 'Google',
          'ceo': 'Wilma Christiansen',
          'score': 13.27,
          'rank': '3'
        },
        {
          'id': 50,
          'name': 'Meta',
          'ceo': 'Domingo Renner',
          'score': 13.1,
          'rank': '4'
        }
      ]);
      const mockReq = {
        query: { sector: 'Software' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await CompanyController.getTopRankedCompanies(mockReq, mockRes);
      expect(mockRes.json).toBeCalledWith({
        'status': 200,
        'data': [
          {
            'id': 43,
            'name': 'Apple',
            'ceo': 'Brenda Kilback',
            'score': 29.99,
            'rank': '1'
          },
          {
            'id': 52,
            'name': 'Microsoft',
            'ceo': 'Benjamin Abshire',
            'score': 21.32,
            'rank': '2'
          },
          {
            'id': 41,
            'name': 'Google',
            'ceo': 'Wilma Christiansen',
            'score': 13.27,
            'rank': '3'
          },
          {
            'id': 50,
            'name': 'Meta',
            'ceo': 'Domingo Renner',
            'score': 13.1,
            'rank': '4'
          }
        ],
        'message': 'Retreived Top Ranked Companies'
      });
    });
    it('should return 500 status code response when getTopRankedCompanies function of CompanyService throws an error', async () => {
      const mockReq = {
        query: { sector: 'Software' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(CompanyService, 'getTopRankedCompanies').mockRejectedValue(new Error('error'));
      await CompanyController.getTopRankedCompanies(mockReq, mockRes);
      expect(mockRes.json).toBeCalledWith({ status: 500, message: 'error' });
    });
  });
  describe('changeNameOfCompany', () => {
    it('should return expected response', async () => {
      jest.spyOn(CompanyService, 'changeNameOfCompany').mockResolvedValue({
        'id': 43,
        'name': 'Walnut',
        'tags': [
          'wireless',
          'global',
          'transparent',
          'scalable',
          'sticky',
          'cross-platform',
          'robust',
          'rich',
          'intuitive'
        ],
        'numberOfEmployees': 0,
        'score': 29.99,
        'ceo': 'Brenda Kilback',
        'sectorName': 'Software',
        'createdAt': '2023-02-03T09:04:13.299Z',
        'updatedAt': '2023-02-03T09:33:46.216Z'

      });
      const mockJson = jest.fn();
      const mockReq = {
        params: { sector: 'Software' },
        body: { name: 'Walnut' }
      };
      const mockRes = {
        status: jest.fn(() => ({ json: mockJson }))

      };
      await CompanyController.changeNameOfCompany(mockReq, mockRes);
      expect(mockJson).toBeCalledWith({
        'status': 200,
        'data': {
          'id': 43,
          'name': 'Walnut',
          'tags': [
            'wireless',
            'global',
            'transparent',
            'scalable',
            'sticky',
            'cross-platform',
            'robust',
            'rich',
            'intuitive'
          ],
          'numberOfEmployees': 0,
          'score': 29.99,
          'ceo': 'Brenda Kilback',
          'sectorName': 'Software',
          'createdAt': '2023-02-03T09:04:13.299Z',
          'updatedAt': '2023-02-03T09:33:46.216Z'
        },
        'message': 'Modified Company Name'
      });
    });
    it('should return 500 status code response when changeNameOfCompany function of CompanyService throws an error', async () => {
      const mockReq = {
        params: { sector: 'Software' },
        body: { name: 'Walnut' }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.spyOn(CompanyService, 'changeNameOfCompany').mockRejectedValue(new Error('error'));
      await CompanyController.changeNameOfCompany(mockReq, mockRes);
      expect(mockRes.json).toBeCalledWith({ status: 500, message: 'error' });
    });
  });
});