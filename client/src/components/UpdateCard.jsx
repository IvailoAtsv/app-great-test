import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import convertImageToBase64 from '../lib/convertImage';
import toast from 'react-hot-toast';

const labelStyles = "text-black font-semibold text-xl"
const errorLabelStyles = "text-red-500 font-semibold text-xl"
const inputStyles = 'w-[100%] md:w-[80%] p-2 rounded-md border border-gray-300 rounded text-black font-semibold';

export const UpdateCard = ({ card, setCardToUpdate }) => {
    const [updatedImage, setUpdatedImage] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();



    const onSubmit = async (data) => {
        const { title, description } = data;
        let image = null;
        if (updatedImage) {
            image = await convertImageToBase64(updatedImage);
        }

        try {
            // Make a PUT request to update the photo
            const response = await axios.put(`http://localhost:4000/photos/${card._id}`, {
                title: title || card.title,
                description: description || card.description,
                image: image
            });
            setUpdatedImage(null);
            setCardToUpdate(null);
            toast.success('Photo updated successfully!');
        } catch (error) {

            toast.error('Error updating photo:', error);
        }
    };

    return (
        <div className="absolute top-0 flex justify-center items-center bg-black bg-opacity-70 w-full min-h-screen">
            <form className="bg-white rounded-lg gap-4 flex flex-col justify-start items-start p-4 w-[90%] md:w-[50%] h-auto" onSubmit={handleSubmit(onSubmit)}>
                <label className={errors.title? errorLabelStyles : labelStyles}>{errors.title ? 'Title is required' : 'Update Title'}</label>
                <input className={inputStyles} type="text" {...register('title', { required: true })} />
                <label className={errors.title? errorLabelStyles : labelStyles}>{errors.description ? 'Description is required' : 'Update Description'}</label>
                <input className={inputStyles} type="text" {...register('description', { required: true })} />
                <label className={labelStyles}>Update Image <p className="text-gray-500 text-sm">If you don't select an image, it won't be updated</p></label>
                <input className={`${inputStyles} file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 file:cursor-pointer`} type="file" onChange={(e) => setUpdatedImage(e.target.files[0])} />
                <div className="mt-auto mr-auto flex items-center text-lg text-black space-x-3">
                    <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded" onClick={() => setCardToUpdate(null)}>Cancel</button>
                    <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Update</button>
                </div>
            </form>
        </div>
    );
};
