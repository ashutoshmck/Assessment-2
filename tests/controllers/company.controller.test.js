const CompanyService = require('../../src/services/company');
const CompanyController = require('../../src/controllers/company');
describe('CompanyController', () => {
  describe('saveCompanyDetails', () => {
    it('should return expected response', async () => {
      jest.spyOn(CompanyService, 'saveCompanyDetails').mockResolvedValue({
        'status': 201,
        'data': [
          {
            'id': 1,
            'name': 'Axis',
            'score': 26.65
          },
          {
            'id': 2,
            'name': 'Volkswagen',
            'score': 15.78
          },
          {
            'id': 3,
            'name': 'Mercedes',
            'score': 18.48
          },
          {
            'id': 4,
            'name': 'HDFC',
            'score': 21.48
          },
          {
            'id': 5,
            'name': 'Meta',
            'score': 13.1
          },
          {
            'id': 6,
            'name': 'Ebay',
            'score': 17.41
          },
          {
            'id': 7,
            'name': 'Microsoft',
            'score': 21.32
          },
          {
            'id': 8,
            'name': 'IDFC',
            'score': 22.76
          },
          {
            'id': 9,
            'name': 'D-Mart',
            'score': 19.57
          },
          {
            'id': 10,
            'name': 'Apple',
            'score': 29.99
          },
          {
            'id': 11,
            'name': 'Walmart',
            'score': 16.08
          },
          {
            'id': 12,
            'name': 'Google',
            'score': 13.27
          },
          {
            'id': 13,
            'name': 'D-Mart',
            'score': 19.57
          },
          {
            'id': 14,
            'name': 'Google',
            'score': 13.27
          },
          {
            'id': 15,
            'name': 'HDFC',
            'score': 21.48
          },
          {
            'id': 16,
            'name': 'Axis',
            'score': 26.65
          },
          {
            'id': 17,
            'name': 'Mercedes',
            'score': 18.48
          },
          {
            'id': 18,
            'name': 'Apple',
            'score': 29.99
          },
          {
            'id': 19,
            'name': 'Axis',
            'score': 26.65
          },
          {
            'id': 20,
            'name': 'D-Mart',
            'score': 19.57
          },
          {
            'id': 21,
            'name': 'Walmart',
            'score': 16.08
          },
          {
            'id': 22,
            'name': 'Microsoft',
            'score': 21.32
          },
          {
            'id': 23,
            'name': 'Google',
            'score': 13.27
          },
          {
            'id': 24,
            'name': 'Ebay',
            'score': 17.41
          },
          {
            'id': 25,
            'name': 'HDFC',
            'score': 21.48
          },
          {
            'id': 26,
            'name': 'Meta',
            'score': 13.1
          },
          {
            'id': 27,
            'name': 'Volkswagen',
            'score': 15.78
          },
          {
            'id': 28,
            'name': 'IDFC',
            'score': 22.76
          }
        ],
        'message': 'Saved Companies Data'
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
      expect(mockRes).toBeCalledWith({
        'status': 201,
        'data': [
          {
            'id': 1,
            'name': 'Axis',
            'score': 26.65
          },
          {
            'id': 2,
            'name': 'Volkswagen',
            'score': 15.78
          },
          {
            'id': 3,
            'name': 'Mercedes',
            'score': 18.48
          },
          {
            'id': 4,
            'name': 'HDFC',
            'score': 21.48
          },
          {
            'id': 5,
            'name': 'Meta',
            'score': 13.1
          },
          {
            'id': 6,
            'name': 'Ebay',
            'score': 17.41
          },
          {
            'id': 7,
            'name': 'Microsoft',
            'score': 21.32
          },
          {
            'id': 8,
            'name': 'IDFC',
            'score': 22.76
          },
          {
            'id': 9,
            'name': 'D-Mart',
            'score': 19.57
          },
          {
            'id': 10,
            'name': 'Apple',
            'score': 29.99
          },
          {
            'id': 11,
            'name': 'Walmart',
            'score': 16.08
          },
          {
            'id': 12,
            'name': 'Google',
            'score': 13.27
          },
          {
            'id': 13,
            'name': 'D-Mart',
            'score': 19.57
          },
          {
            'id': 14,
            'name': 'Google',
            'score': 13.27
          },
          {
            'id': 15,
            'name': 'HDFC',
            'score': 21.48
          },
          {
            'id': 16,
            'name': 'Axis',
            'score': 26.65
          },
          {
            'id': 17,
            'name': 'Mercedes',
            'score': 18.48
          },
          {
            'id': 18,
            'name': 'Apple',
            'score': 29.99
          },
          {
            'id': 19,
            'name': 'Axis',
            'score': 26.65
          },
          {
            'id': 20,
            'name': 'D-Mart',
            'score': 19.57
          },
          {
            'id': 21,
            'name': 'Walmart',
            'score': 16.08
          },
          {
            'id': 22,
            'name': 'Microsoft',
            'score': 21.32
          },
          {
            'id': 23,
            'name': 'Google',
            'score': 13.27
          },
          {
            'id': 24,
            'name': 'Ebay',
            'score': 17.41
          },
          {
            'id': 25,
            'name': 'HDFC',
            'score': 21.48
          },
          {
            'id': 26,
            'name': 'Meta',
            'score': 13.1
          },
          {
            'id': 27,
            'name': 'Volkswagen',
            'score': 15.78
          },
          {
            'id': 28,
            'name': 'IDFC',
            'score': 22.76
          }
        ],
        'message': 'Saved Companies Data'
      });
    });
  });
});