
export default function MobileDashboard({nav }) {

    return(
        <div className="lg:hidden fixed top-16 md:top-20 left-0 right-0 bg-white shadow-lg z-10 max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-5rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="flex flex-col p-4 space-y-3">
            {/* Nav items for mobile */}
            <div className="flex flex-col gap-2">
                {nav}
            </div>

        
        </div>
    </div>
    )
}