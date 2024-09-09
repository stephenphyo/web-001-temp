import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/*** CSS Imports ***/
import './Register.css';

/*** Redux Imports ***/
import { useRegisterMutation } from 'store/apis/AuthAPI';

/*** Component Imports ***/
import AuthForm from 'components/Common/AuthForm/AuthForm';
import FormInputText from 'components/Form/SPFormInputText/SPFormInputText';
import FormInputPassword from 'components/Form/SPFormInputPassword/SPFormInputPassword';
import FormButton from 'components/Form/SPFormButton/SPFormButton';
import FormError from 'components/Form/SPFormError/SPFormError';
import Metadata from 'components/Common/Metadata/Metadata';

/*** Utility Imports ***/
import validateEmail from 'utils/validateEmail';
import validatePassword from 'utils/validatePassword';

/*** Package Imports ***/
import { Bars } from 'react-loader-spinner';

function Register() {

    /* Router */
    const navigate = useNavigate();

    /* useState */
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [formError, setFormError] = useState({});

    /* ??? */
    const err = {};

    /* Redux */
    const [register, resultRegister] = useRegisterMutation();

    /* Functions */
    // Data Checking & Error Handling
    const checkUsername = (username) => {
        if (username.length === 0) {
            err['username'] = 'Please choose a username';
        }
        else if (username.length < 3) {
            err['username'] = 'Username is too short';
        }
    };

    const checkEmail = (email) => {
        if (email.length === 0) {
            err['email'] = 'Email address must not be empty';
        }
        else if (!validateEmail(email)) {
            err['email'] = 'Enter a valid email address';
        }
    };

    const checkPassword = (initPwd, cfmPwd) => {
        if (initPwd.length === 0) {
            err['password'] = 'Password must not be empty';
        }
        else if (initPwd.length < 8) {
            err['password'] = 'Password length must be greater than 8';
        }
        else if (initPwd.length > 24) {
            err['password'] = 'Password length must be less than 24';
        }
        else if (!validatePassword(data['password'])) {
            err['password'] = 'Password must contain at least one uppercase, lowercase, number and special character';
        }
        else if (cfmPwd !== initPwd) {
            err['confirmPassword'] = 'Passwords do not match';
        }
    };

    const checkData = () => {
        checkUsername(data['username']);
        checkEmail(data['email']);
        checkPassword(data['password'], data['confirmPassword']);

        if (Object.keys(err).length !== 0) {
            setFormError(err);
            return false;
        } else {
            setFormError({});
            return true;
        }
    };

    const handleRegister = () => {
        if (checkData()) {
            register(data);
        }
    };

    /* useEffect */
    useEffect(() => {
        if (resultRegister.isSuccess) {
            navigate('/register/success')
        };
    }, [resultRegister, navigate]);

    return (
        <div className='register'>
            <Metadata title='Register Account' />
            <AuthForm>
                <AuthForm.Logo onClick={() => navigate('/')} />
                <AuthForm.Header
                    headers={{
                        main: 'Phoenix Talk',
                        sub: 'Register New Account'
                    }}
                />
                <AuthForm.Body>
                    <div className='col-12 col-md-6'>
                        <FormInputText
                            label='First Name'
                            placeholder='Stephen'
                            autoFocus
                            onChange={(e) => setData({ ...data, firstName: e.target.value })} />
                        <FormError nbsp>{'firstName' in formError && formError['firstName']}</FormError>
                    </div>
                    <div className='col-12 col-md-6'>
                        <FormInputText
                            label='Last Name'
                            placeholder='Phyo'
                            onChange={(e) => setData({ ...data, lastName: e.target.value })} />
                        <FormError nbsp>{'lastName' in formError && formError['lastName']}</FormError>
                    </div>
                    <FormInputText
                        label='Username'
                        placeholder='Enter Username'
                        onChange={(e) => setData({ ...data, username: e.target.value })} />
                    <FormError nbsp>{'username' in formError && formError['username']}</FormError>
                    <AuthForm.Gap />
                    <FormInputText
                        label='Email'
                        placeholder='Enter Email Address'
                        onChange={(e) => setData({ ...data, email: e.target.value })} />
                    <FormError nbsp>{'email' in formError && formError['email']}</FormError>
                    <AuthForm.Gap />
                    <FormInputPassword
                        label='Password'
                        placeholder='Enter Password'
                        onChange={(e) => setData({ ...data, password: e.target.value })} />
                    <FormError nbsp>{'password' in formError && formError['password']}</FormError>
                    <AuthForm.Gap />
                    <FormInputPassword
                        label='Confirm Password'
                        placeholder='Enter Confirm Password'
                        onChange={(e) => setData({ ...data, confirmPassword: e.target.value })} />
                    <FormError nbsp>{'confirmPassword' in formError && formError['confirmPassword']}</FormError>
                </AuthForm.Body>
                <AuthForm.Footer>
                    <FormButton
                        onClick={() => handleRegister()}
                        disabled={resultRegister.isLoading}>
                        {
                            resultRegister.isLoading
                                ? <Bars visible width='25' height='25'
                                    color='#FFFFFF' />
                                : 'Register'
                        }
                    </FormButton>
                    <div className='register_footer'>
                        <span>Already have an account?</span>
                        <span id='login'
                            onClick={() => navigate('/login')}>
                            Login
                        </span>
                    </div>
                </AuthForm.Footer>
            </AuthForm>
        </div>
    );
}

export default Register;