import {useState, useEffect} from 'react';
import PlaylistMusic from './PlaylistMusic';

const Playlist = ({playlistName}) => {
    const [isShowingAll, setIsShowingAll] = useState(false);
    const [playlistMusics, setPlaylistMusics] = useState([
        {title: "Bohemian Rhapsody", artist: "Queen", time: "6:07", genre: "Rock", recommendation: "A classic!"},
        {title: "Like a Rolling Stone", artist: "Bob Dylan", time: "6:13", genre: "Rock", recommendation: "A must-listen for all music lovers."},
        {title: "I Will Always Love You", artist: "Whitney Houston", time: "4:31", genre: "Pop", recommendation: "Whitney's vocals are amazing in this song."},
        {title: "Smells Like Teen Spirit", artist: "Nirvana", time: "5:01", genre: "Grunge", recommendation: "A true anthem of the 90s."},
        {title: "Billie Jean", artist: "Michael Jackson", time: "4:53", genre: "Pop", recommendation: "A classic dance tune!"}
      ]
      ) 

    // Get the indexes of each music in the list
    useEffect(() => {
        let Counter = 0;
        let newPlaylistMusics = []
        Object.entries(playlistMusics).forEach(([i, musicObj]) => {
            Counter += 1;
            let newMusicObj = {...musicObj}
            newMusicObj['index'] = '0'+Counter
            console.log(musicObj)
            newPlaylistMusics.push(newMusicObj)
        })
        setPlaylistMusics(newPlaylistMusics)
    }, []);
    return (
        <div className='playlist-wrapper'>
            <h2 className="big-playlist-title">{playlistName}<span className='gradiant-point'>.</span></h2>
            <div className="musics-playlist-wrapper">
                
                <div className="playlist-types-wrapper">
                    <div id="number-playlist-info-type">#</div>
                    <div className="title-playlist-info-type">TITLE</div>
                    <div className="artist-playlist-info-type">ARTIST</div>
                    <div className="time-playlist-info-type">TIME</div>
                    <div className="genre-playlist-info-type">GENRE</div>
                    <div className="recommendation-playlist-info-type">RECOMMENDATION</div>
                </div>
                {/* The title/artists/Time/Genre/Recommendation */}
                {playlistMusics.map((musicObj) => {
                    return <PlaylistMusic musicObj={musicObj}/>
                })}
            </div>
            <h3 className="show-all-playlist">ShowAll</h3>
        </div>
    );
}

export default Playlist;
