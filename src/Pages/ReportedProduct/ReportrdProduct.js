import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConformationModal from '../../Common/ConfrimationModal';

const ReportrdProduct = () => {
    const [deletedReportedProduct, setDeletedReportedProduct] = useState(null);
    const deleteproductModalID = 'modalForDeleteReported'



    const { data: reportedProduct = [], refetch } = useQuery({
        queryKey: ['reported-products'],
        queryFn: async () => {
            const res = await fetch('https://pushpali-server-iesratadhara.vercel.app/products/reported', {
                headers: { 'authoraization': `bearer ${localStorage.getItem('accessToken')}` }
            })
            const data = await res.json()
            return data
        }

    })
    // console.log(reportedProduct);
    const handleDeleteProduct = (product) => {
        console.log(product);
        const { _id } = product
        fetch(`https://pushpali-server-iesratadhara.vercel.app/delete-reported-product/${_id}`, {
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

    return (
        <div className='p-8'>
            <h1 className='text-3xl text-primary text-center font-semibold py-4'>Reported product </h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr>
                            <th>
                                No
                            </th>
                            <th>Product</th>
                            <th>Seller info</th>
                            <th>Action</th>
                            
                        </tr>
                    </thead>
                    <tbody>

                        { reportedProduct?.length &&
                            reportedProduct.map((product,i) => <tr>
                                <th>
                                     {i+1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.productImg} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{product.name}</div>
                                            <div className="text-sm opacity-50">{product.category}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {product.sellerName}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{product.sellerEmail}</span>
                                </td>
                                 
                                <td>
                                    <label htmlFor={deleteproductModalID}
                                        onClick={() => setDeletedReportedProduct(product)}
                                        className='btn btn-error btn-xs'>Delete</label>

                                </td>
                                <ConformationModal
                                    modalTitle={`Are You sure to delete This product ?`}
                                    modalBody={'if you deleted  this its permanently delete form this wensite '}
                                    action={handleDeleteProduct}
                                    actionText={'Delete'}
                                    actoinData={deletedReportedProduct}
                                    modalId={deleteproductModalID}

                                ></ConformationModal>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default ReportrdProduct;