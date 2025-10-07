import { ALGORITHMS } from './algorithmConfig';

export const ALGORITHM_DESCRIPTIONS = {
  [ALGORITHMS.BFS]: {
    name: 'Breadth-First Search (BFS)',
    description: 'BFS is an unweighted pathfinding algorithm that explores all nodes at the current depth before moving to nodes at the next depth level.',
    howItWorks: [
      'Starts at the starting node and explores all neighboring nodes first',
      'Uses a queue (FIFO - First In First Out) data structure',
      'Marks each visited node to avoid revisiting',
      'Guarantees the shortest path in an unweighted grid',
      'Explores nodes in a "wave-like" pattern outward from the start'
    ],
    timeComplexity: 'O(V + E) where V is vertices and E is edges',
    spaceComplexity: 'O(V)',
    guaranteesShortestPath: true,
    weighted: false
  },
  
  [ALGORITHMS.DFS]: {
    name: 'Depth-First Search (DFS)',
    description: 'DFS is an unweighted pathfinding algorithm that explores as far as possible along each branch before backtracking.',
    howItWorks: [
      'Starts at the starting node and explores one branch completely',
      'Uses a stack (LIFO - Last In First Out) data structure',
      'Goes deep into one path before exploring alternatives',
      'Does NOT guarantee the shortest path',
      'Useful for maze generation and exploring all possibilities'
    ],
    timeComplexity: 'O(V + E) where V is vertices and E is edges',
    spaceComplexity: 'O(V)',
    guaranteesShortestPath: false,
    weighted: false
  },
  
  [ALGORITHMS.DIJKSTRA]: {
    name: "Dijkstra's Algorithm",
    description: "Dijkstra's algorithm is a weighted pathfinding algorithm that finds the shortest path by always exploring the node with the lowest cost first.",
    howItWorks: [
      'Maintains a priority queue of nodes to visit',
      'Always explores the node with the lowest total distance first',
      'Updates distances to neighboring nodes if a shorter path is found',
      'Guarantees the shortest path in weighted graphs',
      'In an unweighted grid (like this), it behaves similarly to BFS'
    ],
    timeComplexity: 'O((V + E) log V) with priority queue',
    spaceComplexity: 'O(V)',
    guaranteesShortestPath: true,
    weighted: true
  },
  
  [ALGORITHMS.ASTAR]: {
    name: 'A* (A-Star) Algorithm',
    description: 'A* is an intelligent weighted pathfinding algorithm that uses heuristics to find the shortest path more efficiently than Dijkstra.',
    howItWorks: [
      'Combines actual distance (g-score) with estimated distance to goal (h-score)',
      'Uses Manhattan distance as heuristic: |x1-x2| + |y1-y2|',
      'Prioritizes nodes that appear closer to the goal',
      'More efficient than Dijkstra by exploring fewer nodes',
      'Guarantees shortest path when using an admissible heuristic'
    ],
    timeComplexity: 'O((V + E) log V) with priority queue',
    spaceComplexity: 'O(V)',
    guaranteesShortestPath: true,
    weighted: true
  }
};

