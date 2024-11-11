import { ArrowLeft3, ArrowRight3 } from "iconsax-react";
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import styled from "styled-components";

interface IPropsBox {
  left: number;
  arrow: "Left" | "Right";
}
const Container = styled.div<{
  height:number,
  width:number,
  left:number,
  rotate:number
}>`
 position: "absolute",
        top: ${(props)=> props.height / 2 + 300}px;
        left: ${(props)=>props.width / 2 - props.left},
        backgroundColor: "none",
        transform: rotate(-${(props)=>props.rotate}deg),
`
const Box: React.FC<IPropsBox> = ({ left, arrow }) => {
  const { height, width } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <Container
    height={height}
    width={width}
    left={left}
    rotate={frame}
    >
      {arrow === "Left" && <ArrowRight3 color="#FFF" size={60} />}
      {arrow === "Right" && <ArrowLeft3 color="#FFF" size={60} />}
    </Container>
  );
};

export default Box;
