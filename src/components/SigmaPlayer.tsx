/// <reference path="../../node_modules/mux-embed/dist/types/mux-embed.d.ts"/>
import React, { useEffect, useRef } from "react";
import mux from "mux-embed";

export default function SigmaPlayerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = "https://live-on-akm.akamaized.net/manifest/vtv1/master.m3u8";

  useEffect(() => {
    let sigmaManager: any;

    if (videoRef.current) {
      const video = videoRef.current;
      // @ts-ignore
      const initTime = mux.utils.now();

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // This will run in safari, where HLS is supported natively
        video.src = src;
      } else if (SigmaManager.isSupported()) {
        // This will run in all other modern browsers
        sigmaManager = new SigmaManager();

        sigmaManager.config = {
          debug: true,
          enableWorker: true,
          lowLatencyMode: true,
          stretchShortVideoTrack: true,
          maxBufferLength: 30,
          backBufferLength: 15,
          maxMaxBufferLength: 60,
        };
        sigmaManager.audioTrack = 0;
        sigmaManager.mediaElm = video;
        sigmaManager.nativeClient = {
          module: "libs/sigma_drm_2.0.1.js",
          wasmBaseUrl: "http://localhost:3000/",
        };
        sigmaManager.appInfo = {
          deviceId: "<Em_add_deviceId_giup_anh>",
          merchantId: "thudojsc",
          appId: "VTVcabON",
          sessionId:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZGkiOiJ7XCJ1c2VyXCI6XCIyMDAzMDE3NlwiLFwibWVyY2hhbnRcIjpcInRodWRvanNjXCIsXCJhc3NldFwiOlwidnR2MVwifSIsInVpZCI6IjIwMDMwMTc2IiwiZHJtSWQiOiJ2dHYxIiwiaWF0IjoxNzI4NTI2NTEyLCJleHAiOjE3Mjg1NDgxMTd9.WLVQdCoKOC5obu754bLPQSBXWjyqMqRat5tXoWMPyDU",
          userId: "20030176",
        };

        // @ts-ignore
        mux.monitor(video, {
          debug: true,
          hlsjs: sigmaManager,
          Hls: SigmaManager,
          data: {
            env_key: "ppfvahlcr679sspqpt8ucmsbq",
            // Metadata fields
            player_name: "Streaming player",
            player_init_time: initTime,
            // Video metadata
            video_title: "Streaming Big buck bunny",
          },
        });
        sigmaManager.loadSource(src, { method: "sigma" });
      }
    }

    return () => {
      if (sigmaManager) {
        sigmaManager.destroy();
      }
    };
  }, [videoRef]);

  return (
    <video
      muted
      controls
      autoPlay
      ref={videoRef}
      style={{ width: "100%", maxWidth: "500px" }}
    />
  );
}
