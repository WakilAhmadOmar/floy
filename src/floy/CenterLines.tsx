import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
// import { svgPathProperties } from "svg-path-properties";

interface IPropsCenterLines {
  strokeWidth: number;
  color: string;
  width: number;
  height: number;
  direction: "Left" | "Right";
  speed?: number;
  rotate?: number;
  circleR?: number;
  circleStartPoint?: number;
  speedOfCircle?: number;
  left: number;
}

const CenterLines: React.FC<IPropsCenterLines> = ({
  strokeWidth,
  color,
  width,
  height,
  direction = "Left",
  speed = 1,
  rotate = 0,
  circleR = 4,
  circleStartPoint = 0,
  speedOfCircle = 1,
  left,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const frames = frame * 10;

  const svgYPoint = interpolate(frame, [0, durationInFrames], [frame, 1500]);

  const startXOne = width / 3.5;
  const startYOne = height / 1.5 + svgYPoint;
  const startXTwo = width / 1.7;
  const startYtwo = height / 1.2 + svgYPoint;
  // const LeftPath = `M ${width - strokeWidth - 13 } ${height} q 10,-100 -450,-300 t 10,-500 t -700,-600`
  const RightPath = `M ${startXOne} ${startYOne} 
  Q ${startXOne + 150},${startYOne - 100} ${startXOne + 400},${startYOne - 300} 
  T ${startXOne + 800},${startYOne - 700} 
  T ${startXOne + 750},${startYOne - 1300} 
  T ${startXOne + 1550},${startYOne - 1700} 
  `;

  const LeftPath = `M ${startXTwo} ${startYtwo} 
  Q ${startXTwo - 410},${startYtwo - 300} ${startXTwo - 600},${startYtwo - 700} 
  T ${startXTwo - 600},${startYtwo - 1500} 
  T ${startXTwo - 800},${startYtwo - 2500}`;

  const glowOpacity = interpolate(
    frame % fps,
    [0, fps / 2, fps],
    [0.3, 1, 0.3],
    { extrapolateRight: "clamp" },
  );

  // Linear progress for circle position
  const t = interpolate(frame * 3, [0, fps * 3], [0, 1], {
    extrapolateRight: "clamp",
  });
  // Linear progress for circle position
  const tD = interpolate(frame - 30, [0, fps * 3], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      <svg
        viewBox={`0 0 ${width} ${height + frames}`}
        style={{
          width: width,
          height: height + frames,
          transform: `rotate(${rotate}deg)`,
          // backgroundColor:"green",
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
          left: left,
          // zIndex:10000
        }}
      >
        <defs>
          <clipPath
            id="progress-clipsdkfdksffggfffddf"
            clipPathUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y={height * (1 - t)}
              width={width}
              height={frame < 5 ? height * t : height * tD}
            />
          </clipPath>
          <filter
            id="center-line-shadow"
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
        <mask id="maskThickPartTwoww">
          <rect
            x="0"
            y={`${height / 2}`}
            width={`${width}`}
            height={450}
            fill="white"
          />
          <rect
            x="0"
            y={`${height / 2 - 200}`}
            width={`${width}`}
            height={50}
            fill="white"
          />
          <rect
            x="0"
            y={`${height / 2 - 600}`}
            width={`${width}`}
            height={400}
            fill="white"
          />
        </mask>
        <path
          id="progress-clipsdkfdksffggf"
          d={RightPath}
          stroke={color}
          fill="none"
          stroke-width={`${strokeWidth}`}
          clipPath="url(#progress-clipsdkfdksffggfffddf)"
          filter="url(#center-line-shadow)"
        />
        <path
          id="progress-clipsdkfdksffggf"
          d={RightPath}
          stroke={color}
          fill="none"
          stroke-width={`${strokeWidth * 4}`}
          clipPath="url(#progress-clipsdkfdksffggfffddf)"
          mask="url(#maskThickPartTwoww)"
          filter="url(#center-line-shadow)"
        />

        <defs>
          <clipPath
            id="progress-clipsdkfdksffggfffddf34934d"
            clipPathUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y={height * (1 - t)}
              width={width}
              height={frame < 5 ? height * t : height * tD}
            />
          </clipPath>
        </defs>
        <mask id="maskThickPartTwoww3444err">
          <rect
            x="0"
            y={`${height / 2}`}
            width={`${width}`}
            height={450}
            fill="white"
          />
          <rect
            x="0"
            y={`${height / 2 - 200}`}
            width={`${width}`}
            height={50}
            fill="white"
          />
          <rect
            x="0"
            y={`${height / 2 - 600}`}
            width={`${width}`}
            height={400}
            fill="white"
          />
        </mask>
        <path
          id="progress-clipsdkfdksffggf"
          d={LeftPath}
          stroke={color}
          fill="none"
          stroke-width={`${strokeWidth}`}
          clipPath="url(#progress-clipsdkfdksffggfffddf34934d)"
          filter="url(#center-line-shadow)"
        />
        <path
          id="progress-clipsdkfdksffggf"
          d={LeftPath}
          stroke={color}
          fill="none"
          stroke-width={`${strokeWidth * 4}`}
          clipPath="url(#progress-clipsdkfdksffggfffddf34934d)"
          mask="url(#maskThickPartTwoww3444err)"
          filter="url(#center-line-shadow)"
        />
      </svg>
    </>
  );
};

export default CenterLines;
