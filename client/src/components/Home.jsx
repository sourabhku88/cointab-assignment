import React, { useEffect } from 'react'
import { useState } from 'react'
import Login from './Login'

const Home = ({ userData ,setUserData}) => {
  const [data , setData] = useState();
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('data')));
  }, [])
  
  return (
    <>
      {localStorage.getItem('token') === null ? <Login setUserData={setUserData} /> :
        <div className="home d-flex justify-content-center align-items-center flex-column">
          <h1> {JSON.parse(localStorage.getItem('data')).name}</h1>
          <h3>{JSON.parse(localStorage.getItem('data')).email}</h3>
        </div>
      }

    </>
  )
}

export default Home