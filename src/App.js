import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import ErrorPage from './pages/ErrorPage'
import NavBootstrap from './components/NavBootstrap'
import Profile from './pages/Profile'
import ManageHistory from './pages/profile/ManageHistory'
import ManageLogInfo from './pages/profile/ManageLogInfo'
import { AuthContextProvider } from './contexts/AuthContext'
import ProtectdedRoute from './components/ProtectedRoute'
import Registration from './pages/Registration'
import MemoryGame from './pages/profile/MemoryGame'
import Footer from './components/Footer'



function App() {
  return (
    <div className="app-container">
     <AuthContextProvider>
        <NavBootstrap />
        <div className='content-wrapper'>
          <div className='content'>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='*' element={ <ErrorPage/> } />
        <Route path='/about' element={<About />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/profile' element={<ProtectdedRoute><Profile /></ProtectdedRoute>} >
          <Route path='/profile/manageHistory' element={ <ManageHistory /> } />
          <Route path='/profile/manageLogInfo' element={<ManageLogInfo />} />
          <Route path='/profile/memoryGame' element={ <MemoryGame /> } />
        </Route>
        </Routes>
        </div>
        <Footer />
        </div>
      </AuthContextProvider>
    </div>
  );
}

export default App;
