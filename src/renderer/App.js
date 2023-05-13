import './login_system/LoginSystemApp.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Register from './login_system/Register';
import VerifyEmail from './login_system/VerifyEmail';
import Login from './login_system/Login';
import {useState, useEffect} from 'react';
import {AuthProvider} from './login_system/AuthContext';
import {auth} from './login_system/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import PrivateRoute from './login_system/PrivateRoute';
import {Navigate} from 'react-router-dom';

// Custom Imports
import Packager from './pages/Packager'
import Home from './pages/Home';
import Discover from './pages/Discover';
import Cursor from './pages/components/Cursor';
import Loading from './pages/Loading';
import Playlists from './pages/Playlists';
import Profile from './pages/Profile';
import './styles/index.css';
import {sendEmailVerification} from 'firebase/auth'

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const [timeActive, setTimeActive] = useState(false)
  
  useEffect(() => {
    console.log(currentUser?.email)
    
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  })

  return (
    <Router>
      <AuthProvider value={{currentUser, timeActive, setTimeActive}}>
        <Routes>
          
          {/* Main Route */}
          <Route path='/index.html' element={
            <PrivateRoute>
              <Navigate to={'/Home'} replace/>
            </PrivateRoute>
          }/>
          
          {/* Login System Routes */}
          <Route path="/login" element={
            !currentUser?.emailVerified 
            ? <Login/>
            : <Navigate to='/index.html' replace/>
          } />
          <Route path="/register" element={
            !currentUser?.emailVerified 
            ? <Register/>
            : <Navigate to='/index.html' replace/>
          } />
          <Route path='/verify-email' element={<VerifyEmail/>} /> 
          
          {/* The UI Routes (pages for instance) */}
          <Route path='/Home' element={
            <Packager 
              ChildElement={<Home current_user={'Red0bsi'}/>}
              current_user={"Red0bsi"}/>
            }/>
          <Route path='/Discover' element={
            <Packager 
              ChildElement={<Discover current_user={'Red0bsi'}/>} 
              current_user={"Red0bsi"}/>
            }></Route>
          <Route path='/Playlists' element={
            <Packager
              ChildElement={<Playlists current_user={'Red0bsi'}/>}
              current_user={'Red0bsi'}/>
          }/>
          <Route path='/Profile' element={
            <Packager
              ChildElement={<Profile current_user={'Red0bsi'}/>}
              current_user={'Red0bsi'}/>
          }/>

          {/* Misc Routes */}
          <Route path='/loading' element={
            currentUser === undefined
            ? <Loading/>
            : <Navigate to='/index.html' replace/>
          }></Route>

        </Routes>
        <Cursor/>  
      </AuthProvider>
  </Router>
  );
}

export default App;
{/*<Packager
    ChildElement={<Playlists current_user={'Red0bsi'}/>}
    current_user={'Red0bsi'}/>*/}