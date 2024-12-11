import React, {useState} from 'react'
import { UserContext } from './UserContext'
import axios from 'axios'

const url = process.env.REACT_APP_API_URL
// const url = 'http://localhost:3001'

export default function UserProvider({children}) {
  const userFromSessionStorage = sessionStorage.getItem('user')
  const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage): {username: '', email: '',password: ''})

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
      setUser({username: '', email: '', password: ''})
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
      setUser({username: '', email: '', password: ''})
      throw error
    }
  }

  const signOut = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const response = await fetch(url + '/user/logout', {
            method: 'POST',
            headers,
        });

        if (response.ok) {
            setUser({ email: '', password: '' }); 
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('token');
            alert('You have been signed out.');
        } else {
            console.error('Failed to log out:', await response.text());
            alert('Failed to log out. Please try again.');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        alert('Error occurred during logout. Please try again.');
    }
};
  

  //.........................................................
  const deleteAccount = async (id) => {
    try {
      const token = sessionStorage.getItem('token');
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.delete(`${url}/user/delete`, { data: { id }, ...headers });
      return response.data;
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  };


  return (
    <UserContext.Provider value={{user,setUser,signUp,signIn, signOut, deleteAccount}}>
      {children}
    </UserContext.Provider>
  )
}
