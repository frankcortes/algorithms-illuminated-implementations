// In this case, we can consider a javascript object like a Hash Table
// (keys and values, i.e. boolean values)
// Cost O(n)
function getBooleanHashTable(arr) {
  return arr.reduce((end, elem) => {
    // we cannot store duplicated elements.
    end[elem] = true;
    return end;
  }, {});
}

function simpleTwoSum(arr, t) {
  const hashTable = getBooleanHashTable(arr);
  for (let i = 0; i < arr.length; i++) {
    // value that needs in order to achieve arr[i] + y = t
    const y = t - arr[i];
    // we don't have to iterate again, the cost is O(1);
    if (hashTable[y]) return true;
  }
  return false;
}

// For every number t between the range of [init, end] (included),
// return if there is at least one solution that satisfies x + y = t,
// where x and y are inside of arr.
module.exports = function twoSum(arr, init, end) {
  let numberOfSolutions = 0;

  for (let t = init; t <= end; t++) {
    numberOfSolutions += simpleTwoSum(arr, t) ? 1 : 0;
  }

  return numberOfSolutions;
};
