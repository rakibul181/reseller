import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Common/Loader/Loader';
import { AuthContext } from '../Context/AuthProvider';
import useSeller from '../hooks/useSeller';
const SellerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isSeller, isLoadingSeller] = useSeller(user?.email)

    const location = useLocation()

    if (loading || isLoadingSeller) {
        return <Loader></Loader>
    }
    if (user && isSeller) {
        return children
    }

    return <Navigate to={'/'} replace={location}></Navigate>
};

export default SellerRoute;