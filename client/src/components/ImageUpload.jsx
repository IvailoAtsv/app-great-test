import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImageCard } from './ImageCard';

const ImageUpload = () => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/photos');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const handleAddPhoto = async () => {
    try {
      const imageData = await convertImageToBase64(image);
      console.log(image);
      await axios.post('http://localhost:4000/photos/upload', {
        title,
        description,
        image: imageData
      });

      fetchPhotos();
      setTitle('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  const convertImageToBase64 = (imageFile) => {
    return new Promise((resolve, reject) => {
      if (!imageFile) {
        return reject(new Error('No image provided'));
      }

      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const inputStyles = 'w-[100%] md:w-[50%] p-2 rounded-md border border-gray-300 rounded text-black font-semibold';

  return (
    <div className='w-full min-h-screen text-lg bg-black p-4 text-white flex flex-col justify-start items-center gap-4'>
      <h1 className='text-white font-bold text-3xl'>Photo Gallery</h1>

      <div className='w-[90%] max-w-[1200px] flex flex-col gap-4'>
        <h2 className='text-white font-bold text-3xl'>Add New Photo</h2>
        <input className={inputStyles} type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
        <input className={inputStyles} type="text" value={description} placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
        <input className='w-[100%] md:w-1/2 file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100 file:cursor-pointer font-semibold' type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button className='self-start bg-blue-50 text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-md'
         onClick={handleAddPhoto}>Add Photo</button>
      </div>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[90%] max-w-[1200px] ">
    {photos.map(photo => (
        <ImageCard photo={photo} />
    ))}
</div>
    </div>
  );
};

export default ImageUpload;