import React, { useEffect, useState } from 'react'
import apiClient from '../utils/apiClient';

const useGetDashboardData = (taskType) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const getTasks = async () => {
        setLoading(true);
        try {
            const res = await apiClient('/api/v1/tasks/get-tasks', {
                method: "POST",
                body: { type:  taskType },
            })

            const data = await res.json();

            setTasks(data.tasks)

            console.log(data);
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getTasks();
    },[taskType])
    
    return {loading, tasks, getTasks};
}

export default useGetDashboardData;