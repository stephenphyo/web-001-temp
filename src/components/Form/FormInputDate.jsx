import React, { forwardRef } from 'react';

/* CSS Imports */
import 'styles/components/form/FormInputDate.css';

const FormInputDate = forwardRef((props, ref) => {
    return (
        <div
            className='form_input_date'>
            <input
                type='date'
                required='required'
                ref={ref}
                {...props} />
            <label>{props.label}</label>
            <hr />
        </div>
    );
});

export default FormInputDate;