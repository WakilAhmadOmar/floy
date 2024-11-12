import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import styled from "styled-components";
import { svgPathProperties } from "svg-path-properties";
import { generateCirclePathSVGRelative } from "../utils/generateCirclePathSVGRelative";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  //   background-color: red;
  margin-left: auto;
  margin-right: auto;
  height: fit-content;
  padding-bottom: 2rem;
`;
const Path = styled.path<{ $glowOpacity: number; width: number }>`
  stroke: url(#gradient);
  stroke-width: ${(props) => props.width};
  fill: none;
  filter: drop-shadow(
    0 0 8px rgba(234, 179, 8, ${(props) => props.$glowOpacity})
  );
`;

interface IPropsLine {
  svgWidth?: number;
  svgHeight?: number;
  frequency?: number;
  speedOfCircle?: number;
  pathWidth?: number;
  color?: string;
  shadowColor?: string;
  circleR?: number;
}

export const BoltLineCircle: React.FC<IPropsLine> = ({
  svgWidth = 410,
  svgHeight = 800,
  frequency = 400,
  speedOfCircle = 1.88,
  pathWidth = 4,
  color = "#FFF",
  shadowColor = "#FFFCcc",
  circleR = 20,
}) => {
  const frame = useCurrentFrame();

  const { fps , height , width } = useVideoConfig();
  //   const svgHeight = height / 2 + 300;
  // const dsfs = generateCirclePathSVGRelative(30, 4, 3);

  // const LeftPath = `M ${width - strokeWidth - 13 } ${height} q 10,-100 -450,-300 t 10,-500 t -700,-600`
  const amplitude = frequency / 2;
  // const pathData = `M${svgWidth / 2} ${svgHeight - 27} q -${frequency} -${amplitude} 0 -${frequency} q ${frequency} -${amplitude} 0 -${frequency}  `;
  const pathData = `M${svgWidth / 2} ${svgHeight - 27} q 20,-50 -400,-300 t -250,-500 t 910,-300 t -200,-1050 `;
  // const pathData = `M${svgWidth / 2} ${svgHeight - 27} t 10,-150  t -250,-300 t 150,-300 t -250,-350 m 90,100 a 100,100 0 1,0 -200,0 a 100,100 0 1,0 200,0`;
  //   const pathData = `M${svgWidth / 2} ${svgHeight} q -${frequency} -${amplitude} 0 -${frequency} q ${frequency} -${amplitude} 0 -${frequency}  q -${frequency} -${amplitude} 0 -${frequency} q ${frequency} -${amplitude} 0 -${frequency} `;

  const glowOpacity = interpolate(
    frame % fps,
    [0, fps / 2, fps],
    [0.3, 1, 0.3],
    { extrapolateRight: "clamp" },
  );

  // Linear progress for circle position
  const t = interpolate(frame, [0, fps * 3], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Create an instance of path properties
  const properties = new svgPathProperties(pathData); // Correct usage

  // Calculate the total length of the path
  const pathLength = properties.getTotalLength();

  // Map frame to position along the path
  const progress = interpolate(
    frame * speedOfCircle,
    [0, 150],
    [0, pathLength],
    { extrapolateRight: "clamp" },
  );
  const { x, y } = properties.getPointAtLength(progress);
  return (
    <Container>
    <svg
      height={svgHeight}
      width={svgWidth}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      style={{
      
        position: "absolute",
        height:svgHeight,
        // transform: `translateY(${frame < 105 ? ( frame - 42) * 18 + "px" : ( 105 - 42) * 18 +"0px"} )`,
        transform: `translateY(${frame * 2}px)`,
        // backgroundColor:"red",
        top:0 
        
      }}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={shadowColor} />
        </linearGradient>
        <clipPath id="progress-clip" clipPathUnits="userSpaceOnUse">
          <rect
            x="0"
            y={svgHeight * (1 - t)}
            width={svgWidth}
            height={svgHeight * t}
            // y={svgHeight}
            // height={svgHeight}
          />
        </clipPath>
      </defs>

      <Path
        $glowOpacity={glowOpacity}
          // d="M200 600 q -100 -50 0 -100 q 100 -50 0 -100  q -100 -50 0 -100 q 100 -50 0 -100 "
        d={pathData}
        clipPath="url(#progress-clip)"
        id="linePath"
        width={pathWidth}
      />
      <circle r={`${circleR}`} cx={x} cy={y} fill={color} />
    </svg>
 </Container>
  );
};
