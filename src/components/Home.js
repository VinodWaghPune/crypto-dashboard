import React from 'react'

import Banner from './Banner';
import Cointable from './Cointable';


function Home() {
  return (
    <div>
        {/* courosel */}
        
        <div className="bg-cover bg-center h-72" style={{ backgroundImage: 'url(/banner2.jpg)' }}>
            <Banner/>
           

        </div>
        <Cointable/>
    </div>
  )
}


export default Home