import React from 'react'

export default function footer() {
  return (
    <footer className='mt-52 w-full bg-slate-100'>
      <div className='justify-start items-start  flex lg:flex-row lg:space-x-36 space-y-6 flex-col ml-4'>
        <div className='flex flex-col text-left space-y-10 lg:w-1/5 w-1/2  '>
          <h1 className='text-blue-500 font-bold mt-10 text-xl' >PlateLinker</h1>
          <p>Unite restaurants and NGOs to transform surplus into compassion.</p>
        </div>

        <div className='flex flex-col -mt-1 text-start '>
          <h1 className='text-xl font-bold leading-10'>FUNDRAISE</h1>
          <ul className='flex flex-col space-y-3 '>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>BROWSE Funder</li>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>Start a Founders</li>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>Event</li>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>General Donation</li>
          </ul>
        </div>

        <div className='flex flex-col  -mt-1 text-start'>
          <h1 className='text-xl font-bold leading-10'>ABOUT US</h1>
          <ul className='flex flex-col space-y-3 '>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>Our Story</li>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>How It Works</li>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>FAQS</li>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>Contact us</li>
          </ul>
        </div>

        <div className='flex flex-col  lg:mx-0 -mt-1 text-start'>
          <h1 className='text-xl font-bold leading-10'>Support</h1>
          <ul className='flex flex-col space-y-3  '>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>Frequently Asked Questions</li>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>Terms & Conditions</li>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>Privacy Policy</li>
            <li className='hover:text-blue-300 cursor-pointer transition duration-500 ease-in-out  transform hover:translate-x-1'>Report a Payment Issue</li>
          </ul>
        </div>
      </div>

      <div className='flex items-center justify-center mt-10 text-center'>
        <h1>Copyright ©2023 All rights reserved</h1>
      </div>
    </footer>
  )
}