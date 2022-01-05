const medianMaintenance = require('../src/medianMaintenance');

describe('Median Maintenance problem', () => {
  it('returns the four last digits of the expected median', () => {
    expect(medianMaintenance(6331, 2793, 1640, 9290, 225, 625, 6195, 2303, 5685, 1354)).toEqual(9335);
  });
});
