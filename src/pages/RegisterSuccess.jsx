import React from 'react';
import { useNavigate } from 'react-router-dom';

/*** CSS Imports ***/
import './RegisterSuccess.css';

/*** Redux Imports ***/
import { useSelector } from 'react-redux';
import AuthSlice from 'store/slices/AuthSlice';

/*** Component Imports ***/
import AuthForm from 'components/Common/AuthForm/AuthForm';
import Metadata from 'components/Common/Metadata/Metadata';
import FormButton from 'components/Form/SPFormButton/SPFormButton';

function RegisterSuccess() {

    /* Router */
    const navigate = useNavigate();

    /* Redux */
    const { email } = useSelector(state => state.auth);

    return (
        <div className='register_success'>
            <Metadata title='Register Account' />
            <AuthForm>
                <AuthForm.Logo onClick={() => navigate('/')} />
                <AuthForm.Header
                    headers={{
                        main: 'Phoenix Talk',
                        sub: 'Registration Successful'
                    }}
                />
                <AuthForm.Body>
                    <div className='register_success_text'>
                        <span>Your account</span>
                        <span id='email'>{email}</span>
                        <span>has been created successfully</span>
                    </div>
                </AuthForm.Body>
                <AuthForm.Footer>
                    <FormButton
                        onClick={() => {
                            navigate('/login', { state: { fromRegister: true } });
                        }}>
                        Go to Login
                    </FormButton>
                </AuthForm.Footer>
            </AuthForm>
        </div>
    );
}

export default RegisterSuccess;