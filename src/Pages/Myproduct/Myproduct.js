import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import ConformationModal from '../../Common/ConfrimationModal';
import { AuthContext } from '../../Context/AuthProvider';

const Myproduct = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null)
    const [advertisingProduct, setAdvertisingProduct] = useState(null);
    const url = `https://pushpali-server-iesratadhara.vercel.app/my-products?email=${user.email}`

    const deleteproductModalID = 'modalForProductDelete'
    const adProductModalID = 'modalForProductAdverties'

    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ['my-products', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: { 'authoraization': `bearer ${localStorage.getItem('accessToken')}` }
            })
            const data = await res.json()
            return data
        }

    })
    const handleDeleteProduct = (product) => {
        console.log(product);
        const { _id } = product
        fetch(`https://pushpali-server-iesratadhara.vercel.app/delete-product/${_id}`, {
            method: 'DELETE',
            headers: {
                'authoraization': `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`Product deleted successfully`)
                }
            })
    }


    const handelAdvertiesingProduct = (product) => {
        const { _id } = product
        fetch(`https://pushpali-server-iesratadhara.vercel.app/products/advarties/${_id}`, {
            method: 'PUT',
            headers: {
                'authoraization': `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    refetch()
                    toast.success(`${product.name} added to Adverties`)
                }
            })
    }

    console.log(myProducts);
    return (
        <div className='px-6'>
            <h2 className="text-3xl text-primary text-center font-semibold py-6">All Users</h2>
            <div className="overflow-x-auto " >
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>category</th>
                            <th>Price</th>
                            <th>Delete</th>
                            <th>Advertrise</th>
                            <th>Avilability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts.map((product, i) => <tr key={product._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <img src={product.productImg} className='w-24 rounded avatar' alt='' />
                                </td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td> ${product.sellingPrice}</td>

                                <td>
                                    <label htmlFor={deleteproductModalID}
                                        onClick={() => setDeletingProduct(product)}
                                        className='btn btn-error btn-xs'>Delete</label>

                                </td>

                                <td>
                                    {
                                        product?.advertise ?
                                            <button className='btn btn-success btn-xs'>Running Ad</button>
                                            :
                                            <label htmlFor={adProductModalID}
                                                onClick={() => setAdvertisingProduct(product)}
                                                className='btn btn-primary btn-xs'>Adverties</label>
                                    }

                                </td>

                                <td><button className='btn btn-warning btn-xs btn-disabled'>unsold</button></td>

                                <ConformationModal
                                    modalTitle={`Are You sure to delete This product ?`}
                                    modalBody={'if you deleted  this its permanently delete form this wensite '}
                                    action={handleDeleteProduct}
                                    actionText={'Delete'}
                                    actoinData={deletingProduct}
                                    modalId={deleteproductModalID}

                                ></ConformationModal>

                                <ConformationModal
                                    modalTitle={`Are You sure to Adverties This product ?`}
                                    modalBody={'if you Adverties  this it will be show on  Home page on this wensite '}
                                    action={handelAdvertiesingProduct}
                                    actionText={'Adverties'}
                                    actoinData={advertisingProduct}
                                    modalId ={adProductModalID}

                                ></ConformationModal>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Myproduct;