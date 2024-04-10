import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ImageCard } from './ImageCard';
import toast, { Toaster } from 'react-hot-toast';
import uniqid from 'uniqid'
import { UpdateCard } from './UpdateCard';
import convertImageToBase64 from '../lib/convertImage'

const BACKEND = process.env.REACT_APP_BACKEND;
const stepBtnStyles = "px-2 py-1 bg-white text-black rounded-lg cursor-pointer"
  const inputStyles = 'w-[100%] md:w-[50%] p-2 rounded-md border border-gray-300 rounded text-black font-semibold';

const ImageUpload = () => {
  const [photos, setPhotos] = useState([]);
  const [cardToUpdate, setCardToUpdate] = useState(null);
  const [page, setPage] = useState(1); // current page state
  const [totalPages, setTotalPages] = useState(1); // current totalPages state

  useEffect(() => {
    fetchPhotos();
  }, [page, cardToUpdate]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${BACKEND}/photos?page=${page}`);
      setPhotos(response.data.photos);
      setTotalPages(Math.ceil(response.data.totalCount / 6));
    } catch (error) {
      toast.error('Error fetching photos:', error);
    }
  };

  const handleAddPhoto = async (data) => {
    try {
      const { title, description, image } = data;
      const imageData = await convertImageToBase64(image[0]);
      await axios.post(`${BACKEND}/photos/upload`, {
        title,
        description,
        image: imageData
      });

      fetchPhotos();
      toast.success('Photo added successfully!');
    } catch (error) {
      toast.error('Error adding photo:', error);
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await axios.delete(`${BACKEND}/photos/${id}`);
      fetchPhotos();
      toast.success('Photo deleted successfully!');

    } catch (error) {
      toast.error('Error deleting photo:', error);
    }
  };

  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <>
      <div><Toaster/></div>
      <div className='relative w-full min-h-screen text-lg bg-black gap-4 text-white flex flex-col justify-start items-center'>
        {cardToUpdate && <UpdateCard setCardToUpdate={setCardToUpdate} card={cardToUpdate}/>}
        <h1 className='text-white font-bold text-3xl'>Photo Gallery</h1>

        <div className='w-[90%] max-w-[1200px] flex flex-col gap-4'>
          <h2 className='text-white font-bold text-3xl'>Add New Photo</h2>
          <form className='flex flex-col' onSubmit={handleSubmit(handleAddPhoto)}>
             <label className={`${errors.title && 'text-red-500 font-semibold'}`}>{errors.title?'Title is required':'Title'}</label>
            <input className={inputStyles} type="text" {...register('title', { required: true })} />
             <label className={`${errors.description && 'text-red-500 font-semibold'}`}>{errors.description?'Description is required':'Description'}</label>

            <input className={inputStyles} type="text" {...register('description', { required: true })} />
             <label className={`${errors.image && 'text-red-500 font-semibold'}`}>{errors.image?'Image is required':'Image'}</label>

            <input className='w-[100%] md:w-1/2 file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100 file:cursor-pointer font-semibold' type="file" {...register('image', { required: true })} />

            <button className='self-start bg-blue-50 text-blue-700 hover:bg-blue-100 mt-2 px-4 py-2 rounded-md'>Add Photo</button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[90%] max-w-[1200px] ">
          {photos.map(photo => (
            <ImageCard key={uniqid()} photo={photo} setCardToUpdate={setCardToUpdate} handleDeletePhoto={handleDeletePhoto}/>
          ))}
        </div>
        <div className={`flex gap-2 items-center ${totalPages <= 1 ? 'hidden' : ''}`}>
          <button className={stepBtnStyles} onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
          <span>{page} / {totalPages}</span>
          <button className={stepBtnStyles} onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
