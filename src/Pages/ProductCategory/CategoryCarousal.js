import React from 'react';
import carosal_1 from '../../assest/image/carosal-1.jpg'
import carosal_2 from '../../assest/image/carosal-2.jpg'

const CategoryCarousal = () => {
    return (
        <div className="carousel w-full h-[250px]  ">
            <div id="slide1" className="carousel-item relative w-full object-cover  ">
                <img src= {carosal_1} className="w- object-scale-down"  alt=''/>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full">
                <img src={carosal_2} className="w-full object-center"  alt='' />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                </div>
            </div>
            
             
        </div>
    );
};

export default CategoryCarousal;