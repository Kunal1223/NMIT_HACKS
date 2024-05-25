import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import SigninN from './NGO/SigninN';
import SigninR from './Restaurant/SigninR';
import SigninU from './Userlogin/Ulogin';

const Navbar = () => {
  const navigate = useNavigate();

  const removeToken = (tokenKey) => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem('email');
    navigate('/');
  };

  // removeToken('restroAuthToken');
  // removeToken('ngoAuthToken');



  const [SigninNOpen, setSigninNOpen] = useState(false);
  const [SigninROpen, setSigninROpen] = useState(false);
  const [SigninUOpen, setSigninUOpen] = useState(false);

  const handleSigninN = () => {
    setSigninNOpen(true);
  };

  const handleSigninR = () => {
    setSigninROpen(true);
  };

  const handleSigninU = () => {
    setSigninUOpen(true);
  };

  return (
    <>
      <div className='h-20 bg-white w-full flex justify-between mx-auto items-center'>
        <div className="nav-container ml-11 text-blue-500 font-bold text-lg">
          <NavLink to={'/'}><img src="/images/logo.png" alt='logo' className='w-48' /></NavLink>
        </div>

        <div className="heading-container">
          <NavLink to={'/'} className="mr-14 text-black-500 font-bold text-lg hover:text-green-600">Home</NavLink>

          {!localStorage.getItem('ngoAuthToken') ? (
            <button onClick={handleSigninN} className="mr-14 text-black-500 font-bold text-lg hover:text-green-600">NGO</button>
          ) : (
            <button onClick={() => removeToken('ngoAuthToken')} className="mr-14 text-red-500 font-bold text-lg hover:text-red-600">Log Out</button>
          )}

          {!localStorage.getItem('restroAuthToken') ? (
            <button onClick={handleSigninR} className="mr-14 text-black-500 font-bold text-lg hover:text-green-600">Restaurant</button>
          ) : (
            <button onClick={() => removeToken('restroAuthToken')} className="mr-14 text-red-500 font-bold text-lg hover:text-red-600">Log Out</button>
          )}

          {!localStorage.getItem('userAuthToken') ? (
            <button onClick={handleSigninU} className="mr-14 text-black-500 font-bold text-lg hover:text-green-600">User Login</button>
          ) : (
            <button onClick={() => removeToken('userAuthToken')} className="mr-14 text-red-500 font-bold text-lg hover:text-red-600">Log Out</button>
          )}

          <NavLink to={'/about'} className="mr-10 text-black-500 font-bold text-lg hover:text-green-600">About</NavLink>


        </div>

        {SigninNOpen && <SigninN show={SigninNOpen} close={() => setSigninNOpen(false)} />}
        {SigninROpen && <SigninR show={SigninROpen} close={() => setSigninROpen(false)} />}
        {SigninUOpen && <SigninU show={SigninUOpen} close={() => setSigninUOpen(false)} />}

      </div>
      <hr />
    </>
  );
};

export default Navbar;