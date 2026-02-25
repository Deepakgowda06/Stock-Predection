import React, {  useState } from 'react'
// import axios from 'axios'
import axiosnstance from '../axiosinstance'
import '../../assets/Styles/Dashboard.css'


const Dashboard = () => {
  // const accesstoken=localStorage.getItem('AccessToken')
  const [ticker,setticker]=useState('')
  const [error,seterror]=useState('')
  const [loading,setloading]=useState(false)
  const [ploat,setploat]=useState('')
  const [plot100dma, setplot100dma] = useState('')
   const [plot200dma, setplot200dma] = useState('')
      const [final, setfinal] = useState('')
      const [modelEvaluation, setModelEvaluation] = useState({
        mean_squared_error: "",
        root_mean_squared_error: "",
      });
const popularTickers = [
  "AAPL", "TSLA", "MSFT", "GOOGL", "AMZN",
  "NVDA", "RELIANCE.NS", "TCS.NS", "INFY.NS", "BTC-USD"
];
  const handelsubmit=async(e)=>{
    e.preventDefault()
    setloading(true)
    try{
      
      const response=await axiosnstance.post('/predict/',{
        ticker:ticker
      })
      console.log(response.data)
      const backendRoot=import.meta.env.VITE_BACKEND_ROOT
      const ploturl=`${backendRoot}${response.data.basic_plot}`
      setploat(ploturl)
      setplot100dma(`${backendRoot}${response.data.plot_100_dma}`)
      setplot200dma(`${backendRoot}${response.data.plot_200_dma}`)
      setfinal(`${backendRoot}${response.data.final_prediction_plot}`)
      setModelEvaluation({
        mean_squared_error: response.data.model_evaluation.mean_squared_error,
        root_mean_squared_error: response.data.model_evaluation.root_mean_squared_error,
      });


      //# 100 days moving avg



      if(response.data.error){
        seterror(response.data.error)
        setticker('')

      }

    }catch(error){
      console.log('there is error while predicting stock',error)
    }finally{
      setloading(false)
    }


  }
  return (
    <>
    <div className="dashboard-container">

      <div className="row">
        <h3>Stock Prediction Dashboard</h3>
        <form action=""  onSubmit={handelsubmit} className='prediction-form'>
          <input type="text"
          className='form-control'
          placeholder='Enter Stock Ticker'
          onChange={(e)=>setticker(e.target.value)} required
          value={ticker}
           id='inputone'/>
           <button>
           {loading ? <div >Predicting...</div>:<div>See predection</div>}
           </button>
        </form>
        <small>{error && <div style={{color:'red'}}>{error}</div>}</small>
        <div className="ticker-suggestions">
  <p>Popular Stocks:</p>
  <div className="ticker-list">
    {popularTickers.map((symbol) => (
      <button
        key={symbol}
        type="button"
        className="ticker-btn"
        onClick={() => setticker(symbol)}
      >
        {symbol}
      </button>
    ))}
  </div>
</div>
      </div>
    </div>
    {loading && <div style={{textAlign:'center',marginTop:'20px'}}>Loading...</div>}
    {!loading && !error && !ploat && <div style={{textAlign:'center',marginTop:'20px'}}>Enter a stock ticker to see the prediction.</div>}
    {ticker && !loading && !error && !ploat && <div style={{textAlign:'center',marginTop:'20px'}}>No prediction available for "{ticker}". Please try a different ticker.</div>}
    {ticker && !loading && error && <div style={{textAlign:'center',marginTop:'20px'}}>Error: {error}</div>}
    {ticker && <div> {ticker} Stock</div>}
   {ploat && (
  <div className='plot'>
    <h3>Basic Plot</h3>
    <img src={ploat} alt="Basic Plot" width="800" />
  </div>
)}

{plot100dma && (
  <div className='dma'>
    <h3>100 DMA Plot</h3>
    <img src={plot100dma} alt="100 DMA Plot" width="800" />
  </div>
)}

{plot200dma && (
  <div className='dma'>
    <h3>200 DMA Plot</h3>
    <img src={plot200dma} alt="200 DMA Plot" width="800" />
  </div>
)}


{final && (
  <div className='dma'>
    <h3>Final Predicted Result</h3>
    <img src={final} alt="Final Plot" width="800" />
  </div>
)}
    

   {modelEvaluation.mean_squared_error && (
  <div className="model-evaluation-wrapper">
    <div className="model-evaluation">
      <h3>Model Evaluation</h3>
      <p>Mean Squared Error: {modelEvaluation.mean_squared_error}</p>
      <p>Root Mean Squared Error: {modelEvaluation.root_mean_squared_error}</p>
    </div>
  </div>
)}
    </>
  )
}

export default Dashboard
