import React, { useState } from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { generateCirclePathSVGRelative } from "../utils/generateCirclePathSVGRelative";
import { svgPathProperties } from "svg-path-properties";
import styled from "styled-components";

const CircleAVG = styled.svg<{ width: number; height: number; rotate: number }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  justifycontent: center;
  alignitems: center;
  transform: ${(props) => props.rotate}deg;
`;

const CircleComponent = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const radius = 350;
  const numPoints = 360;
  const speedOfCircle = 2;
  const circleR = 30;
  const svgWidth = radius * 2 + circleR * 2;
  const svgHeight = radius * 2 + circleR * 2;
  const svgPathRelative: string = generateCirclePathSVGRelative(
    radius,
    numPoints,
    circleR,
  );
  // Create an instance of path properties
  const properties = new svgPathProperties(svgPathRelative); // Correct usage

  // Calculate the total length of the path
  const pathLength = properties.getTotalLength();

  // Map frame to position along the path
  const progress = interpolate(
    (frame - 90) * speedOfCircle,
    [0, 150],
    [0, pathLength],
    { extrapolateRight: "clamp" },
  );
  const { x, y } = properties.getPointAtLength(progress);

  return (
    <Sequence
      from={106}
      durationInFrames={78}
      style={{
        position: "absolute",
        left: width / 2 - svgWidth / 2,
        top: height / 2 - svgHeight / 2,
      }}
    >
      <CircleAVG
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width={svgWidth}
        height={svgHeight}
        rotate={40}
      >
        <circle r={circleR} cx={x} cy={y} fill="#FFF" />
      </CircleAVG>
    </Sequence>
  );
};

export default CircleComponent;
