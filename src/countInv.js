function left(arr) {
  return arr.slice(0, Math.floor(arr.length / 2));
}

function right(arr) {
  return arr.slice(Math.floor(arr.length / 2));
}

// Merge leftArr and rightArr and calculate the inversions between
// them
function countSplitInv(leftArr, rightArr) {
  let i = 0;
  let j = 0;
  let splitInv = 0;
  const splitArr = [];
  const totalLength = leftArr.length + rightArr.length;

  for (let k = 0; k < totalLength; k++) {
    if (leftArr[i] <= rightArr[j] || j >= rightArr.length) {
      splitArr.push(leftArr[i]);
      i += 1;
    } else {
      splitArr.push(rightArr[j]);
      j += 1;
      splitInv += leftArr.length - i;
    }
  }

  return [splitArr, splitInv];
}

module.exports = function countInv(arr) {
  const { length } = arr;

  if (length < 2) return [arr, 0];

  const [leftArr, leftInv] = countInv(left(arr));
  const [rightArr, rightInv] = countInv(right(arr));

  const [splitArr, splitInv] = countSplitInv(leftArr, rightArr);

  return [splitArr, leftInv + rightInv + splitInv];
};
