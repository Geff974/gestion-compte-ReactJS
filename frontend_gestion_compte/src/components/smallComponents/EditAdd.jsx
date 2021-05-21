import React from 'react';
import { IoMdAdd } from 'react-icons/io'
import { MdModeEdit } from 'react-icons/md';

import '../../styles/smallComponents/EditAdd.css';

const EditAdd = ({ add, edit, editActive }) => {

    const active = editActive ? 'active' : '';

    return (
        <div className="edit-add">
            <div className="add" onClick={add}>
                <IoMdAdd />
            </div>

            <div className={`edit ${active}`} onClick={edit}>
                <MdModeEdit />
            </div>
        </div>
    );
};

export default EditAdd;