import React, { FC } from "react";
import { Link } from "react-router-dom";

export const SideBar: FC = () => {
    return (
        <div className="bg-blue-500 absolute top-0 left-0 w-full h-[120px] p-12 flex flex-row items-center justify-between">
            <Link to="/" className="text-5xl">Forum</Link>
            <div className="flex flex-row gap-8 text-black text-xl my-12">
                <Link to="/" className="hover:text-gray-700">Posts</Link>
                <Link to="/profile" className="hover:text-gray-700">Profile</Link>
                <Link to="/favorites" className="hover:text-gray-700">Favorites</Link>
                <Link to="/post-manager" className="hover:text-gray-700">Post manager</Link>
            </div> 
        </div>
    );
};