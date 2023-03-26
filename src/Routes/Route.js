import { createBrowserRouter } from "react-router-dom"
import Errorpege from "../Common/ErrorPage/Errorpege"
import DashboardLayout from "../Layout/DashboardLayout"
import Main from "../Layout/Main"
import AddCategory from "../Pages/AddCategory/AddCategory"
import AddProduct from "../Pages/AddProduct/AddProduct"
import AllBuyer from "../Pages/AllBuyer/AllBuyer"
import AllSeller from "../Pages/AllSeller/AllSeller"
import Blog from "../Pages/Blog"
import Dashboard from "../Pages/Dashboard/Dashboard"
import Home from "../Pages/Home/Home"
import Login from "../Pages/Login/Login"
import Mybuyer from "../Pages/MyBuyer/Mybuyer"
import MyOrder from "../Pages/MyOrder/MyOrder"
import Myproduct from "../Pages/Myproduct/Myproduct"
import MyWishLish from "../Pages/MyWishList/MyWishLish"
import ProductCategory from "../Pages/ProductCategory/ProductCategory"
import ReportrdProduct from "../Pages/ReportedProduct/ReportrdProduct"
import Resister from "../Pages/Resister/Resister"
import AdminRoute from "./AdminRoute"
import PrivateRoute from "./PrivateRoute"
import SellerRoute from "./SellerRoute"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement:<Errorpege></Errorpege>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/resister',
                element: <Resister></Resister>,


            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/blog',
                element:  <Blog></Blog>
            },
            
            {
                path: '/category/:name',
                element: <PrivateRoute><ProductCategory></ProductCategory></PrivateRoute>,
                loader:({params})=> fetch(`https://pushpali-server-iesratadhara.vercel.app/category/${params.name}`),
            
            },
            {
                path: '/add-category',
                element: <AddCategory></AddCategory>

            }
        ]

    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement:<Errorpege></Errorpege>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/my-order',
                element: <MyOrder></MyOrder>
            },
            {
                path: '/dashboard/wish-list',
                element:  <MyWishLish></MyWishLish>
            },
            {
                path: '/dashboard/add-product',
                element: <SellerRoute><AddProduct></AddProduct> </SellerRoute>
            },
            {
                path:'/dashboard/my-product',
                element:<SellerRoute><Myproduct></Myproduct></SellerRoute>
            }
            ,{
                path:'/dashboard/my-buyer',
                element: <SellerRoute><Mybuyer></Mybuyer></SellerRoute>
            },
            {
                path: '/dashboard/all-buyer',
                element:  <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
            {
                path: '/dashboard/all-seller',
                element:  <AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path: '/dashboard/reported-product',
                element:  <AdminRoute><ReportrdProduct></ReportrdProduct></AdminRoute>
            },
            {
                path: '/dashboard/add-category',
                element:  <AdminRoute><AddCategory></AddCategory></AdminRoute>
            },



        ]
    }
])