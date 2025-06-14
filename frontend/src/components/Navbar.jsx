import {Link} from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import { IoSunny } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { ThemeContext } from '../ThemeContext';
import { useContext } from 'react';

const Navbar = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="text-gray-600 body-font shadow-lg ">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link  to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-blue-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="dark:text-white">Card Carrier</span>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
         
        </nav>
          <a
                href="https://github.com/Aayushsah6969"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100"
              >
            Developer
              </a>
        <Link to="/" className="mx-4 inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
         Home <IoMdHome className='flex justify-center align-middle m-2'/>
        </Link>
        <button className="mx-4 inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"   onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'} <IoSunny className='flex justify-center align-middle m-2'/>
        </button>
        <Link to="/addcard" className=" inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
         Add Cards <IoIosAddCircle  className='flex justify-center align-middle m-2'/>
        </Link>
       
      </div>
    </header>
  );
};

export default Navbar;
