export const Footer = () => {
    return (
        <section className="w-full min-h-[30vh] bg-white border-t flex items-center justify-center flex-col">
            <div className="w-full max-w-7xl gap-4 flex-col sm:flex-row flex justify-between items-center p-6">
                <div className="flex items-start justify-center flex-col">
                    <h3 className="mr-auto font-semibold text-4xl italic">KA</h3>
                    <h1 className="text-4xl leading-tight">All your files.</h1>
                    <span className="text-4xl leading-tight text-accent">In One Place.</span>
                    <h2 className="text-4xl leading-tight">Safely &nbsp;
                        <span className="text-4xl leading-tight text-accent">Stored.</span>
                    </h2>
                </div>
                <div className="h-full p-8 w-[300px] ml-auto border-l border-t rounded-tl-[50px]">
                    <h3 className="text-accent">Contact</h3>
                    <p>+1 (323) 275-1718</p>
                    <p>hello@ka.com</p>
                </div>
            </div>
        </section>
    )
}