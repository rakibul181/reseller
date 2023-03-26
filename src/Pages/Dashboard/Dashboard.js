import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import useToken from '../../hooks/useToken';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [token, jwtUser] = useToken(user.email)
    const navigate = useNavigate()

    if (!token) {
        navigate('/')
    }
    return (
        <figure className="sm:w-full md:w-3/5 lg:w-1/4 flex flex-col items-center lg:ml-11 bg-slate-100  rounded-xl   ">
            <img className="w-24 h-24 md:w-48 md:h-auto md:rounded-none rounded-full mx-auto" src={jwtUser.photoURL} alt="" />


            <figcaption className="font-medium">
                <div className="text-sky-500 dark:text-sky-400">
                    {jwtUser.name}
                </div>
                <div className="text-slate-700 dark:text-slate-500">
                    {jwtUser.email}
                </div>
                <div className="text-slate-700 dark:text-slate-500">
                    {jwtUser.role}, Pushpali
                </div>
            </figcaption>

        </figure>
    );
};

export default Dashboard;