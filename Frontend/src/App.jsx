import './assets/Styles/App.css'
import { Route, Routes } from 'react-router-dom'
import Footer from './componets/Footer'
import Header from './componets/Header'
import Home from './componets/Home'
import Register from './componets/Register'
import Login from './componets/Login'
import Authprovider from './componets/Authprovider'
import Dashboard from './componets/Dashboard/Dashboard'
import Privateroutes from './Privateroutes'
import Publicroutes from './Publicroutes'


function App() {
  return (
    <>
    <Authprovider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
         <Route path='/register' element={<Publicroutes><Register/></Publicroutes>} />
         <Route path='/login' element={<Publicroutes><Login/></Publicroutes>} />
         <Route path='/dashboard' element={<Privateroutes><Dashboard/></Privateroutes>} />
      </Routes>

      <Footer />
      </Authprovider>
    </>
  )
}

export default App
