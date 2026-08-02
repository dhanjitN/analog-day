import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router'
import AuthForm from './pages/Login.jsx'
import { MyApp } from './pages/Calendar.js'
import Navbar from './components/NavBar/Navbar.jsx'

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<App />}></Route>
          <Route path='/login' element={<AuthForm />}></Route>
          <Route path='/home' element={<MyApp />}></Route>
        </Route>
      </Routes>

    </BrowserRouter>
  </StrictMode>
)
