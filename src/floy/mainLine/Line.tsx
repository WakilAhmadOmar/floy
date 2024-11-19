import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { svgPathProperties } from "svg-path-properties";

interface IPropsLine {
  backgroundColor?: string;
}

const handleSpeedOfCircle = (num: number): { value: number; dd: number } => {
  let dd = 0;
  if (num < 58) {
    return {
      value: 1,
      dd: 0,
    };
  }
  if (num < 81) {
    dd = 66;

    return {
      value: 2.12,
      dd,
    };
  }
  if (num < 96) {
    dd = 66 + 15 * 1.12;

    return {
      value: 2.24,
      dd,
    };
  }
  if (num < 100) {
    dd = 66 + 15 * 1.12 + 15 * 0.13;

    return {
      value: 2.32,
      dd,
    };
  }
  if (num < 116) {
    dd = 66 + 15 * 1.12 + 15 * 0.13 + 4 * 0.12;

    return {
      value: 2.36,
      dd,
    };
  }
  if (num < 134) {
    dd = 66 + 15 * 1.12 + 15 * 0.13 + 4 * 0.12 + 16 * 0.2;

    return {
      value: 2.37,
      dd,
    };
  }
  if (num < 132) {
    dd = 66 + 15 * 1.12 + 15 * 0.13 + 4 * 0.12 + 20 * 0.8 + 4 * 0.8;

    return {
      value: 2.59,
      dd,
    };
  }
  if (num < 149) {
    dd = 66 + 15 * 1.12 + 15 * 0.13 + 4 * 0.12 + 20 * 0.8 + 4 * 0.8 + 8 * 0.6;

    return {
      value: 2.57,
      dd,
    };
  }
  if (num < 166) {
    dd =
      66 +
      15 * 1.12 +
      15 * 0.13 +
      4 * 0.12 +
      20 * 0.8 +
      4 * 0.8 +
      8 * 0.6 -
      17 * 0.2;

    return {
      value: 2.66,
      dd,
    };
  }
  if (num < 186) {
    dd =
      66 +
      15 * 1.12 +
      15 * 0.13 +
      4 * 0.12 +
      20 * 0.8 +
      4 * 0.8 +
      8 * 0.6 -
      17 * 0.2 +
      17 * 0.9;

    return {
      value: 2.67,
      dd,
    };
  }
  return { value: 2.66, dd };
};

const Line: React.FC<IPropsLine> = ({ backgroundColor = "#056dd3" }) => {
  const { width, height, fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const svgHeight = frame < 168 ? frame * 10 : 1680;

  const SX = width / 2 - (frame > 100 ? 150 : 0);
  const SY = height / 2 + 320 + svgHeight;
  const RC = 500;
  const CX = SX + 470 - RC;
  const CY = SY - 1800 - RC;

  const Path = `M ${SX},${SY - 30}
  Q ${SX},${SY} ${SX},${SY - 20}
  T ${SX + 50},${SY - 300} 
  T ${SX},${SY - 700} 
  T ${SX - 500},${SY - 1000} 
  T ${SX - 300},${SY - 1300} 
  T ${SX + 450},${SY - 1605} 
  A ${RC},${RC} 0 1,0 ${CX + RC * Math.cos(180)},${CY - RC * Math.sin(180)}
  Q ${SX - 300},${SY - 1700} ${SX},${SY - 1700}
  T ${SX + 160},${SY - 1990}
  `;
  // Linear progress for circle position
  const t = interpolate(frame - 50, [0, fps * 13], [0, 1], {
    extrapolateRight: "clamp",
  });

  const tD = interpolate(frame - 30, [0, fps * 3], [5, 0], {
    extrapolateRight: "clamp",
  });

  // Create an instance of path properties
  const properties = new svgPathProperties(Path); // Correct usage

  const pathLength = properties.getTotalLength();

  const lineProgress = interpolate(
    frame * handleSpeedOfCircle(frame)?.value - handleSpeedOfCircle(frame)?.dd,
    [0, fps * 13],
    [0, 1],
    {
      extrapolateRight: "clamp",
    },
  );

  // Calculate visible path length based on line progress
  const visibleLength = pathLength * lineProgress;

  // Position circle at the top of visible portion of the line
  const { x, y } = properties.getPointAtLength(visibleLength);

  const progra = spring({
    frame: frame - 120,
    fps: fps * 3.5,
    from: 400,
    to: 0,
    config: {
      damping: 200,
    },
  });
  const progHeight = spring({
    frame: frame - 120,
    fps: fps * 3.5,
    from: 400,
    to: 0,
    config: {
      damping: 200,
    },
  });

  return (
    <>
      <svg viewBox={`0 0 ${width} ${SY}`} style={{ height: SY }}>
        <defs>
          <clipPath
            id="progress-clipsdkfdksffggf"
            clipPathUnits="userSpaceOnUse"
          >
            {frame < 132 && (
              <rect
                x="0"
                y={height * (0.6 - t)}
                width={width}
                height={height * (1 + t)}
                fill="red"
              />
            )}
            {frame > 123 && (
              <rect
                x={1600 - frame * 5.2}
                y={progHeight}
                width={frame * 5.2}
                height={1150}
                fill="red"
              />
            )}
          </clipPath>
          <filter
            id="main-line-shadow"
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
         {frame > 10 && <filter
            id="main-line-shadow-circle"
            x="-200%" y="-50%"
            width="300%"
            height="300%"
          >
            <feDropShadow
              dx="-40"
              dy="40"
              stdDeviation="20"
              flood-color="rgba(0, 0, 0, 0.2)"
            />
          </filter>}
        </defs>
        <mask id="maskThickPartWWWW">
          <rect x="0" y="0" width={width} height={SY} fill={"white"} />
          <rect
            x="0"
            y={`${SY - 150}`}
            width={`${width}`}
            height={150}
            fill={"black"}
          />
          <rect
            x={width / 2 - RC - 10}
            y={height / 2 - 100 - progra}
            width={RC + 100}
            height={430}
            fill={"black"}
          />
        </mask>

        <path
          d={Path}
          strokeWidth={8}
          fill="none"
          filter="url(#main-line-shadow)"
          stroke={"#FFF"}
          clipPath="url(#progress-clipsdkfdksffggf)"
          id="progress-clipsdkfdksffggferrr"
          mask="url(#maskThickPartWWWW)"
        />
        {
          <circle
            cx={x}
            cy={y}
            r={30}
            fill="#FFF"
            filter="url(#main-line-shadow-circle)"
           
          />
        }
      </svg>
    </>
  );
};

export default Line;
