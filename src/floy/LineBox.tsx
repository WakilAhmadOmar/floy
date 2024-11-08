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
  circleStartPoint = 0,
  speedOfCircle = 1
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const LeftPath = `M ${width - strokeWidth - 13 } ${height} q 10,-100 -450,-300 t 10,-500 t -700,-600`
  const LeftPath1 = `M ${width / 2 -50} ${height - 100} q 10,-100 -450,-300 t 100,-450 t 50,-600 `

  const RightPath = `M ${strokeWidth + 13} ${height} q 10,-100 450,-300 t 10,-500 t 700,-600`
  const RightPath1 = `M ${width / 2 -50} ${height - 100} q 10,-100 450,-300 t -100,-450 t -50,-600 `

  const glowOpacity = interpolate(
    frame % fps,
    [0, fps / 2, fps],
    [0.3, 1, 0.3],
    { extrapolateRight: "clamp" },
  );

  // Linear progress for circle position
  const t = interpolate(frame * 4, [0, fps * 3], [0, 1], {
    extrapolateRight: "clamp",
  });
  // Linear progress for circle position
  const tD = interpolate(frame - 112, [0, fps * 3], [1, 0], {
    extrapolateRight: "clamp",
  });
   // Create an instance of path properties
   const properties = new svgPathProperties(direction === "Right" ? RightPath : LeftPath); // Correct usage
   const properties1 = new svgPathProperties(direction === "Right" ? RightPath1 : LeftPath1); // Correct usage

   // Calculate the total length of the path
   const pathLength = properties.getTotalLength();
   const pathLength1 = properties1.getTotalLength();
 
   // Map frame to position along the path
   const progress = interpolate(
     (frame - circleStartPoint) * speedOfCircle,
     [0, 150],
     [0, pathLength],
     { extrapolateRight: "clamp" },
   );
  const { x, y } = properties.getPointAtLength(progress);


   const progress1 = interpolate(
     (frame - circleStartPoint * 2.2) * speedOfCircle * 2.2,
     [0, 150],
     [0, pathLength],
     { extrapolateRight: "clamp" },
   );
  const { x:x1, y:y1 } = properties.getPointAtLength(progress1);
  
  
  const progress2 = interpolate(
    (frame - circleStartPoint * 1.5) * speedOfCircle * 1.5,
    [0, 150],
    [0, pathLength],
    { extrapolateRight: "clamp" },
  );
  const { x:x2, y:y2 } = properties.getPointAtLength(progress2);


  const progressTwo2 = interpolate(
    (frame - circleStartPoint * 2.2) * speedOfCircle * 2.2,
    [0, 150],
    [0, pathLength1],
    { extrapolateRight: "clamp" },
  );
 const { x:x12, y:y12 } = properties1.getPointAtLength(progressTwo2);

   const progressTwo1 = interpolate(
     (frame - circleStartPoint * 1.5) * speedOfCircle * 1.5,
     [0, 150],
     [0, pathLength1],
     { extrapolateRight: "clamp" },
   );
  const { x:x21, y:y21 } = properties1.getPointAtLength(progressTwo1);


  return (
    <>
      {direction === "Left" && (
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{
            width: width,
            height: height,
            transform: `rotate(${rotate}deg)`,
            
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
                height={height * (frame < 130 ? t : tD)}
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
          <circle r={circleR} cx={x12} cy={y12} fill="#FFF" />
          <circle r={circleR} cx={x21} cy={y21} fill="#FFF" />
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
          viewBox={`0 0 ${width} ${height}`}
          style={{
            width: width,
            height: height,
            transform: `rotate(${rotate}deg)`,
            
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
                height={height * t}
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
          <circle r={circleR} cx={x12} cy={y12} fill="#FFF" />
          <circle r={circleR} cx={x21} cy={y21} fill="#FFF" />
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
    </>
  );
};

export default LineBox;
