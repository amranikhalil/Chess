import React from 'react'
import {checkDiagonalMove} from './Check'
import {checkStraightMove} from './Check'
import { rock } from './Check';

export const isLegalMove = (piece, from, to, board) => {
    switch (piece[1]) {
      case 'P':
        return isLegalPawnMove(piece, from, to, board);
      case 'N':
        return isLegalNightMove(piece,from,to,board)
      case 'R':
        return isLegalRookMove(piece, from, to, board);
      case 'B':
        return isLegalBishopMove(piece,from,to,board)
      case 'Q':
            return isLegalQueenMove(piece,from,to,board)  
      case 'K':
             return isLegalKingMove(piece,from,to,board)       
     
      default:
        return false;
    }
  };
// export const getPossibleMoves=(piece,from,board)=>{
//   let moves=[]
//   for(let i=0;i<board.length;i++){
//     for(let j=0;j<board[i].length;j++){
//       let to={row:i,col:j}
//       if(isLegalMove(piece,from,to,board)){
//         moves.push({row:i,col:i})
//       }
//     }
//   }
//   return moves
// }  

const isLegalPawnMove = (piece, from, to, board) => {
    const direction = piece[0] === 'w' ? -1 : 1;
    const startRow = piece[0] === 'w' ? 6 : 1;
    if (from.col === to.col && board[to.row][to.col] === null) {
      if (to.row === from.row + direction) return true;
      if (from.row === startRow && to.row === from.row + 2 * direction &&
         board[from.row + direction][to.col] === null) return true;
    }
    if (Math.abs(to.col - from.col) === 1 && to.row === from.row + direction && 
        board[to.row][to.col] && board[to.row][to.col][0] !== piece[0]) return true;
    return false;
  };


const isLegalBishopMove=(piece,from,to,board)=>{
   return checkDiagonalMove(piece,from,to,board)
  }

const isLegalKingMove=(piece,from,to,board)=>{
    const possibledirection=[
        {row:1, col:0},
        {row:-1, col:0},
        {row:0, col:1},
        {row:0, col:-1},
        {row:1, col:1},
        {row:-1, col:1},
        {row:1, col:-1},
        {row:-1, col:-1}
    ]
    let deltarow= to.row-from.row
    let deltacol= to.col-from.col
    const isLegal=possibledirection.some((direction)=>{
        if(direction.row===deltarow && direction.col===deltacol){
            return true
        }
    })
    if(board[7][5]==null && board[7][6]==null && to===board[7][6]){
      const newBoard=board.map((row)=>[...row])
      console.log('haya')
      newBoard[7][4]=null
      newBoard[7][5]='wR'
      newBoard[7][6]='wK'
      return newBoard
    }    
    if(!isLegal){
        return false

    }
    const targetpeice= board[to.row][to.col]
    if(targetpeice===null || targetpeice[0]!==piece[0]){
        return true
    }
    return false
   }
 
const isLegalQueenMove=(piece,from,to,board)=>{
    return (checkStraightMove(piece,from,to,board) || checkDiagonalMove(piece, from, to, board))
}
const isLegalNightMove = (piece, from, to, board) => {
  const rowDiff = Math.abs(to.row - from.row);
  const colDiff = Math.abs(to.col - from.col);
  // Knight moves in an L-shape: two squares in one direction, one square in the other
  const isValidMove = (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
  // Ensure the target square is not occupied by a piece of the same color
  const targetPiece = board[to.row][to.col];
  if (isValidMove && (!targetPiece || targetPiece[0] !== piece[0])) {
    return true;
  }
  return false;
};
const isLegalRookMove = (piece, from, to, board) => {
  return checkStraightMove(piece, from, to, board)
};

export const getPossibleMoves = (piece, position, board) => {
  switch (piece[1]) {
    case 'P':
      return getPossiblePawnMoves(piece, position, board);
    case 'N':
      return getPossibleKnightMoves(piece, position, board);
    case 'R':
      return getPossibleRookMoves(piece, position, board);
    case 'B':
      return getPossibleBishopMoves(piece, position, board);
    case 'Q':
      return getPossibleQueenMoves(piece, position, board);
    case 'K':
      return getPossibleKingMoves(piece, position, board);
    default:
      return [];
  }
};

const getPossiblePawnMoves = (piece, position, board) => {
  const moves = [];
  const direction = piece[0] === 'w' ? -1 : 1;
  const startRow = piece[0] === 'w' ? 6 : 1;

  // Check one square forward
  if (board[position.row + direction] && board[position.row + direction][position.col] === null) {
    moves.push({ row: position.row + direction, col: position.col });

    // Check two squares forward from the starting position
    if (position.row === startRow && board[position.row + 2 * direction] && board[position.row + 2 * direction][position.col] === null) {
      moves.push({ row: position.row + 2 * direction, col: position.col });
    }
  }

  // Check diagonal captures
  [-1, 1].forEach(offset => {
    const targetRow = position.row + direction;
    const targetCol = position.col + offset;
    if (board[targetRow] && board[targetRow][targetCol] && board[targetRow][targetCol][0] !== piece[0]) {
      moves.push({ row: targetRow, col: targetCol });
    }
  });

  return moves;
};
  
  const getPossibleKnightMoves = (piece, position, board) => {
    const moves = [];
    const offsets = [
      {row: -2, col: -1}, {row: -2, col: 1},
      {row: -1, col: -2}, {row: -1, col: 2},
      {row: 1, col: -2}, {row: 1, col: 2},
      {row: 2, col: -1}, {row: 2, col: 1}
    ];
  
    offsets.forEach(offset => {
      const targetRow = position.row + offset.row;
      const targetCol = position.col + offset.col;
      
      // Check if the target position is within the board
      if (targetRow >= 0 && targetRow < 8 && targetCol >= 0 && targetCol < 8) {
        // Check if the target square is empty or contains an opponent's piece
        if (board[targetRow][targetCol] === null || board[targetRow][targetCol][0] !== piece[0]) {
          moves.push({ row: targetRow, col: targetCol });
        }
      }
    });
  
    return moves;
  };
  const getPossibleRookMoves = (piece, position, board) => {
    const moves = [];
    const directions = [{row: -1, col: 0}, {row: 1, col: 0}, {row: 0, col: -1}, {row: 0, col: 1}];
  
    directions.forEach(direction => {
      let targetRow = position.row + direction.row;
      let targetCol = position.col + direction.col;
      while (board[targetRow] && board[targetRow][targetCol] !== undefined) {
        if (board[targetRow][targetCol] === null) {
          moves.push({ row: targetRow, col: targetCol });
        } else if (board[targetRow][targetCol][0] !== piece[0]) {
          moves.push({ row: targetRow, col: targetCol });
          break;
        } else {
          break;
        }
        targetRow += direction.row;
        targetCol += direction.col;
      }
    });
  
    return moves;
  };
  
  const getPossibleBishopMoves = (piece, position, board) => {
    const moves = [];
    const directions = [{row: -1, col: -1}, {row: -1, col: 1}, {row: 1, col: -1}, {row: 1, col: 1}];
  
    directions.forEach(direction => {
      let targetRow = position.row + direction.row;
      let targetCol = position.col + direction.col;
      while (board[targetRow] && board[targetRow][targetCol] !== undefined) {
        if (board[targetRow][targetCol] === null) {
          moves.push({ row: targetRow, col: targetCol });
        } else if (board[targetRow][targetCol][0] !== piece[0]) {
          moves.push({ row: targetRow, col: targetCol });
          break;
        } else {
          break;
        }
        targetRow += direction.row;
        targetCol += direction.col;
      }
    });
  
    return moves;
  };
  
  const getPossibleQueenMoves = (piece, position, board) => {
    return [...getPossibleRookMoves(piece, position, board), ...getPossibleBishopMoves(piece, position, board)];
  };
  
  const getPossibleKingMoves = (piece, position, board) => {
    const moves = [];
    const directions = [
      {row: -1, col: -1}, {row: -1, col: 0}, {row: -1, col: 1},
      {row: 0, col: -1}, {row: 0, col: 1},
      {row: 1, col: -1}, {row: 1, col: 0}, {row: 1, col: 1}
    ];
  
    directions.forEach(direction => {
      const targetRow = position.row + direction.row;
      const targetCol = position.col + direction.col;
      if (board[targetRow] && board[targetRow][targetCol] !== undefined && 
          (board[targetRow][targetCol] === null || board[targetRow][targetCol][0] !== piece[0])) {
        moves.push({ row: targetRow, col: targetCol });
      }
    });
  
    return moves;
  };

export const Moves = () => {
  return (
    <div>Moves</div>
  )
}
