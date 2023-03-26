import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../../assest/image/image-07.png'

const Hero = () => {
    return (
        <div className="hero min-h-screen bg-base-200 px-8 py-8">
            <div className="hero-content flex-col-reverse lg:flex-row-reverse ">
                <img src= {hero} alt='' />
                <div>
                    <h1 className="text-5xl font-extrabold">Welcome To Pushpali Resele!</h1>
                    <p className="py-6">Pushpali is a online based resele website. you can post for sele product or buy product as you want</p>
                    <Link to={'/login'}><button className="btn btn-primary">Get Started</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;