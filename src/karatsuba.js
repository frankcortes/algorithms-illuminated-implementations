function numberOfDigits(n) {
  return n.toString().length;
}

function halves(n) {
  const nStringified = n.toString();
  const { length } = nStringified;

  return [nStringified.substr(0, length / 2), nStringified.substr(length / 2)].map((x) => {
    // This prevents converting directly to BigInt numbers with padded zeros,
    // like '00023'
    try {
      return BigInt(x);
    } catch {
      return BigInt(parseInt(x, 10));
    }
  });
}

function addPaddedZeros(x, offset) {
  const extraZeros = Array.from(new Array(offset), () => '0').join('');

  return `${extraZeros}${x}`;
}

// this will add zeros in the left until x has "a power of 2" digits
function powerOf2NumberOfDigits(x, y) {
  const max = Math.max(numberOfDigits(x), numberOfDigits(y));

  return 2 ** Math.ceil(Math.log2(max));
}

// add padded zeros in the left until x and y has the same "power of 2" digits
function adjustNumbers(x, y) {
  const nearestPowerOfN = powerOf2NumberOfDigits(x, y);

  const offsetX = nearestPowerOfN - numberOfDigits(x);
  const offsetY = nearestPowerOfN - numberOfDigits(y);

  return [addPaddedZeros(x, offsetX), addPaddedZeros(y, offsetY)];
}

module.exports = function karatsuba(x, y) {
  const [adjustedX, adjustedY] = adjustNumbers(x, y);

  const digits = numberOfDigits(adjustedX);

  if (digits === 1) {
    // Cast to bigInt for output consistency
    return BigInt(x * y);
  }

  const [a, b] = halves(adjustedX);
  const [c, d] = halves(adjustedY);
  const p = a + b;
  const q = c + d;
  const ac = karatsuba(a, c);
  const bd = karatsuba(b, d);
  const pq = karatsuba(p, q);
  const abdc = pq - ac - bd;

  return BigInt(10 ** digits) * ac + BigInt(10 ** (digits / 2)) * abdc + bd;
};
