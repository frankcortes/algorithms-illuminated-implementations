const Heap = require('../../src/structures/heap');

function heapsort(numbers) {
  const heap = new Heap();
  const aux = [];

  // Insert the values so we can create the Heap...
  numbers.forEach((n) => {
    heap.insert({
      key: n,
      value: n,
    });
  });

  // Extract the root node in the Heap, which is always the min value.
  while (heap.length) {
    aux.push(heap.extractMin().value);
  }

  return aux;
}

function getSortedPairsByHeapsort(numbers) {
  const heap = new Heap();

  const aux = [];

  // Insert the values so we can create the internal Heap...
  numbers.forEach((n) => {
    const node = {
      key: n,
      value: n,
    };
    heap.insert(node);

    // We could avoid the insertion, but we prefer to use the delete
    // method only to check if it works properly.
    if (n % 2 !== 0) {
      heap.delete(node);
    }
  });

  // Extract the root node in the Heap, which is always the min value.
  while (heap.length) {
    aux.push(heap.extractMin().value);
  }

  return aux;
}

describe('heap structure', () => {
  it('can be used to implement heapsort algorithm', () => {
    expect(heapsort([9, 7, 8, 4, 3, 5, 2, 1, 6])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(heapsort([9, 7, 6, 3, 4, 5, 1, 2, 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(heapsort([9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(heapsort([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  it('deletes nodes properly', () => {
    expect(getSortedPairsByHeapsort([9, 7, 8, 4, 3, 5, 2, 1, 6])).toEqual([2, 4, 6, 8]);
    expect(getSortedPairsByHeapsort([9, 7, 6, 3, 4, 5, 1, 2, 8])).toEqual([2, 4, 6, 8]);
    expect(getSortedPairsByHeapsort([9, 8, 7, 6, 5, 4, 3, 2, 1])).toEqual([2, 4, 6, 8]);
    expect(getSortedPairsByHeapsort([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([2, 4, 6, 8]);
  });
});
