import React from 'react'
import { Link } from 'react-router-dom'
import '../assets/Styles/header.css'

const Header = () => {
  return (
    <>
      <div className="navbar">
        
        <Link to="/" className='navname'>
          Stock Prediction Portal
        </Link>
    <div className='navabr-btn'>
        <Link to="/login" >
          <button className='butt'>Login</button>
        </Link>

        <Link to="/register"  >
          <button className='but'>Register</button>
        </Link>
</div>
      </div>
    </>
  )
}

export default Header
