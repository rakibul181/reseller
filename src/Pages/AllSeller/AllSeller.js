import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConformationModal from '../../Common/ConfrimationModal';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const AllSeller = () => {
    const [deleteUser, setDeleteUser] = useState(null)
    const [verifyingUser, setVerifyingUser] = useState(null);
    const userDeleteModalID = 'forUserDeleteModal'
    const userVeryfirdModal = "forUserVeryfiedModal"


    const { data: allSeller = [], refetch } = useQuery({
        queryKey: ['all-seller'],
        queryFn: async () => {
            const res = await fetch('https://pushpali-server-iesratadhara.vercel.app/all-seller', {
                method: 'GET',
                headers: {
                    'authoraization': `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    console.log(allSeller);
    const handleDeleteuser = (user) => {
        console.log(user);
        const { _id } = user
        fetch(`https://pushpali-server-iesratadhara.vercel.app/delete-seller/${_id}`, {
            method: 'DELETE',
            headers: {
                'authoraization': `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`User deleted successfully`)
                }
            })
    }
    const handelVerifyingUser = (user) => {
        const { _id } = user
        fetch(`https://pushpali-server-iesratadhara.vercel.app/verify-seller/${_id}`, {
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
                    toast.success(`${user.name} added to as a verifyed User`)
                }
            })
    }
    return (
        <div>
                        <h1 className='text-3xl text-primary text-center font-semibold py-4'>All Seller </h1>

            <div className="overflow-x-auto w-full px-8 py-8">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                No
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>verify</th>
                            <th>Delete </th>
                        </tr>
                    </thead>
                    <tbody>


                        {allSeller?.length &&
                            allSeller.map((seller, idx) => <tr key={seller._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={seller.photoURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{seller.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {seller.email}
                                    <br />
                                    <span className="badge badge-ghost badge-sm"> {seller.role}</span>
                                </td>
                                <td>
                                    {
                                        seller?.verified===true?
                                        <AiOutlineCheckCircle className='text-blue-800 text-2xl'></AiOutlineCheckCircle>
                                        :
                                        <label htmlFor={userVeryfirdModal}onClick={() => setVerifyingUser(seller)}className='btn btn-primary btn-xs'>Verify</label>

                                    }

                                </td>
                                <th>
                                    <label htmlFor={userDeleteModalID}
                                        onClick={() => setDeleteUser(seller)}
                                        className='btn btn-error btn-xs'>Delete</label>
                                </th>

                                <ConformationModal
                                    modalTitle={`Are You sure to delete This user ?`}
                                    modalBody={'if you deleted  this its permanently delete form this wensite '}
                                    action={handleDeleteuser}
                                    actionText={'Delete'}
                                    actoinData={deleteUser}
                                    modalId={userDeleteModalID}

                                ></ConformationModal>
                                <ConformationModal
                                    modalTitle={`Are You sure to Verify  This user ?`}
                                    modalBody={'This User Will be Stored as a verifyed Seller'}
                                    action={handelVerifyingUser}
                                    actionText={'Verify'}
                                    actoinData={verifyingUser}
                                    modalId={userVeryfirdModal}

                                ></ConformationModal>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllSeller;