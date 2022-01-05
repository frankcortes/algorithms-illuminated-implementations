const twoSum = require('../src/twoSum');

describe('2-SUM', () => {
  it('returns the expected amount of distint numbers', () => {
    expect(twoSum([-3, -1, 1, 2, 9, 11, 7, 6, 2], 3, 10)).toEqual(8);
  });
});
