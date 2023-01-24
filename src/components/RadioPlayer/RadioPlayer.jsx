import React from "react";

import stasions from "../../data/stations.json";
import { usePlayer } from "../../hook/usePlayer";
import "./radioPlayer.scss";

function RadioPlayer() {
  const {
    playlist,
    playing,
    playingError,
    playingIndex,
    playingStation,
    togglePlay,
    prev,
    next,
  } = usePlayer(stasions);

  console.log(playlist.current);

  return (
    <>
      <div className="radio-palyer">
        <div className="player"></div>
        <div className="list-radio"></div>
      </div>
    </>
  );
}

export default RadioPlayer;
