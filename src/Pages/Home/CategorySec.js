import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

const CategorySec = () => {
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch('https://pushpali-server-iesratadhara.vercel.app/categories')
            const data = await res.json()
            return data
        }
    })
    console.log(categories);
    // const { data:products = [] } = useQuery({
    //     queryKey: ['categories'],
    //     queryFn: async () => {
    //         const res = await fetch('https://pushpali-server-iesratadhara.vercel.app/products')
    //         const data = await res.json()
    //         return data
    //     }
    // })
    return (
        <div className='grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-10 py-16'>
            {
                categories.map(category => <div key={category._id}>
                    <div className="card  ">
                        <figure className="px-10 pt-10">
                            <img src={category.imgUrl} alt="Shoes" className="rounded-xl" />
                        </figure>
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{category.categoryName}</h2>
                             
                            <div className="card-actions">
                                <Link to={`/category/${category._id}`}><button  className="btn btn-primary">Show Product</button></Link>
                            </div>
                        </div>
                    </div>

                </div>)
            }
        </div>
    );
};

export default CategorySec;