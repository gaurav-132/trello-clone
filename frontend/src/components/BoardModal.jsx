import React, { useState } from 'react';
import Modal from './Modal';
import InputField from './InputField';
import Button from './Button';

const BoardModal = ({ isOpen, onClose, handleSubmit, boardData, setBoardData, error }) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Board"
            size="sm"
        >
            <form id="board-form" onSubmit={handleSubmit}>
                <InputField
                    label="Board Name"
                    name="name"
                    type="text"
                    value={boardData.name}
                    onChange={(e) => setBoardData({name: e.target.value})}
                    error={error}
                />

                <div className='text-right'>
                    <Button type='submit'>Submit</Button>
                </div>
            </form>
        </Modal>
    );
};

export default BoardModal;
