import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [userData , setUserData] = useState('');
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home userData={userData} setUserData={setUserData}/>} />
          <Route path='/login' element={<Login setUserData={setUserData} />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
