import React, { FC } from "react";
import { Link } from "react-router-dom";

export const SideBar: FC = () => {
    return (
        <div className="bg-gray-200 max-w-[180px] w-full h-dvh py-12 px-4">
            <h1>Forum</h1>
            <div className="flex flex-col gap-8 text-black text-xl my-12">
                <Link to="/">Posts</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/admin">Admin panel</Link>
            </div> 
        </div>
    );
};