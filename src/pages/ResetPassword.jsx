import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

/* CSS Imports */
import 'styles/pages/ResetPassword.css';
import 'styles/components/form/Form.css';
import 'styles/components/FormHeader.css';
import 'styles/components/FormButton.css';

/* Component Imports */
import FormInputPassword from 'components/Form/FormInputPassword';
import FormError from 'components/Form/SPFormError/SPFormError';

/* Utility Imports */
import Axios from 'utils/Axios';

/* Function Imports */
import validatePassword from 'utils/validatePassword';

function ResetPassword() {

    /* Initialization */
    const err = {};

    /* useNavigate */
    const navigate = useNavigate();

    /* useLocation */
    const location = useLocation();

    /* useParams */
    const params = useParams();

    /* useState */
    const [password, setPassword] = useState('');
    const [cfmPassword, setCfmPassword] = useState('');
    const [error, setError] = useState({});

    /* Functions */
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
        else if (!validatePassword(password)) {
            err['password'] = 'Password must contain at least one uppercase, lowercase, number and special character';
        }
        else if (cfmPwd !== initPwd) {
            err['cfmPassword'] = 'Passwords do not match';
        }
    };

    const handleSubmit = () => {
        checkPassword(password, cfmPassword);

        if (Object.keys(err).length !== 0) {
            setError(err);
        } else {
            // navigate(`/resetpassword/${params.id}/success`);
            Axios.patch(`/accounts/resetpassword/${params.id}/reset`,
                {
                    password: password,
                    token: location?.state.token
                },
                { headers: { 'Content-Type': 'application/json' } }
            )
                .then(res => {
                    if (res.status === 200) navigate(`/resetpassword/${params.id}/success`)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    };

    return (
        <main className='resetpwd'>
            <div className='form' style={{ width: '380px', height: '400px' }}>
                <div className='form_container'>
                    <div className='form_header'>
                        <h2>Reset Password</h2>
                    </div>
                    <FormInputPassword
                        label='Enter New Password'
                        autoFocus
                        onInput={(e) => setPassword(e.target.value)}
                        onChange={() => setError({})}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <FormError nbsp>{'password' in error && error['password']}</FormError>
                    <FormInputPassword
                        label='Confirm New Password'
                        onInput={(e) => setCfmPassword(e.target.value)}
                        onChange={() => setError({})}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    />
                    <FormError nbsp>{'cfmPassword' in error && error['cfmPassword']}</FormError>
                    <div className='form_button filled'
                        onClick={() => handleSubmit()}>
                        Reset Password
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ResetPassword;