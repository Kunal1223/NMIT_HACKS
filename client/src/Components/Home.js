import { Chatbot } from 'react-chatbot-kit';
import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import config from './chatbot/config';
import ActionProvider from './chatbot/ActionProvider';
import MessageParser from './chatbot/MessageParser';
import plate from '../assets/forkandplate.json';
import arrow from '../assets/arrow.json';
import hand from '../assets/helpingHand.json';
import child from '../assets/feed.json';

const VideoComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className='w-[600px] h-[400px]'>
      <video ref={videoRef} src='/images/video.mp4' loop muted playsInline autoPlay>
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <>
      <div className='home-container flex justify-between mt-6 items-center'>
        <div className='ml-32'>
          <h1 className='font-bold text-4xl'>Feed the Hungry, <br /> <span className='text-green-400'>Spread Joy.</span></h1>
          <p className='text-gray-700 mt-1'>Empowering restaurants to bring smiles by donating excess <br />food through our platform.</p>
          <button className='bg-green-400 text-white p-2 hover:bg-green-700 rounded-xl mt-4'>Provide Meal<i className="fa-solid fa-plate-wheat ml-2"></i></button>
        </div>

        <div>
          <VideoComponent />
          <div className="z-50">
            <div className="text-center cursor-pointer right-0 fixed -bottom-6" onClick={toggleChat}>
              <img src="/images/chat.png" alt="" className='h-36 rounded-3xl z-40'/>
            </div>
            <div id="chat" className={`chat z-50 fixed bottom-4 right-4 shadow-lg ${isChatOpen ? 'block' : 'hidden'}`}>
              <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-40 items-center'>
        <div className='text-center font-bold text-5xl'>What We Do</div>
        <hr className='w-60 ml-[40%] bg-green-600 h-[1px]' />

        <div className='flex justify-around mt-8'>
          <div className='plate items-center text-center font-semibold'>
            <Lottie animationData={plate} className='animation h-72' />
            <h1>Surplus food from restaurants</h1>
            <hr className='ml-10 w-48 bg-green-600 h-[2px]' />
          </div>
          <div className='arrow mt-40'>
            <Lottie animationData={arrow} className='animation h-18 text-green-400' />
          </div>
          <div className='hand items-center text-center font-semibold'>
            <Lottie animationData={hand} className='animation h-72' />
            <h1>Donated to NGOs</h1>
            <hr className='ml-20 w-28 bg-green-600 h-[2px]' />
          </div>
          <div className='arrow mt-40'>
            <Lottie animationData={arrow} className='animation h-18' />
          </div>
          <div className='fitems-center text-center font-semibold'>
            <Lottie animationData={child} className='animation h-72' />
            <h1 className='w-48 rounded-xl'>Fed to the needy</h1>
            <hr className='ml-10 w-28 bg-green-600 h-[2px]' />
          </div>
        </div>

        <h1 className='text-center font-bold text-5xl mt-40'>Services</h1>
        <hr className='w-40 ml-[44%] bg-green-600 h-[2px]' />
        <div className="flex justify-around mt-14">
          <div className='gif bg-green-400 h-[420px] w-[420px] rounded-xl'>
            <img src="/images/platelinker.gif" alt="gif" className='rounded-xl h-[400px] m-3 w-[400px]' />
          </div>
          <div className="services">
            <img src="/images/services.jpg" alt="img" className='h-[400px]' />
          </div>
        </div>
      </div>

      <hr className='ml-10 w-[90%] mt-28 bg-green-600 h-[1.5px]' />
      <h6 className='ml-24 text-gray-500 mt-10 text-center'>In India, approximately 40% of the food produced is wasted every year, amounting to about 67 million tonnes​ (Feeding India by Zomato)​. This food waste is equivalent to the annual consumption of the entire United Kingdom​ (National League of Cities)​. Despite this, millions of people in India go hungry daily. By donating surplus food instead of discarding it, you can help combat hunger and make a significant impact on food security in the country. Join the movement to reduce waste and feed those in need.</h6>

      <hr className='ml-10 w-[90%] mt-10 bg-green-600 h-[1.5px]' />

      <div className="social text-center items-center mt-20">
        <i className="fa-brands fa-instagram text-3xl mr-4 cursor-pointer text-green-400"></i>
        <i className="fa-brands fa-linkedin text-3xl mr-4 cursor-pointer text-green-400"></i>
        <i className="fa-regular fa-envelope text-3xl mr-4 cursor-pointer text-green-400"></i>
        <i className="fa-brands fa-facebook text-3xl mr-4 cursor-pointer text-green-400"></i>
        <i className="fa-brands fa-x-twitter text-3xl cursor-pointer text-green-400"></i>
      </div>
    </>
  );
};

export default Home;
