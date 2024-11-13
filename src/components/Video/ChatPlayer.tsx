import { usePlyr } from "plyr-react";
import "plyr-react/plyr.css";
import React, { useEffect, useRef } from "react";
import vodDataBus from "./EventBus";
import getConfig from "next/config";
import { escapeURL } from "../../util/util";
import classes from "./ChatPlayer.module.css"

const Plyr = React.forwardRef((props, ref) => {
  const { source, options = null, ...rest } = props;
  const chatPlayerRef = usePlyr(ref, {
    source,
    options,
  });
  return (
    <video
      ref={chatPlayerRef}
      className={`plyr-react plyr ${classes.chatPlayer}`}
      {...rest}
    />
  );
});

export const VodChatPlayer = ({ vod }: any) => {
  const { publicRuntimeConfig } = getConfig();
  const chatRef = useRef();
  let player = null;
  let lastTime = 0;
  let ready = false;

  useEffect(() => {
    setTimeout(() => {
      const playerRef = chatRef.current;
      player = playerRef.plyr;
      ready = true;
    }, 250);

    const interval = setInterval(() => {
      const { time, playing, paused } = vodDataBus.getData();
      if (!ready) {
        return;
      }

      if (playing) {
        player.play();
      }
      if (paused) {
        player.pause();
      }

      if (Math.abs(time - lastTime) > 2) {
        player.currentTime = time;
      }
      lastTime = time;
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const plyrProps = {
    source: {
      type: "video",
      title: vod.title,
      sources: [
        {
          src: `${publicRuntimeConfig.CDN_URL}${escapeURL(vod.chat_video_path)}`,
          type: "video/mp4",
        },
      ],
    },
    options: {
      settings: ["captions", "quality", "speed", "loop"],
      autoPlay: true,
      clickToPlay: false,
      controls: [],
    },
  };

  return (
    <div
      style={{ height: "100%", maxHeight: "100%" }}
      className={classes.chatPlayer}
    >
      <Plyr ref={chatRef} {...plyrProps} />
    </div>
  );
};
