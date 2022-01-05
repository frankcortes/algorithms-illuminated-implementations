const karatsuba = require('../src/karatsuba');

describe('karatsuba', () => {
  it('at least one member with one digit', () => {
    expect(karatsuba(5, 8)).toBe(40n);
    expect(karatsuba(12, 2)).toBe(24n);
    expect(karatsuba(3, 25)).toBe(75n);
  });

  it('every member has two digits', () => {
    expect(karatsuba(27, 35)).toBe(945n);
  });

  it('every member has more than two digits', () => {
    expect(karatsuba(1234, 5678)).toBe(7_006_652n);
  });

  it('every member has more than two digits', () => {
    expect(karatsuba(1234, 5678)).toBe(7_006_652n);
  });

  it('both members has different number of digits', () => {
    expect(karatsuba(1234, 56789)).toBe(70_077_626n);
    expect(karatsuba(123456, 789)).toBe(97_406_784n);
  });

  it('works with big integers', () => {
    expect(karatsuba(
      3141592653589793238462643383279502884197169399375105820974944592n,
      2718281828459045235360287471352662497757247093699959574966967627n,
    )).toBe(
      8539734222673567705790252939087913595130043539186689203720198114122836478432934629760185292470467850840945601509009717322621552n,
    );
  });
});
