import React, { useContext } from 'react'
import { cryptoContext } from './CryptoContext'
import { Link } from 'react-router-dom'

function Navbar() {

    const {currency,setCurrency} = useContext(cryptoContext)

    const handleCurrencyChange = (e)=>{

        setCurrency(e.target.value)

    }

  return (
    <div className=' h-24 relative'>
        <h1 className='font-bold ml-10 align-middle'><Link to='/'>Crypto Personal Dashboard</Link></h1>
        <div className='absolute right-5 mb-8'>
            <select name="currency" id="" className='select select-bordered' value={currency} onChange={handleCurrencyChange}>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
            </select>
        </div>
    </div>
  )
}

export default Navbar