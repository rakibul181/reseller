import React from 'react';
import error from './error.json'
import Lottie from "lottie-react";
import Navbar from '../Navbar';


const Errorpege = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='w-3/5 m-auto max-h-screen'> <Lottie animationData={error} loop={true} /></div>
        </div>
    );
};

export default Errorpege;