# Pathfinding Algorithm Visualizer

### About the web app
A simple React.js web application that visualizes various pathfinding algorithms (BFS, DFS, Dijkstra, A*).

### How to run
1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server to view it in your browser

### Src folder structure 
```
src
├── components/ # UI Components
│   ├── Grid/
│   ├── Controls/
│   ├── Legend/
│   └── Instructions
│
├── algorithms/
│   ├── bfs.js
│   ├── dfs.js
│   ├── dijkstra.js
│   └── aStart.js
│ 
├── hooks/
│   ├── useGrid.js # Grid state management
│   ├── usePathFinding.js # Pathfinding algorithm implementation
│   └── useMouse.js # Mouse interaction handling
│
├── utils/
│   ├── gridHelper.js # Grid manipulation function
│   ├── pathHelper.js # Pathfinding algorithm implementation function
│   └── visualizationHelpers.js # Display animation function
│
├── constants/
│   ├── gridConstrants.js # Grid size, cell size
│   ├── cellTypes.js # Cell state constants
│   └── algoConfig.js # Algorithm metadata
│
├── App.js # Main component
└── index.js # Entry point
```

