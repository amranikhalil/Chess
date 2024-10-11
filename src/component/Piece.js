import React,{ useState, useEffect }  from 'react'
import styled from 'styled-components'
export const Piece = ({piece}) => {
    const [pieceImage, setPieceImage] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = await import(`../Assets/pieces/${piece}.svg`);
        setPieceImage(image.default);
      } catch (err) {
        console.error(`Image not found for piece: ${piece}`);
      }
    };

    loadImage();
  }, [piece]);

  if (!pieceImage) {
    return null; // or a placeholder image/spinner
  }
  return (
    
    <PieceContainer>
      <Imgpiece src={pieceImage} alt={piece}></Imgpiece>
    </PieceContainer>
  )
}
const Imgpiece= styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
`
const PieceContainer=styled.div`
`
