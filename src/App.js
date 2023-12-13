import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { useState,useEffect } from "react";
import { cryptoContext } from "./components/CryptoContext";
import Coingpage from "./components/Coingpage";



function Hello(){

  console.log('from outside')

useEffect(() => {

  console.log('from use effect')
  
}, [])



  return (<div>hello world</div>)
}

function App() {

  const [currency,setCurrency] = useState('USD')

  return (
    <div className='bg-gradient-to-r from-blue-300 to-white'>
    <cryptoContext.Provider value={{currency,setCurrency}}>
    <Router>
      <div className="">
        <Navbar />
        {/* main content */}

        <div className="container">
          <Routes>
            <Route exact path="/" Component={Home}></Route>
            <Route exact path="/about" Component={About}></Route>
            <Route exact path="/coins/:coin" Component={Coingpage}></Route>
          </Routes>
        </div>
      </div>
    </Router>
    </cryptoContext.Provider>
    </div>
  );
}

export default App;
