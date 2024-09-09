import React, { useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/*** CSS Imports ***/
import './ForgotPasswordOTP.css';

/*** Component Imports ***/
import AuthForm from 'components/Common/AuthForm/AuthForm';
import FormError from 'components/Form/SPFormError/SPFormError';
import FormButton from 'components/Form/SPFormButton/SPFormButton';
import OTP from 'components/Common/OTP/OTP';
import Metadata from 'components/Common/Metadata/Metadata';

/*** Hook Imports ***/
import useCountDownTimer from 'hooks/useCountDownTimer';

/*** Utility Imports ***/
import convertTimeString from 'utils/convertTimeString';

function ForgotPasswordOTP() {

    /* Initialization */
    const OTP_MAX_LENGTH = 6;
    const OTP_TTL = 300;

    /* useNavigate */
    const navigate = useNavigate();

    /* useState */
    const [render, setRender] = useState(false);
    const [error, setError] = useState('');

    /* Custom Hooks */
    const [countdown, actionCountDown] = useCountDownTimer(OTP_TTL);

    const sendOTP = () => {
        actionCountDown('RESET');

    };

    const handleOnChange = (otp) => {
        console.log(otp);
    }

    const handleSubmit = () => {
        // if (!OTP.includes(' ')) {
        // }
    };

    /* useEffect */
    // useEffect(() => {
    //     if (!ctxEmail.reset) {
    //         navigate('/resetpassword');
    //     } else {
    //         setRender(true);
    //         sendOTP();
    //     }
    // }, []);

    // useEffect(() => {
    //     render && inputRefs.current[0].focus();
    // }, [render]);

    return (
        <div className='forgot_password_otp' >
            <Metadata title='Verify OTP' />
            <AuthForm>
                <AuthForm.Logo onClick={() => navigate('/')} />
                <AuthForm.Header
                    headers={{
                        main: 'Phoenix Talk',
                        sub: 'Forgot Password?'
                    }}
                />
                <AuthForm.Body>
                    <div className='form_text'>
                        <p>
                            Email with a 6-digit OTP for password reset has been sent to your email address:
                        </p>
                        <p id='email'>{'EMAIL'}</p>
                        <p>Please check your email and enter OTP to reset your password.</p>
                    </div>
                    <OTP onChange={handleOnChange} />
                    <FormError nbsp>{error}</FormError>
                </AuthForm.Body>
                <AuthForm.Footer>
                    <FormButton
                        onClick={() => handleSubmit()}>
                        Continue
                    </FormButton>
                    <FormButton type='outlined'
                        onClick={() => navigate('/password/forgot')}>
                        Back
                    </FormButton>
                </AuthForm.Footer>
            </AuthForm>
        </div>
    );
};

export default ForgotPasswordOTP;