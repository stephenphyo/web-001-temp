import React, { useState, useRef, useEffect, forwardRef } from 'react';

/* CSS Imports */
import './OTP.css';

const OTP = forwardRef((props, ref) => {

    const { length = 6, onChange, ...otherProps } = props;

    /* useState */
    const [OTP, setOTP] = useState(Array(length).fill(''));

    /* useRef */
    const inputRefs = useRef([]);

    /* Functions */
    const handleOTPInput = (index, value) => {
        if (!isNaN(value) && value.length <= 1) {
            const newOTP = [...OTP];
            newOTP[index] = value;
            setOTP(newOTP);
            // Emit OTP Change Event
            onChange && onChange(OTP.join(''));

            if (value && index < OTP.length - 1) {
                inputRefs.current[index + 1].focus();
                setTimeout(() => inputRefs.current[index + 1].select(), 0);
            }
        }
    }

    const handlePaste = (e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const pastedData = clipboardData.getData('text').trim();
        const newOTP = [];

        for (let i = 0; i < OTP.length && i < pastedData.length; i++) {
            newOTP[i] = pastedData[i];
        }

        setOTP(newOTP);
        onChange && onChange(OTP.join(''));
    };

    const handleKeyEvents = (index, e) => {
        if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1].focus();
            setTimeout(() => inputRefs.current[index - 1].select(), 0);
        }

        if (e.key === 'ArrowRight' && index < OTP.length - 1) {
            inputRefs.current[index + 1].focus();
            setTimeout(() => inputRefs.current[index + 1].select(), 0);
        }

        if (e.key === 'Backspace' && index > 0) {
            handleOTPInput(index, '');
            setTimeout(() => inputRefs.current[index - 1].focus(), 0);
        }
    }

    /* useEffect */
    useEffect(() => {
        onChange && onChange(OTP.join(''));
    }, [OTP, onChange]);

    return (
        <div className='sp_otp'>
            {
                OTP.map((digit, index) => (
                    <input key={index} type='text'
                        value={digit}
                        ref={(ref) => inputRefs.current[index] = ref}
                        onChange={(e) => handleOTPInput(index, e.target.value)}
                        onKeyDown={(e) => handleKeyEvents(index, e)}
                        onPaste={(e) => handlePaste(e)}
                        {...otherProps} />
                ))
            }
        </div>
    );
});

OTP.displayName = 'OTP';

export default OTP;