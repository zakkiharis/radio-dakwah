import React, { useState } from "react";

import stasions from "../../data/stations.json";
import { usePlayer } from "../../hook/usePlayer";
import "./radioPlayer.scss";

import RadioBass from "../../assets/images/radio-bass.png";

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

  return (
    <>
      <div className="radio">
        <div className="radio__player">
          <img src={RadioBass} />

          <div className="radio__control">
            <div className="radio__play">
              <div onClick={() => togglePlay()}>
                {playing ? (
                  <iconify-icon
                    icon="ic:sharp-stop-circle"
                    width="40"
                    height="40"
                  ></iconify-icon>
                ) : (
                  <iconify-icon
                    icon="material-symbols:play-circle"
                    width="40"
                    height="40"
                  ></iconify-icon>
                )}
              </div>
              <div>
                <h3>
                  {playingStation().name + "" + playingStation().frequency}
                </h3>
                <p>{playingStation().slogan}</p>
              </div>
              {playingError ? "Satsiun tidak tersedia" : ""}
            </div>
            <div className="radio__spectrum">Spectrum</div>
          </div>
        </div>
        <div className="radio__list">
          <div className="radio__header">
            <p>PLAYLISH</p>
            <p>{playlist.length} Radio</p>
          </div>
          <div className="radio__playlist">
            <ul>
              {playlist.map((list, index) => (
                <li key={index}>
                  <div className="list">
                    <div className="list-name">
                      <div onClick={() => togglePlay(index)}>
                        {playingIndex === index && playing ? (
                          <iconify-icon
                            icon="ic:sharp-stop-circle"
                            width="30"
                            height="30"
                          ></iconify-icon>
                        ) : (
                          <iconify-icon
                            icon="material-symbols:play-circle"
                            width="30"
                            height="30"
                          ></iconify-icon>
                        )}
                      </div>
                      <p>{list.name}</p>
                    </div>
                    <h3>{list.frequency}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default RadioPlayer;
