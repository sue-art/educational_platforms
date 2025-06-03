import React, { useRef } from 'react';
// import './AudioPlayer.css'; // CSS was commented out in user's file

function AudioPlayer({ src, autoPlay = false, controls = true }) {
  const audioRef = useRef(null);

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={src} autoPlay={autoPlay} controls={controls} />
    </div>
  );
}

export default AudioPlayer;
