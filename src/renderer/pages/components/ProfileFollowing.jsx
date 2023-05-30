import {useState} from 'react';

const ProfileFollowing = ({following_artist}) => {
    // following artist => contains {name, id}
    // Function to find an artist according to his id
    const [Artist, setArtist] = useState({name:'Mike', id:12, picture:'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}); 
    return (
        <div className='following-artist-profile'>
            <div className="artist-obj">
                <div style={{ background: `url(${Artist.picture})`, backgroundSize:'cover'}} className="following-artist-image"></div>
                <h2 className="following-artist-name">{Artist.name}</h2>
            </div>
            <div className="info-separator"></div>
        </div>
    );
}

export default ProfileFollowing;
