import {
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { BoltLineCircle } from "./LinePathSvg";
import StartCircle from "./circles/startCircle";
import ReuseCircle from "./circles/reuseCircle";



const MainLines = () => {
  const {height , width } = useVideoConfig()

  return (
    < >
      {/* <Sequence from={106} durationInFrames={78} style={{
        position:"absolute",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}>

      <ReuseCircle radius={ 420} speedOfPath={4} circleR={15} circleStartPoint={90} clipPathId="kdsfjklsfdsdf" strokeId="weirueeeiie"/>
      </Sequence> */}
      {/* <Sequence from={130} durationInFrames={78} style={{
        position:"absolute",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}>

      <ReuseCircle radius={ 500} speedOfPath={4} circleR={15} circleStartPoint={90} clipPathId=":dfe#4343kd4" strokeId="#43ddfddfd$##4"/>
      </Sequence> */}
      
      {/* <Sequence from={0} durationInFrames={20} style={{
        position:"absolute" , 
        top:height / 2 + 180,
        left: width / 2 - 50,
      }}>
        <StartCircle circleR={27} width={100} height={150} speedOfCircle={7} color="#FFF" />
      </Sequence> */}
      <Sequence from={20} durationInFrames={86}>
        <BoltLineCircle  svgWidth={width / 2 } frequency={400} svgHeight={height /2 + 300 } speedOfCircle={2 } color="#FFF" shadowColor="#FFF" circleR={27} pathWidth={4}/>
        </Sequence>
   
    </>
  );
};

export default MainLines;
