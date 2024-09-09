import React, { forwardRef } from 'react';

/* CSS Imports */
import './SPFormError.css';

const SPFormError = forwardRef((props, ref) => {

    const { className, ...otherProps } = props;

    return (
        <div className={`sp_form_error ${className || ''}`}>
            <span ref={ref} {...otherProps}>
                {props.children}
            </span>
            {props.nbsp && <span>&nbsp;</span>}
        </div>
    );
});

SPFormError.displayName = 'SPFormError';

export default SPFormError;