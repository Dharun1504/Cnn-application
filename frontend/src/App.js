import React,{useState} from 'react';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import './App.css';
import Login from './pages/loginpage';
import Signup from './pages/signuppage';
import Home from './pages/music';
import Recommendation from './pages/recommendation';
import Liked from './pages/likedsongs';
import PlayList from './pages/playlist';
function App() {
  const [ authenticated ,setAuthenticated] =useState(false) ;
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path ='/' element={<Login setAuthenticated={setAuthenticated} />}/>
          <Route path='/Signup' element={<Signup/>}/>
          <Route path='/Home/:user_id' element={<Home/>}/>
          <Route path='/home/recommendation/:user_id' element={<Recommendation/>}/>
          <Route path='/home/likedsong/:user_id' element={<Liked/>}/>
          <Route path='/home/playlist/:user_id' element={<PlayList/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
