import {Navigate} from 'react-router-dom'
import {useAuthValue} from './AuthContext'

export default function PrivateRoute({children}) {
  const {currentUser} = useAuthValue()
  
  if (currentUser === undefined) {
    // If the currentUser is null that means that the data haven't loaded yet
    // So we navigate to the loading page waiting it for getting the data
    console.log('verified, was null')
    return <Navigate to='/loading' replace/>
  } 
  else if(!currentUser?.emailVerified){ // Guard clause
    console.log('verified, was null')
    return <Navigate to='/login' replace/>
  }

  return children
}