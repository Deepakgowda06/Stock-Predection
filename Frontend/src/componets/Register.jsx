import React, { useState } from 'react'
import '../assets/Styles/register.css'
import axios from 'axios'

const Register = () => {

    const [formdata,setformdata]=useState({
        username:"",
        email:"",
        password:""
    })
    const [errors,seterros]=useState({})
    const [bool,setbool]=useState(false)
    const [loading,setloading]=useState(false)

    const handelchange=(e)=>{
        setformdata({
            ...formdata,[e.target.name]:e.target.value
    })
    }

    const handelsubmit=async(e)=>{
        e.preventDefault()
         console.log(formdata)
         setloading(true)
        try{
           const response= await axios.post('http://127.0.0.1:8000/api/v1/register/',formdata)
           console.log(response)
           seterros({})
           setbool(true)

        }catch(error){
            seterros(error.response.data)
            console.log(error.response.data)

        }
        finally{
            setloading(false)
        }

        setformdata({
        username:"",
        email:"",
        password:""

        })

    }
  return (
   <>

   <div className="formdata">
   
    <form action=""  onSubmit={handelsubmit}>
         <p style={{color:"white",textAlign:"center",fontSize:"5vh"}}>Register</p>
        <input 
        type="text"
        placeholder='Enter Usernname'
        name='username'
        value={formdata.username}
        onChange={handelchange} />
        <small>{errors.username && <div style={{color:"red"}}>{errors.username}</div>}</small>
        <input 
        type="text"
        placeholder='Enter Email'
        name='email'
        value={formdata.email}
        onChange={handelchange} />
         <small>{errors.email && <div style={{color:"red"}}>{errors.username}</div>}</small>
        <input 
        type="password"
        placeholder='Enter password'
        name='password'
        value={formdata.password}
        onChange={handelchange} />
         <small>{errors.password && <div style={{color:"red"}}>{errors.username}</div>}</small>

         <small>{bool && <div style={{color:"Green",fontSize:"5vh"}}>Register Sucesfull</div>}</small>
        <button>{loading ? "Please Wait...." : "Register"} </button>
        
    </form>
   </div>


  
   </>
  )
}

export default Register
