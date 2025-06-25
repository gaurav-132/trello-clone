import React, { useState } from 'react';
import Modal from './Modal';
import {
    EyeIcon,
    PencilIcon,
    Trash2Icon
} from 'lucide-react';

const Board = ({ 
    name, 
    tasks = [], 
    handleEditTask, 
    handleDelete
}) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    // console.log(tasks);

    const openDetail = (task) => {
        setSelectedTask(task);
        setIsDetailOpen(true);
    };

    const closeDetail = () => {
        setSelectedTask(null);
        setIsDetailOpen(false);
    };

    const getPriorityLabel = (value) => {
        if (value === 1) return "Low";
        if (value === 2) return "Medium";
        if (value === 3) return "High";
        return "N/A";
    };

    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-4 min-h-[200px]">
            <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-gray-800">
                {name}
            </h2>

            <div className="space-y-3">
                {tasks.length > 0 ? (
                    tasks.map((task, idx) => (
                        <div
                            key={idx}
                            className="bg-white p-3 rounded-md shadow hover:shadow-md transition text-sm space-y-1"
                        >
                            <div className="flex justify-between items-start gap-2">
                                <div>
                                    <p className="font-medium text-gray-800">{task.title}</p>
                                    <div className="text-xs text-gray-500">Priority: {getPriorityLabel(task.priority)}</div>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <EyeIcon
                                        size={18}
                                        className="cursor-pointer hover:text-blue-500"
                                        onClick={() => openDetail(task)}
                                    />
                                    <PencilIcon
                                        size={18}
                                        className="cursor-pointer hover:text-yellow-500"
                                        onClick={() => handleEditTask(task)}
                                    />
                                    <Trash2Icon
                                        size={18}
                                        className="cursor-pointer hover:text-red-500"
                                        onClick={() => handleDelete(task._id)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm italic">No tasks available</p>
                )}
            </div>

            <Modal
                isOpen={isDetailOpen}
                onClose={closeDetail}
                size="md"
                title="Task Details"
                footer={null}
            >
                    {
                        selectedTask && 
                        <div className="space-y-2 text-sm">
                            <p><strong>Title:</strong> {selectedTask.title}</p>
                            <p><strong>Description:</strong> {selectedTask.description}</p>
                            <p><strong>Status:</strong> {selectedTask.status}</p>
                            <p><strong>Priority:</strong> {getPriorityLabel(selectedTask.priority)}</p>
                            <p>
                                <strong>Due Date:</strong>{' '}
                                {new Date(selectedTask.dueDate).toLocaleDateString('en-GB')}
                            </p>

                            <p><strong>Assigned To:</strong> {selectedTask.assignedTo}</p>
                        </div>
                    }
            </Modal>
        </div>
    );
};

export default Board;
