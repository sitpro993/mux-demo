/// <reference path="../../node_modules/mux-embed/dist/types/mux-embed.d.ts"/>
import React, { useEffect, useRef } from "react";
import Hls, {
  ErrorData,
  FragLoadedData,
  LevelLoadedData,
  ManifestLoadedData,
} from "hls.js";
import mux from "mux-embed";
export default function HlsJsPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src =
    "https://live-on-v2-akm.akamaized.net/manifest/test_live/master.m3u8";

  useEffect(() => {
    let hls: Hls;

    if (videoRef.current) {
      const video = videoRef.current;
      // @ts-ignore
      const initTime = mux.utils.now();

      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // This will run in safari, where HLS is supported natively
        video.src = src;
      } else if (Hls.isSupported()) {
        // This will run in all other modern browsers
        hls = new Hls();
        hls.on(
          Hls.Events.MANIFEST_LOADED,
          (event: string, data: ManifestLoadedData) => {
            const navigationStartTime = performance.timing.navigationStart;
            const loading = data.stats.loading;
            const requestStart = loading.start;
            const time2FirstByte = loading.first;
            const responseEnd = loading.end;

            console.log("master", {
              bytesLoaded: data.stats.total,
              requestStart: Math.round(navigationStartTime + requestStart),
              time2FirstByte: Math.round(navigationStartTime + time2FirstByte),
              responseEnd: Math.round(navigationStartTime + responseEnd),
            });
          }
        );
        hls.on(
          Hls.Events.LEVEL_LOADED,
          (event: string, data: LevelLoadedData) => {
            const navigationStartTime = performance.timing.navigationStart;
            const loading = data.stats.loading;
            const requestStart = loading.start;
            const time2FirstByte = loading.first;
            const responseEnd = loading.end;

            console.log("level", {
              bytesLoaded: data.stats.total,
              requestStart: Math.round(navigationStartTime + requestStart),
              time2FirstByte: Math.round(navigationStartTime + time2FirstByte),
              responseEnd: Math.round(navigationStartTime + responseEnd),
            });
          }
        );
        hls.on(
          Hls.Events.FRAG_LOADED,
          (event: string, data: FragLoadedData) => {
            const navigationStartTime = performance.timing.navigationStart;
            const loading = data.frag.stats.loading;
            const requestStart = loading.start;
            const time2FirstByte = loading.first;
            const responseEnd = loading.end;

            console.log("frag", {
              bytesLoaded: data.frag.stats.total,
              requestStart: Math.round(navigationStartTime + requestStart),
              time2FirstByte: Math.round(navigationStartTime + time2FirstByte),
              responseEnd: Math.round(navigationStartTime + responseEnd),
            });
          }
        );
        hls.on(Hls.Events.ERROR, (event: string, data: ErrorData) => {
          console.log("ERROR", data);
        });

        // hls.on(Hls.Events.FRAG_PARSED, () => {
        //   console.log("frag parsed");
        // });
        video.addEventListener("play", () => {
          console.log("video play");
        });
        // @ts-ignore
        mux.monitor(video, {
          debug: true,
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
        hls.loadSource(src);
        hls.attachMedia(video);
      }
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoRef]);

  return (
    <div style={{ width: "100vw", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "500px",
          gap: 16,
        }}
      >
        <video muted controls autoPlay ref={videoRef} />
        {/* <div>
          <input type="text" style={{ flex: 1 }} /> <button>Play</button>
        </div> */}
      </div>
    </div>
  );
}
