import React, { useRef, useState } from "react";

import stasions from "../../data/stations.json";
import { usePlayer } from "../../hook/usePlayer";
import "./radioPlayer.scss";
import AudioSpectrum from "react-audio-spectrum";

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

  const audioRef = useRef();

  return (
    <>
      <div className="radio">
        <div className="radio__player">
          <img src={RadioBass} />

          <div className="radio__control">
            <div className="radio__play">
              {/* <div onClick={() => prev()}>
                <iconify-icon
                  icon="material-symbols:skip-previous"
                  width="40"
                  height="40"
                ></iconify-icon>
              </div> */}
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
              {/* <div onClick={() => next()}>
                <iconify-icon
                  icon="material-symbols:skip-next"
                  width="40"
                  height="40"
                ></iconify-icon>
              </div> */}
              <div>
                <h3>
                  {playingStation().name + "" + playingStation().frequency}
                </h3>
                <p>{playingStation().slogan}</p>
              </div>
              {playingError.current ? "Satsiun tidak tersedia" : ""}
            </div>
            <div className="radio__spectrum">
              <audio
                id="audio-element"
                src={playingStation().url}
                crossOrigin="anonymous"
                ref={audioRef}
              ></audio>
              <AudioSpectrum
                id="audio-canvas"
                height={200}
                width={300}
                audioId={"audio-element"}
                capColor={"red"}
                capHeight={2}
                meterWidth={4}
                meterCount={512}
                meterColor={[
                  { stop: 0, color: "#65069c" },
                  { stop: 0.5, color: "#04333b" },
                  { stop: 1, color: "red" },
                ]}
                gap={4}
              />
            </div>
          </div>
        </div>
        <div className="radio__list">
          <div className="radio__header">
            <p>PLAYLISH ({playlist.length} Radio)</p>
            <p>Frekuensi</p>
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
