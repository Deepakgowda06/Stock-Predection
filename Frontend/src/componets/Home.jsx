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
            This Stock Prediction Portal uses Machine Learning techniques to analyze 
            historical stock market data and forecast future price movements. 
            It provides visual insights including price trends, 100-day and 200-day 
            moving averages, and a final predicted result graph. 
            Users can enter any stock ticker symbol to view performance analysis 
            and model evaluation metrics such as Mean Squared Error (MSE) and 
            Root Mean Squared Error (RMSE). 
            This platform helps investors and learners understand stock behavior 
            using data-driven predictions.
          </p>
           <Link to="/dashboard" >
          <button className='butt'>Explore Now</button>
        </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
