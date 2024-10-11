import React from 'react'

export const checkDiagonalMove = (piece, from, to, board) => {
  const deltaRow = Math.abs(to.row - from.row);
  const deltaCol = Math.abs(to.col - from.col);

  // Move must be diagonal
  if (deltaRow !== deltaCol) {
    return false;
  }

  const directionRow = Math.sign(to.row - from.row);
  const directionCol = Math.sign(to.col - from.col);

  let nextStepRow = from.row + directionRow;
  let nextStepCol = from.col + directionCol;

  // Check for obstructions along the diagonal path
  while (nextStepRow !== to.row && nextStepCol !== to.col) {
    if (board[nextStepRow][nextStepCol] !== null) {
      return false;
    }
    nextStepRow += directionRow;
    nextStepCol += directionCol;
  }

  // Check if the target square is empty or contains an opponent's piece
  const targetPiece = board[to.row][to.col];

  return !targetPiece || targetPiece[0] !== piece[0];
};

export const checkStraightMove = (piece, from, to, board) => {
  // Move must be along a row or column
  if (from.row !== to.row && from.col !== to.col) return false;

  const rowStep = Math.sign(to.row - from.row);
  const colStep = Math.sign(to.col - from.col);

  let row = from.row + rowStep;
  let col = from.col + colStep;

  while (row !== to.row || col !== to.col) {
    if (board[row][col] !== null) return false;
    row += rowStep;
    col += colStep;
  }

  // Check if the target square is empty or contains an opponent's piece
  const targetPiece = board[to.row][to.col];
  return !targetPiece || targetPiece[0] !== piece[0];
};

export const rock=(piece,board,from,to)=>{
  //const positionKing={row:7,col:4}
  const newBoard=board.map((row)=>[...row])
  if(piece[1]==='K' && board[7][5]==null && board[7][6]==null && to==board[7][6]){
    console.log('haya')
    newBoard[7][4]=null
    newBoard[7][5]='wR'
    newBoard[7][6]='wK'
  }
  return newBoard
}
