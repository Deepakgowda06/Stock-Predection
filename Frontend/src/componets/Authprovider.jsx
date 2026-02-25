import React, { createContext, useState } from 'react'

// create context
const AuthContex = createContext();

const Authprovider = ({ children }) => {

  const [isloggedin, setisloggedin] = useState(
    !!localStorage.getItem("AccessToken")
  );

  return (
    <AuthContex.Provider value={{ isloggedin, setisloggedin }}>
      {children}
    </AuthContex.Provider>
  );
}

export default Authprovider;
export { AuthContex };
