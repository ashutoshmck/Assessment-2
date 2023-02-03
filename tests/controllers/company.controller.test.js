const CompanyService = require('../../src/services/company');
const CompanyController = require('../../src/controllers/company');
describe('CompanyController', () => {
  describe('saveCompanyDetails', () => {
    it('should return expected response', async () => {
      jest.spyOn(CompanyService, 'saveCompanyDetails').mockResolvedValue({
        'id': 1,
        'name': 'Axis',
        'score': 26.65
      });
      const mockJson = jest.fn();
      const mockReq = {
        body: {
          urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
        }
      };
      const mockRes = {
        status: jest.fn(() => ({ json: mockJson }))

      };
      await CompanyController.saveCompanyDetails(mockReq, mockRes);
      expect(mockJson).toBeCalledWith({
        'id': 1,
        'name': 'Axis',
        'score': 26.65
      });
    });
  });
  describe('getTopRankedCompanies', () => {
    it('should return expected response', async () => {
      jest.spyOn(CompanyService, 'getTopRankedCompanies').mockResolvedValue({
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
      const mockJson = jest.fn();
      const mockReq = {
        params: { sector: 'Software' }
      };
      const mockRes = {
        status: jest.fn(() => ({ json: mockJson }))

      };
      await CompanyController.getTopRankedCompanies(mockReq, mockRes);
      expect(mockJson).toBeCalledWith({
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
  });
  describe('changeNameOfCompany', () => {
    it('should return expected response', async () => {
      jest.spyOn(CompanyService, 'changeNameOfCompany').mockResolvedValue({
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
  });
});