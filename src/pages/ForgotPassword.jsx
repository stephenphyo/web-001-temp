import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*** CSS Imports ***/
import './ForgotPassword.css';

/*** Package Imports ***/
import ReCAPTCHA from 'react-google-recaptcha';

/*** Component Imports ***/
import AuthForm from 'components/Common/AuthForm/AuthForm';
import Metadata from 'components/Common/Metadata/Metadata';
import FormInputText from 'components/Form/SPFormInputText/SPFormInputText';
import FormButton from 'components/Form/SPFormButton/SPFormButton';
import FormError from 'components/Form/SPFormError/SPFormError';

/*** Redux Imports ***/
import { useSelector } from 'react-redux';
import { useForgotPasswordMutation } from 'store/apis/AuthAPI';

/*** Context Imports ***/
import AuthContext from 'contexts/AuthContext';

/*** Utility Imports ***/
import validateEmail from 'utils/validateEmail';

function ForgotPassword() {

    /* Router */
    const navigate = useNavigate();

    /* useState */
    const [data, setData] = useState({
        email: '',
        recaptchaToken: ''
    });
    const [formError, setFormError] = useState({});

    /* useRef */
    const recaptchaRef = useRef();

    /* ??? */
    const err = {};

    /* Redux */
    const { email } = useSelector(state => state.auth);
    const [forgotPassword, resultForgotPassword] = useForgotPasswordMutation();

    /* Functions */
    const checkEmail = (email) => {
        if (email.length === 0) {
            err['email'] = 'Email address must not be empty';
        }
        if (!validateEmail(email)) {
            err['email'] = 'Invalid email address';
        }
    };

    const checkRecaptcha = () => {
        const recaptchaToken = recaptchaRef.current.getValue();
        if (!recaptchaToken) {
            err['email'] = 'Invalid reCaptcha';
        }
    };

    const checkData = () => {
        checkEmail(data['email']);
        checkRecaptcha();

        if (Object.keys(err).length !== 0) {
            setFormError(err);
            return false;
        } else {
            setFormError({});
            return true;
        }
    };

    const resetPassword = () => {
        if (checkData()) {
            forgotPassword(data);
            setFormError({});
        };
    };

    /* useEffect */
    useEffect(() => {
        if (email) {
            setData({ ...data, email: email });
        }
    }, []);

    useEffect(() => {
        if (resultForgotPassword.isSuccess) {
            navigate('/password/forgot/otp');
        }
    }, [resultForgotPassword]);

    return (
        <div className='forgot_password'>
            <Metadata title='Forgot Password' />
            <AuthForm>
                <AuthForm.Logo onClick={() => navigate('/')} />
                <AuthForm.Header
                    headers={{
                        main: 'Phoenix Talk',
                        sub: 'Forgot Password?'
                    }}
                />
                <AuthForm.Body>
                    <FormInputText
                        label='Enter Email Address'
                        placeholder='user@example.com'
                        autoFocus
                        value={data.email}
                        onChange={(e) => {
                            setData({ ...data, email: (e.target.value).toLowerCase() });
                            setFormError({});
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && resetPassword()} />
                    <FormError nbsp>{'email' in formError && formError['email']}</FormError>
                    <div className='form_captcha' style={{ marginTop: '20px' }}>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY}
                            onChange={() => {
                                setData({ ...data, recaptchaToken: recaptchaRef.current.getValue() });
                                console.log(recaptchaRef.current.getValue());
                            }}
                            theme='dark' />
                    </div>
                </AuthForm.Body>
                <AuthForm.Footer>
                    <FormButton
                        onClick={() => resetPassword()}>
                        Reset Password
                    </FormButton>
                    <FormButton className='outlined'
                        onClick={() => navigate('/login')}>
                        Cancel
                    </FormButton>
                </AuthForm.Footer>
            </AuthForm>
        </div>
    );
}

export default ForgotPassword;