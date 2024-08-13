/// <reference path="../../node_modules/mux-embed/dist/types/mux-embed.d.ts"/>
import React, { useEffect, useRef } from "react";
import mux from "mux-embed";



export default function () {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const initTime = mux.utils.now();

      mux.monitor(videoRef.current, {
        debug: true,
        data: {
          env_key: "ppfvahlcr679sspqpt8ucmsbq", // required
          // Metadata fields
          player_name: "Main Player", // any arbitrary string you want to use to identify this player
          player_init_time: initTime,
          // ...
          
        },
      });
    }
  }, [videoRef]);

  return (
    <video
      controls
      ref={videoRef}
      src="https://muxed.s3.amazonaws.com/leds.mp4"
      style={{ width: "100%", maxWidth: "500px" }}
    />
  );
}
