import { useState, Fragment } from "react";
import { formatTitle } from "../utils"
import MusicsPanel from "./components/MusicsPanel";

const Home = ({ current_user }) => {

  const [trendingAuthor, setTrendingAuthor] = useState("Mike Jonnah")
  const [trendingTitle, setTrendingTitle] = useState("On My Way To Success")
  const [trendingListeners, setTrendingListeners] = useState('32,500');
  const [playlists, setPlaylists] = useState(["My Playlist", "Second Playlist", "More Playlist"]);
  const MAX_LENGTH = 12; // Maximum length before line break

  return (
    <div className='Main-Wrapper'>
      <header className="music-header">
        <h2 id="header-title" className="Mini-messages">New Music That Fits Your Taste !</h2>
        <br/><br/>
        <div className="trending-block" style={{
          background:"linear-gradient(90deg, #756bff, #dcd4ff)",
        }}>
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
              </div>
              <div className="listeners-details">
                <h4 className="small-playlist-text" id="listeners-details-title">Number of listeners</h4>
                <h4 className="small-playlist-text" id="listeners-details-number">{trendingListeners}</h4>
              </div>
            </div>
          </div>
          <br/><br/>
      </header>
      <h1 className='Mini-messages'>{"Try these new songs !"}</h1>
      <MusicsPanel current_user = {current_user}/>
    </div>
  )
}

export default Home