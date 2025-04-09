import { Link } from "react-router-dom";

function Header() {
    return (
    <div className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
            <img alt="IARC Logo" className="w-6 h-6" src="https://png.pngtree.com/element_our/png_detail/20180911/background-material-design-for-lorem-ipsum-logo-png_89686.jpg"/>
            <div className="text-lg font-semibold"> IARC Devboard</div>
        </div>
        <div className="space-x-6 hidden md:flex">
            <Link 
                to="/"
                aria-current="page"
                className="text-blue-600 font-medium"
            >
                Home
            </Link>
            <Link 
                to="/create"
                aria-current="page"
                className="text-gray-700 hover:text-blue-600"
            >
                Create
            </Link>
            <Link
                to="/product"
                aria-current="page"
                className="text-gray-700 hover:text-blue-600"
            >
                Product
            </Link>
            <Link
                to="/order"
                aria-current="page"
                className="text-gray-700 hover:text-blue-600"
            >
                Order
            </Link>
            <div href="#" className="text-gray-700 hover:text-blue-600">About</div>
            <img src="https://static.vecteezy.com/system/resources/previews/020/765/399/original/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" alt="Profile" class="w-8 h-8 rounded-full object-cover" />
        </div>
    </div>
    );
}

export default Header;