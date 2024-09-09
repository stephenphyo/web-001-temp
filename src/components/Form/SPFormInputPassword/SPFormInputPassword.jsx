import React, { forwardRef, useState } from 'react';

/*** CSS Imports ***/
import './SPFormInputPassword.css';

/*** Icon Imports ***/
import { IoEye, IoEyeOff } from 'react-icons/io5';

const SPFormInputPassword = forwardRef((props, ref) => {

    const { className, ...otherProps } = props;

    /* useState */
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={`sp_form_input_password ${className || ''}`}>
            <label>{otherProps?.label}</label>
            <div id='container'>
                <input
                    type={showPassword ? 'text' : 'password'}
                    ref={ref}
                    {...otherProps} />
                <span id='eye'>
                    {
                        showPassword
                            ? <IoEyeOff size={18} onClick={() => setShowPassword(false)} />
                            : <IoEye size={18} onClick={() => setShowPassword(true)} />
                    }
                </span>
            </div>
        </div >
    );
});

SPFormInputPassword.displayName = 'SPFormInputPassword';

export default SPFormInputPassword;