import React, {useState} from 'react'
import {setUserFrom, currentUser, removeUser} from 'src/user'

export const AuthContext = React.createContext(null)
export const SetAuthContext = React.createContext(null)

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(currentUser())
  const authenticate = (res) => {
    setUserFrom(res)
    setUser(currentUser())
  }
  return(
    <AuthContext.Provider value={user}>
      <SetAuthContext.Provider value={authenticate}>
        {children}
      </SetAuthContext.Provider>
    </AuthContext.Provider>
  )
}