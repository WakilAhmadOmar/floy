import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import Line from "./Line";
import React from "react";


const MainLineComponent = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#056dd3",
      }}
    >
      <Sequence
        from={0}
        durationInFrames={257}
      >
        <Line />
      </Sequence>
    </AbsoluteFill>
  );
};

export default MainLineComponent;
