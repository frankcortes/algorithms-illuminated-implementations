const kosaraju = require('../src/kosaraju');

describe('kosaraju', () => {
  it('returns the expected size for strong connected components #1', () => {
    expect(kosaraju([1, 4], [2, 8], [3, 6], [4, 7], [5, 2], [6, 9], [7, 1], [8, 5], [8, 6], [9, 7], [9, 3])).toEqual([3, 3, 3]);
  });

  it('returns the expected size for strong connected components #2', () => {
    expect(kosaraju([1, 2], [2, 6], [2, 3], [2, 4], [3, 1], [3, 4], [4, 5], [5, 4], [6, 5], [6, 7], [7, 6], [7, 8], [8, 5], [8, 7])).toEqual([3, 3, 2]);
  });

  it('returns the expected size for strong connected components #3', () => {
    expect(kosaraju([1, 2], [2, 3], [3, 1], [3, 4], [5, 4], [6, 4], [8, 6], [6, 7], [7, 8])).toEqual([3, 3, 1, 1]);
  });

  it('returns the expected size for strong connected components #4', () => {
    expect(kosaraju([1, 2], [2, 3], [3, 1], [3, 4], [5, 4], [6, 4], [8, 6], [6, 7], [7, 8], [4, 3], [4, 6])).toEqual([7, 1]);
  });

  it('returns the expected size for strong connected components #5', () => {
    expect(kosaraju([1, 2], [2, 3], [2, 4], [2, 5], [3, 6], [4, 5], [4, 7], [5, 2], [5, 6], [5, 7], [6, 3], [6, 8], [7, 8], [7, 10], [8, 7], [9, 7], [10, 9], [10, 11], [11, 12], [12, 10])).toEqual([6, 3, 2, 1]);
  });
});
