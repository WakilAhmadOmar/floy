import { AbsoluteFill, Sequence } from "remotion";
import CircleAnimations from "./circleAnimations";
import LogoText from "./LogoText";

const MainText = () => {
  return (
    <AbsoluteFill >
      <Sequence from={204} style={{backgroundColor:"#FFF"}} durationInFrames={27}>
      <CircleAnimations />
      </Sequence>
      <Sequence from={230} style={{backgroundColor:"#FFF"}} >
        <LogoText />
      </Sequence>
    </AbsoluteFill>
  );
};

export default MainText;
