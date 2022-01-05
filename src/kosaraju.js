// eslint-disable-next-line max-classes-per-file
class Node {
  constructor(name) {
    this.name = name;
    this.edges = new Set();
  }

  // Note: this won't allow more than one directed edge to the same node.
  addEdge(node) {
    this.edges.add(node);
  }

  plotEdges() {
    this.edges.forEach((node) => console.log(`-> ${node.name}`));
  }

  // Auxiliar method to plot nodes.
  print() {
    console.log(`**node: ${this.name}**`);
    console.log(`Edges: ${this.edges.size}`);
    this.plotEdges();
    console.log('**end**');
  }
}

// Conditions:
// - there is no an "initial" node.
// - Edges can not be repeated (if there an edge AB there /// no other edge that goes from A to B)
class DirectedGraph {
  constructor(...edges) {
    this.nodes = new Map();

    edges.map(this.parseEdge.bind(this));
  }

  parseEdge(edge) {
    const [init, end] = edge;

    // Parse the nodes properly
    edge.map(this.addNode.bind(this));

    // Add the edge relationship
    this.nodes.get(init).addEdge(this.nodes.get(end));
  }

  addNode(nodeName) {
    if (!this.nodes.has(nodeName)) {
      this.nodes.set(nodeName, new Node(nodeName));
    }
  }

  getNodeByName(nodeName) {
    return this.nodes.get(nodeName);
  }

  print() {
    this.nodes.forEach((node) => node.print());
  }
}

function getInversedInput(input) {
  return input.map(([init, end]) => [end, init]);
}

function dfsTopo(node, topoList, exploredList, sortLabel) {
  // Mark node as explored
  exploredList.add(node);
  node.edges.forEach((adjancentNode) => {
    if (!exploredList.has(adjancentNode)) {
      dfsTopo(adjancentNode, topoList, exploredList, sortLabel);
    }
  });
  // The biggest value of sortLabel will be the leaves of the
  // first node.
  topoList.set(sortLabel.value, node);
  sortLabel.value -= 1;
}

function dfsGrouped(node, exploredList, groupedList, groupId) {
  // Mark node as explored
  exploredList.add(node);
  groupedList[groupId].add(node);

  node.edges.forEach((adjancentNode) => {
    if (!exploredList.has(adjancentNode)) {
      dfsGrouped(adjancentNode, exploredList, groupedList, groupId);
    }
  });
}

function topoSort(graph) {
  // contains nodes explored
  const exploredList = new Set();
  // contains the relationship between a node and a topological sort number
  const topoList = new Map();
  // initial calculated Position
  // Trick to achieve a number reference instead of using a value
  const sortLabel = {
    value: graph.nodes.size,
  };

  graph.nodes.forEach((node) => {
    if (!exploredList.has(node)) {
      dfsTopo(node, topoList, exploredList, sortLabel);
    }
  });

  return topoList;
}

function groupByTopoSort(topoList, graph) {
  // contains nodes explored
  const exploredList = new Set();
  // contains relationship between nodes and groupsIds
  const groupedList = [];
  // current group
  let groupId = 0;

  for (let i = 1; i <= topoList.size; i++) {
    const inversedNode = topoList.get(i);
    const node = graph.getNodeByName(inversedNode.name);

    if (!exploredList.has(node)) {
      // Create a new groupId in the list
      groupedList.push(new Set());
      dfsGrouped(node, exploredList, groupedList, groupId);
      groupId += 1;
    }
  }

  return groupedList;
}

module.exports = function kosaraju(...input) {
  const inversedGraph = new DirectedGraph(...getInversedInput(input));
  const graph = new DirectedGraph(...input);

  // First step: achieve the topology sorting for the inversed graph.
  const topoList = topoSort(inversedGraph);

  // Second step: group by different "connected components".
  const groupedList = groupByTopoSort(topoList, graph);

  // Only check the size of the strong components and sort by desc.
  return groupedList.map((elem) => elem.size).sort((a, b) => b - a);
};
