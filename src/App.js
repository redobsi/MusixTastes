import { useState, useEffect } from "react"
import Cursor from "./components/Cursor";
//import MusicPlayer from "./components/MusicPlayer";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = useState("user_1")
  const [currentMusic, setCurrentMusic] = useState("")

  return (
      <div className='container'>
        <Router>
          <SideBar/>
          <Routes>
            <Route path='/' element={<Home current_user={currentUser}/>}/>
            <Route path='/Discover' element={<Discover current_user={currentUser}/>}></Route>
          </Routes>
           <Cursor/>
        </Router>
      </div>
  )
}

export default App;