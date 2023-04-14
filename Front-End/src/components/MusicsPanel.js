import MusicElement from "./MusicElement";
import { useState, useEffect } from "react";
import { db } from "../lib/init-firebase";
import { ref, onValue } from "firebase/database";

const MusicsPanel = ({ toggleMusic, current_user }) => {

  const [Musics, setMusics] = useState([]);

  useEffect(() => {
    const music_ref = ref(db, `db/Users/${current_user}/house_musics`);
    onValue(music_ref, (snapshot) => {
      const data = snapshot.val();
      const musics = Object.keys(data).map(key => ({
        id:key,
        ...data[key]
      }));
      setMusics(musics);
      console.log(musics);
    })
  }, []);


  return (
    <div className="GridFlexBox">
        {Musics.map((music) => (<MusicElement key={music.id}
                                              Background={music.background_image} 
                                              Title={music.title} 
                                              AuthorName = {music.author_name}
                                              OnClick = {() => {toggleMusic(music.src)}}
                                              CurrentMusic = {music.src}
        />))}
    </div>
  )
}

export default MusicsPanel