const calculateScore = (cpi, cf, mau, roic) => {
  return Number(Number((Number(cpi * 10) + Number(cf / 10000) + Number(mau * 10) + Number(roic)) / 4).toFixed(2));
};
module.exports = { calculateScore };