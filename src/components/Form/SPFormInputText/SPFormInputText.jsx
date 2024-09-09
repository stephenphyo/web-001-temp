import React, { forwardRef } from 'react';

/*** CSS Imports ***/
import './SPFormInputText.css';

const SPFormInputText = forwardRef((props, ref) => {

    const { className, ...otherProps } = props;

    return (
        <div className={`sp_form_input_text ${className || ''}`}>
            <label>{otherProps?.label}</label>
            <input
                type='text'
                ref={ref}
                {...otherProps} />
        </div>
    );
});

SPFormInputText.displayName = 'SPFormInputText';

export default SPFormInputText;