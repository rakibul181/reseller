import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Product from './Product';

const ProductCategory = () => {
    const products = useLoaderData()
    console.log(products);
    return (
        <div>
            <h2 className='text-center py-12 text-primary text-4xl font-bold '>Category: {products[0]?.category}</h2>
             <div className=' grid mx-10 gap-10 grid-cols-1 lg:grid-cols-2'> 
                {
                    products.map(product=><Product key={product._id} product={product} ></Product>)
                }
             </div>
        </div>
    );
};

export default ProductCategory;