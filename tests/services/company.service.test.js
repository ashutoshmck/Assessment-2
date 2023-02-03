const CompanyService = require('../../src/services/user');
describe('CompanyService', () => {
  describe('saveCompanyDetails', () => {
    it('should return created users', async () => {
      const companies = await CompanyService.saveCompanyDetails('https://store-0001.s3.amazonaws.com/input.csv');
      expect(typeof companies).toBe('object');
    });
  });
  describe('getTopRankedCompanies', () => {
    it('should return top ranked companies according to score', async () => {
      const companies = await CompanyService.getTopRankedCompanies('Software');
      expect(typeof companies).toBe('object');
    });
  });
});