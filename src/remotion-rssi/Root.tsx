import React from "react";
import { Composition } from "remotion";
import { RSSIVideo } from "./RSSIVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RSSIAfrique"
        component={RSSIVideo}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
