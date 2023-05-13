import {useState, Fragment} from 'react';
import Playlist from './components/Playlist';

import '../styles/playlists.css'

const Playlists = ({current_user}) => {
  const [trendingAuthor, setTrendingAuthor] = useState("Mike Jonnah")
  const [trendingTitle, setTrendingTitle] = useState("On My Way To Success")
  const [trendingListeners, setTrendingListeners] = useState('32,500');
  const [playlists, setPlaylists] = useState(["My Playlist", "Second Playlist", "More Playlist"]);
  const MAX_LENGTH = 12; // Maximum length before line break
  
  function formatTitle(title) {
    const lines = [];
    let startIndex = 0;
    
    // Iterate over the title and split it into substrings of length MAX_LENGTH
    while (startIndex < title.length) {
      const endIndex = Math.min(startIndex + MAX_LENGTH, title.length);
      const line = title.substring(startIndex, endIndex);
      lines.push(line);
      startIndex += MAX_LENGTH;
    }
    
    return lines;
  }
  
  return (
    <div className='playlist-page-container'>
        <div className="trending-wrapper">
          <div className="trending-headers">
            <h2 className="big-playlist-title">Trending<span className='gradiant-point'>.</span></h2>
            <h3 className="small-playlist-text" id="show-more-trending">Show More <span id='arrow-show-more' class="animated-arrow">→</span></h3>
          </div>
          <div className="trending-block">
            <div className="trending-up-side">
              {/* This is just for the Title of the Trending and the author */}
              <h4 className="small-playlist-text" id="trending-author">{trendingAuthor}</h4>
              <h3 className="big-playlist-text" id="trending-title">
                {formatTitle(trendingTitle).map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    {index < formatTitle(trendingTitle).length - 1 && <br/>}
                  </Fragment>
                ))}  
              </h3>
            </div>
            <div className="trending-down-side">
              {/* This is for the play button and the follow button with the number of listeners data */}
              <div className="trending-ui">
                <button className="trending-play-button">Play</button>
                <button className="trending-follow-button">Follow</button>
              </div>
              <div className="listeners-details">
                <h4 className="small-playlist-text" id="listeners-details-title">Number of listeners</h4>
                <h4 className="small-playlist-text" id="listeners-details-number">{trendingListeners}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="playlists">
          {playlists.map((playlistName) => {
            return <Playlist playlistName={playlistName}/>
          })}
        </div>
    </div>
  )
}

export default Playlists