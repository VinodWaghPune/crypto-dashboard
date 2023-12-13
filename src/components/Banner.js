import React, { useState ,useContext} from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useEffect } from "react";
import { cryptoContext } from "./CryptoContext";

import axios from "axios";
import { TrendingCoins } from "../config/Api";
import { Link } from "react-router-dom";

const Banner = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);

  const {currency,setCurrency} = useContext(cryptoContext)

  const fetchTrendingCoins = async () => {
    try {
      const response = await axios.get(TrendingCoins(currency));

      setTrendingCoins(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log("error" + error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = trendingCoins.map((each, index) => {
    return (
      <div key={index} className="card w-44 bg-base-100  mt-10">
        <figure>
          
          <img src={each.image} alt="Slide 1" className="h-16 mt-4" />
        </figure>
        <div className="card-body">
          <h3 className="card-title"><Link to={`/coins/${each.id}`} >{each.name}</Link> </h3>
          <p className="text-xs">{ currency + ' '+ each.current_price}</p>
          <p className={`${each.price_change_percentage_24h<0?'text-red-500 text-xs':'text-green-500 text-xs'}`}>{each.price_change_percentage_24h}%</p>
        </div>
      </div>
    );
  });

  //   const items = [
  //     <div key={1}><img src="/images/slide1.jpg" alt="Slide 1" /></div>,
  //     <div key={2}><img src="/images/slide2.jpg" alt="Slide 2" /></div>,
  //     <div key={3}><img src="/images/slide3.jpg" alt="Slide 3" /></div>,
  //   ];

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <AliceCarousel
      items={items}
      autoPlay
      autoPlayInterval={1000}
      buttonsDisabled
      disableButtonsControls
      dotsDisabled
      disableDotsControls
      infinite
      responsive={responsive}
    />
  );
};

export default Banner;
