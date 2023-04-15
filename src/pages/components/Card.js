import MusicElement from "./MusicElement"
import { HiMusicNote } from "react-icons/hi";
import { useState, useRef } from "react"
import { FaPause } from "react-icons/fa"
import ReactAudioPlayer from 'react-audio-player'


const Card = ({ AuthorName, Background, Title, CurrentMusic, Type }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const reactaudioplayer = useRef();
  const audioPlayer = reactaudioplayer?.current?.audioEl;

  return (
    <div style={{
        width : `${Types[Type].mainWrapperShape[0]}px`,
        height : `${Types[Type].mainWrapperShape[1]}px`,
        padding: `${Types[Type].paddingMainWrapper}px`,
    }} className="Main-music-wrapper">
      <div style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          width : `${Types[Type].musicElementShape[0]}px`,
          height : `${Types[Type].musicElementShape[1]}px`,
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
        fontSize:`${Types[Type].fontSize1}px`,
        fontWeight:`${Types[Type].fontWeight1}`,
        }} className="Music-Title">{Title}</h2>
      <h3 style={{
        fontSize:`${Types[Type].fontSize2}px`,
        fontWeight:`${Types[Type].fontWeight2}`,
        }} className="Music-Author">{`By ${AuthorName}`}</h3>
    </div>
  )
}

export default Card

// This method is used to avoid having numerous components for the same sake
const Types = {
  "card" : {
    fontWeight1 : 600,
    fontWeight2 : 500,
    fontSize1 : 35,
    fontSize2 : 20,
    mainWrapperShape : [325, 450],
    musicElementShape : [325, 325],
    paddingMainWrapper : 27.5
  },
  "musicelement" : {

  }
}