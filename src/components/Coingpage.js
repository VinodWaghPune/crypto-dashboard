import React from "react";
import { Line } from "react-chartjs-2";
import Linegrapgh from "./Linegrapgh";
import { useParams } from "react-router-dom";
import { HistoricalChart ,SingleCoin} from "../config/Api";
import axios from "axios";
import { useState, useEffect ,useContext} from "react";
import { cryptoContext } from "./CryptoContext";

function Coingpage() {
  const { coin } = useParams();
  console.log("coin is " + coin);
  const [history, setHistory] = useState([]);
  const [days,setDays] = useState(7);
  const {currency,setCurrency} = useContext(cryptoContext)
  const [singleCoin,setSingleCoin]=useState(null)

  useEffect(() => {
  
    fetchCoinHistory();
    fetchSingleCoin();
    console.log("history" + history);
    
  }, [days,currency]);

  const fetchCoinHistory = async () => {
    try {
      const response = await axios.get(HistoricalChart(coin, days, currency));

      setHistory(response.data.prices);
    } catch (error) {
      //console.log("error" + error);
    }
  };

  const fetchSingleCoin= async ()=>{
    try {
        const response = await axios.get(SingleCoin(coin));
  
        setSingleCoin(response.data);
        console.log(singleCoin)
      } catch (error) {
        console.log("error" + error);
      }

  }

  const handledays = (e)=>{

    let val = e.currentTarget.getAttribute('data-value')

    val = parseInt(val)
    console.log('days' + val)
    setDays(val)
  }

  return (
    <div className="flex">
      <div className="w-[30%]  border-slate-800 border-dotted relative">

    {singleCoin && <div className="container absolute left-16">
    <img src={singleCoin.image.large} alt="" className="h-36 w-36 items-center"/>
       <p className="text-left font-bold text-2xl"> {singleCoin.name}</p>
    <table className="table w-72">
    
        

        <tbody>
        <tr> <td>1 day </td><td> {singleCoin.market_data.price_change_percentage_24h}%</td></tr>
        <tr> <td>7 day </td><td> {singleCoin.market_data.price_change_percentage_7d}%</td></tr>
        <tr> <td>14 day </td><td> {singleCoin.market_data.price_change_percentage_14d}%</td></tr>
        <tr> <td>30 day </td><td> {singleCoin.market_data.price_change_percentage_30d}%</td></tr>
        <tr> <td>60 day </td><td> {singleCoin.market_data.price_change_percentage_60d}%</td></tr>
        <tr> <td>200 day </td><td> {singleCoin.market_data.price_change_percentage_200d}%</td></tr>
        <tr> <td>365 day </td><td> {singleCoin.market_data.price_change_percentage_1y}%</td></tr>



        </tbody>
        </table>
        </div>

    
}
    
      </div>
      <hr />
      <div className="w-[70%]">
        <Linegrapgh
          chartData={{
            labels: history.map((each) => {
              let date = new Date(each[0]);
              return date.toLocaleDateString();
            }),
            datasets: [
              {
                label: "prices",
                data: history.map((each) => each[1]),
                borderColor: "black",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />

        <div className="flex items-center justify-center">
          <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
            <li>
              <a data-value='30' onClick={handledays}>Monthly</a>
            </li>
            <li>
              <a data-value='90' onClick={handledays}>Quaterly</a>
            </li>
            <li>
              <a data-value='365' onClick={handledays}>Annualy</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Coingpage;
