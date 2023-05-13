import { FaHome } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import { CgPlayListSearch } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { useState } from "react";

const SideBar = () => {
  const [ProfilePictureURL, setProfilePictureURL] = useState('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  return (
    <div className="SideBar">
      <div className="Menu">
        <Link to='/Home'>
          <div className="Link-Menu">
            <FaHome/>
          </div>
        </Link>
        <Link to='/Discover'>
          <div className="Link-Menu">
            <RxMagnifyingGlass/>
          </div>
        </Link>
        <Link to='/Playlists'>
          <div className="Link-Menu">
            <CgPlayListSearch/>
          </div>
        </Link>
        <Link to='/Profile'>
          <div className="Link-Menu" id="profile-link">
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SideBar