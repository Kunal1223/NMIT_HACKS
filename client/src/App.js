import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Components/Home'
import About from './Components/About'
import Ngo from './Components/NGO/Ngo'
import RESState from './Components/context/RES/RESState';
import NGOState from './Components/context/NGO/NGOState';
import Restaurant from './Components/Restaurant/Restaurant';
import LoginError from './Components/Error404';
import Packets from './Components/Restaurant/Packets';
import ParticularCard from './Components/Restaurant/ParticularCard';
import ParticularResCard from './Components/NGO/ParticularResCard';
import Order from './Components/Userlogin/Order.js';
import OrderState from './Components/context/Order/OrderState';

import ResOrder from './Components/Restaurant/ResOrder.js'
function App() {
  return (
    <>
       <OrderState>
      <RESState>
        <NGOState>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/restro' element={<Restaurant />} />
              <Route path='/ngo' element={<Ngo />} />
              <Route path='*' element={<LoginError/>} />
              <Route path='/packets' element={<Packets/>} />
              <Route path='/about' element={<About />} />
              <Route path='/particular' element={<ParticularCard />} />
              <Route path='/particularres' element={<ParticularResCard />} />
              <Route path='/orders' element={<Order/>} />
              <Route path='/resorder' element={<ResOrder/>} />

            </Routes>
            <Footer />
          </BrowserRouter>
        </NGOState >
      </RESState >
      </OrderState>
    </>
  );
}

export default App;