import React, { useState, useMemo, useRef, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import Card from './Card';
import CardButton from "./CardButton";
import { db } from "../lib/init-firebase";
import { ref, onValue } from "firebase/database";

import {AiFillLike} from "react-icons/ai";
import {AiFillDislike} from "react-icons/ai";
import {RiArrowGoBackFill} from "react-icons/ri";

function CardPack ({ current_user }) {
    const [Cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(Cards.length - 1);
    const [lastDirection, setLastDirection] = useState();

    useEffect(() => {
      const music_ref = ref(db, `db/Users/${current_user}/discover_cards`);
      onValue(music_ref, (snapshot) => {
        const data = snapshot.val();
        const cards = Object.keys(data).map(key => ({
          id:key,
          ...data[key]
        }));
        setCards(cards);
      })
    }, []);

    useEffect(() => {
      setCurrentIndex(Cards.length - 1);
    }, [Cards]);

    // used for outOfFrame closure
    const currentIndexRef = useRef(currentIndex)
  
    const childRefs = useMemo(
      () =>
        Array(Cards.length)
          .fill(0)
          .map((i) => React.createRef()),
      [Cards]
    )
  
    const updateCurrentIndex = (val) => {
      setCurrentIndex(val)
      currentIndexRef.current = val
    }
  
    const canGoBack = currentIndex < Cards.length - 1
  
    const canSwipe = currentIndex >= 0
  
    // set last direction and decrease current index
    const swiped = (direction, nameToDelete, index) => {
      setLastDirection(direction)
      updateCurrentIndex(index - 1)
      console.log(nameToDelete);
    }
  
    const outOfFrame = (name, idx) => {
      console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
      // handle the case in which go back is pressed before card goes outOfFrame
      currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
      // TODO: when quickly swipe and restore multiple times the same card,
      // it happens multiple outOfFrame events are queued and the card disappear
      // during latest swipes. Only the last outOfFrame event should be considered valid
    }
  
    const swipe = async (dir) => {
      if (canSwipe && currentIndex < Cards.length) {
        await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        console.log(childRefs[currentIndex]);
      }
    }
  
    // increase current index and show card
    const goBack = async () => {
      if (!canGoBack) return
      const newIndex = currentIndex + 1
      updateCurrentIndex(newIndex)
      await childRefs[newIndex].current.restoreCard()
    }
  
    return (
      <div className='card-system-wrapper'>
        <div className='cardContainer' style={{
          position:"relative"
        }}>
          {Cards.map((card, index) => (
            <TinderCard
              ref={childRefs[index]}
              className='swipe'
              key={card.id}
              onSwipe={(dir) => swiped(dir, card.title, index)}
              onCardLeftScreen={() => outOfFrame(card.title, index)}
            >
                <Card
                    Title = {card.title}
                    AuthorName = {card.author_name}
                    Background = {card.background_image} 
                    CurrentMusic = {card.src}    
                />
            </TinderCard>
          ))}
        </div>

        <div className="card-buttons-wrapper">
            <CardButton icon={
                <AiFillDislike className="card-button-icon" style={{color:"#fb745d"}}/>
            } OnClick = {() => swipe('left')} />
            <CardButton icon={
                <RiArrowGoBackFill className="card-button-icon" style={{color:"#2bb4c9"}}/>
            } OnClick = {() => goBack()}/>
            <CardButton icon={
                <AiFillLike className="card-button-icon" style={{color:"#4dcc94"}}/>
            } OnClick = {() => swipe('right')}/>
        </div>
      </div>
)}

export default CardPack