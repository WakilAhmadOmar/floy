import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import LineBox from "./LineBox";
import CenterLines from "./CenterLines";

const Lines = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{
        position:"absolute"
    }}>
      <Sequence from={3} durationInFrames={180}
        style={{
          position: "absolute",
        //   backgroundColor:"red",
          display:"flex", 
          justifyContent:"space-between",
          top:0,
          
        }}
      >
        <LineBox
          color="#FFF"
          direction="Left"
          strokeWidth={1}
          height={frame * 5 + (height / 2 + 320)}
          width={width / 2 - 200}
          circleR={6}
          circleStartPoint={45}
          
        />
          <Sequence from={45} durationInFrames={58}>
        <CenterLines color="#FFF"
          direction="Right"
          rotate={360}
          strokeWidth={1}
          height={frame * 5 + (height / 2 + 320)}
          width={width / 1.5 }
          circleR={6}
          circleStartPoint={45} left={width/ 5.5}/>
          </Sequence>
        <LineBox
          color="#FFF"
          direction="Right"
          rotate={360}
          strokeWidth={1}
          height={frame * 5 + (height / 2 + 320)}
          width={width / 2 - 260}
          circleR={6}
          circleStartPoint={45}
        />

      </Sequence>
      
    </AbsoluteFill>
  );
};

export default Lines;