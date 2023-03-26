import React from 'react';
import toast from 'react-hot-toast';

const BookingModal = ({ product, user, seller }) => {
    // console.log(user);
    // console.log(seller);
    // console.log(product);
    const handelSubmitBooking = (e) => {
        e.preventDefault()

        const from = e.target

        const mettingLocation = from.location.value
        const phone = from.phone.value

        const booking = {
            productName: product.name,
            productId: product._id,
            selleEmail: seller.email,
            price: product.sellingPrice,
            mettingLocation: mettingLocation,
            buyerPhone: phone,
            category: product.category,
            buyerEmail: user.email,
            buyerImg: user.photoURL,
            productImg: product.productImg
        }
        // console.log(booking);

        fetch('https://pushpali-server-iesratadhara.vercel.app/products/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authoraization': `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('Booking Confirmed')

                }
                else {
                    toast.error(data.message)
                }
            })
    }
    return (
        <div>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{product.name}</h3>
                    <form onSubmit={handelSubmitBooking} className='grid grid-cols-1 gap-6 mt-10'>
                        <input name='date' type="text" value={user?.displayName} disabled className="input input-bordered w-full " />
                        <input name='email' type="email" placeholder="Email" className="input input-bordered w-full " disabled defaultValue={user?.email} />
                        <input name='date' type="text" value={` $${product?.sellingPrice}`
                        } disabled className="input input-bordered w-full " />

                        <input name='location' type="text" className="input input-bordered w-full " placeholder='Metting Location' required />
                        <input name='phone' type="number" placeholder="Phone Number" className="input input-bordered w-full " />

                        <input type="submit" value="Submit" className='btn   btn-accent w-full' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;