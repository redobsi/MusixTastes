import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import CardButton from './CardButton';
import { ref, onValue } from 'firebase/database';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { RiArrowGoBackFill } from 'react-icons/ri';
import MusicElement from './MusicElement';
import ReactAudioPlayer from 'react-audio-player';

function CardPack({ current_user }) {
  const [cards, setcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(cards.length - 1);
  const [lastDirection, setLastDirection] = useState();

  // This part is a copy paste from MusicPanel used to manage the musics being played!
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMusic, setCurrentMusic] = useState(null);
  const audioPlayerRef = useRef();

  const toggleMusic = (musicSrc, ForcePause=false) => {
    const audioPlayer = audioPlayerRef.current.audioEl.current;
    if(ForcePause){
      setIsPlaying(false);
      audioPlayer.pause();
      return
    }

    if (isPlaying && musicSrc === currentMusic) {
      setIsPlaying(false);
      audioPlayer.pause();
    } else if (!isPlaying && musicSrc === currentMusic) {
      setIsPlaying(true);
      audioPlayer.play();
    } else {
      setCurrentMusic(musicSrc);
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    // Get the musics
    window.electron.firebase.getData('musics');
    window.electron.ipcRenderer.on('get-firebase-data', (data) => {
      // eslint-disable-next-line no-console
      const musics = data.data
      setcards(musics)
    })
  }, [])

  useEffect(() => {
    setCurrentIndex(cards.length - 1);
  }, [cards]);

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(cards.length)
        .fill(0)
        .map((i) => React.createRef()),
    [cards]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < cards.length - 1;
  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index, genre) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    // When it's swiped stop the music
    toggleMusic(currentMusic, true);
    window.electron.analysis.incrementDB(`users/${"Red0bsi"}/preferences/`, genre, direction==='right'?1:-1); 
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);

    if (currentIndexRef.current >= idx) {
      childRefs[idx].current.restoreCard();
    }
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < cards.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
      console.log(childRefs[currentIndex]);
    }
  };

  // increase current index and show card
  /*const goBack = async () => {
    if (!canGoBack) {
      return;
    } 
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };*/

  return (
    <div className='card-system-wrapper'>
      <div className='cardContainer' style={{ position: "relative" }}>
        {cards.map((card, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={card.id}
            onSwipe={(dir) => swiped(dir, card.title, index, card.genre)}
            onCardLeftScreen={() => outOfFrame(card.title, index)}
          >
            <MusicElement
              key={card.title}
              Background={card.background_image}
              Title={card.title}
              AuthorName={card.author_name}
              ToggleMusic={() => { toggleMusic(card.src) }}
              SelfMusic={card.src}
              PlayedMusic={currentMusic}
              IsPlaying={isPlaying}
              Type={"card"}
            />
          </TinderCard>
        ))}
      </div>
  
      <div className="card-buttons-wrapper">
        <CardButton icon={
          <AiFillDislike className="card-button-icon" style={{ color: "#fb745d" }} />
        } OnClick={() => swipe('left')} />
        {/*<CardButton icon={
          <RiArrowGoBackFill className="card-button-icon" style={{ color: "#2bb4c9" }} />
        } OnClick={() => goBack()} />*/}
        <CardButton icon={
          <AiFillLike className="card-button-icon" style={{ color: "#4dcc94" }} />
        } OnClick={() => swipe('right')} />
      </div>
  
      {/* This is the individual audio player for the whole page (to avoid concurrent playing)*/}
      <ReactAudioPlayer
        ref={audioPlayerRef}
        src={currentMusic}
        className='audio-player'
        style={{ display: "none" }}
        autoPlay={true}
        controls
        onPlay={() => setIsPlaying(true)}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  )
}
  
export default CardPack;