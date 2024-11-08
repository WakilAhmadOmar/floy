import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import styled from "styled-components";

// Container to hold the sine wave
const SineWaveContainer = styled.div<{
    rotate:number
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 100%;
  position: relative;
  transform: rotate(${(props) => props?.rotate}deg);
  
`;

const SineLine = styled.div<{ topOffset: number; leftOffset: number , backgroundColor:string , LineWeight:number  , }>`
  position: absolute;
  width: ${(props) => props.LineWeight}px;
  height: ${(props) => props.LineWeight}px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
  top: ${({ topOffset }) => topOffset}px;
  left: ${({ leftOffset }) => leftOffset}px;
 
`;

const SineLineFirst = styled.div<{ topOffset: number; leftOffset: number , backgroundColor:string }>`
  position: absolute;
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 50%;
  top: ${({ topOffset }) => topOffset}px;
  left: ${({ leftOffset }) => leftOffset - 30}px;  
`;

interface IPropsLine {
    startPoint:number,
    amplitude?:number,
    step?:number,
    backgroundColor:string,
    left:number,
    startLine:number,
    startCircle?:boolean,
    LineWeight?:number,
    line?:"Sin" | "Cos",
    endLine?:number,
    rotate?:number,
    maxLength:number

}
const SineWave: React.FC<IPropsLine> = ({
    startPoint= 900,
    amplitude = 50,
    step = 0.5,
    backgroundColor,
    left,
    startLine,
    startCircle = false,
    LineWeight = 4,
    line = "Sin",
    endLine,
    rotate = 0,
    maxLength 

}) => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig()

//   const waveLength = 900; // Height of the container
//   const amplitude = 50; // Horizontal amplitude
  const frequency = 0.05; // Frequency of the wave
//   const step = 0.5; // Increased step size to reduce points

    // Use memo to avoid recalculating points every frame unless necessary
    const points = useMemo(() => {
    
        const calculatedPoints = [];
        for (let y = 0; y <=  frame * 2; y += step) {
          const x = amplitude *  (line === "Sin" ? Math.sin(frequency * y) : Math.cos(frequency * y)); // Sine wave formula
          calculatedPoints.push({ x: x + left, y: startPoint - y * 6 }); // Adjust for bottom-to-top growth
        }
    
        return calculatedPoints;
      }, [frame]);

  return (
    <SineWaveContainer rotate={rotate}>

        {points.map((point, index) => {
          if (index === points?.length - 1 && startCircle) {
            return (
              <SineLineFirst
                key={index}
                leftOffset={point.x}
                topOffset={point.y}
                backgroundColor={backgroundColor}
              />
            );
          }
          if (index > startLine ){
            
            if ( !(index < points?.length - (endLine || 0))){
                return null
            }
              return (
                <SineLine
                  key={index}
                  leftOffset={point.x}
                  topOffset={point.y} // Progression upwards
                  backgroundColor={backgroundColor}
                  LineWeight={LineWeight}
                  
                />
              );
          }else return null
        })}

    </SineWaveContainer>
  );
};

export default SineWave;
