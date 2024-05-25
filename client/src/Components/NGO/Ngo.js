import React, { useEffect, useContext, } from 'react'
import { useNavigate } from 'react-router-dom';
import CardR from './CardR'
import RESContext from '../context/RES/RESContext';
import LoginerrorAni from '../../assets/loginfirst.json'
import Lottie from 'lottie-react';
// import { useNavigate } from 'react-router-dom'


const Ngo = () => {
  const Navigate = useNavigate();
  const context = useContext(RESContext);
  const { RES, getRES } = context;
  
  const email = localStorage.getItem('email');
  // console.log("inside ngo: " , localStorage.getItem('email'));


  useEffect(() => {
    getRES(email);
  }, []);

  const returback = (e) => {
    e.preventDefault();
    Navigate('/');
  }

  return (
    <>
    {(localStorage.getItem('userAuthToken'))?
    <div className='flex justify-end mx-[100px] mt-6'>
    <button 
    onClick={() => Navigate('/orders')} 
  
    className="middle none center mr-3 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    data-ripple-light="true"
  >
    My Orders
  </button>
    </div>
    :<></>}
      {(!localStorage.getItem('ngoAuthToken') && (!localStorage.getItem('userAuthToken')))
        ?
        <div className='mt-16'>
          <Lottie animationData={LoginerrorAni} className='animation h-72' />
          <div className="flex justify-center">
            <h1 className='text-red-600 font-bold text-4xl ' >Please Login First </h1>
            <button className='ml-4 text-xl bg-green-600 text-white cursor-pointer 
            px-6 rounded-lg' onClick={returback}>Home</button>
          </div>
        </div>
        :
        <>
          <div className='mt-6 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
            {Array.isArray(RES) && RES.length > 0 ? (
              RES.map((Res) => {
                return (
                  <CardR res_detail={Res} />
                  // <Notes_card note={note} updateNote={updateNote} key={note.id} />
                );
              })
            ) : (
              <p>No ngo available</p>
            )}
          </div>
        </>
      }

    </>
  )
}

export default Ngo;