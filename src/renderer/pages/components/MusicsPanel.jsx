import MusicElement from "./MusicElement";
import { useState, useEffect, useRef } from "react";
import { ref, onValue } from "firebase/database";
import ReactAudioPlayer from 'react-audio-player'

const MusicsPanel = ({ current_user }) => {

  const [Musics, setMusics] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMusic, setCurrentMusic] = useState(null);
  const rap = useRef();

  const toggleMusic = (CurrentMusic) => {
    let audioPlayer = rap.current.audioEl.current
    if (isPlaying && (CurrentMusic === currentMusic)){
      setIsPlaying(false)
      audioPlayer.pause()
    }
    else if (!isPlaying && (CurrentMusic === currentMusic)){
      setIsPlaying(true)
      audioPlayer.play()
    }
    else{
      setCurrentMusic(CurrentMusic);
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    // Get the musics
    window.electron.analysis.getUserMusics(current_user, 4);
    window.electron.ipcRenderer.on('get-user-musics', (data) => {
      // eslint-disable-next-line no-console
      const musics = data.data
      setMusics(musics)
    })
  }, [])


  return (

    <div className="GridFlexBox">
        {Musics.map((music) => (<MusicElement key={music.id}
                                              Background={music.background_image} 
                                              Title={music.title} 
                                              AuthorName = {music.author_name}
                                              ToggleMusic = {() => {
                                                toggleMusic(music.src)
                                              }}
                                              SelfMusic = {music.src}
                                              PlayedMusic={currentMusic}
                                              IsPlaying = {isPlaying}
                                              Type={"card"}
        />))}
        <ReactAudioPlayer
          ref={rap}
          src={currentMusic}
          className = 'audio-player'
          style={{ display : "none" }}
          autoPlay = {true}
          controls 
          onPlay={() => setIsPlaying(true)}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
        />
    </div>
  )
}

export default MusicsPanel