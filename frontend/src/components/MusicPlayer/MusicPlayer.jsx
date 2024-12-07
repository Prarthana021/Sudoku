import React, { useRef, useEffect } from "react";

function MusicPlayer({ volume }) {
	  const audioRef = useRef(null);

	  useEffect(() => {
		      if (audioRef.current) {
			            audioRef.current.volume = volume;
			          }
		    }, [volume]);

	  return (
		      <audio ref={audioRef} src="/background-music.mp3" autoPlay loop />
		    );
}

export default MusicPlayer;

