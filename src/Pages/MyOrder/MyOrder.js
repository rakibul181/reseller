import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const MyOrder = () => {
    const { user } = useContext(AuthContext);

    const url = `https://pushpali-server-iesratadhara.vercel.app/my-orders?email=${user.email}`



    const { data: myorders = [], } = useQuery({
        queryKey: ['my-orders', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: { 'authoraization': `bearer ${localStorage.getItem('accessToken')}` }
            })
            const data = await res.json()
            return data
        }

    })
    return (
        <div className='px-6'>
            <h2 className="text-3xl text-primary text-center font-semibold py-6">My Order</h2>
            <div className="overflow-x-auto " >
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Photo</th>
                            <th>Name</th>
                            
                            <th>Price</th>
                        
                        
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myorders.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <img src={product.productImg} className='w-24 rounded avatar' alt='' />
                                </td>
                                <td>{product.productName}</td>
                                 
                                <td> ${product.price}</td>

                               
                                <td>{
                                    product?.status?
                                    <button className='btn btn-success btn-xs'>paid</button>
                                    :
                                    <button className='btn btn-warning btn-xs '>pay</button>
                                    
                                    }</td>

                                 

                                 
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyOrder;