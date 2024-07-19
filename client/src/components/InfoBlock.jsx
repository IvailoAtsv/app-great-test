export const InfoBlock = () => {
    return (
        <div className="w-full my-6 max-w-7xl flex flex-col items-center justify-center bg-accentLight rounded-xl min-h-[30vh]">
            <section className="flex  flex-col sm:flex-row font-bold items-start justify-between px-6">
                <h2 className="text-h1clamp leading-tight">Our &nbsp;
                    <span className="text-h1clamp leading-tight text-accent">Mission.</span>
                </h2>
                <p className="text-black sm:max-w-[60%]">Our mission is to offer a hassle-free, efficient, and secure platform for photos storing. We believe that simplicity is key, and our goal is to make your life easier by providing a straightforward solution for uploading and accessing your files.
                    Once your files are uploaded, you can easily navigate to the  page where they are displayed, ready for you to access whenever you need them.</p>
            </section>
        </div>
    )
}
