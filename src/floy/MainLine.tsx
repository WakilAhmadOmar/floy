import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import VerticalLine from "./Line";
import VerticalFullLine from "./FullLine";
import { BoltLineCircle } from "./LinePathSvg";
import StartCircle from "./circles/startCircle";
import ReuseCircle from "./circles/reuseCircle";
import Lines from "./Lines";
import LineBox from "./LineBox";


const MainLines = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    < >
      <Sequence from={106} durationInFrames={78} style={{
        position:"absolute",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}>

      <ReuseCircle radius={ 420} speedOfPath={4} circleR={15}/>
      </Sequence>
      
      <Sequence from={0} durationInFrames={20} style={{
        position:"absolute" , 
        top:height / 2 + 180,
        left: width / 2 - 50,
      }}>
        <StartCircle circleR={27} width={100} height={150} speedOfCircle={7} color="#FFF" />
      </Sequence>
      <Sequence from={20} durationInFrames={86}>
        <BoltLineCircle  svgWidth={width / 2 } frequency={400} svgHeight={height /2 + 300 } speedOfCircle={2 } color="#FFF" shadowColor="#FFF" circleR={27} pathWidth={4}/>
        </Sequence>
        {/* <Sequence style={{position:"absolute" , top:0}}>
        

        </Sequence> */}
        {/* <VerticalLine
          startPoint={height / 2 + 300}
          left={width / 2 + 30}
          backgroundColor="#FFF"
          startLine={40}
          startCircle={true}
          amplitude={150}
          maxLength={0}
        /> */}
      {/* <Sequence style={{
            position:"absolute",
            zIndex:100,
            backgroundColor:"red"
        }}> */}
        {/* </Sequence> */}
      {/* <Sequence from={0} durationInFrames={70}>
        <VerticalLine
          startPoint={height / 2 + 410}
          left={width / 2 - 300}
          backgroundColor="#FFF"
          startLine={0}
          amplitude={10}
          LineWeight={1}
          line="Cos"
          rotate={-10}
          maxLength={0}
        />
        <VerticalLine
          startPoint={height / 2 + 410}
          left={width / 2 - 300}
          backgroundColor="#FFF"
          startLine={50}
          amplitude={10}
          LineWeight={2}
          line="Cos"
          endLine={50}
          rotate={-10}
          maxLength={0}
        />
        <VerticalLine
          startPoint={height / 2 + 200}
          left={width / 2 + 320}
          backgroundColor="#FFF"
          startLine={0}
          amplitude={10}
          LineWeight={1}
          line="Sin"
          rotate={10}
          maxLength={0}
          
        />
        <VerticalLine
          startPoint={height / 2 + 200}
          left={width / 2 + 320}
          backgroundColor="#FFF"
          startLine={50}
          amplitude={10}
          LineWeight={2}
          line="Sin"
          endLine={50}
          rotate={10}
          maxLength={0}
      
        />
      </Sequence> */}
    </>
  );
};

export default MainLines;
