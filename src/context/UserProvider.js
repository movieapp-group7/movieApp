import React, {useState} from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'

const url = process.env.REACT_APP_API_URL
// const url = 'http://localhost:3001'

export default function UserProvider({children}) {
  const userFromSessionStorage = sessionStorage.getItem('user')
  //console.log(userFromSessionStorage)
  const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage): {username: '',email: '',password: ''})

  // const signUp = async () => {
  //   const json =JSON.stringify(user);
  //   const headers = {headers:{'Content-Type':'application/json'}};
  //   try {
  //     console.log(json)
  //     //console.log(headers)
  //     await axios.post(url + '/user/register', json, headers)
  //     setUser({username: '', email: '', password: ''})
  //   }catch(error) {
  //     throw error
  //   }
  // }
  const signUp = async () => {
    const json =JSON.stringify(user);
    const headers = {headers:{'Content-Type':'application/json'}};
    try {
      await axios.post(url + '/user/register',json,headers)
      setUser({email: '',password: ''})
    }catch(error) {
      throw error
    }
  }

  const signIn = async () => {
    const json =JSON.stringify(user)
    const headers = {headers:{'Content-Type':'application/json'}}
    try {
      const response = await axios.post(url + '/user/login',json,headers)
      console.log("Login response data:", response.data);
      const token = response.data.token
      setUser(response.data)
      sessionStorage.setItem("user",JSON.stringify(response.data))
       sessionStorage.setItem('token', token); 
    }catch(error) {
      setUser({email: '',password: ''})
      throw error
    }
  }

  const signOut = () => {
    setUser({username: '', email: '', password: ''})
    sessionStorage.removeItem('user')
  }




  return (
    <UserContext.Provider value={{user,setUser,signUp,signIn, signOut}}>
      {children}
    </UserContext.Provider>
  )
}
