import React from 'react';
import ProfileFollowing from './components/ProfileFollowing.jsx';
import ProfileMusic from './components/ProfileMusic'
import '../styles/profile.css';

const Profile = () => {
  const current_user = {
    name: 'Red0bsi',
    title: 'Music Producer',
    bio: 'Passionate about creating awesome music and sharing it with the world.',
    following: 150,
    followings: ['Artist 1'],
    followers: 5000,
    musics: 209,
    owned_musics: ['Music 1'],
    website: 'https://www.example.com',
    location: 'Los Angeles, USA',
    email: 'red0bsi@example.com',
    socialMedia: [
      { platform: 'Twitter', id: 'red0bsi' },
      { platform: 'Instagram', id: 'red0bsi' },
    ],
  };

  const {
    name,
    title,
    bio,
    following,
    followings,
    followers,
    musics,
    owned_musics,
    website,
    location,
    email,
    socialMedia,
  } = current_user;

  return (
    <div className="main" style={{ backgroundColor: '#1F1F1F' }}>
      <div className="profile-card">
        <div className="image">
          <img
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="profile-pic"
          />
        </div>
        <div className="data">
          <h2 style={{ color: '#FFFFFF' }}>{name}</h2>
          <span style={{ color: 'FFFFFF' }}>{title}</span>
          <p style={{ color: 'FFFFFF' }}>{bio}</p>
        </div>
        <div className="info-row">
          <div className="info">
            <h3 style={{ color: '#FFFFFF' }}>Following</h3>
            <span style={{ color: 'FFFFFF' }}>{following}</span>
          </div>
          <div className="info">
            <h3 style={{ color: '#FFFFFF' }}>Followers</h3>
            <span style={{ color: 'FFFFFF' }}>{followers}</span>
          </div>
          <div className="info">
            <h3 style={{ color: '#FFFFFF' }}>Musics</h3>
            <span style={{ color: 'FFFFFF' }}>{musics}</span>
          </div>
        </div>
        <div className="info-details">
          <div className="musics-details">
            <div className="header-profile">Musics</div>
            <div className="profile-detail-wrapper" id="musics-profile">
              {owned_musics.map((music_name) => {return <ProfileMusic music_name={music_name}/>})}
            </div>
          </div>
          <div className="follow-details">
            <div className="header-profile">Followings</div>
            <div className="profile-detail-wrapper" id="followings-profile">
              {followings.map((following) => {return <ProfileFollowing following_artist={following}/>})}
            </div>
          </div>
        </div>
        <div className="additional-info">
          {website && (
            <div className="info">
              <h3 style={{ color: '#FFFFFF' }}>Website</h3>
              <a href={website} style={{ color: 'FFFFFF' }}>
                {website}
              </a>
            </div>
          )}
          {location && (
            <div className="info">
              <h3 style={{ color: '#FFFFFF' }}>Location</h3>
              <span style={{ color: 'FFFFFF' }}>{location}</span>
            </div>
          )}
          {email && (
            <div className="info">
              <h3 style={{ color: '#FFFFFF' }}>Email</h3>
              <span style={{ color: 'FFFFFF' }}>{email}</span>
            </div>
          )}
          {socialMedia && (
            <div className="info">
              <h3 style={{ color: '#FFFFFF' }}>Social Media</h3>
              {socialMedia.map((social) => (
                <a
                  className="social-media-details"
                  key={social.platform}
                  style={{color: 'FFFFFF' }}
                >
                  {social.platform+' : '+social.id}
                  <br/>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;