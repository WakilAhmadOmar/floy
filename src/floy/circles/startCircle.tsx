import { interpolate, useCurrentFrame } from "remotion";
import { svgPathProperties } from "svg-path-properties";

interface IPropsStartCircle {
  speedOfCircle: number;
  width: number;
  height: number;
  circleR: number;
  color: string;
}
const StartCircle: React.FC<IPropsStartCircle> = ({
  speedOfCircle,
  width,
  height,
  circleR,
  color,
}) => {
  const pathData = `M${width / 2} ${height - 30} q 0 0 0 -${height - 40} `;
  // Create an instance of path properties
  const properties = new svgPathProperties(pathData);
  // Calculate the total length of the path
  const pathLength = properties.getTotalLength();
  const frame = useCurrentFrame();
  const progress = interpolate(
    frame * speedOfCircle,
    [0, 150],
    [0, pathLength],
    { extrapolateRight: "clamp" },
  );
  const { x, y } = properties.getPointAtLength(progress);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ height: height }}>
      <circle r={`${circleR}`} cx={x} cy={y} fill={color} />
    </svg>
  );
};

export default StartCircle;
