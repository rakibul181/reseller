import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Common/Loader/Loader';
import { AuthContext } from '../Context/AuthProvider';

const PrivateRoute = ({children}) => {
    const location = useLocation()
    const {user, loading,} = useContext(AuthContext)
    
         if(loading){
            return <Loader></Loader>
         }

         if(user){
            return children
         }
        return <Navigate to={'../login'} replace={location}></Navigate>
};

export default PrivateRoute;