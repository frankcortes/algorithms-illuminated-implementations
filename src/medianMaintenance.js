const SearchTree = require('./structures/searchTree');

function getLastFourDigits(n) {
  if (n < 1000) return null;

  const stringified = n.toString();

  return parseInt(stringified.substr(stringified.length - 4), 10);
}

module.exports = function medianMaintenance(...input) {
  const tree = new SearchTree();
  let sum = 0;
  let i = 0;

  input.forEach((n) => {
    tree.insert(n);

    i += 1;

    sum += tree.select(Math.ceil(i / 2));
  });

  return getLastFourDigits(sum);
};
