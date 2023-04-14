import { FaHome } from "react-icons/fa";
import { RxMagnifyingGlass } from "react-icons/rx";
import { CgPlayListSearch } from "react-icons/cg";
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="SideBar">
      <div className="Menu">
        <div className="Link-Menu">
          <FaHome/>
          <Link to='/'>Home</Link>
        </div>
        <div className="Link-Menu">
          <RxMagnifyingGlass/>
          <Link to='/Discover'>Discover</Link>
        </div>
        <div className="Link-Menu">
          <CgPlayListSearch/>
          <Link to='/Playlists'>Playlists</Link>
        </div>
      </div>
    </div>
  )
}

export default SideBar