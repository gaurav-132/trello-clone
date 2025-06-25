import React, { useEffect, useState } from 'react'
import apiClient from '../utils/apiClient';

const useGetBoards = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);

    const getBoards = async () => {
        setLoading(true);
        try {
            const res = await apiClient('api/v1/boards/get-boards')

            const data = await res.json();

            setBoards(data.boards)

            console.log(data);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getBoards();
    },[])
    
    return {getBoards, boards};
}

export default useGetBoards;