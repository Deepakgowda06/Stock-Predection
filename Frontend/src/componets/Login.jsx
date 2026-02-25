import axios from 'axios'
import React, { useContext, useState } from 'react'
import '../assets/Styles/login.css'
import {useNavigate} from 'react-router-dom'
import { AuthContex } from './Authprovider'

const Login = () => {

    const [data,setdata]=useState({
        username:"",
        password:""
    })
    const [error,seterror]=useState({})
    const [loading,setloadng]=useState(false)
    const navigate=useNavigate()
    const {isloggedin,setisloggedin}=useContext(AuthContex)


    const handelchange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }

    const handelsubmit=async(e)=>{
        e.preventDefault()
         setloadng(true)
        try{

                const responsedata=await axios.post("http://127.0.0.1:8000/api/v1/token/",data)
                localStorage.setItem("AccessToken",responsedata.data.access)
                localStorage.setItem("RefreshToken",responsedata.data.refresh)
                console.log("login sucessful")
                navigate('/')
                setisloggedin(true)
               
                setdata({
                     username:"",
                     password:""
                })
               
                seterror({})
        }catch(error){
            console.log(error.response.data)
            seterror(error.response.data)
        }
        finally{
            setloadng(false)

        }

    }
  return (
    <>
    <div className="loginform">
        <form action="" onSubmit={handelsubmit}>
            <h4>Login</h4>
            <input 
            type="text"
            placeholder='Enter username'
            name='username'
            value={data.username}
            onChange={handelchange} />
            <small>{error && <div>{error.username}</div>}</small>

            <input 
            type="password"
            name='password'
            value={data.password}
            onChange={handelchange} />
            <small>{error && <div>{error.password}</div>}</small>
            <small>
  {error.detail && <div style={{color:"red"}}>{error.detail}</div>}
</small>
            <button>{loading ? "please wait...." :"Login"}</button>
        </form>
    </div>
    </>
  )
}

export default Login
