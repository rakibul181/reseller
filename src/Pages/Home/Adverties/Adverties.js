import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AdvertiesProduct from './AdvertiesProduct';

const Adverties = () => {
    const { data: avertiesProduct = [],  } = useQuery({
        queryKey: ['reported-products'],
        queryFn: async () => {
            const res = await fetch('https://pushpali-server-iesratadhara.vercel.app/products/adverties')
            const data = await res.json()
            return data
        }

    })

    return (
        <div className='mx-8 mb-20'><h3 className='text-2xl font-extrabold my-8 text-primary-focus pl-8'>Adverties</h3>
            <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4'>
                {
                    avertiesProduct.length &&
                    avertiesProduct.map(product=><AdvertiesProduct key={product._id} product={product}></AdvertiesProduct>)
                }
            </div>
        </div>
    );
};

export default Adverties;