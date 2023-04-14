import MusicElement from "./MusicElement"
import { HiMusicNote } from "react-icons/hi";
import { useState, useRef } from "react"
import { FaPause } from "react-icons/fa"
import ReactAudioPlayer from 'react-audio-player'

const Card = ({ AuthorName, Background, Title, CurrentMusic }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const reactaudioplayer = useRef();
  const audioPlayer = reactaudioplayer?.current?.audioEl;

  return (
    <div style={{
        width : `${325}px`,
        height : `${450}px`,
        padding: "27.5px",
    }} className="Main-music-wrapper">
      <div style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          width : `${325}px`,
          height : `${325}px`,
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
          <button className="Music-element-circular-inner-wrapper" onClick={()=>{
            if (!isPlaying){ audioPlayer.current.play(); }
            else { audioPlayer.current.pause(); }
          }} 
            style={{border:"none"}}>
              
            {isPlaying ? <FaPause className="Music-note" style={{width:"45px", height:"45px"}}/>:<HiMusicNote className="Music-note"/>}
          </button>
      </div>
      <h2 style={{
        fontSize:"35px",
        fontWeight:600,
        }} className="Music-Title">{Title}</h2>
      <h3 style={{
        fontSize:"20px",
        fontWeight:500,
        }} className="Music-Author">{`By ${AuthorName}`}</h3>
    </div>
  )
}

export default Card