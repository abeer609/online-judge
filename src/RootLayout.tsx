import React from "react";
import { Outlet } from "react-router";

const RootLayout = () => {
    return (
        <div className="dark:bg-gray-950 h-screen">
            <Outlet />
        </div>
    );
};

export default RootLayout;
