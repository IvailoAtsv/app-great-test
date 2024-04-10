
export const ImageCard = ({photo}) =>{

    return (
        <div key={photo._id} className="border rounded-md flex flex-col justify-between border-gray-300 p-4">
            <img src={photo.image} alt={photo.title} className="object-cover h-[70%] aspect-square" />
    
            <p className="font-semibold text-white">{photo.title}</p>
            <p className='break-words'>{photo.description}</p>

            <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded" >Update</button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" >Delete</button>
            </div>
        </div>
    )
}