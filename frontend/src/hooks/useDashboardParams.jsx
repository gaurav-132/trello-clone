import React from 'react'

const useDashboardParams = () => {
    
    const taskStatuses = [
        {value: 1, name: "To do"},
        {value: 2, name: "In progress"},
        {value: 3, name: "Done"}
    ];

    const assignTo = [
        { label: "Frontend Tasks", value: "frontend" },
        { label: "Backend Tasks", value: "backend" },
        { label: "Design Tasks", value: "design" },
        { label: "Testing Tasks", value: "qa" },
    ];

    const statusOptions = [
        {value: 1, label: "To do"},
        {value: 2, label: "In progress"},
        {value: 3, label: "Done"}
    ];

    const priorityOptions = [
        {value: 1, label: "Low"},
        {value: 2, label: "Medium"},
        {value: 3, label: "High"}
    ];

    const initialValues = {
        title: '',
        description: '',
        status:'',
        priority:'',
        assignedTo:'',
        dueDate:'',
        belongsToBoard:'',
    }
    return {taskStatuses, initialValues, assignTo, statusOptions, priorityOptions}
}

export default useDashboardParams