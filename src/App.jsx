import { useDispatch } from 'react-redux'
import './App.css'
import React, { useEffect, useState } from 'react'
import authService from './appwrite/auth'
import { login, logout } from "./store/authSlice"
import { Header, Footer } from './components'


function App() {
  //to fetch envt variable using VITE - import.meta.env.<env name>
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  const [ loading, setLoading] = useState(true) // bcz app render upon loading
  const dispatch  = useDispatch()

  // TODO : Update the code with try catch
  useEffect( () => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false)) // run every time even in case of errors
  }, []) // [] - dependency array

 return !loading ? (
  <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      <main>
        TODO 
        {/* <Outlet />   this comes form react-dom*/}
      </main>
      <Footer />
    </div>
  </div>
 ) : null
}

export default App
