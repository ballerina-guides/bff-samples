import React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

export default function CustomButton({ color, onClick, disabled, label, size, ...otherProps }) {
    return (
        <Button color={color} onClick={onClick} disabled={disabled} label={label} size={size} {...otherProps}>
            {label}
        </Button>
    );
}

CustomButton.propTypes = {
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
};

CustomButton.defaultProps = {
    color: 'default',
    disabled: false,
    label: 'Click',
    size: 'medium'
};