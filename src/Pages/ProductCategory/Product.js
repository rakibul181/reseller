import React, { useContext, } from 'react';
import { MdLocationPin, MdPhone, MdReport } from 'react-icons/md';
import { BsClockFill, BsFillSuitHeartFill } from 'react-icons/bs';
import { AuthContext } from '../../Context/AuthProvider';
import ReactTooltip from 'react-tooltip'
import toast from 'react-hot-toast';
import ConformationModal from '../../Common/ConfrimationModal';
import BookingModal from './BookingModal';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const Product = ({ product }) => {
    const { allUser, user, refetch } = useContext(AuthContext)
    const { name, productImg, condition, buyingPrice, sellingPrice, postTime, sellerPhone, location, useTime, sellerEmail, sellerName, productDetails } = product


    const seller = allUser.find(user => user.email === sellerEmail)
    // console.log(allUser);
    // console.log(seller);
    const reportToadminModalid = 'forReportToadminModal'

    const handelReportProduct = (product) => {
        const { _id } = product
        fetch(`https://pushpali-server-iesratadhara.vercel.app/report-to-admin/${_id}`, {
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
                    toast.success(`Reported to admin`)
                }
                else {

                    toast.error('Already Reported this product')
                }
            })
    }


    return (


        <div className="card   bg-base-100  card-bordered">
            <div className='flex justify-between items-center'>
                <div className='mt-4 ml-4 flex gap-4 items-center mb-4'>
                    <div className="avatar">
                        <div className="w-16 rounded-full">
                            <img src={seller.photoURL} alt=" " />
                        </div>
                    </div>

                    <div className=''>
                        <h4 className='font-semibold '>{seller?.verified === true ?
                            <AiOutlineCheckCircle className='text-blue-800 text-2xl mr-2 inline-flex'></AiOutlineCheckCircle> : ''}{sellerName}</h4>
                        <p className='inline-flex text-sm items-center'><BsClockFill className='mr-2'></BsClockFill><span>{postTime}</span></p>
                    </div>
                </div>
                <div className='mr-4 flex gap-4 items-center'>
                    <div><BsFillSuitHeartFill data-tip="Add Wish List" className='text-xl hover:text-secondary'></BsFillSuitHeartFill></div>

                    <label htmlFor={reportToadminModalid}
                        onClick={() => handelReportProduct}
                        className=''><MdReport data-tip="Report to admin" className='text-2xl hover:text-secondary'></MdReport>
                    </label>

                </div>
            </div>
            <figure><img src={productImg} alt="Shoes" /></figure>

            <div className="card-body">

                <h2 className="card-title">
                    {name}
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 my-4'>
                    <div>
                        <h2 className='font-semibold'>Selling Price: <span className='  text-3xl font-bold'>${sellingPrice}</span></h2>
                        <h2 className='badge badge-outline font-bold my-2 p-4'>Buying Price: <span className='font-semibold' >${buyingPrice}</span></h2>
                        <p className='font-bold'>Using  {useTime}</p>
                    </div>
                    <div className="card-actions">
                        <div className="badge p-4 badge-outline font-bold">Condition: {condition}</div>
                        <div className="badge p-4 badge-outline font-bold"> <MdLocationPin className='mr-2'></MdLocationPin>{location}</div>
                        <div className="badge badge-outline font-bold p-4"><MdPhone className='mr-2'></MdPhone>{sellerPhone}</div>
                    </div>

                </div>

                <p className='my-4'> <span className='font-bold'>Details: </span>{productDetails}</p>
                <label htmlFor="booking-modal" className="btn btn-primary text-white font-bold  bg-gradient-to-r from-secondary to-primary">book Product</label>

            </div>
            <BookingModal
                product={product}
                user={user}
                seller={seller}

            ></BookingModal>

            <ConformationModal
                modalTitle={`Are You sure to Verify  This user ?`}
                modalBody={'This User Will be Stored as a verifyed Seller'}
                action={handelReportProduct}
                actionText={'Report'}
                actoinData={product}
                modalId={reportToadminModalid}


            ></ConformationModal>
            <ReactTooltip />
        </div>
    );
};

export default Product;