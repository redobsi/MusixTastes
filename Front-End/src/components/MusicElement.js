import { HiMusicNote } from "react-icons/hi";
import ReactAudioPlayer from 'react-audio-player'
import { useState, useRef } from "react"
import { FaPause } from "react-icons/fa"

const MusicElement = ({ Background, Title, AuthorName, CurrentMusic }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const start_music = ()=>{
    audioPlayer = reactaudioplayer.current.audioEl;
    if (!isPlaying){ 
      audioPlayer.current.play();
    }
    else {
       reactaudioplayer?.current?.audioEl.current.pause();
    }
  }
  
  const reactaudioplayer = useRef();
  let audioPlayer = reactaudioplayer?.current?.audioEl;

  return (
    <div className="Main-music-wrapper">
      <div style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          height : `${250}px`,
      }} className="Music-element-wrapper">
          <ReactAudioPlayer
            ref={reactaudioplayer}
            src={CurrentMusic}
            className = 'audio-player'
            style={{
              display : "none"
            }}
            autoPlay = {false}
            controls 
            onPlay={() => {
              setIsPlaying(true);
            }}
            onPause={() => setIsPlaying(false)}
          />
          <button className="Music-element-circular-inner-wrapper" onClick={start_music} 
            style={{border:"none"}}>
              
            {isPlaying ? <FaPause className="Music-note" style={{width:"40px", height:"40px"}}/>:<HiMusicNote className="Music-note"/>}
          </button>
      </div>
      <h2 className="Music-Title">{Title}</h2>
      <h3 className="Music-Author">{`By ${AuthorName}`}</h3>
    </div>
  )
}

export default MusicElement