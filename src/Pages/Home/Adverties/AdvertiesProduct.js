import React, { } from 'react';
import { MdLocationPin } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AdvertiesProduct = ({product}) => {
    const { name, productImg,  sellingPrice,  location,   categoryId } = product
    return (
        <div className="card   bg-base-100  card-bordered">
             
            <figure><img src={productImg} alt="Shoes" /></figure>

            <div className="card-body">
            <div className="badge badge-secondary">Feature</div>

                <h2 className="card-title">
                    {name}

                </h2>
                <div className='grid grid-cols-2 items-center  '>
                    <div>
                        <h2 className='my-2' > <span className='  text-2xl font-bold'>${sellingPrice}</span></h2>
                    
                    </div>
                    <div className="card-actions">
                         
                        <div className="badge p-3 badge-outline font-bold"> <MdLocationPin className='mr-2'></MdLocationPin>{location}</div>
                    </div>

                </div>

                 

                <div className='card-actions'>
                    <Link to={`/category/${categoryId}`}><button  className="btn btn-primary btn-sm w-full font-semibold flex  justify-center">See Details</button></Link>

                </div>
            </div>
             
        </div>
    );
};

export default AdvertiesProduct;