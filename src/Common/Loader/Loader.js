import React from 'react';
import Lottie from "lottie-react";
import loader from './loder.json'

const Loader = () => {
    return (
        <div  className='m-auto w-16'>
            <Lottie animationData={loader} loop={true} />
  
        </div>
    );
};

export default Loader;