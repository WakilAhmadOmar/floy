import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const MultiCirlce = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const prsessOne = spring({
    frame: frame - 180,
    fps,
    config: {
      damping: 200,
    },
  });
  const scaleOne = interpolate(prsessOne, [0, 1], [1, 6]);
  const prsessTwo = spring({
    frame: frame - 160,
    fps,
    config: {
      damping: 200,
    },
  });

  const widhtCircle = interpolate(prsessTwo, [0, 1], [1, 16]);
  const progrees = spring({
    frame : frame - 190,
    fps,
    config: {
      damping: 200,
    },
  });
  const scaleMain = interpolate(progrees, [0, 1], [1, 200]);
  return (
    
      <Sequence from={160} durationInFrames={50}
        style={{
          position:"absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // marginTop:"-5rem"
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            transform: `scale(${scaleOne})`,
            //    backgroundColor:"red"
            border: `${8 - scaleOne}px solid #FFF`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: `${10 * widhtCircle}px`,
              height: `${10 * widhtCircle}px`,
              borderRadius: "50%",
              opacity: frame - 140,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transformOrigin: "center",
              border: "2px solid #FFF",
            
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "2px",
                height: "2px",
                borderRadius: "50%",
                transform: `scale(${scaleMain})`,
                backgroundColor: "#FFF",
                border: "2px solid #FFF",
                display: "grid",
                justifyContent: "center",
                alignItems: "center",
                opacity:frame - 170
              }}
            ></div>
          </div>
        </div>
      </Sequence>
    
  );
};

export default MultiCirlce;
