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

exports.chooseRandomPivot = function chooseRandomPivot(arr, left, right) {
  return Math.floor((right - left) * Math.random() + left);
};

exports.chooseFirstPivot = function chooseFirstPivot(arr, left) {
  return left;
};

exports.chooseLastPivot = function chooseLastPivot(arr, left, right) {
  return right;
};

// This quickSort version returns the number of comparitions done in the array.
// The last parameter allows to choose the pivot algorithm to check performance.
// eslint-disable-next-line no-undef,max-len
exports.quicksort = function quickSort(arr, left = 0, right = arr.length - 1, choosePivot = chooseRandomPivot) {
  if (left >= right) {
    return 0;
  }

  const pivot = choosePivot(arr, left, right);
  // This is always the number of comparations that partition does.
  const comparitions = right - left;

  swap(arr, left, pivot);

  const {
    newPivot,
  } = partition(arr, left, right);

  // eslint-disable-next-line max-len
  return comparitions + quickSort(arr, left, newPivot - 1, choosePivot) + quickSort(arr, newPivot + 1, right, choosePivot);
};
