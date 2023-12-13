import React, { useState, useContext, useEffect } from "react";
import { CoinList, SingleCoin } from "../config/Api";
import { cryptoContext } from "./CryptoContext";
import axios from "axios";
import Paging from "./Paging";
import { Link } from "react-router-dom";

function Cointable() {
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const { currency, setCurrency } = useContext(cryptoContext);
  const [page, setPage] = useState("1");
  const [searchtext, setSearchtext] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrderAsc, setSortOrderAsc] = useState(true);
  const [priceChange, setPriceChange] = useState({});

  // to load initial data
  useEffect( () => {

    async function fetch() {
      let coindata = {};
      let pricedata = {};
      // console.log('useeffect called')
      if (localStorage.getItem("fetchCoins" + currency+page) === null) {
        coindata = await fetchCoins();

        // const dynamicObject = {};

        // const response = await fetchSingleCoin('bitcoin');
        // dynamicObject['bitcoin'] = response;



        // coindata.forEach(async (each) => {
        //   const id = each.id;

        //   dynamicObject[id] = await fetchSingleCoin(id);
        // });

       // setPriceChange(dynamicObject);
        //console.log("dynamic");
        //console.log(dynamicObject);

        coindata !== undefined && localStorage.setItem("fetchCoins" + currency+page, JSON.stringify(coindata));
        // localStorage.setItem(
        //   "coinpriceChange" + currency+page,
        //   JSON.stringify(dynamicObject)
        // );

        // console.log('localstorage is null')
        // console.log(coindata)
      } else {
        coindata = JSON.parse(localStorage.getItem("fetchCoins" + currency+page));
        // let pricedata= {'':{}}
        // if (localStorage.getItem("coinpriceChange" + currency+page) !== null ) {
        //     pricedata = JSON.parse(localStorage.getItem("coinpriceChange" + page));
        // }


        // coindata.forEach(async (each) => {
        //     const id = each.id;
        //     if( pricedata[id] === null || pricedata[id] === undefined)
        //     {

        //         let  singlecoin = {}
        //         //singlecoin = await fetchSingleCoin(id);
        //        // console.log('singlecoin' + singlecoin)
        //         pricedata[id] = singlecoin;

        //     }
  
           
        //   });

        //   localStorage.setItem(
        //     "coinpriceChange" + page,
        //     JSON.stringify(pricedata)
        //   );


        console.log("localstorage is not null");
      }
      setCoins(coindata);
      setFilteredCoins(coindata);
      setPriceChange(pricedata);
    }

     fetch();

    // console.log(filteredCoins)
  }, [currency,page]);

  const fetchSingleCoin = async (id) => {
    try {
      const response = await axios.get(SingleCoin(id));

      return response.data;
      //console.log(singleCoin)
    } catch (error) {
      console.log("error" + error);
    }
  };

  const fetchCoins = async () => {
    try {
      const response = await axios.get(CoinList(currency, page));

      console.log("fetch coin" + response.data);

      //   const dynamicObject = {};

      //   response.data.forEach((each)=>{
      //     const id = each.id;

      //         dynamicObject[id] = fetchSingleCoin(id);

      //   })

      //   setPriceChange(dynamicObject);
      //   console.log('dynamic')
      //   console.log(dynamicObject)

      return response.data;
    } catch (error) {
      console.log("error" + error);
    }
    // console.log('fetch coin called');
  };

  const handlesearchChange = (e) => {
    setSearchtext(e.target.value);

    //console.log(coins.filter((each)=> each.name.toLowerCase().includes(e.target.value.toLowerCase())))
    setFilteredCoins(
      coins.filter((each) =>
        each.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  function convertToMillions(number) {
    // Check if the input is a valid number
    if (typeof number !== "number" || isNaN(number)) {
      return "Invalid input";
    }

    // Check if the number is already in millions
    if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + "M";
    }

    // If the number is less than a million, return it as is
    return number.toString();
  }

  const handleSort = (val, flag) => {
    const sortedCoins = [...filteredCoins];

    // Determine the sorting order based on the current order
    // const sortOrder = val === 'name' ? 'asc' : 'desc';

    // Sort the array based on the selected property and sorting order
    sortedCoins.sort((a, b) => {
      let comparison = true;
      if (flag) {
        comparison = parseInt(a[val]) - parseInt(b[val]);
      } else {
        comparison = a[val].localeCompare(b[val]);
      }

      setSortOrderAsc(!sortOrderAsc);

      return sortOrderAsc === true ? comparison : -comparison;
    });

    // Update the state with the sorted array and toggle the sorting order
    setFilteredCoins(sortedCoins);
  };

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center mt-5">
        <h1>CrptoCurrency Market Prices</h1>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full max-w-xs"
          value={searchtext}
          onChange={handlesearchChange}
        />
      </div>
      {coins!== undefined && coins.length === 0 ? (
        <div>
          <span className="loading loading-bars loading-xs"></span>
          <span className="loading loading-bars loading-sm"></span>
          <span className="loading loading-bars loading-md"></span>
          <span className="loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto mx-20">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    {" "}
                    <button type="button">Coin</button>{" "}
                  </th>
                  <th>
                    {" "}
                    <button type="button">Rank</button>{" "}
                  </th>
                  <th>
                    {" "}
                    <button
                      type="button"
                      onClick={() => handleSort("name", false)}
                    >
                      Name
                    </button>
                  </th>
                  <th>
                    {" "}
                    <button
                      type="button"
                      onClick={() => handleSort("current_price", true)}
                    >
                      Price {currency}
                    </button>{" "}
                  </th>
                  <th>
                    {" "}
                    <button
                      type="button"
                      onClick={() =>
                        handleSort("price_change_percentage_24h", true)
                      }
                    >
                      Change 1D
                    </button>
                  </th>
                  <th>
                    {" "}
                    <button
                      type="button"
                      onClick={() =>
                        handleSort("price_change_percentage_24h", true)
                      }
                    >
                      Change 7D
                    </button>
                  </th>
                  <th>
                    {" "}
                    <button
                      type="button"
                      onClick={() =>
                        handleSort("price_change_percentage_24h", true)
                      }
                    >
                      Change 14D
                    </button>
                  </th>
                  <th>
                    {" "}
                    <button
                      type="button"
                      onClick={() =>
                        handleSort("price_change_percentage_24h", true)
                      }
                    >
                      Change 30D
                    </button>
                  </th>
                  <th>
                    {" "}
                    <button
                      type="button"
                      onClick={() =>
                        handleSort("price_change_percentage_24h", true)
                      }
                    >
                      Change 90D
                    </button>
                  </th>
                  <th>
                    {" "}
                    <button
                      type="button"
                      onClick={() =>
                        handleSort("price_change_percentage_24h", true)
                      }
                    >
                      Change 180D
                    </button>
                  </th>
                  <th>
                    {" "}
                    <button
                      type="button"
                      onClick={() =>
                        handleSort("price_change_percentage_24h", true)
                      }
                    >
                      Change 365D
                    </button>
                  </th>

                  <th>
                    {" "}
                    <button
                      type="button"
                      onClick={() => handleSort("market_cap", true)}
                    >
                      MarketCap
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCoins.length > 0 &&
                  filteredCoins.map((each, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={each.image}
                            alt="Slide 1"
                            className="h-4 mt-2"
                          />
                        </td>
                        <td>{each.market_cap_rank}</td>
                        <td> <Link to={`/coins/${each.id}`} >{each.name} </Link></td>
                        <td>{each.current_price}</td>
                        <td
                          className={`${
                            each.price_change_percentage_24h < 0
                              ? "text-red-500 text-xs"
                              : "text-green-500 text-xs"
                          }`}
                        >
                          {each.price_change_percentage_24h}
                        </td>
                        <td
                          className={`${
                            each.price_change_percentage_24h < 0
                              ? "text-red-500 text-xs"
                              : "text-green-500 text-xs"
                          }`}
                        >
                          {each.price_change_percentage_24h}
                        </td>
                        <td
                          className={`${
                            each.price_change_percentage_24h < 0
                              ? "text-red-500 text-xs"
                              : "text-green-500 text-xs"
                          }`}
                        >
                          {each.price_change_percentage_24h}
                        </td>
                        <td
                          className={`${
                            each.price_change_percentage_24h < 0
                              ? "text-red-500 text-xs"
                              : "text-green-500 text-xs"
                          }`}
                        >
                          {each.price_change_percentage_24h}
                        </td>
                        <td
                          className={`${
                            each.price_change_percentage_24h < 0
                              ? "text-red-500 text-xs"
                              : "text-green-500 text-xs"
                          }`}
                        >
                          {each.price_change_percentage_24h}
                        </td>
                        <td
                          className={`${
                            each.price_change_percentage_24h < 0
                              ? "text-red-500 text-xs"
                              : "text-green-500 text-xs"
                          }`}
                        >
                          {each.price_change_percentage_24h}
                        </td>
                        <td
                          className={`${
                            each.price_change_percentage_24h < 0
                              ? "text-red-500 text-xs"
                              : "text-green-500 text-xs"
                          }`}
                        >
                          {each.price_change_percentage_24h}
                        </td>
                        <td>{convertToMillions(parseInt(each.market_cap))}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <Paging itemsPerPage={3} items={filteredCoins} setPage={setPage} />
        </div>
      )}
    </div>
  );
}

export default Cointable;
