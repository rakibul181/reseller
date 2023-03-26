import React, { useContext } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../Common/Navbar';
import { AuthContext } from '../Context/AuthProvider';
import useToken from '../hooks/useToken';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [token, jwtUser] = useToken(user.email)
    const navigate = useNavigate()

    if (!token) {
        navigate('/')
    }
    let menu
    const buyerMenu = <>

        <li><Link to={'/dashboard/my-order'}>My Order</Link></li>
        <li><Link to={'/dashboard/wish-list'}>Wishish</Link></li>

    </>
    const sellerMenu = <>
        <li><Link to={'/dashboard/my-product'}>My product</Link></li>
        <li><Link to={'/dashboard/add-product'}>Add Product</Link></li>
        <li><Link to={'/dashboard/my-buyer'}>My Buyer </Link></li>
    </>
    const adminMenu = <>
        <li><Link to={'/dashboard/all-seller'}>All Seller</Link></li>
        <li><Link to={'/dashboard/all-buyer'}>My Buyer </Link></li>
        <li><Link to={'/dashboard/reported-product'}>Reported Product</Link></li>
        <li><Link to={'/dashboard/add-category'}>Add Category</Link></li>



    </>

    if (jwtUser?.role === 'buyer') {
        menu = buyerMenu
    }
    else if (jwtUser?.role === 'seller') {
        menu = sellerMenu
    }
    else if (jwtUser?.role === 'admin') {
        menu = adminMenu
    }
    else {
        return navigate('/')
    }
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-end drawer-mobile">
                <input id="dashboard-layout" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-layout" className="drawer-overlay"></label>
                    <ul className="menu bg-base-100 w-56 p-2 rounded-box">

                        {
                            menu
                        }

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;