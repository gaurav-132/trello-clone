import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import useGetBoards from './hooks/useGetBoards';



const Layout = () => {
    const { boards, loading, getBoards } = useGetBoards();

    return (
        <div className="flex h-screen">
            <aside className="w-[200px] border-r">
                <Sidebar boards={boards}  />
            </aside>
            <main className="flex-1 overflow-y-auto">
                <Outlet context={{ boards, getBoards }} />
            </main>
        </div>
    );
};

export default Layout;
