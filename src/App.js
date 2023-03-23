import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ErrorPage from './pages/ErrorPage'
// import NavBar from './components/NavBar'
import NavBootstrap from './components/NavBootstrap'


function App() {
  return (
    <>
      <NavBootstrap/>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='*' element={ <ErrorPage/> } />
        <Route path='/about' element= { <About /> } />
      </Routes>
    </>
  );
}

export default App;
