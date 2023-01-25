import { useEffect, useRef } from "react";
import { Howl, Howler } from "howler";

Howler.volume(1);

export const usePlayer = (stations) => {
  const playlist = useRef([]);
  const playing = useRef(false);
  const playingIndex = useRef(0);
  const playingError = useRef(false);

  stations.forEach((station) => {
    playlist.current.push({
      ...station,
      howl: null,
    });
  });

  useEffect(() => {
    console.log(playing.current);
  }, [playing.current]);

  const playingStation = () => playlist.current[playingIndex.current];

  function play(index) {
    playingError.current = false;
    stop();
    // console.log("Mashok", playingError.current);
    let sound;
    const soundIndex = index ?? playingIndex.current;
    const data = playlist.current[soundIndex];
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = new Howl({
        src: data.url,
        html5: true,
        format: ["mp3", "aac"],
      });

      playlist.current[soundIndex].howl = sound;
    }

    sound.on("playerror", () => {
      playingError.current = true;
      playlist.current[soundIndex].howl = null;
    });

    sound.on("loaderror", () => {
      playingError.current = true;
      playlist.current[soundIndex].howl = null;
    });

    sound.play();
    playing.current = true;
    playingIndex.current = soundIndex;
  }

  function stop() {
    playing.current = false;
    playingStation()?.howl?.stop();
  }

  function prev() {
    play(playingIndex.current - 1);
  }

  function next() {
    play(playingIndex.current + 1);
  }

  function togglePlay(index) {
    const soundIndex = index ?? playingIndex.current;
    if (
      playing.current &&
      (playlist.current[soundIndex].howl?.playing() || playingError.current)
    ) {
      stop();
    } else {
      play(soundIndex);
    }
  }

  return {
    playlist,
    playing,
    playingError,
    playingIndex,
    playingStation,
    play,
    stop,
    prev,
    next,
    togglePlay,
  };
};
