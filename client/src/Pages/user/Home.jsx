import React from 'react'
import Navbar from '../../components/Navbar.jsx'
import Hero from '../../Assets/Hero.jpg'
const Home = () => {
  return (
    <>
    <Navbar/>
    <div className="relative mt-4">
        <img src={Hero} alt="Hero" className="w-full h-auto" />
        <h1 className="absolute inset-0 flex mt-10 items-start justify-center text-white text-4xl font-bold z-10 pointer-events-none">
          Welcome, User
        </h1>
    </div>

    </>
  )
}

export default Home
