import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider'; 
import { MdOutlineDashboard } from 'react-icons/md'

const Navbar = () => {
    const {user, userSignOut} = useContext(AuthContext);
    // const url = `${user.email}`
    // const {} = useQuery({
    //     queryKey:['email'],
    //     queryFn: async ()=>{
    //         const res = fetch()
    //     }
    // })
    const menuItem = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/blog'}>Blog</Link></li>
    </>

    const menuUser = <>
        <li><Link onClick={userSignOut}>Logout</Link></li>
        <li><Link to={'/dashboard'}>Dashboard</Link></li>
    </>

    const menuVisitor = <>
        <li><Link to={'/login'}>Login</Link></li>
        <li><Link to={'/resister'}>Resister</Link></li>

    </>

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={1} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                         {menuItem}
                         {user?.uid? menuUser: menuVisitor}
                         

                    </ul>
                </div>
                 <Link to={'/'} className="btn text-primary btn-ghost normal-case text-xl">PUSHPALI</Link> 
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                     {menuItem}
                     {user?.uid? menuUser: menuVisitor}
                </ul>
            </div>
            <div className="navbar-end">
    
            <label tabIndex={2} htmlFor="dashboard-layout" className="drawer-button btn btn-ghost lg:hidden"><MdOutlineDashboard></MdOutlineDashboard> </label>
             
             
            </div>
        </div>
    );
};

export default Navbar;