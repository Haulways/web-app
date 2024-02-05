import React, { useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";



const useFFmpeg = () => {
    const ffmpegRef = useRef(new FFmpeg());
    const loadFFmpeg = async () => {
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.2/dist/esm';
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on('log', ({ message }) => {
          // Handle log messages if needed
      });
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      return ffmpeg;
    };
    return { loadFFmpeg };
};

export default useFFmpeg;