const dijskstra = require('../src/dijsktra');

describe('dijskstra', () => {
  it('returns the expected shortest path for every node', () => {
    // NOTE: To make the code easier in javascript arrays
    // I decided to start the actual input by 0 instead
    // of 1, so every vertex has been substracted by 1
    // (i.e vertex 2 is 1)
    expect(dijskstra([
      [
        [1, 1],
        [7, 2],
      ],
      [
        [0, 1],
        [2, 1],
      ],
      [
        [1, 1],
        [3, 1],
      ],
      [
        [2, 1],
        [4, 1],
      ],
      [
        [3, 1],
        [5, 1],
      ],
      [
        [4, 1],
        [6, 1],
      ],
      [
        [5, 1],
        [7, 1],
      ],
      [
        [6, 1],
        [0, 2],
      ],
    ])).toEqual([0, 1, 2, 3, 4, 4, 3, 2]);
  });
});
