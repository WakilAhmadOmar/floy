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

  const { fps, durationInFrames  , width:VideoWidth , height:VideoHeight} = useVideoConfig();
   const frames = frame < 120 ? frame * 10 : 100 ;
console.log("frame" , frame)
console.log("framesssssssssss" , frames)
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
const RC = 480
const CX = SX + 470 - RC
const CY = SY - 1800 - RC 
  //   const LeftPath = `M ${width - strokeWidth - 13 } ${height} q 10,-100 -450,-300 t 10,-500 t -700,-600`

  // x-coordinate: 𝑥=𝑐𝑥+𝑟⋅cos(𝜃)
  // y-coordinate: y=𝑐y+𝑟⋅sin(𝜃)
  const Path = `M${SX} ${SY} 
  Q ${SX + 20},${SY - 100} ${SX - 80},${SY - 200} 
   T ${SX - 400},${SY - 700} 
   T ${SX - 100},${SY - 1320} 
   T ${SX + 370},${SY - 1985}         
   A ${RC},${RC} 0 1,0 ${CX + RC * Math.cos(180)},${CY - RC * Math.sin(180)}  
   A ${RC},${RC} 0 1,0 ${CX + RC * Math.cos(360)},${CY - RC * Math.sin(360)}
   `;
  //  T ${SX + 370}, ${SY - 2300}
  
  //  const circularPath = `M ${CX + RC * Math.cos(0)},${CY - RC * Math.sin(0)}         
  //     A ${RC},${RC} 0 1,0 ${CX + RC * Math.cos(180)},${CY - RC * Math.sin(180)}  
  //     A ${RC},${RC} 0 1,0 ${CX + RC * Math.cos(360)},${CY - RC * Math.sin(360)}`

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
  // const Ct = interpolate(frame - 100, [0, fps * 3], [0, 1], {
  //   extrapolateRight: "clamp",
  // });
  // const CtD = interpolate(frame - 130, [0, fps * 3], [5, 1], {
  //   extrapolateRight: "clamp",
  // });
  // Linear progress for circle position
  const tD = interpolate(frame - 100, [0, fps * 3], [5, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <>
      <svg
        viewBox={`0 0 ${width} ${height }`}
        style={{
          width: width,
          height: height  ,
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
              // y={ height * (1 - t) }
              y={100}
              width={width}
              height={500}
              // height={frame < 20 ? height * t : height * tD}
              fill="red"
            />
          </clipPath>
          {/* <clipPath
            id="progress-circle"
            clipPathUnits="userSpaceOnUse"
          >
            <rect
              x={height * (1 - t)}
              y="0"
              width={frame < 80 ? width * Ct : width * CtD}
              height={height}
            />
          </clipPath> */}
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
          <circle
          r={frame * 4} cx={width -(frame * 4)} cy={ 600 - frame }
    x={height * (1 - t)}
    y={height * (1 - t)}
    width={frame < 20 ? width * t : width * tD}
    height={height}
    fill="red"
    opacity="0.4" // Adjust opacity to see through if needed
  />
        <path
          id="progress-clipsdkfdksffggf"
          d={Path}
          stroke={"#FFF"}
          fill="none"
          stroke-width={`${8}`}
          clipPath="url(#progress-clipsdkfdksffggfffddfdfdd)"
        />
        {/* <path
          id="progress-clipsdkfdksffdfweee"
          d={circularPath }
          stroke={"#FFF"}
          fill="red"
          stroke-width={`${8}`}
          clipPath="url(#progress-circle)"
          transform={`rotate(0, ${CX}, ${CY})`}
        /> */}
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
