

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
  circleR?:number;
  circleStartPoint?:number,
  speedOfCircle?:number,
  left:number
}

const CenterLines: React.FC<IPropsCenterLines> = ({
  strokeWidth,
  color,
  width,
  height,
  direction = "Left",
  speed = 1,
  rotate = 0,
  circleR= 4,
  circleStartPoint = 0,
  speedOfCircle = 1,
  left
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // const LeftPath = `M ${width - strokeWidth - 13 } ${height} q 10,-100 -450,-300 t 10,-500 t -700,-600`
  const LeftPath = `M ${width / 1.5} ${height / 1.5} q -10,-100 -500,-400 t -310,-610 t -800,-200`

  const RightPath = `M ${width / 3.5} ${height / 1.2} q 10,-100 500,-400 t 310,-610 t 800,-200`
  

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
  const tD = interpolate(frame - 112, [0, fps * 3], [1, 0], {
    extrapolateRight: "clamp",
  });
   // Create an instance of path properties
  //  const propertiesRight = new svgPathProperties( RightPath ); // Correct usage


   // Calculate the total length of the path
  //  const pathLengthRight = propertiesRight.getTotalLength();
 
   // Map frame to position along the path
  //  const progressRight = interpolate(
  //    (frame - circleStartPoint) * speedOfCircle,
  //    [0, 150],
  //    [0, pathLengthRight],
  //    { extrapolateRight: "clamp" },
  //  );
  // const { x, y } = propertiesRight.getPointAtLength(progressRight);


  //  const progress1 = interpolate(
  //    (frame - circleStartPoint * 2.2) * speedOfCircle * 2.2,
  //    [0, 150],
  //    [0, pathLength],
  //    { extrapolateRight: "clamp" },
  //  );
  // const { x:x1, y:y1 } = properties.getPointAtLength(progress1);
  
  
  // const progress2 = interpolate(
  //   (frame - circleStartPoint * 1.5) * speedOfCircle * 1.5,
  //   [0, 150],
  //   [0, pathLength],
  //   { extrapolateRight: "clamp" },
  // );
  // const { x:x2, y:y2 } = properties.getPointAtLength(progress2);


  return (
    <>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{
            width: width,
            height: height,
            transform: `rotate(${rotate}deg)`,
            // backgroundColor:"green",
            position:"absolute",
            marginLeft:"auto",
            marginRight:"auto",
            left:left,
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
                height={height * t}
              />
            </clipPath>
           
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
          />
          <path
            id="progress-clipsdkfdksffggf"
            d={RightPath}
            stroke={color}
            fill="none"
            stroke-width={`${strokeWidth * 4}`}
            clipPath="url(#progress-clipsdkfdksffggfffddf)"
            mask="url(#maskThickPartTwoww)"
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
                height={height * t}
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
          />
          <path
            id="progress-clipsdkfdksffggf"
            d={LeftPath}
            stroke={color}
            fill="none"
            stroke-width={`${strokeWidth * 4}`}
            clipPath="url(#progress-clipsdkfdksffggfffddf34934d)"
            mask="url(#maskThickPartTwoww3444err)"
          />
        </svg>
    </>
  );
};

export default CenterLines;
