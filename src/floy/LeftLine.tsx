import React from 'react';
import styled from 'styled-components';

interface IPropsLeftLine {
    width:number,
    height:number,
    borderColor:string,
    face:"Left" | "Right"
}
const VerticalLine: React.FC<IPropsLeftLine> = (
    {
        borderColor,
        height,
        width,
        face
    }
) => {
  return (
    <Container>
      <HalfCircle height={height} width={width} borderColor={borderColor} face={face}/>
    </Container>
  );
};

// Styling for the container
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
`;

// Styling for the vertical half-circle
const HalfCircle = styled.div<{
    width:number,
    height:number,
    borderColor:string,
    face:"Left" | "Right"
}>`
 width:2px;                   /* Diameter of the half-circle */
  height: ${(props)=>props?.height}px;                   /* Same as width for a perfect circle */
              /* Makes it a circle */
  clip-path: inset(0 ${(props)=> props.face === "Right" ? "80%" : 0 } 0 ${(props)=> props?.face === "Left" ? "80%" : 0});     /* Clips the left half to make it a vertical half-circle */
  border-right:${(props)=>props?.width / 2 }px ${  (props)=> props?.face === "Right" ? (props?.width / 2 ) : 0 }px 0 ${  (props)=> props?.face === "Left" ? (props?.width / 2 ) : 0 }px;
  border:4px solid ${(props)=> props.borderColor};
`;

export default VerticalLine;
