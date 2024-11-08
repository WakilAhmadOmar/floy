import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import FloyMain from "./floy/main";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
           <Composition
        // You can take the "id" to render a video:
        // npx remotion render src/index.ts <id> out/video.mp4
        id="FloyMain"
        component={FloyMain}
        durationInFrames={250}
        fps={30}
        width={2100}
        height={1400}
        // You can override these props for each render:
        // https://www.remotion.dev/docs/parametrized-rendering
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />
    </>
  );
};
