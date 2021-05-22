import React from 'react';
import { IoMdAdd } from 'react-icons/io'
import { MdModeEdit } from 'react-icons/md';

import '../../styles/smallComponents/EditAdd.css';

const EditAdd = ({ add, edit, editActive, addActive }) => {

    const activeEdit = editActive ? 'activeEdit' : '';
    const activeAdd = addActive ? 'activeAdd' : '';

    return (
        <div className="edit-add">
            <div className={`add ${activeAdd}`} onClick={add}>
                <IoMdAdd />
            </div>

            <div className={`edit ${activeEdit}`} onClick={edit}>
                <MdModeEdit />
            </div>
        </div>
    );
};

export default EditAdd;