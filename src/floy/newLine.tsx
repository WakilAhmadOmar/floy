import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { generateCirclePathSVGRelative } from "../utils/generateCirclePathSVGRelative";
// import { svgPathProperties } from "svg-path-properties";

interface IPropsCenterLines {
  //   strokeWidth: number;
  //   color: string;
  width: number;
  height: number;
  //   direction: "Left" | "Right";
  //   speed?: number;
  //   rotate?: number;
  //   circleR?:number;
  //   circleStartPoint?:number,
  //   speedOfCircle?:number,
  //   left:number
}

const MianLine: React.FC<IPropsCenterLines> = ({
  //   strokeWidth,
  //   color,
  width,
  height,
  //   direction = "Left",
  //   speed = 1,
  //   rotate = 0,
  //   circleR= 4,
  //   circleStartPoint = 0,
  //   speedOfCircle = 1,
  //   left
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const frames = frame * 10;

  const radius = 400;
  const numPoints = 40;
  const circleR = 60;
  const svgPathRelative: string = generateCirclePathSVGRelative(
    radius,
    numPoints,
    circleR,
    false,
  );

  const svgYPoint = interpolate(frame, [0, durationInFrames], [frame, 1500]);
//   d="
//   M 100,50          
//   Q 150,50 150,100  
//   T 100,150         
//    T 50,100
//    T 100,50
// "

  const SX = width / 2;
  const SY = height + svgYPoint;
  //   const LeftPath = `M ${width - strokeWidth - 13 } ${height} q 10,-100 -450,-300 t 10,-500 t -700,-600`
  const Path = `M${SX} ${SY} 
  Q ${SX + 20},${SY - 100} ${SX - 80},${SY - 200} 
   T ${SX - 400},${SY - 700} 
   T ${SX - 100},${SY - 1320} 
   T ${SX + 470},${SY - 1800}
   T ${SX + 370}, ${SY - 2300}
   
   `;

  //  M ${SX + 470},${SY - 1800}
  //  Q ${SX + 620},${SY -1750} ${SX + 620},${SY + 1900} 
  //  T ${SX + 720},${SY + 2150}
  //  T ${SX + 770},${SY + 2250}
  //  T ${SX + 870},${SY + 2210}

  //  "M ${SX + 470},${SY - 1800} Q 150,50 150,100"
  // T ${SX + 470},${SY - 1900} T ${SX - 470},${SY - 2100}

  const glowOpacity = interpolate(
    frame % fps,
    [0, fps / 2, fps],
    [0.3, 1, 0.3],
    { extrapolateRight: "clamp" },
  );

  // Linear progress for circle position
  const t = interpolate(frame - 30, [0, fps * 3], [0, 1], {
    extrapolateRight: "clamp",
  });
  // Linear progress for circle position
  const tD = interpolate(frame - 100, [0, fps * 3], [5, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      <svg
        viewBox={`0 0 ${width} ${height + frames}`}
        style={{
          width: width,
          height: height + frames,
          // transform: `rotate(${rotate}deg)`,
          // backgroundColor: "green",
          // left:left,
          // zIndex:10000
        }}
      >
        <defs>
          <clipPath
            id="progress-clipsdkfdksffggfffddfdfdd"
            clipPathUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y={height * (1 - t)}
              width={width}
              height={frame < 20 ? height * t : height * tD}
            />
          </clipPath>
        </defs>
        {/* <mask id="maskThickPartTwoww">
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
          </mask> */}
        <path
          id="progress-clipsdkfdksffggf"
          d={Path}
          stroke={"#FFF"}
          fill="none"
          stroke-width={`${8}`}
          clipPath="url(#progress-clipsdkfdksffggfffddfdfdd)"
        />
        {/* <path
            id="progress-clipsdkfdksffggf"
            d={Path}
            stroke={"#FFF"}
            fill="none"
            stroke-width={`${strokeWidth * 4}`}
            clipPath="url(#progress-clipsdkfdksffggfffddf)"
            mask="url(#maskThickPartTwoww)"
          /> */}
      </svg>
    </>
  );
};

export default MianLine;
