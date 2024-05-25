import React from 'react'
import LoginerrorAni from '../assets/notfound.json'
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';  

const LoginError = () => {

  const Navigate = useNavigate();

  const returback = (e) => {
    e.preventDefault();
    Navigate('/');
  }

  return (
    <>
    <div className='mt-16'>
        <Lottie animationData={LoginerrorAni} className='animation h-72'  />
        <div className="flex justify-center">
            <h1 className='text-red-600 font-bold text-4xl ' >Please Go Back</h1>
            <button className='ml-4 text-xl bg-green-600 text-white cursor-pointer 
             px-6 rounded-lg' onClick={returback}>Home</button>
          </div>
    </div>
    </>
  )
}

export default LoginError