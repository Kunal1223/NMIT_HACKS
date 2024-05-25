import React from 'react'

const About = () => {
  return (
    <>
      <div className="container mt-20 justify-around flex">
        <div className='about-content ml-40'>
          <h1 className='text-4xl font-bold text-blue-500 '>About <span className='text-green-400'>Us</span></h1>
          <h5 className='mt-8 font-normal mr-14'>Welcome to PlateLinker, where we believe in the power of connecting surplus food with those who need it most. Our platform serves as a bridge between compassionate restaurants and dedicated NGOs, working together to combat food waste and address hunger in our communities.</h5>

          {/* mission */}
          <h1 className='text-2xl font-semibold text-blue-500 mt-20'>Our <span className='text-green-400'>Mission</span></h1>
          <h5 className='mt-8 font-normal mr-14'>At PlateLinker, our mission is simple yet impactful: to create a world where no one goes to bed hungry. We strive to minimize food waste by facilitating the seamless donation of excess food from restaurants to NGOs, who, in turn, distribute it to individuals and families facing food insecurity.</h5>

          <h1 className='text-2xl font-semibold text-blue-500 mt-20'>How It <span className='text-green-400'>Works</span></h1>
          <h5 className='mt-8 font-normal mr-14'>Restaurants on our platform can easily input the quantity of surplus food they have, and NGOs can efficiently coordinate the collection and distribution process. This streamlined approach ensures that perfectly good food doesn't go to waste and reaches those who need it most.</h5>

        </div>

        <div className="container-pic mt-20">
          <div className="pic2 h-64 bg-green-500 w-64 rounded-[50%] ml-[40%]">
            <img src="../images//hungry.jpeg" alt="child" className='h-64 w-64 rounded-[50%] ml-2' />
          </div>
        </div>
      </div>

      <div className="footer-container mx-40">
        <h1 className='text-2xl font-semibold text-blue-500 mt-20'>Get<span className='text-green-400'>Involved</span></h1>
        <h5 className='mt-8 font-normal mr-14'>Help us make a difference by getting involved today. Whether you're a restaurant looking to donate or an NGO interested in receiving donations, let's work together to create a world with less food waste and more kindness.
          Thank you for being part of the PlateLinker community and for sharing in our vision of a more compassionate and sustainable future.</h5>
      </div>
    </>
  )
}

export default About
