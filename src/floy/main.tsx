import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import Box from "./Box";

import MultiCirlce from "./circles/multitCircle";

import Lines from "./Lines";
import MainText from "./text/mainText";
import ReuseCircle from "./circles/reuseCircle";
import Line from "./mainLine/Line";
import MiniCircle from "./circles/miniCircle";

const FloyMain = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const progrees = spring({
    frame,
    fps,
    from: 130,
    to: 0,
    config: {
      damping: 200,
    },
  });

  return (
    <>
      <AbsoluteFill
        style={{
          backgroundColor: "#056dd3",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sequence from={0} durationInFrames={257}>
          <Line />
        </Sequence>
        <Lines />

        <Sequence
          from={123}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: -progrees,
          }}
        >
          <ReuseCircle
            clipPathId="skfjlieriksdkfj"
            strokeId="dfsdf-asdfs"
            radius={450}
            speedOfPath={2}
            circleStartPoint={0}
            rotate={frame + 50}
          />
        </Sequence>

        <MultiCirlce />

        <AbsoluteFill
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            width: width,
          }}
        >
          <Sequence
            from={0}
            durationInFrames={183}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 600,
              gap: "25rem",
              transform: `translateY(${frame * 15}px)`,
            }}
          >
            <Box left={250} arrow="Left" />
            <Box left={-250} arrow="Right" />
          </Sequence>
        </AbsoluteFill>
        <Sequence from={140} style={{
          display:"flex",
          justifyContent:"center", 
          alignItems:"center",
          position:"absolute",
          left:width/20,
          top:height / 3, 
          width:"fit-content",
          height:"fit-content"
          
        }} durationInFrames={55}>

        <MiniCircle direction="Left" />
        </Sequence>
        <Sequence from={165} style={{
          display:"flex",
          justifyContent:"center", 
          alignItems:"center",
          position:"absolute",
          left:width/2 + 500,
          top:height / 6, 
          width:"fit-content",
          height:"fit-content"
          
        }} durationInFrames={30}>

        <MiniCircle direction="Right" />
        </Sequence>
      </AbsoluteFill>
      <MainText />
    </>
  );
};
export default FloyMain;
