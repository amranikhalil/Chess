import React, { useState } from 'react';
import styled from 'styled-components';
import { Piece } from './Piece';
import { Square } from './Square';
import { initializeBoard,isCheck,isPin,isCheckMate  } from '../util/Logic';
import { isLegalMove,getPossibleMoves } from '../util/Moves';
import { rock } from '../util/Check';

export const Board = () => {
    const [board, setBoard] = useState(initializeBoard());
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState('w');
    const [kingincheck, setkingincheck] = useState(null);
    const [possiblemoves, setPossibleMoves] = useState([]);

    const handleMovePiece = (from, to) => {
            const piece = board[from.row][from.col];
            const newBoard = board.map(row => row.slice()); // Deep copy of the board
            rock(piece,board)
            if(isLegalMove(piece,from,to,board)){
                console.log(piece,from,to,board)
                newBoard[to.row][to.col] = piece;
                newBoard[from.row][from.col] = null;
                if(isPin(piece,newBoard)){
                    return false
                }
                setBoard(newBoard);
                const {incheck ,kingPosition}=isCheck(piece,newBoard)
                console.log(incheck)
                setkingincheck(incheck? kingPosition:null)
                if(incheck){
                    isCheckMate(piece,newBoard)
                    console.log('milaha')
                }
                setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w');
                setSelectedPiece(null);
            }else{
                setBoard(newBoard);
                setSelectedPiece(null);
            }
    };

    const handleSquareClick = (row, col) => {
       
        if (selectedPiece) {
            // Attempt to move the piece to the clicked square
            handleMovePiece(selectedPiece, { row, col });
            setPossibleMoves([]); // Clear possible moves after moving
        } else {
            // Select the piece on the clicked square if it's the current player's piece
            if (board[row][col] && board[row][col][0] === currentPlayer){
                setSelectedPiece({ row, col });
                let piece=board[row][col]
                let moves=getPossibleMoves(piece,{row,col},board)
                console.log(moves)
                setPossibleMoves(moves)
            }
        }
    };

    const RenderSquare = (piece, rowInd, colInd) => {
        const isSelected = selectedPiece && selectedPiece.row === rowInd && selectedPiece.col === colInd;
        const isKingInCheck = kingincheck && kingincheck.row === rowInd && kingincheck.col === colInd;
        const isPossiblemoves=possiblemoves.some((move)=>
            move.row===rowInd && move.col===colInd
        )
        return (
            <Square
                key={`${rowInd}-${colInd}`}
                piece={piece}
                rowInd={rowInd}
                colInd={colInd}
                onClick={() => handleSquareClick(rowInd, colInd)}
                selected={isSelected}
                isKingInCheck={isKingInCheck}
                isPossiblemoves={isPossiblemoves}
            />
        );
    };

    return (
        <BoardContainer>
            {board.map((row, rowInd) => (
                row.map((piece, colInd) => RenderSquare(piece, rowInd, colInd))
            ))}
        </BoardContainer>
    );
};

const BoardContainer = styled.div`
    margin-top:50px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    width: 100%;
    max-width: 500px;
    margin: 50px auto;
    background-color: #f0d9b5;
`;
