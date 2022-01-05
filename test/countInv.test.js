const countInv = require('../src/countInv');

describe('countInv', () => {
  const firstArr = [54044, 14108, 79294, 29649, 25260, 60660, 2995, 53777, 49689, 9083];

  it('there are no inversions in a sorted array', () => {
    expect(countInv([1, 2, 3, 4, 5, 6, 7, 8])[1]).toEqual(0);
  });

  it('there are max inversions in a totally unsorted array', () => {
    expect(countInv([8, 7, 6, 5, 4, 3, 2, 1])[1]).toEqual(28);
  });

  it('there are max inversions in a totally unsorted array', () => {
    expect(countInv(firstArr)[1]).toEqual(28);
  });
});
