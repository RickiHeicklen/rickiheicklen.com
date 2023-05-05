// Define the chess pieces
const pieces = {
  'a8': {color: 'black', type: 'rook', position: 'a8'},
  'b8': {color: 'black', type: 'knight', position: 'b8'},
  'c8': {color: 'black', type: 'bishop', position: 'c8'},
  'd8': {color: 'black', type: 'queen', position: 'd8'},
  'e8': {color: 'black', type: 'king', position: 'e8'},
  'f8': {color: 'black', type: 'bishop', position: 'f8'},
  'g8': {color: 'black', type: 'knight', position: 'g8'},
  'h8': {color: 'black', type: 'rook', position: 'h8'},
  'a7': {color: 'black', type: 'pawn', position: 'a7'},
  'b7': {color: 'black', type: 'pawn', position: 'b7'},
  'c7': {color: 'black', type: 'pawn', position: 'c7'},
  'd7': {color: 'black', type: 'pawn', position: 'd7'},
  'e7': {color: 'black', type: 'pawn', position: 'e7'},
  'f7': {color: 'black', type: 'pawn', position: 'f7'},
  'g7': {color: 'black', type: 'pawn', position: 'g7'},
  'h7': {color: 'black', type: 'pawn', position: 'h7'},
  'a1': {color: 'white', type: 'rook', position: 'a1'},
  'b1': {color: 'white', type: 'knight', position: 'b1'},
  'c1': {color: 'white', type: 'bishop', position: 'c1'},
  'd1': {color: 'white', type: 'queen', position: 'd1'},
  'e1': {color: 'white', type: 'king', position: 'e1'},
  'f1': {color: 'white', type: 'bishop', position: 'f1'},
  'g1': {color: 'white', type: 'knight', position: 'g1'},
  'h1': {color: 'white', type: 'rook', position: 'h1'},
  'a2': {color: 'white', type: 'pawn', position: 'a2'},
  'b2': {color: 'white', type: 'pawn', position: 'b2'},
  'c2': {color: 'white', type: 'pawn', position: 'c2'},
  'd2': {color: 'white', type: 'pawn', position: 'd2'},
  'e2': {color: 'white', type: 'pawn', position: 'e2'},
  'f2': {color: 'white', type: 'pawn', position: 'f2'},
  'g2': {color: 'white', type: 'pawn', position: 'g2'},
  'h2': {color: 'white', type: 'pawn', position: 'h2'},
};

// Add pieces to the board
for (let id in pieces) {
  const piece = pieces[id];
  const square = document.getElementById(id);
  square.innerHTML = `<div class="piece ${piece.color} ${piece.type}" style="background-image: url('images/chess/${piece.color}-${piece.type}.png')"></div>`;
}

// Add event listeners to the squares
const squares = document.querySelectorAll('.square');
let selectedSquare = null;
squares.forEach(square => {
  square.addEventListener('click', () => {
    // If no square is currently selected, select the clicked square
    if (!selectedSquare) {
      selectedSquare = square;
      selectedSquare.classList.add('highlight');
      highlightValidMoves(selectedSquare);
    }
    // If a square is already selected, move the piece to the clicked square
    else {
      const from = selectedSquare.id;
      const to = square.id;
      if (isValidMove(from, to)) {
        movePiece(from, to);
      }
      unhighlightValidMoves(selectedSquare);
      selectedSquare.classList.remove('highlight');
      selectedSquare = null;
    }
  });
});

// Highlight valid moves for a selected square
function highlightValidMoves(square) {
  // TODO: Implement logic for highlighting valid moves
}

// Unhighlight valid moves for a selected square
function unhighlightValidMoves(square) {
  // TODO: Implement logic for unhighlighting valid moves
}

// Check if a move is valid
function isValidMove(from, to) {
  // TODO: Implement logic for checking if a move is valid
  return true;
}

// Move a piece from one square to another
function movePiece(from, to) {
  const fromSquare = document.getElementById(from);
  const toSquare = document.getElementById(to);
  const piece = fromSquare.querySelector('.piece');
  // toSquare.innerHTML =
  fromSquare.innerHTML = '';
  toSquare.appendChild(piece);
  const pieceData = pieces[from];
  pieceData.position = to;
  delete pieces[from];
  pieces[to] = pieceData;
}

// TODO: Implement logic for checking if a player is in check or checkmate
// TODO: Implement logic for promoting a pawn to a queen when it reaches the opposite end of the board
