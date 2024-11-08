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

const CircleComponent = () => {
  // const [showCircle, setShowCircle] = useState(false);
  // const [firstTime, setFirstTime] = useState(0);
  const frame = useCurrentFrame();
  const {  fps ,  width , height} = useVideoConfig();

  // const mainCircleRadius = 100;
  // const innerRadius = mainCircleRadius - 20;
  // const rotation = interpolate(
  //   frame,
  //   [0, fps * 2], // Two seconds for one full rotation
  //   [0, 360],
  // );
  // const angleInRadians = (rotation * Math.PI) / 180;
  // const progress = spring({
  //   frame: frame,
  //   fps,
  //   config: {
  //     damping: 200,
  //   },
  // });
  // const pointX = innerRadius * Math.cos(angleInRadians) - 80;

  // const translateY = interpolate(progress, [0, 1], [0, -300]);

  // const translateX = interpolate(progress, [0, 1], [0, -100]);

  // // Circle's center coordinates
  // const centerX = 50;
  // const centerY = 50;
  // const radius = 200; // Radius of the orbiting path

  // // Calculate the position of the orbiting point
  // const angle = (-frame * Math.PI) / fps; // Change speed by adjusting the multiplier
  // const x = centerX + radius * Math.cos(angle);
  // const y = centerY + radius * Math.sin(angle);

  // if (pointX === 0 && showCircle === false ) {
  //   setShowCircle(true)
  // }

  const radius = 350;
  const numPoints = 360;
  const speedOfCircle = 2;
  const circleR = 30
  const svgWidth = radius  * 2 + circleR * 2
  const svgHeight =  radius  * 2 + circleR * 2
  const svgPathRelative: string = generateCirclePathSVGRelative(
    radius,
    numPoints,
    circleR
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
   
      <Sequence from={106} durationInFrames={78} style={{
        position:"absolute",
        left:width/2 - svgWidth/2, 
        top:height / 2 - svgHeight / 2
      }}>
        
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{
            // backgroundColor: "green",
            width: svgWidth,
            height: svgHeight,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform:"rotate(40deg)"
          }}
        >
          
          <circle r={circleR} cx={x} cy={y} fill="#FFF" />
        </svg>
      </Sequence>
      
    
  );
};

export default CircleComponent;
