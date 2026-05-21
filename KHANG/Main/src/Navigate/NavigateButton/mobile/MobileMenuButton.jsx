
export default function MobileMenuButtonComponent ({mobilePara,setMobilePara} ) {
    return (
        <>
            <button onClick = {() => setMobilePara(prev => !prev)}
                    className="lg:hidden ml-auto p-2 flex flex-col gap-1.5 focus:outline-none"
                    aria-label="Toggle menu">

                    <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300
                        ${mobilePara? 'rotate-45 translate-y-2' : ''}`}/>

                    <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300
                            ${mobilePara ? 'opacity-0' : ''}`}/>

                    <span className={`w-6 h-0.5 bg-gray-700 transition-all duration-300
                            ${mobilePara ? '-rotate-45 -translate-y-2' : ''}`}/>
                    
            </button>
        </>
    )
}