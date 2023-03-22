import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About.jsx'
import ErrorPage from './pages/ErrorPage'
import NavBar from './components/NavBar'

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='*' element={ <ErrorPage/> } />
        <Route path='/about' element= { <About /> } />
      </Routes>
    </>
  );
}

export default App;
