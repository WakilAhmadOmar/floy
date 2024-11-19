import { interpolate, useCurrentFrame } from "remotion";
import { svgPathProperties } from "svg-path-properties";

interface IPropsMiniCircle {
    direction?:"Left" | "Right"
}

const MiniCircle:React.FC<IPropsMiniCircle> = ({
    direction="Left"
}) => {
  const frame = useCurrentFrame();

  const SH = 500;
  const SW = 500;
  const SX = SW / 2;
  const SY = SH / 2;

  const path1 = `M${SX},${SY} S ${SX + 5},${SY - 80} ${SX - 50},${SY - 200}`;
  const path2 = `M${SX},${SY} S ${SX + 5},${SY + 80} ${SX - 50},${SY + 200}`;

  const path1R = `M${SX},${SY} S ${SX - 5},${SY - 80} ${SX + 50},${SY - 200}`;
  const path2R = `M${SX},${SY} S ${SX - 5},${SY + 80} ${SX + 50},${SY + 200}`;
  // Create an instance of path properties
  const propertiesPath1 = new svgPathProperties( direction === "Left" ? path1 : path1R); // Correct usage

  // Calculate the total length of the path
  const path1Length = propertiesPath1.getTotalLength();

  // Map frame to position along the path
  const progress = interpolate(frame * 6.5, [0, 150], [0, path1Length], {
    extrapolateRight: "clamp",
  });
  const { x, y } = propertiesPath1.getPointAtLength(progress);

  const propertiesPath2 = new svgPathProperties(direction === "Left" ? path2 : path2R); // Correct usage

  // Calculate the total length of the path
  const path2Length = propertiesPath2.getTotalLength();

  // Map frame to position along the path
  const progress2 = interpolate(frame * 6.5, [0, 150], [0, path2Length], {
    extrapolateRight: "clamp",
  });
  const { x: x2, y: y2 } = propertiesPath2.getPointAtLength(progress2);

  return (
    <>
    {direction === "Left" && <svg
      viewBox="0 0 500 500"
      style={{  width: "500", height: "500" }}
    >
        <defs>

      <mask id="circle-mask-id">
        <rect x={0} y={0} width={SW} height={SH } fill="white" />
        <rect x={0} y={0} width={SW} height={SH / 2 - frame * 8} fill="black" />
        <rect
          x={0}
          y={SH / 2 + frame * 8}
          width={SW}
          height={SH / 2 - frame * 8}
          fill="black"
        />
      </mask>
      <filter
            id="circle-line-shadow-mini-circle"
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
      <path
        d={path1}
        stroke="#FFF"
        strokeWidth="3"
        fill="none"
        mask="url(#circle-mask-id)"
        id="circle-one"
      />
      <path
        d={path2}
        stroke="#FFF"
        strokeWidth="3"
        fill="none"
        mask="url(#circle-mask-id)"
        id="circle-two"
      />
      <circle r={"10"} cx={x} cy={y} fill="#FD9600" filter="url(#circle-line-shadow-mini-circle)"/>
      <circle r={"10"} cx={x2} cy={y2} fill="#FD9600" filter="url(#circle-line-shadow-mini-circle)"/>
    </svg>}
    {direction === "Right" && <svg
      viewBox="0 0 500 500"
      style={{  width: "500", height: "500",}}
    >
        <defs>

      <mask id="circle-mask-id-two">
        <rect x={0} y={0} width={SW} height={SH } fill="white" />
        <rect x={0} y={0} width={SW} height={SH / 2 - frame * 8} fill="black" />
        <rect
          x={0}
          y={SH / 2 + frame * 8}
          width={SW}
          height={SH / 2 - frame * 8}
          fill="black"
        />
      </mask>

      <filter
            id="circle-line-shadow-mini-circle"
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
        
      <path
        d={path1R}
        stroke="#FFF"
        strokeWidth="3"
        fill="none"
        mask="url(#circle-mask-id-two)"
        id="circle-one"
        strokeDasharray="10,5"
      />
      <path
        d={path2R}
        stroke="#FFF"
        strokeWidth="3"
        fill="none"
        mask="url(#circle-mask-id-two)"
        id="circle-two"
        strokeDasharray="10,10"
      />
      <circle r={"10"} cx={x} cy={y} fill="#FFF" filter="url(#circle-line-shadow-mini-circle)"/>
      <circle r={"10"} cx={x2} cy={y2} fill="#FD9600" filter="url(#circle-line-shadow-mini-circle)"/>
    </svg>}
    </>
    
  );
};

export default MiniCircle;
