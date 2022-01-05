const {
  chooseRandomPivot,
} = require('./quicksort');

function swap(arr, one, two) {
  const tmp = arr[one];

  arr[one] = arr[two];
  arr[two] = tmp;
}

function partition(arr, left, right) {
  const pivot = arr[left];
  let i = left + 1;

  for (let j = left + 1; j <= right; j++) {
    if (pivot > arr[j]) {
      swap(arr, j, i);
      i += 1;
    }
  }

  swap(arr, left, i - 1);

  return {
    newPivot: i - 1,
  };
}

module.exports = function rselect(arr, position, left = 0, right = arr.length - 1) {
  if (arr.length === 1) {
    return arr[1];
  }

  const pivot = chooseRandomPivot(arr, left, right);

  swap(arr, left, pivot);

  const {
    newPivot,
  } = partition(arr, left, right);

  if (newPivot === position) return arr[newPivot];

  if (newPivot > position) {
    return rselect(arr, position, left, newPivot - 1);
  }

  return rselect(arr, position, newPivot + 1, right);
};
