import { checkRowmove } from './Check';
import { isLegalMove,getPossibleMoves } from './Moves';
import React from 'react'
export const initializeBoard = () => {
    const init = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
    const pieces = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
    for (let i = 0; i < 8; i++) {
      init[0][i] = `b${pieces[i]}`;
      init[1][i] = 'bP';
      init[6][i] = 'wP';
      init[7][i] = `w${pieces[i]}`;
    }
    return init;
  };
export const isCheckMate=(piece,board)=>{
  console.log(piece)
  const {incheck,kingPosition}=isCheck(piece,board)
  console.log(incheck)
  // if(!incheck){
  //   return false
  // }
  const king = piece[0]=='w'? 'bK':'wK';
  console.log(king)
  const kingmoves=getPossibleMoves(king,kingPosition,board)
  for(const move of kingmoves){
    const newBoard=board.map((row)=>[...row])
    newBoard[move.row][move.col]=king
    newBoard[kingPosition.row][kingPosition.col]=null
    if(!isCheck(piece,newBoard).incheck){
      console.log('the king can escape')
      return false
    }
  }
    for(let i=0;i<board.length;i++){
      for(let j=0;j<board[i].length;j++){
        let currentpiece=board[i][j]
        if(currentpiece && currentpiece[0]!==piece[0]){
          const  moves= getPossibleMoves(currentpiece,{row:i,col:j},board)
          for(const move of moves){
            const newBoard=board.map((row)=>[...row])
            newBoard[move.row][move.col]=currentpiece
            newBoard[i][j]=null
            console.log(move)
            if(!isCheck(piece,newBoard).incheck){
              console.log('the piece can protect')
              return false
            }
          }
        }
      }
    }
    console.log('checkmate')
    return true
  }

export const isPin=(piece,board)=>{
  //find the position fo the king
      let kingPosition
      let king=piece[0]==='w'?'wK':'bK'
      for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
          if(board[i][j]===king){
            kingPosition={row:i,col:j}
            break
          }
        }
      }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const piecee = board[i][j];
      if (piecee && piecee[0] !== king[0]) {
        const from = { row: i, col: j };
        //console.log(piecee, from, kingPosition, board);
        if (isLegalMove(piecee, from, kingPosition, board)) {
          console.log('cant moove');
          return true
         // return ({incheck:true,kingPosition});
        }
      }
    }
  }

  console.log('can moove');
  return false
  //return ({incheck:false,kingPosition});
}

export const isCheck=(piece,board)=>{
  //find the position fo the king
      let kingPosition
      let king=piece[0]==='w'?'bK':'wK'
      for(let i=0;i<board.length;i++){
        for(let j=0;j<board[i].length;j++){
          if(board[i][j]===king){
            kingPosition={row:i,col:j}
            break
          }
        }
      }
//check if the piece can attack a king
        // Check if any piece can attack the king
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const piecee = board[i][j];
      if (piecee && piecee[0] !== king[0]) {
        const from = { row: i, col: j };
        //console.log(piecee, from, positionKing, board);
        if (isLegalMove(piecee, from, kingPosition, board)) {
          console.log('Check');
          return ({incheck:true,kingPosition});
        }
      }
    }
  }

  console.log('No check');
  return ({incheck:false,kingPosition});
}
     

export const Logic = () => {
  return (
    <div>Logic</div>
  )
}
