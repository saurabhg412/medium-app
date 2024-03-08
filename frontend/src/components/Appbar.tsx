
import { Link, useLocation } from 'react-router-dom';
// import usePost from './useposts-hook';

export default function AppBar() {
  // const { username }:any = usePost();
  const location = useLocation();
  // const user = username[0].author.name
  // console.log(user)
  return (
    <div className="bg-white shadow-md sticky top-0 z-10"> 
      <div className="container mx-auto px-4 flex items-center justify-between py-3">

        <Link to="/post" className="font-bold text-xl mr-3">Medium</Link>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-4">
          <li>
            <input type="text" placeholder='Search your posts...' className="border border-gray-300 rounded-md px-3 py-2 w-full"/>
          </li>
          <li >
            <Link to="/post">Home</Link>
          </li>
          <li className={location.pathname.startsWith('/post/') ? 'text-blue-500' : ''}>
            <Link to="/publish">New Post</Link>
          </li>
          <li>
            <Link to="/Posts">My Posts</Link>
          </li>
          {/* Add more links if needed (About, Contact, etc.) */}

          {/* User Profile (optional) */}
          <li>
            <button className="bg-gray-200 hover:bg-blue-200 px-3 py-1 rounded-md">
              {/* Replace with profile image or initials */}
              <div className="flex items-center"> 
                <span className="font-medium mr-2 ">Hello </span>
                {/* <span className="text-lg font-bold">{user}</span>  */}
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}