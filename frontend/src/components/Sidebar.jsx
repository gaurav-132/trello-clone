import React from 'react'
import  { Link, useLocation } from 'react-router-dom';

const Sidebar = ({
    boards
}) => {

    const location = useLocation();
    const currentLocation = location.pathname.split('/')[2];

    

    const sidebarItems = boards?.map((board) => {
        return {
            name: board?.name,
            type: board?._id?.toLowerCase() || ''
        };
    });

    // console.log(boards)


    return (
        <div className='mx-4'>
            <div className='text-center mb-4'>
                <h4>Trello</h4>
            </div>
            {
                sidebarItems?.map((sidebar, idx) => {
                    const isActive = currentLocation === sidebar.type;
                    return <div
                            className={`hover:bg-gray-200 mb-2 rounded-md px-4 py-2
                                ${isActive
                                    ? 'bg-gray-200 text-black font-semibold'
                                    : 'hover:bg-gray-200 text-gray-800'
                                }`
                            } 
                            key={idx}
                        >
                        <Link to={`/dashboard/${sidebar.type}`} className="block">
                            {sidebar.name}
                        </Link>
                    </div>
                    
                })
            }
        </div>
    )
}

export default Sidebar