import { useEffect, useRef, useState } from "react";
import { Howl, Howler } from "howler";

Howler.volume(1);

export const usePlayer = (stations) => {
  const [playlist] = useState(stations);
  const [playing, setPlaying] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [playingError, setPlayingError] = useState(false);

  const playingStation = () => playlist[playingIndex];

  function play(index) {
    setPlayingError(false);
    stop();

    let sound;
    const soundIndex = index ?? playingIndex;
    const data = playlist[soundIndex];
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = new Howl({
        src: data.url,
        html5: true,
        format: ["mp3", "aac"],
      });

      playlist[soundIndex].howl = sound;
    }

    sound.on("playerror", () => {
      setPlayingError(true);
      playlist[soundIndex].howl = null;
    });

    sound.on("loaderror", () => {
      setPlayingError(true);
      playlist[soundIndex].howl = null;
    });

    sound.play();
    setPlaying(true);
    setPlayingIndex(soundIndex);
  }

  function stop() {
    playingStation()?.howl?.stop();
    setPlaying(false);
  }

  function prev() {
    play(playingIndex - 1);
    setPlayingIndex(playingIndex - 1);
  }

  function next() {
    play(playingIndex + 1);
    setPlayingIndex(playingIndex + 1);
  }

  function togglePlay(index) {
    const soundIndex = index ?? playingIndex;
    console.log(playing, "dan", playlist[soundIndex].howl?.playing());
    if (playing && (playlist[soundIndex].howl?.playing() || playingError)) {
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
