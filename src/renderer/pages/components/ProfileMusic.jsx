import React, { useState } from 'react';

const ProfileMusic = ({music}) => {
    const [Music, setMusic] = useState({
        picture:"https://mir-s3-cdn-cf.behance.net/project_modules/disp/4c4b8657607557.59dcb9a812311.png",
        title:"The Unforgivabale",
        author_name:"Mike Late",
        time:100
    });

    function FormatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        
        const minutesString = String(minutes).padStart(2, '0');
        const secondsString = String(remainingSeconds).padStart(2, '0');
        
        return `${minutesString}:${secondsString}`;
    }

    return (
        <div className='music-object-profile'>
            <div className="music-obj">
                <div className="music-picture-profile" style={{ background: `url(${Music.picture})`, backgroundSize:'cover'}}></div>
                <div className="profile-music-names">
                    <h2 className="profile-music-name">{Music.title}</h2>
                    <h3 className="profile-music-author-name">{Music.author_name}</h3>
                </div>
                <h3 className="profile-music-timestamp">{FormatTime(Music.time)}</h3>
            </div>
            <div className="info-separator"></div>
        </div>
    );
}

export default ProfileMusic;
