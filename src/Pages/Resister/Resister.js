import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from 'firebase/auth';
import { AuthContext } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';


const Resister = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [logInError, setLogInError] = useState('')
    const googleProvider = new GoogleAuthProvider()
    const { createUser, updateUser, googleSignIn, allUser, refetch } = useContext(AuthContext)
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail)
    const imageHostKey = process.env.REACT_APP_Imgbb_key
    const navigate = useNavigate()

    if (token) {
        navigate('/')
    }

    console.log(allUser);
    const handleResister = (formInfo) => {
        console.log(formInfo);
        const formData = new FormData();
        const img = formInfo.img[0]
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                console.log(imgData);
                if (imgData.success) {
                    const imgUrl = imgData.data.url

                    createUser(formInfo.email, formInfo.password)
                        .then(data => {
                            console.log(data.user);
                            toast.success(`User Created As a ${formInfo.role} successfully`)

                            const userInfo = {
                                displayName: formInfo.name,
                                photoURL: imgUrl
                            }
                            const user = {
                                name: formInfo.name,
                                email: formInfo.email,
                                photoURL: imgUrl,
                                role: formInfo.role.toLowerCase(),

                            }
                            updateUser(userInfo)
                                .then(() => {
                                    setLogInError('')
                                    toast.success('Updated User Profile')
                                    saveUserInDB(user)

                                }).catch((error) => {
                                    setLogInError(error.message)
                                    toast.error(`User Profile not Update.Something wrong:${error.message}`)
                                });
                            refetch()
                        })
                }
            });

    };

    const handelGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user
                console.log(user);
                const googleUser = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: 'buyer',
                }
                setLogInError('')

                saveUserInDB(googleUser)
            })
            .catch((error) => {
                console.log(error)
                setLogInError(error.message)
            })
    }

    const saveUserInDB = (user) => {
        console.log(user);

        fetch('https://pushpali-server-iesratadhara.vercel.app/users', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`${user.name}  Added successfully`)
                setCreatedUserEmail(user.email)

            })
    }




    return (
        <div className="w-full md:w-2/3 lg:w-1/3 bor h-[800px] m-auto ">
            <h3 className="text-2xl text-center text-primary my-8">Resister</h3>
            <form onSubmit={handleSubmit(handleResister)}>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-lg">Your Name</span>
                    </label>
                    <input type="text" {...register('name', { required: 'Name is requird' })} className="input input-bordered w-full input-primary" />
                    {errors.name && <p className="text-error">{errors.name?.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-lg">Your Email</span>
                    </label>
                    <input type="email" {...register('email', { required: 'Email is requird' })} className="input input-bordered w-full input-primary " />
                    {errors.email && <p className="text-error">{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full  ">
                    <label className="label">
                        <span className="label-text text-lg">Your Password</span>
                    </label>
                    <input type="password"  {...register('password', { required: 'Passwordis required', minLength: { value: 6, message: 'password must be 8 charecter' } })} className="input input-bordered w-full input-primary " />
                    {errors.password && <p className="text-error">{errors.password?.message}</p>}

                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-xl">Your Photo</span>
                    </label>
                    <input type="file" {...register('img', { required: 'file is requird' })} className="input input-bordered w-full input-primary " />
                    {errors.img && <p className="text-error">{errors.img?.message}</p>}
                </div>

                <div className="form-control w-full  ">
                    <label className="label">
                        <span className="label-text text-lg">Role As A</span>
                    </label>
                    <select  {...register('role', { required: 'Please select a role' })} className="select select-primary w-full">
                        <option>Buyer</option>
                        <option>Seller</option>
                    </select>
                </div>

                <input className="btn btn-primary w-full mt-8" type="submit" />
                <label className="label text-center">
                    <span className="label-text text-center">
                        Already Have Account?
                        <Link to={"../login"} className="text-secondary ">
                            {' '}Login
                        </Link>
                    </span>
                </label>
            </form>
            <p className="text-error">{logInError.message || logInError}</p>
            <div className="divider">OR</div>
            <div>
                <button onClick={handelGoogleSignIn} className="btn  btn-primary btn-outline w-full">
                    {" "}
                    <FcGoogle className='text-2xl mx-4'></FcGoogle> CONTINUE WITH GOOGLE
                </button>
            </div>

        </div>
    );
};

export default Resister;