import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import styled from "styled-components";

const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
width:100%;
gap:10rem;
`;

const CircleAnimations = () => {
    const frame = useCurrentFrame()
    const {fps} = useVideoConfig()
    

    const progress = spring({
        frame,
        fps,
        config:{
            damping:200
        }
    })

   
     const animation = interpolate(progress , [0 ,1] ,[1 , 0])
       // First animation (translateX from 0px to -300px)
  const translateX1 = spring({
    frame :frame - 5,
    fps,
    from: 0,
    to: -300,
    config: {
      damping: 20,
      stiffness: 200,
    },
  });

  // Second animation (translateX from -300px back to 0px, after first animation finishes)
  const translateX2 = spring({
    frame :frame - 15,  // Delay second animation to start after the first animation
    fps,
    from: -300,
    to: 40,
    config: {
      damping: 20,
      stiffness: 200,
    },
  });
  const translateX12 = spring({
    frame :frame - 5,
    fps,
    from: 0,
    to: 300,
    config: {
      damping: 20,
      stiffness: 200,
    },
  });

  // Second animation (translateX from -300px back to 0px, after first animation finishes)
  const translateX22 = spring({
    frame :frame - 15,  // Delay second animation to start after the first animation
    fps,
    from: 300,
    to: -40,
    config: {
      damping: 20,
      stiffness: 200,
    },
  });

  console.log("frame" , frame)
  return (
    <Container>
      <div
        style={{
          position: "relative",

        //   width:300
        //   transform: `translateX(${translateX1}px)`, // Apply first animation until it finishes
        }}
      >
        <div
          style={{
            border: "1px solid #056dd3",
            width:100 ,
            opacity:animation
            // transform:`scale(${animation})`
          }}
        ></div>
        <div
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            backgroundColor: "#056dd3",
            position:"absolute",
            top:"-20px",
            right:0,
            transform: `translateX(${translateX1}px)`,
            ...(frame > 15 ? {transform: `translateX(${  translateX2}px) scale(0.7) ` } : {}),
          }}
        ></div>
      </div>
      <div
        style={{
          position: "relative",

        }}
      >
        <div
          style={{
            border: "1px solid #056dd3",
            width:100 ,
            opacity:animation
          }}
        ></div>
        <div
          style={{
            height: "40px",
            width: "40px",
            borderRadius: "50%",
            backgroundColor: "#056dd3",
            position:"absolute",
            top:"-20px",
            left:0,
            transform: `translateX(${translateX12}px)`,
            // ...(frame > 5 && frame <15? {transform: `translateX(${translateX2}px)`} : {}),
            ...(frame > 15 ? {transform: `translateX(${   translateX22 }px) scale(0.7)`} : {}),
          }}
        ></div>
      </div>
      
    </Container>
  );
};

export default CircleAnimations;
