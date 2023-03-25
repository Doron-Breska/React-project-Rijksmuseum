import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ErrorPage from './pages/ErrorPage'
import NavBootstrap from './components/NavBootstrap'
import Profile from './pages/Profile'
import ManageHistory from './pages/profile/ManageHistory'
import ManageLogInfo from './pages/profile/ManageLogInfo'


function App() {
  return (
    <>
      <NavBootstrap/>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='*' element={ <ErrorPage/> } />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} >
          <Route path='/profile/manageHistory' element={ <ManageHistory /> } />
          <Route path='/profile/manageLogInfo' element={ <ManageLogInfo /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
