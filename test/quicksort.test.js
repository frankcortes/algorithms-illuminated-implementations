const {
  quicksort,
  chooseFirstPivot,
  chooseLastPivot,
  chooseRandomPivot,
} = require('../src/quicksort');

describe('quicksort', () => {
  const firstArr = [2148, 9058, 7742, 3153, 6324, 609, 7628, 5469, 7017, 504];
  const secondArr = [2148, 9058, 7742, 3153, 6324, 609, 7628, 5469, 7017, 504, 4092, 1582, 9572, 1542, 5697, 2081, 4218, 3130, 7923, 9595, 6558, 3859, 9832, 3062, 6788, 7578, 7432, 479, 8439, 9079, 7173, 2667, 2770, 2655, 972, 4264, 2014, 3171, 4715, 345, 4388, 3816, 8887, 3915, 3490, 2327, 123, 4596, 4307, 8737, 4007, 6798, 6551, 1627, 1190, 4984, 2480, 3404, 2027, 4778, 2951, 2795, 5002, 8121, 8910, 9593, 5254, 448, 6237, 5565, 1816, 392, 8143, 9310, 9293, 3138, 4869, 6756, 872, 6183, 3517, 3513, 1676, 5498, 9172, 5739, 6108, 7538, 7671, 5780, 8666, 540, 9771, 6837, 9341, 1590, 5689, 1605, 1103, 5859];

  it.each`
    pivot            |       fn
    ${'first'}       | ${chooseFirstPivot}
    ${'last'}        | ${chooseLastPivot}
    ${'random'}      | ${chooseRandomPivot}
  `('sorts the expected array using $pivot pivot algorithm', ({
    fn,
  }) => {
    const arr = [...firstArr];

    quicksort(arr, 0, arr.length - 1, fn);

    expect(arr).toEqual([504, 609, 2148, 3153, 5469, 6324, 7017, 7628, 7742, 9058]);
  });

  it.each`
    pivot             |       fn                 | comparitions  | input
    ${'first'}        | ${chooseFirstPivot}      | ${25}         | ${firstArr}
    ${'last'}         | ${chooseLastPivot}       | ${31}         | ${firstArr}
    ${'first'}        | ${chooseFirstPivot}      | ${620}        | ${secondArr}
    ${'last'}         | ${chooseLastPivot}       | ${573}        | ${secondArr}

  `('does the expected number of comparitions when using $pivot pivot', ({
    fn,
    comparitions,
    input,
  }) => {
    const arr = [...input];

    const currentComparitions = quicksort(arr, 0, arr.length - 1, fn);

    expect(currentComparitions).toEqual(comparitions);
  });
});
