import React, { useContext } from 'react'
import { AuthContex } from './componets/Authprovider'
import { Navigate } from 'react-router-dom'

const Publicroutes = ({children}) => {
    const {isloggedin}=useContext(AuthContex)
  return !isloggedin ?(
    children   
  ):(
    <Navigate to='/dashboard' />
  )
}

export default Publicroutes
