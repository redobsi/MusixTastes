import MusicElement from "./MusicElement";
import { useState, useEffect, useRef } from "react";
import { db } from "../../utils/init-firebase";
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

  // Get the musics depending on the user
  useEffect(() => {
    const music_ref = ref(db, `db/Users/${current_user}/house_musics`);
    onValue(music_ref, (snapshot) => {
      const data = snapshot.val();
      const musics = Object.keys(data).map(key => ({
        id:key,
        ...data[key]
      }));
      setMusics(musics);
      window.api.tell_main("All the musics have been loaded!")
    })
  }, [current_user]);


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