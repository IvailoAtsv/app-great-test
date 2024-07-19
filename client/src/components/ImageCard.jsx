
export const ImageCard = ({photo, handleDeletePhoto,setCardToUpdate}) =>{

    return (

        <div key={photo._id} className=" rounded-md h-[400px] flex flex-col justify-between shadow-md p-4">
           
            <img src={photo.image} alt={photo.title} className="rounded-md object-cover h-[70%] aspect-square" />
    
            <p className="font-semibold text-black">{photo.title}</p>
            <p className='break-words'>{photo.description}</p>

            <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 mr-2 rounded" onClick={() => setCardToUpdate(photo)}>Update</button>
                <button className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded" onClick={() => handleDeletePhoto(photo._id)} >Delete</button>
            </div>
        </div>
    )
}