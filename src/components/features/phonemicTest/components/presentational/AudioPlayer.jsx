import React, { useState, useRef } from "react";
import PropTypes from "prop-types";

const AudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={src}
        onLoadedData={handleLoadedData}
        onEnded={handleEnded}
      />

      <button
        className={`play-button ${isPlaying ? "playing" : ""}`}
        onClick={handlePlay}
        disabled={isLoading || isPlaying}
      >
        {isLoading ? (
          <span className="loading-icon">Loading...</span>
        ) : isPlaying ? (
          <span className="playing-icon">▶️</span>
        ) : (
          <span className="play-icon">▶️</span>
        )}
      </button>

      <span className="audio-label">
        {isPlaying ? "Listening..." : "Play Sound"}
      </span>
    </div>
  );
};

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
};

export default AudioPlayer;
