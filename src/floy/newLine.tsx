import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

import { svgPathProperties } from "svg-path-properties";

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

  const { fps, durationInFrames} = useVideoConfig();
   const frames = frame * 10  ;

  const svgYPoint = interpolate(frame, [0, durationInFrames], [frame, 1300]);
//   d="
//   M 100,50          
//   Q 150,50 150,100  
//   T 100,150         
//    T 50,100
//    T 100,50
// "
const SX = width / 2;
const SY = height + svgYPoint;
const RC = 450
const CX = SX + 470 - RC
const CY = SY - 1800 - RC 
  //   const LeftPath = `M ${width - strokeWidth - 13 } ${height} q 10,-100 -450,-300 t 10,-500 t -700,-600`

  const Path = `M${SX} ${SY} 
  Q ${SX + 100},${SY - 200} ${SX + 200},${SY - 500} 
   T ${SX - 400},${SY - 1100} 
   T ${SX + 50},${SY - 1870} 
   A ${RC},${RC} 0 1,0 ${CX + RC * Math.cos(135)},${CY - RC * Math.sin(135)}
   `;

  //  M ${SX - 430},${SY - 2300}
  // Q ${SX -300},${SY - 1770} ${SX +100},${SY - 1870} 
  // T ${SX +10},${SY - 2260}


  //  M ${SX - 435},${SY - 2300}
  //  Q ${SX -400},${SY - 2000} ${SX - 200},${SY - 2000} 
  //  T ${SX + 100},${SY - 1870}


  //  A ${RC},${RC} 0 1,0 ${CX + RC * Math.cos(270)},${CY - RC * Math.sin(270)}
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
    // Create an instance of path properties
    const properties = new svgPathProperties(Path); // Correct usage
  

    // Calculate the total length of the path
    const pathLength = properties.getTotalLength();
 
  
    // Map frame to position along the path
    const progress = interpolate(
      (frame ),
      [0, 150],
      [0, pathLength],
      { extrapolateRight: "clamp" },
    );
   const { x, y } = properties.getPointAtLength(progress);
 

  const glowOpacity = interpolate(
    frame % fps,
    [0, fps / 2, fps],
    [0.3, 1, 0.3],
    { extrapolateRight: "clamp" },
  );

  // Linear progress for circle position
  const t = interpolate(frame /2, [0, fps * 3], [0, 1], {
    extrapolateRight: "clamp",
  });
  // Linear progress for circle position
  const tD = interpolate(frame - 70, [0, fps * 4], [5, 0], {
    extrapolateRight: "clamp",
  });
  return (
    <>
      <svg
        viewBox={`0 0 ${width} ${height + frames}`}
        style={{
          width: width,
          height: height + frames ,
          // transform: `rotate(${rotate}deg)`,
          backgroundColor: "green",
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
             x={frame > 160 ? 160 - (frame - 160): frame * 5 }
             y={ height * (1 - t) }
             width={width  }
             height={ frame > 70 ? height *  tD :  height * t }
             fill="red"
            />
          </clipPath>
        </defs>
        <circle
              cx={width / 2 }
              cy={ height * (1 - t) }
              r={frame * 7}
              // width={width  }
              // height={ frame > 70 ? height *  tD :  height * t }
              fill="red"
            />
        <circle
              cx={x }
              cy={ height * (1 - t) }
              r={20}
              // width={width  }
              // height={ frame > 70 ? height *  tD :  height * t }
              fill="yellow"
            />
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
