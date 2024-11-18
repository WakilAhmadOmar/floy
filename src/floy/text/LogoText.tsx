import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import styled from "styled-components";
import Logo from "../../assets/svgs/example-logo-text.svg"

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LogoText = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: {
      damping: 200,
    },
  });

  const scale = interpolate(progress, [0, 1], [1, 10]);
  // First animation (translateX from 0px to -300px)

  return (
    <Container>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${scale})`,
          
        }}
        
      >
        <img src={Logo} height={30}/>
        {/* <h1 style={{fontWeight:"bold" , fontSize:"18px"}}>Flo</h1>
        <svg width="40" height="20">
          <path
            d="M0,10 q 0,-10  10,10 q 10,-10  10,-10 q 10,-10 10,10 q 10,-10 10,-10 "
            fill="none"
            stroke="blue"
            stroke-width="4"
          />
        </svg>
        <h1 style={{fontWeight:"bold" , fontSize:"18px"}}>y</h1> */}
      </div>
    </Container>
  );
};

export default LogoText;
