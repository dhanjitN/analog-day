export default function NavPopup() {
    return (
        <div className="absolute right-0 mt-2 w-44 bg-neutral-900 border border-netural-200 rounded-lg shadow-lg py-1 z-10">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-netural-800">
                Profile
            </button> 
            <button className="w-full text-left px-4 py-2 text-sm text-gray-100 hover:bg-netural-800">
                Settings
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-netural-800">
                Logout
            </button>
        </div>
    )
}