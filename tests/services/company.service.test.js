const CompanyService = require('../../src/services/company');
const db = require('../../database/models/index');
const { default: axios } = require('axios');
jest.mock('axios');
describe('CompanyService', () => {
  describe('saveCompanyDetails', () => {
    it('should return created companies', async () => {
      axios.get.mockResolvedValueOnce({
        data: 'company_id,company_sector\n95b5a067-808a-44a9-a490-b4ef8a045f61,Automobile'
      });
      axios.get.mockResolvedValueOnce({
        data: {
          id: '95b5a067-808a-44a9-a490-b4ef8a045f61',
          name: 'Volkswagen',
          description: 'Qui dolore alias provident suscipit aliquid. Quaerat quam molestias ullam. Dolor molestias facere quia. Dolore consequuntur totam repellendus.',
          ceo: 'Mr. Marie Sipes',
          tags: [
            'intuitive',
            'interactive',
            'e-business',
            'visionary',
            'B2C',
            'front-end'
          ]
        }
      });
      axios.get.mockResolvedValueOnce({
        data: [
          {
            'companyId': '95b5a067-808a-44a9-a490-b4ef8a045f61',
            'performanceIndex': [
              {
                'key': 'cpi',
                'value': 0.46
              },
              {
                'key': 'cf',
                'value': 523763
              },
              {
                'key': 'mau',
                'value': 0.05
              },
              {
                'key': 'roic',
                'value': 5.66
              }
            ]
          },
        ]
      });
      jest.spyOn(db.Company, 'create').mockResolvedValue({});
      jest.spyOn(db.Company, 'findAll').mockResolvedValue([
        {
          'id': '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
          'name': 'Mercedes',
          'score': '18.481825'
        },
        {
          'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
          'name': 'Volkswagen',
          'score': '15.784075000000001'
        }
      ]);
      const companies = await CompanyService.saveCompanyDetails('https://store-0001.s3.amazonaws.com/input.csv');
      expect(companies).toEqual([
        {
          'id': '728ae3b7-89dd-41eb-9608-4fc20c839d4c',
          'name': 'Mercedes',
          'score': '18.481825'
        },
        {
          'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
          'name': 'Volkswagen',
          'score': '15.784075000000001'
        }
      ]);
    });
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
