import React from 'react';
import PropTypes from 'prop-types';
import './Btn.css';

function Btn({
    children,
    onClick = () => { }, // Default no-op function
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    className = '',
    ...props // Capture any other props for better flexibility
}) {
    return (
        <button
            className={`btn ${variant} ${size} ${className}`}
            onClick={disabled ? undefined : onClick} // Prevent click when disabled
            type={type}
            disabled={disabled}
            {...props} // Spread additional props for customization
        >
            {children}
        </button>
    );
};

// Define prop types for better validation
Btn.propTypes = {
    children: PropTypes.node.isRequired, // Text or content inside button
    onClick: PropTypes.func, // Function triggered on click
    type: PropTypes.oneOf(['button', 'submit', 'reset']), // Button type
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning']), // Button style type
    size: PropTypes.oneOf(['small', 'medium', 'large']), // Button size
    disabled: PropTypes.bool, // Whether the button is disabled
    className: PropTypes.string, // Custom CSS class if needed
};

export default Btn;
