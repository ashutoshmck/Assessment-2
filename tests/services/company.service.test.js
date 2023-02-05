const CompanyService = require('../../src/services/company');
const db = require('../../database/models/index');
describe('CompanyService', () => {
  describe('saveCompanyDetails', () => {
    it('should return created companies', async () => {
      let mockData = [{
        'id': 1,
        'name': 'Axis',
        'score': 26.65
      }];
      jest.spyOn(db.Company, 'create').mockResolvedValue(1);
      jest.spyOn(db.Company, 'findAll').mockResolvedValue(mockData);
      const companies = await CompanyService.saveCompanyDetails('https://store-0001.s3.amazonaws.com/input.csv');
      expect(companies).toEqual(mockData);
    });
  });
  describe('getTopRankedCompanies', () => {
    it('should return top ranked companies according to score', async () => {
      let mockData = [
        {
          'id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
          'name': 'Apple',
          'ceo': 'Dr. Vera Haag',
          'score': 29.99,
          'ranking': '1'
        },
        {
          'id': 'b6472c52-732a-4fd2-a463-ae604c0a2c79',
          'name': 'Microsoft',
          'ceo': 'Carolyn Nikolaus',
          'score': 21.32,
          'ranking': '2'
        },
        {
          'id': '8727cc61-8c4b-4285-8853-2db808392c04',
          'name': 'Google',
          'ceo': 'Clayton Cartwright',
          'score': 13.27,
          'ranking': '3'
        },
        {
          'id': 'e90a7bc7-47fa-49af-bfa1-391fe7768b56',
          'name': 'Meta',
          'ceo': 'Kate Kozey',
          'score': 13.1,
          'ranking': '4'
        }
      ];
      jest.spyOn(db.Company, 'findAll').mockResolvedValue(mockData);
      const companies = await CompanyService.getTopRankedCompanies('Software');
      expect(companies).toEqual(mockData);
    });
  });
  describe('changeNameOfCompany', () => {
    it('should return company details after change', async () => {
      let mockData = {
        'id': 102,
        'companyId': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
        'name': 'Walnut',
        'tags': [
          'cutting-edge',
          '24/7',
          'efficient',
          'front-end',
          '24/7',
          'strategic',
          'next-generation',
          'interactive',
          'ubiquitous'
        ],
        'numberOfEmployees': 0,
        'score': 29.99,
        'ceo': 'Dr. Vera Haag',
        'sectorName': 'Software',
        'createdAt': '2023-02-05T15:14:14.016Z',
        'updatedAt': '2023-02-05T15:26:57.704Z'
      };
      jest.spyOn(db.Company, 'update').mockResolvedValue(1);
      jest.spyOn(db.Company, 'findOne').mockResolvedValue(mockData);
      const companies = await CompanyService.changeNameOfCompany('46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc', 'Walnut');
      expect(companies).toEqual(mockData);
    });
  });
});