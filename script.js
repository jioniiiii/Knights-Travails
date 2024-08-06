let q = [];
let vi = [];
let chessBoard = [];

const board = () => {
    for (let i = 0; i < 8; i++) {
        chessBoard[i] = [];
        for (let j = 0; j < 8; j++) {
    
            chessBoard[i][j] = `[${i}, ${j}]`;
        }
    }
    console.log(chessBoard);
};

const legalMoves = ([x,y]) => {
    const moves = [
        [x - 2, y - 1], [x - 1, y - 2], [x + 1, y - 2], [x + 2, y - 1],
        [x + 2, y + 1], [x + 1, y + 2], [x - 1, y + 2], [x - 2, y + 1]
      ];
    
      return moves.filter(
        ([nx, ny]) => nx >= 0 && nx < 8 && ny >= 0 && ny < 8
      ).map(move => `[${move[0]}, ${move[1]}]`);
};

const createNode = ([x, y]) => {
    let node = { value: `[${x}, ${y}]`, prev: null };
    return node;
  };

const bfs = (startNode, end) => {
    q.push(startNode);
    while(q.length > 0) {
        const currentNode = q.shift();
        vi.push(currentNode)
        
        if(currentNode.value === `[${end[0]}, ${end[1]}]`) {
            return currentNode;
        }

        const children = legalMoves(JSON.parse(currentNode.value));
        children.forEach(childValue => {
            if(!vi.some(node => node.value ===childValue) && !q.some(node => node.value === childValue)) { //checks if vi arr contains node with the same value
                q.push({ value: childValue, prev: currentNode });
            }
        });
    }

    return null;

};

const moves = (start, end) => {
    if (end[0] > 7 || end[0] < 0 || end[1] > 7 || end[1] < 0) {
      console.log("Out of range. Please enter positions between [0, 0] and [7, 7].");
      return;
    }

    vi.length = 0;  
    q.length = 0; 

    const startNode = createNode(start);
    const endNode = bfs(startNode, end);
  
    if (!endNode) {
      console.log("No path found.");
      return;
    }
  
    const path = [];
    let currentNode = endNode;
  
    while (currentNode) {
      path.unshift(currentNode.value);
      currentNode = currentNode.prev;
    }
  
    console.log(`Here is your path from ${start} to ${end}:`);
    path.forEach(move => console.log(move));
  };

moves([3,3],[4,3]);