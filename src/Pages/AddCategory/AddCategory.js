import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const imageHostKey = process.env.REACT_APP_Imgbb_key
    const navigate = useNavigate()


    const handlAddCategory = (data) => {
        console.log(data);
        const formData = new FormData();
        const img = data.img[0]
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

                    const categoryInfo = {
                        categoryName: data.name,
                        imgUrl:imgUrl,
                    }
                    saveCategoryToDB (categoryInfo)
                    navigate('/')
                }
            })

    }

    const saveCategoryToDB  =(categoryInfo)=>{
        console.log(categoryInfo);
        fetch('https://pushpali-server-iesratadhara.vercel.app/categories', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(categoryInfo)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`${categoryInfo.categoryName} is Added successfully`)


            })
    }
    return (
        <div className="w-full md:w-2/3 lg:w-1/3 bor h-[400px] m-auto ">
            <h3 className="text-2xl text-center text-primary my-8">Resister</h3>
            <form onSubmit={handleSubmit(handlAddCategory)}>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-lg">Category Name</span>
                    </label>
                    <input type="text" {...register('name', { required: 'Name is requird' })} className="input input-bordered w-full input-primary" />

                </div>
                 
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text text-xl">Category Image</span>
                    </label>
                    <input type="file" {...register('img', { required: 'file is requird' })} className="input input-bordered w-full input-primary " />
                    {errors.img && <p className="text-error">{errors.img?.message}</p>}
                </div>



                <input className="btn btn-primary w-full mt-8" type="submit" />
                <label className="label text-center">

                </label>
            </form>



        </div>
    );
};

export default AddCategory;