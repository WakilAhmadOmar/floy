import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import Box from "./Box";
import CircleComponent from "./Circle";
import VerticalLine from "./LeftLine";
import MainLines from "./MainLine";
import MultiCirlce from "./circles/multitCircle";
import MainCircle from "./circles/main";
import LineBox from "./LineBox";
import Lines from "./Lines";
import MainText from "./text/mainText";

const FloyMain = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const progrees = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });
 
 
  return (
    <>
    <AbsoluteFill
      style={{
        backgroundColor: "#056dd3",
      }}
    >
      <MultiCirlce />
      <AbsoluteFill
        style={{
          // backgroundColor:"red",
          position: "absolute",
          // top: progrees > 0 ? -frame : 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // transform: `translateY(${frame * 2}px)`,
          // height: progrees > 0 ? -frame : height + 500,
          zIndex: 100,
          // height:height,
          width: width,
        }}
      >
        <Sequence from={0} durationInFrames={183}>

        <Box left={250} arrow="Left" />
        <Box left={-250} arrow="Right" />
        </Sequence>
        <CircleComponent />
        <MainLines />
        <Lines />
      </AbsoluteFill>
    </AbsoluteFill>
    <MainText/>
    </>
  );
};
export default FloyMain;
