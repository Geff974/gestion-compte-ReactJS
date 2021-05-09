import React from 'react';

import '../../styles/smallComponents/ButtonHeader.css';

const ButtonHeader = ({ children, clickEvent }) => {
    return (
        <div>
            <button className="btn-header" onClick={clickEvent}>{children}</button>
        </div>
    );
};

export default ButtonHeader;