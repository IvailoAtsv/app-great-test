import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ImageCard } from './ImageCard';
import toast, { Toaster } from 'react-hot-toast';
import uniqid from 'uniqid'
import { UpdateCard } from './UpdateCard';
import convertImageToBase64 from '../lib/convertImage'

const BACKEND = process.env.REACT_APP_BACKEND;
const stepBtnStyles = "px-2 py-1 bg-white text-black rounded-lg cursor-pointer";
const inputStyles = 'w-[100%] md:w-[50%] p-2 rounded-md border border-gray-300 text-black font-semibold';

const ImageUpload = () => {
  const [photos, setPhotos] = useState([]);
  const [cardToUpdate, setCardToUpdate] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, [page, cardToUpdate]);

  const fetchPhotos = async () => {
    console.log('fetching...');
    try {
      const response = await axios.get(`${BACKEND}/photos?page=${page}`);
      setPhotos(response.data.photos);
      setTotalPages(Math.ceil(response.data.totalCount / 6));
    } catch (error) {
      toast.error('Error fetching photos:', error);
    }
  };

  const handleAddPhoto = async (data) => {
    console.log('adding...');
    console.log(data.image);
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
      setImagePreview(null); // Clear the preview after successful upload
    } catch (error) {
      console.log(error);
      toast.error('Error adding photo:', error);
    }
  };

  const handleDeletePhoto = async (id) => {
    try {
      await axios.delete(`${BACKEND}/photos/${id}`);
      fetchPhotos();
      toast.success('Photo deleted successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Error deleting photo:', error);
    }
  };
  const handleRedirect = (e) => {
    e.preventDefault()

  }
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div><Toaster /></div>
      <div className='relative mt-[50px] w-full min-h-[40vh] text-lg bg-whiteBg gap-4 text-black flex flex-col justify-start items-center'>
        {cardToUpdate && <UpdateCard setCardToUpdate={setCardToUpdate} card={cardToUpdate} />}
        <section className='flex flex-col md:flex-row w-full max-w-7xl p-6 bg-white rounded-md'>
          <div className='w-full max-w-7xl flex flex-col gap-4'>
            <h2 className='text-black font-bold text-3xl'>Add New Photo</h2>
            <form className='flex w-full flex-col h-full' onSubmit={handleSubmit(handleAddPhoto)}>
              <label className={`${errors.title && 'text-red-500 font-semibold'}`}>
                {errors.title ? 'Title is required' : 'Title'}
              </label>
            <input className={inputStyles} type="text" {...register('title', { required: true })} />
              <label className={`${errors.description && 'text-red-500 font-semibold'}`}>
                {errors.description ? 'Description is required' : 'Description'}
              </label>
            <input className={inputStyles} type="text" {...register('description', { required: true })} />
              <label className={`${errors.image && 'text-red-500 font-semibold'}`}>
                {errors.image ? 'Image is required' : 'Image'}
              </label>
              <input
                className='w-[100%] md:w-1/2 file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100 file:cursor-pointer font-semibold'
                type="file"
                {...register('image', { required: true })}
                onChange={handleImageChange}
              />
              <div className='my-3 flex items-center mt-10 justify-start gap-3'>
                <button className='py-2 px-6 text-lg max-w-max bg-accent text-white rounded-[36px]'>Upload Photo</button>
                <button onClick={handleRedirect} className='py-2 px-6 text-lg max-w-max bg-whiteBg text-accent border-2 border-accent rounded-[36px]'>My Photos</button>
              </div>
          </form>
        </div>
          {imagePreview && <img src={imagePreview} alt="upload Preview" className="my-4 h-full sm:max-w-[50%] object-cover" />}
        </section>
        <section className='w-full max-w-7xl min-h-min'>
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
            {photos.map(photo => (
              <ImageCard key={uniqid()} photo={photo} setCardToUpdate={setCardToUpdate} handleDeletePhoto={handleDeletePhoto} />
            ))}
          </div>
          <div className={`flex gap-2 items-center ${totalPages <= 1 ? 'hidden' : ''}`}>
            <button className={stepBtnStyles} onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
            <span>{page} / {totalPages}</span>
            <button className={stepBtnStyles} onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
          </div> */}
        </section>
      </div>
    </>
  );
};

export default ImageUpload;
