import React, { useState } from "react";

import stasions from "../../data/stations.json";
import { usePlayer } from "../../hook/usePlayer";
import "./radioPlayer.scss";

// import RadioBass from "../../assets/images/radio-bass.png";

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

  const [showPlaylist, setShowPlaylist] = useState(true);

  const allowPrev = () => playingIndex > 0;
  const allowNext = () => playingIndex < playlist.length - 1;

  return (
    <>
      <div className="radio-player">
        <header className="thumnails">
          <div>
            <img
              src={`/radio-dakwah/img/${playingStation().images}`}
              alt="thumbnails"
            />
          </div>
        </header>
        <div>
          <div className="playing">
            {playingError ? (
              <p>
                <iconify-icon
                  icon="material-symbols:mic-off"
                  width="15"
                  height="15"
                ></iconify-icon>
                Stasiun sedang tidak tersedia.
              </p>
            ) : (
              <p>
                <iconify-icon
                  icon="material-symbols:mic"
                  width="15"
                  height="15"
                ></iconify-icon>
                Sedang Mendengarkan
              </p>
            )}

            <h3>{playingStation().name + " " + playingStation().frequency}</h3>
            <p>{playingStation().slogan}</p>
          </div>
          <div className="controls">
            <div className="controls__button">
              <button disabled={!allowPrev()} onClick={() => prev()}>
                <iconify-icon
                  icon="material-symbols:skip-previous"
                  width="40"
                  height="40"
                ></iconify-icon>
              </button>
              <button className="button-play" onClick={() => togglePlay()}>
                {playing ? (
                  <iconify-icon
                    icon="ic:sharp-stop-circle"
                    width="80"
                    height="80"
                  ></iconify-icon>
                ) : (
                  <iconify-icon
                    icon="material-symbols:play-circle"
                    width="80"
                    height="80"
                  ></iconify-icon>
                )}
              </button>
              <button disabled={!allowNext()} onClick={() => next()}>
                <iconify-icon
                  icon="material-symbols:skip-next"
                  width="40"
                  height="40"
                ></iconify-icon>
              </button>
            </div>
          </div>

          <div className="playlist">
            <div className="header-list">
              <button onClick={() => setShowPlaylist(!showPlaylist)}>
                {showPlaylist ? (
                  <iconify-icon
                    icon="material-symbols:arrow-back-ios-rounded"
                    width="15"
                    height="15"
                    rotate="270deg"
                  ></iconify-icon>
                ) : (
                  <iconify-icon
                    icon="material-symbols:arrow-back-ios-rounded"
                    width="15"
                    height="15"
                    rotate="90deg"
                  ></iconify-icon>
                )}
              </button>
              <p>DAFTAR STASIUN RADIO</p>
            </div>
            <div className="body-list">
              {showPlaylist && (
                <ul>
                  {playlist.map((list, index) => (
                    <li key={index}>
                      <div>
                        <p>
                          {list.name} {list.frequency}
                        </p>
                        <p>{list.slogan}</p>
                      </div>
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
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RadioPlayer;
