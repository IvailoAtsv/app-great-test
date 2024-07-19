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

export const Files = () => {
    const [photos, setPhotos] = useState([]);
    const [cardToUpdate, setCardToUpdate] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [imagePreview, setImagePreview] = useState(null);

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
            setImagePreview(null); // Clear the preview after successful upload
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
        <section className='w-full max-w-7xl min-h-min'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-7xl">
                {photos.map(photo => (
                    <ImageCard key={uniqid()} photo={photo} setCardToUpdate={setCardToUpdate} handleDeletePhoto={handleDeletePhoto} />
                ))}
            </div>
            <div className={`flex gap-2 items-center ${totalPages <= 1 ? 'hidden' : ''}`}>
                <button className={stepBtnStyles} onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <span>{page} / {totalPages}</span>
                <button className={stepBtnStyles} onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        </section>
    )
}