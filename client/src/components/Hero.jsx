import img from '../images/image 1.png'

export const Hero = () => {
    return (
        <div className="min-h-[70vh] mt-[50px] w-full flex flex-col sm:flex-row justify-center items-center bg-whiteBg max-w-7xl">
            <section className="flex gap-2 p-2 flex-1 font-bold flex-col justify-center items-start w-[60%] ">
                <h1 className="text-h1clamp leading-tight">All your files.</h1>
                <span className="text-h1clamp leading-tight text-accent">In One Place.</span>
                <h2 className="text-h1clamp leading-tight">Safely &nbsp;
                    <span className="text-h1clamp leading-tight text-accent">Stored.</span>
                </h2>
                <p className='text-left text-xl w-[60%] font-extralight'>Upload files, share with your team, do not ever worry about your safety again.</p>
                <div className='my-3 flex items-center gap-3'>
                    <button className='py-2 px-6 whitespace-nowrap text-lg bg-accent text-white rounded-[36px]'>Upload New</button>
                    <button className='py-2 px-6 whitespace-nowrap text-lg bg-whiteBg text-accent border-2 border-accent rounded-[36px]'>About Us</button>
                </div>
            </section>
            <img src={img} className='flex-1 rounded-tl-[100px] rounded-md sm:max-w-[50%]' alt="servers saving data" />
        </div>
    )
}