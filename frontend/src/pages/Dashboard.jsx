import React, { useState } from 'react';
import Board from '../components/Board';
import Button from '../components/Button';
import {  useOutletContext, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import TextAreaField from '../components/TextAreaField';
import useDashboardParams from '../hooks/useDashboardParams';
import useForm from '../hooks/useForm';
import validate from '../utils/validate';
import taskSchmea from '../schmeas/taskSchmea';
import boardSchema from '../schmeas/boardSchema';
import apiClient from '../utils/apiClient';
import useGetDashboardData from '../hooks/useGetDashboardData';
import Loading from '../components/Loading';
import BoardModal from '../components/BoardModal';

const Dashboard = () => {
    // console.log("bo", boards)
    const { type } = useParams();
    const { assignTo, initialValues, taskStatuses, statusOptions, priorityOptions } = useDashboardParams();
    const { formData, setFormData, handleChange, setErrors, errors } = useForm(initialValues);
    const { tasks, loading, getTasks } = useGetDashboardData(type);
    const { boards, getBoards } = useOutletContext();

    // const belongsTo = boards?.map((board) => { label: board.name, value: board._id  })



    const belongsToOptions = [
        // { label: 'Select ', value: '' },
        ...boards?.map((board) => ({ label: board.name, value: board._id }))
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [addBoard, setAddBoard] = useState(false);
    const [boardData, setBoardData] = useState({
        name:'',
    });

    const handleOnClick = () => {
        setFormData(initialValues);
        setIsOpen(true)
    }

    const handleOnClose = () => {
        setIsOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors =  validate(formData, taskSchmea);
        setErrors(validationErrors);
        console.log(validationErrors);

        if(Object.keys(validationErrors).length > 0 ) return;

        try {
        
            const res = await apiClient('/api/v1/tasks/add-task',{
                method: "POST",
                body: formData
            });
            const data = await res.json();

            alert(data.message);
            if(data.success){
                setIsOpen(false);
                setFormData(initialValues);
                getTasks();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (taskId) => {
        if (confirm("Are you sure you want to delete this task?")) {
            try {
        
                const res = await apiClient('/api/v1/tasks/delete-task/'+taskId,{
                    method: "DELETE",
                });

                const data = await res.json();

                alert(data.message);
                if(data.success){
                    getTasks();
                }

            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleBoardSubmit = async(e) => {
        e.preventDefault();

        const validationErrors =  validate(boardData, boardSchema);
        setErrors(validationErrors);
        console.log(validationErrors);

        if(Object.keys(validationErrors).length > 0 ) return;

        try {
        
            const res = await apiClient('/api/v1/boards/add-board',{
                method: "POST",
                body: boardData
            });
            const data = await res.json();

            alert(data.message);
            if(data.success){
                setAddBoard(false)
                setBoardData({name: ''});
                getBoards();
                // ();
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleEditTask = (task) => {
        setFormData(task);
        setIsOpen(true);
    }

    const openBoardModal = () => {
        setAddBoard(true);
    }

    return (
        <div className="p-4">
            <div className='flex justify-between items-center'>
                <h4 className="font-bold text-xl mb-4 text-center md:text-left">
                    Team Collaboration Dashboard
                </h4>

                <div className='py-4'>
                    <Button onClick={() => openBoardModal()} variant='secondary' className='mr-2'>Add Board</Button>
                    <Button onClick={() => handleOnClick()} variant='secondary'>Add Task</Button>
                </div>
            </div>

            {
                loading && <Loading/>
            }

            {
                (!loading && tasks?.length === 0 ) && <p className='text-lg font-medium text-center'>No Data Found</p>
            }

            {
                (!loading && tasks?.length > 0) &&
                <div className="overflow-x-auto h-screen">
                    <div className="flex flex-wrap md:flex-nowrap gap-6">
                        {taskStatuses.map((taskStatus, idx) => (
                            <div
                                key={idx}
                                className="min-w-[250px] sm:w-[300px] md:w-80 bg-white  rounded p-3"
                            >
                                <Board 
                                    name={taskStatus.name} 
                                    tasks={tasks.filter((task) => task.status === taskStatus.value )}
                                    handleEditTask={handleEditTask}
                                    handleDelete={handleDelete}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            }

            {/* // Task Modal */}
            <Modal
                isOpen={isOpen}
                onClose={handleOnClose}
                size='md'
                title={formData._id ? "Edit Task" : "Add Task"}

            >
                <form id="add-task" onSubmit={handleSubmit}>
                    <div>
                        <InputField
                            label="Title"
                            type='text'
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            error={errors?.title}
                        />

                        <TextAreaField
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            error={errors?.description}
                        />

                        <SelectField
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            options={statusOptions}
                            error={errors?.status}
                        />

                        <SelectField
                            label="Priority"
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            options={priorityOptions}
                            error={errors?.priority}
                        />

                        <InputField
                            label="Due Date"
                            type='date'
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            error={errors?.dueDate}
                        />

                        <InputField
                            label="Assigned To"
                            type='text'
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            error={errors?.assignedTo}
                        />


                        <SelectField
                            label="Belongs To"
                            name="belongsToBoard"
                            value={formData.belongsTo}
                            onChange={handleChange}
                            options={belongsToOptions}
                            error={errors?.assignTo}
                        />
                    </div>
                    <div className='text-right my-4'>
                        <Button type='submit'>Submit</Button>
                    </div>
                </form>
            </Modal>

            {/* // Board Modal */}
            <BoardModal
                isOpen={addBoard}
                onClose={() => setAddBoard(false)}
                handleSubmit={handleBoardSubmit}
                setBoardData={setBoardData}
                boardData={boardData}
                error={errors.name}
            />
        </div>
    );
};

export default Dashboard;
