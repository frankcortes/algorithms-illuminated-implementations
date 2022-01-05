const Heap = require('./structures/heap');

function getKey(node, visitedNodes) {
  // Being an undirected graph we can check directly the
  // edges of the node instead of searching the edges
  // that finish in the node itself. i.e. edge 3 -> 1
  // and 1 -> 3 are the same one
  const possibleEdges = node.filter(([endNode]) => visitedNodes.has(endNode));

  // Meaning Infinity "No way to go to this node from the currently visited nodes".
  return possibleEdges.reduce((prevLength, [endNode, length]) => {
    const newLength = visitedNodes.get(endNode) + length;

    return Math.min(prevLength, newLength);
  }, Infinity);
}

function recalculateInvariant(nodeIndex, visited, pending, graph) {
  const notVisited = graph[nodeIndex]
    .filter(([endNode]) => !visited.has(endNode))
    .map(([endNode]) => endNode);

  notVisited.forEach((unvisitedNode) => {
    pending.deleteBy((node) => node.vertex === unvisitedNode);

    pending.insert({
      key: getKey(graph[unvisitedNode], visited),
      vertex: unvisitedNode,
      touched: true,
    });
  });
}

// The graph input is an array where every position is a vertex,
// and every position contains an edges array;
// every edge is an array where the first element is the final vertex
// and the second element is the length between the current and the
// last vertex.
module.exports = function dijsktra(graph) {
  // eslint-disable-next-line no-unused-vars
  const [initialNode, ...restOfTheGraph] = graph;
  const pendingNodes = new Heap();
  // Visited nodes are a relationship between nodes
  // indexes and lengths.
  const visitedNodes = new Map([
    [0, 0],
  ]);

  restOfTheGraph.forEach((node, index) => {
    // Index has been increased by 1 since the first
    // node (vertex 0) has been pre-processed

    const key = getKey(node, visitedNodes);

    pendingNodes.insert({
      key,
      vertex: index + 1,
    });
  });

  while (pendingNodes.length > 0) {
    const minNode = pendingNodes.extractMin();

    visitedNodes.set(minNode.vertex, minNode.key);
    pendingNodes.deleteBy((node) => node.vertex === minNode.vertex);

    // don't break the invariant, we have to recalculate the keys
    // with the intersected nodes!
    recalculateInvariant(minNode.vertex, visitedNodes, pendingNodes, graph);
  }

  // The output is not being sorted by vertex and is not
  // a plain array, so we will translate this solution to
  // an array format.
  return [...visitedNodes].reduce((result, [vertex, key]) => {
    result[vertex] = key;
    return result;
  }, []);
};
