/// <reference path="../../node_modules/mux-embed/dist/types/mux-embed.d.ts"/>
import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import mux from "mux-embed";

export default function HlsJsPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

  useEffect(() => {
    let hls: Hls;

    if (videoRef.current) {
      const video = videoRef.current;
      const initTime = mux.utils.now();

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // This will run in safari, where HLS is supported natively
        video.src = src;
      } else if (Hls.isSupported()) {
        // This will run in all other modern browsers
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);

        mux.monitor(video, {
          debug: false,
          hlsjs: hls,
          Hls,
          data: {
            env_key: "ppfvahlcr679sspqpt8ucmsbq",
            // Metadata fields
            player_name: "Streaming player",
            player_init_time: initTime,
            // Video metadata
            video_title: "Streaming Big buck bunny",
          },
        });
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoRef]);

  return (
    <video
      controls
      ref={videoRef}
      style={{ width: "100%", maxWidth: "500px" }}
    />
  );
}
