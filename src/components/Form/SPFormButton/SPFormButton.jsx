import React, { forwardRef } from 'react';

/*** CSS Imports ***/
import './SPFormButton.css';

const SPFormButton = forwardRef((props, ref) => {

    const { className, ...otherProps } = props;

    return (
        <div className={`sp_form_button ${className || ''}`}>
            <button ref={ref} {...otherProps}>
                {otherProps.children}
            </button>
        </div>
    );
});

SPFormButton.displayName = 'SPFormButton';

export default SPFormButton;