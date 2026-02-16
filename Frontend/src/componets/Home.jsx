import React from "react";
import '../assets/Styles/home.css'

import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <>
      <div className="container">
        <div className="container-content">
          <h1>Stock Prediction portal</h1> 
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
            officiis reiciendis tenetur odit. Id minima excepturi ipsum iste ab
            porro, natus blanditiis at perferendis mollitia illum deserunt,
            necessitatibus, officia earum. Vitae nam voluptas, mollitia
            accusamus, fuga ratione fugit, optio itaque iure cumque eligendi
            commodi cum molestiae doloremque deserunt ab doloribus!
          </p>
           <Link to="/login" >
          <button className='butt'>Login</button>
        </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
