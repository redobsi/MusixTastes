import { useState, useEffect } from "react"
import Cursor from "./components/Cursor";
//import MusicPlayer from "./MusicPlayer";
import SideBar from "./components/SideBar";
import Home from "./Home";
import Discover from "./Discover";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const Packager = ({ChildElement, current_user}) => {
    const [currentUser, setCurrentUser] = useState("Red0bsi")
    useEffect(() => {
      setCurrentUser(current_user)
    }, [currentUser])
    return (
        <div className='container'>
          <SideBar/>
          {ChildElement}
        </div>
    )
  }
  
export default Packager