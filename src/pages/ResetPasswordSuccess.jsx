import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/* CSS Imports */
import 'styles/pages/ResetPasswordSuccess.css';
import 'styles/components/form/Form.css';
import 'styles/components/FormHeader.css';
import 'styles/components/FormButton.css';

/* Context Imports */
import EmailContext from 'contexts/EmailContext';

function ResetPasswordSuccess() {

    /* useNavigate */
    const navigate = useNavigate();

    /* useContext */
    const { email: ctxEmail } = useContext(EmailContext);

    return (
        <main className='resetpwdsuccess'>
            <div className='resetpwdsuccess_form'>
                <div className='resetpwdsuccess_form_container'>
                    <div className='form_header'>
                        <h2>Password Reset Successful</h2>
                    </div>
                    <div className='form_text'>
                        <p>Your password has been reset successfully.</p>
                        <p>You may now login to your account</p>
                        <p id='email'>{ctxEmail['reset']}</p>
                        <p>by using new password.</p>
                    </div>
                    <div className='form_button filled'
                        onClick={() => navigate('/login', { state: { fromResetPassword: true } })}>
                        Go to Login
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ResetPasswordSuccess;