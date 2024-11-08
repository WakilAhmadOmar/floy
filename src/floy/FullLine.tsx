import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import styled from "styled-components";

interface IPropsVerticalLine {
  stroke: string;
  left: number;
  bottom: number;
  rotate: number;
}

const VerticalFullLine: React.FC<IPropsVerticalLine> = ({
  bottom,
  left,
  stroke,
  rotate,
}) => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  return (
    <Container>
      <AbsoluteFill style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            height: frame * 5,
            width: "fit-content",
            bottom: -height + bottom,
            left: left,
            transform: `rotate(${rotate}deg)`,
          }}
          id="VerticalFullLine"
        >
          <ResponsiveSVG
            viewBox="0 0 81 333"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M77.5 332C83.9393 306 82.6514 238.6 25.9859 177C-36.567 109 36.2887 10 45.3037 1"
              stroke={stroke}
              fill="none"
              strokeWidth="2"
            />
          </ResponsiveSVG>
        </div>
      </AbsoluteFill>
    </Container>
  );
};

// Styling for the container
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: fit-content;
`;

const ResponsiveSVG = styled.svg`
  width: auto; /* Takes up full width of the container */
  height: 100%; /* Maintains aspect ratio based on width */
`;

export default VerticalFullLine;
