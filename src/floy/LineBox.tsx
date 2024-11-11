import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { svgPathProperties } from "svg-path-properties";

interface IPropsLineBox {
  strokeWidth: number;
  color: string;
  width: number;
  height: number;
  direction: "Left" | "Right";
  speed?: number;
  rotate?: number;
  circleR?:number;
  circleStartPoint?:number,
  speedOfCircle?:number
}

const LineBox: React.FC<IPropsLineBox> = ({
  strokeWidth,
  color,
  width,
  height,
  direction = "Left",
  speed = 1,
  rotate = 0,
  circleR= 4,
  circleStartPoint = 1,
  speedOfCircle = 1
}) => {
  const frame = useCurrentFrame();
  const { fps , durationInFrames } = useVideoConfig();
const frames = frame * 10

const svgYPoint = interpolate(frame, [0, durationInFrames], [frame, 1500]);

const startXRight = strokeWidth + 13;
const startXLeft = width - strokeWidth - 13;

const startXLeft1 = width / 2 - 100;
const startYLeft1 = height - 100 + svgYPoint;

const startXRight1 = width / 2 + 100;
const startYRight1 = height - 100 + svgYPoint;

const startYRight = height + svgYPoint

  // const LeftPath = `M ${width - strokeWidth - 13 } ${height} q 10,-100 -450,-300 t 10,-500 t -700,-600`
  const LeftPath = `M ${startXLeft } ${startYRight} Q ${startXLeft - 10},${startYRight - 500} ${startXLeft - 400},${startYRight -1000} T ${startXLeft - 540},${ startYRight - 2000} T ${startXLeft - 1560},${startYRight-2500}`
  
  const LeftPath1 = `M ${startXLeft1} ${startYLeft1} Q ${startXLeft1 - 100},${startYLeft1 -100} ${startXLeft1 - 500},${startYLeft1 -300} T ${startXLeft1 - 150 },${startYLeft1 -1350} T ${startXLeft1 - 350},${startYLeft1 -2500} `

  // const RightPath = `M ${strokeWidth + 13 } ${height} q 10,-100 450,-300 t 10,-500 t 700,-600`
  const RightPath = `M ${startXRight } ${startYRight} Q ${startXRight + 10},${startYRight -500} ${startXRight + 400},${startYRight -1000} T ${startXRight + 540},${ startYRight - 2000} T ${startXRight + 1560},${startYRight-2500}`
  const RightPath1 = `M ${startXRight1} ${startYRight1} Q ${startXRight1 + 100},${startYRight1 -100} ${startXRight1 + 500},${startYRight1 -300} T ${startXRight1 + 150 },${startYRight1 -1350} T ${startXRight1 + 350},${startYRight1 -2500} `

  const glowOpacity = interpolate(
    frame % fps,
    [0, fps / 2, fps],
    [0.3, 1, 0.3],
    { extrapolateRight: "clamp" },
  );

  // Linear progress for circle position
  const t = interpolate(frame , [0, fps * 3], [0, 1], {
    extrapolateRight: "clamp",
  });
  // Linear progress for circle position
  const tD = interpolate(frame - 30, [0, fps * 3], [5, 0], {
    extrapolateRight: "clamp",
  });
   // Create an instance of path properties
   const properties = new svgPathProperties(direction === "Right" ? RightPath : LeftPath); // Correct usage
  

   // Calculate the total length of the path
   const pathLength = properties.getTotalLength();

 
   // Map frame to position along the path
   const progress = interpolate(
     (frame - circleStartPoint) * speedOfCircle * 1.5,
     [0, 150],
     [0, pathLength],
     { extrapolateRight: "clamp" },
   );
  const { x, y } = properties.getPointAtLength(progress);


   const progress1 = interpolate(
     (frame - circleStartPoint * 2) * speedOfCircle * 2 ,
     [0, 150],
     [0, pathLength],
     { extrapolateRight: "clamp" },
   );
  const { x:x1, y:y1 } = properties.getPointAtLength(progress1);
  
  
  const progress2 = interpolate(
    (frame - circleStartPoint * 1) * speedOfCircle * 1.3,
    [0, 150],
    [0, pathLength],
    { extrapolateRight: "clamp" },
  );
  const { x:x2, y:y2 } = properties.getPointAtLength(progress2);


  return (
    <div style={{
      // transform:`translateY(${frame * 10}px)`
    }}>
      {direction === "Left" && (
        <svg
          viewBox={`0 0 ${width} ${height + frames}`}
          style={{
            width: width,
            height: height + frames,
            transform: `rotate(${rotate}deg)`,
            // backgroundColor:"red"
          }}
        >
          <defs>
            <clipPath
              id="progress-clipsdkfdksffggf"
              clipPathUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y={height * (1 -  t )}
                width={width}
                height={frame < 20 ? height *  t : height * tD }
              />
            </clipPath>
          </defs>
          <mask id="maskThickPart">
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
          <circle r={circleR} cx={x} cy={y} fill="#FFF" />
          <circle r={circleR} cx={x1} cy={y1} fill="#FFF" />
          <circle r={circleR} cx={x2} cy={y2} fill="#FFF" />
          <path
            id="progress-clipsdkfdksffggf"
            d={LeftPath}
            stroke={color}
            fill="none"
            stroke-width={`${strokeWidth}`}
            clipPath="url(#progress-clipsdkfdksffggf)"
          />
          <path
            id="progress-clipsdkfdksffggf"
            d={LeftPath}
            stroke={color}
            fill="none"
            stroke-width={`${strokeWidth * 4}`}
            clipPath="url(#progress-clipsdkfdksffggf)"
            mask="url(#maskThickPart)"
          />
          <path
            id="progress-clipsdkfdksffggf"
            d={LeftPath1}
            stroke={color}
            fill="none"
            stroke-width={`${strokeWidth * 2}`}
            clipPath="url(#progress-clipsdkfdksffggf)"
            // mask="url(#maskThickPart)"
          />
        </svg>
      )}
      {direction === "Right" && (
        <svg
          viewBox={`0 0 ${width} ${height + frames}`}
          style={{
            width: width,
            height: height + frames,
            transform: `rotate(${rotate}deg)`,
            // backgroundColor:"red"
            
          }}
        >
          <defs>
            <clipPath
              id="progress-clipsdkfdksffggf"
              clipPathUnits="userSpaceOnUse"
            >
              <rect
                x="0"
                y={height * (1 - t)}
                width={width}
                height={frame < 20 ? height * t : height * tD }
              />
            </clipPath>
           
          </defs>
          <mask id="maskThickPartTwo">
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
          <circle r={circleR} cx={x} cy={y} fill="#FFF" />
          <circle r={circleR} cx={x1} cy={y1} fill="#FFF" />
          <circle r={circleR} cx={x2} cy={y2} fill="#FFF" />
          <path
            id="progress-clipsdkfdksffggf"
            d={RightPath}
            stroke={color}
            fill="none"
            stroke-width={`${strokeWidth}`}
            clipPath="url(#progress-clipsdkfdksffggf)"
          />
          {/* 10,-100 -450,-300 t 10,-500 t -700 -600 */}
          <path
            id="progress-clipsdkfdksffggf"
            d={RightPath}
            stroke={color}
            fill="none"
            stroke-width={`${strokeWidth * 4}`}
            clipPath="url(#progress-clipsdkfdksffggf)"
            mask="url(#maskThickPartTwo)"
          />
          {/* q 10,-100 -450,-300 t 100,-450 t 50,-600 */}
          <path
            id="progress-clipsdkfdksffggf"
            d={RightPath1}
            stroke={color}
            fill="none"
            stroke-width={`${strokeWidth * 2}`}
            clipPath="url(#progress-clipsdkfdksffggf)"
            // mask="url(#maskThickPart)"
          />
        </svg>
      )}
    </div>
  );
};

export default LineBox;
