import { ArrowLeft3, ArrowRight3 } from "iconsax-react";
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

interface IPropsBox {
  left: number;
  arrow: "Left" | "Right";
}
const Box: React.FC<IPropsBox> = ({ left, arrow }) => {
  const { height, width } = useVideoConfig();
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        // width:"50px",
        // height:"50px",
        // border:"2px solid white",
        position: "absolute",
        top: `${height / 2 + 300}px`,
        left: width / 2 - left,
        // boxShadow:"116px 54px 5px 7px rgba(0,0,0,0.71)",
        backgroundColor: "none",
        transform: `rotate(${-frame}deg)`,
      }}
    >
      {arrow === "Left" && <ArrowRight3 color="#FFF" size={60} />}
      {arrow === "Right" && <ArrowLeft3 color="#FFF" size={60} />}
    </div>
  );
};

export default Box;
