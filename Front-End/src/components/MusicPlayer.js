import React, { useState, useRef, useEffect } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"

const MusicPlayer = ({  }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [MusicIndex, setMusicIndex] = useState(1);

  // references
  const reactaudioplayer = useRef();
  let audioPlayer = reactaudioplayer?.current?.audioEl;
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation


  useEffect(() => {
    audioPlayer = reactaudioplayer?.current?.audioEl;
    const seconds = Math.floor(audioPlayer?.current?.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
    return () => cancelAnimationFrame(animationRef.current);
  },[])

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  }


  return (
    <div className="music-player-wrapper">
      <div className="music-player-controls">
        <ReactAudioPlayer
          ref={reactaudioplayer}
          src={"CurrentMusic"}
          className = 'audio-player'
          style={{
            display : "none"
          }}
          autoPlay = {true}
          controls 
          onPlay={() => {
            setIsPlaying(true);
            setMusicIndex(MusicIndex>0?0:1);
            audioPlayer = reactaudioplayer?.current?.audioEl;
            const seconds = Math.floor(audioPlayer?.current?.duration);
            setDuration(seconds);
            progressBar.current.max = seconds;
            animationRef.current = requestAnimationFrame(whilePlaying)
          }}
          onPause={() => setIsPlaying(false)}
        />
        {/*<button className="forwardBackward" onClick={backThirty}><BsArrowLeftShort /> 30</button>*/}
        <button onClick={togglePlayPause} className="playPause">
          {isPlaying ? <FaPause /> : <FaPlay className="play" />}
        </button>
        {/*<button className="forwardBackward" onClick={forwardThirty}>30 <BsArrowRightShort /></button>*/}
      </div>
      <div className='music-player-bar'>
        {/* current time */}
        <div className="current-time">{calculateTime(currentTime)}</div>

        {/* progress bar */}
        <input type="range" className="progressBar" defaultValue="0" ref={progressBar} onChange={changeRange} />

        {/* duration */}
        <div className="duration">{calculateTime(duration)}</div>
      </div>
    </div>
  )
}

export default MusicPlayer


