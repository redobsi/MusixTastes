import React from 'react';

interface MusicObj {
    index: number;
    title: string;
    artist: string;
    time: string;
    genre: string;
    recommendation: string;
  }
  

interface PlaylistMusicProps {
  musicObj: MusicObj;
}

const PlaylistMusic = ({ musicObj }: PlaylistMusicProps) => {
  return (
    <ul className="music-playlist-info">
      <li className="music-playlist-index">{musicObj.index}</li>
      <li className="music-playlist-title">{musicObj.title}</li>
      <li className="music-playlist-artist">{musicObj.artist}</li>
      <li className="music-playlist-time">{musicObj.time}</li>
      <li className="music-playlist-genre">{musicObj.genre}</li>
      <li className="music-playlist-recommendation">{musicObj.recommendation}</li>
    </ul>
  );
}

export default PlaylistMusic;
