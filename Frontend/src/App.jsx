import './assets/Styles/App.css'
import { Route, Routes } from 'react-router-dom'
import Footer from './componets/Footer'
import Header from './componets/Header'
import Home from './componets/Home'

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
