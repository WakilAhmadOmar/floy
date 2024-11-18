import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { generateCirclePathSVGRelative } from "../../utils/generateCirclePathSVGRelative";
import { svgPathProperties } from "svg-path-properties";
import styled from "styled-components";

const Path = styled.path<{ $glowOpacity: number; width: number }>`
  stroke: url(#gradient);
  stroke-width: ${(props) => props.width};
  fill: none;
  filter: drop-shadow(
    0 0 8px rgba(234, 179, 8, ${(props) => props.$glowOpacity})
  );
`;

interface IProps {
  color?: string;
  strokeWidth?: number;
  radius?: number;
  numPoints?: number;
  speedOfCircle?: number;
  circleR?: number;
  circleStartPoint?: number;
  speedOfPath?: number;
  clipPathId?: string;
  strokeId?: string;
  rotate?:number
}

const ReuseCircle: React.FC<IProps> = ({
  radius = 300,
  numPoints = 360,
  speedOfCircle = 2,
  circleR = 20,
  circleStartPoint = 0,
  speedOfPath = 1,
  clipPathId,
  strokeId,
  rotate= 0
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // const radius = 300;
  // const numPoints = 360;
  // const speedOfCircle = 2;
  // const circleR = 30
  const svgWidth = radius * 2 + circleR * 2 ;
  const svgHeight = radius * 2 + circleR * 2 ;
  const svgPathRelative: string = generateCirclePathSVGRelative(
    radius,
    numPoints,
    circleR,
    false,
    
  );
  // Create an instance of path properties
  const properties = new svgPathProperties(svgPathRelative); // Correct usage

  // Calculate the total length of the path
  const pathLength = properties.getTotalLength();

  // Map frame to position along the path
  const progress = interpolate(
    (frame - circleStartPoint) * speedOfCircle,
    [0, 150],
    [0, pathLength],
    { extrapolateRight: "clamp" },
  );
  const progressCircleTow = interpolate(
    (frame - circleStartPoint + 45) * speedOfCircle,
    [0, 150],
    [0, pathLength],
    { extrapolateRight: "clamp" },
  );
  const { x, y } = properties.getPointAtLength(progress);
  const { x: xTwo, y: yTwo } = properties.getPointAtLength(progressCircleTow);

  // Linear progress for circle position
  const t = interpolate(frame * speedOfPath, [0, fps * 3], [0, 1], {
    extrapolateRight: "clamp",
  });
  const glowOpacity = interpolate(
    frame % fps,
    [0, fps / 2, fps],
    [0.3, 1, 0.3],
    { extrapolateRight: "clamp" },
  );
  // const rotate = interpolate(frame , [0 , fps * 3] , [260 , 0])
  return (
    <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ height: svgHeight , transform:`rotate(${0}deg)`,  }}>
      <defs>
        <linearGradient
          id={strokeId}
          x1="0%"
          y1="100%"
          x2="0%"
          y2="0%"
        >
          <stop offset="0%" stopColor={"#FFF"} />
          <stop offset="100%" stopColor={"#FFF"} />
        </linearGradient>
        <clipPath id={clipPathId} clipPathUnits="userSpaceOnUse">
          <rect
            x="0"
            y={svgHeight * (1 - t)}
            width={svgWidth * t}
            height={svgHeight * t}
          />
        </clipPath>
        <filter
            id="circle-shadow-circle"
            x="-200%" y="-100%"
            width="300%"
            height="300%"
          >
            <feDropShadow
             dx="-20"
             dy="20"
             stdDeviation="20"
              flood-color="rgba(0, 0, 0, 0.5)"
            />
          </filter>
          <filter
            id="circle-line-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="-3"
              dy="2"
              stdDeviation="6"
              flood-color="rgba(0, 0, 0, 0.5)"
            />
          </filter>
      </defs>
      <circle r={circleR} cx={x} cy={y} fill="#FFF" filter="url(#circle-shadow-circle)"/>
      <circle r={circleR} cx={xTwo} cy={yTwo} fill="#FFF" filter="url(#circle-shadow-circle)"/>

      <path
        d={svgPathRelative}
        clipPath={`url(#${clipPathId})`}
        stroke={`url(#${strokeId})`}
        stroke-width={4}
        fill="none"
        filter="url(#circle-line-shadow)"
        // stroke="#FFF"
      />
    </svg>
  );
};

export default ReuseCircle;
