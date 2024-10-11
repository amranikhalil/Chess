import React from 'react';
import styled from 'styled-components';
import { Piece } from './Piece';

export const Square = ({ piece, rowInd, colInd, onClick,selected,isKingInCheck,isPossiblemoves  }) => {
   
    return (
        <SquareContainer 
            isLight={(rowInd + colInd) % 2 === 0} 
            onClick={onClick}
            selected={selected}
            isKingInCheck={isKingInCheck}
            isPossiblemoves={isPossiblemoves}
        >
            {piece && <Piece piece={piece} />}
        </SquareContainer>
    );
};

const SquareContainer = styled.div`
    width: 100%;
    padding-top: 100%; // Aspect ratio 1:1
    background-color: ${({ isLight, selected,isKingInCheck,isPossiblemoves }) => 
        isPossiblemoves? '#F0FFFF':
        isKingInCheck? '#ff6b6b':
        selected ? 'gray' : 
        (isLight ? '#f0d9b5' : '#b58863')
    };
    position: relative;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius:5px;
    &:hover {
        ${({selected,isKingInCheck})=>
            isKingInCheck ?  '#ff6b6b':
            selected? 'gray': '#d3b78c'
        }
    }

    & > * {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
`;
