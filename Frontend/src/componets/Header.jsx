import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../assets/Styles/header.css'
import { AuthContex } from './Authprovider'

const Header = () => {
  const {isloggedin,setisloggedin}=useContext(AuthContex)
  const navi=useNavigate()

  const handellogout=()=>{
    localStorage.removeItem("AccessToken")
    localStorage.removeItem("RefreshToken")
    setisloggedin(false)
    navi("/login")
    
  }
  return (
    <>
      <div className="navbar">
        
        <Link to="/" className='navname'>
          Stock Prediction Portal
        </Link>
    <div className='navabr-btn'>
      {isloggedin ? (<>
      <Link to='/dashboard'>
      <button className='but' style={{fontWeight:"bold"}}>
        Dashboard
      </button>
      </Link>
      <button onClick={handellogout} className='but'  style={{fontWeight:"bold",color:"white",background:"red",border:"none"}}>Logout</button>
      </>)
      :
      <>
        <Link to="/login" >
          <button className='butt'>Login</button>
        </Link>

        <Link to="/register"  >
          <button className='but'>Register</button>
        </Link>
      </>}
</div>
      </div>
    </>
  )
}

export default Header
