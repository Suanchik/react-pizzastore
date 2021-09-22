import classNames from 'classnames';
import React from 'react';
import './button.scss'


const Button = ({ onClick, outline, className, children }) => {
    return (
        <button onClick={onClick} className={classNames('button', { 'button-outline': outline }, className)}>{children}</button>
    )
};

export default Button;