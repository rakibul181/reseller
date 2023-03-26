import React from 'react';
import Adverties from './Adverties/Adverties';
import CarosulReview from './CarosulReview';
import CategorySec from './CategorySec';
import Hero from './Hero';

const Home = () => {
    return (
        <div >
             <Hero></Hero>
             <CategorySec></CategorySec>
             <Adverties></Adverties>
             <CarosulReview></CarosulReview>
        </div>
    );
};

export default Home;