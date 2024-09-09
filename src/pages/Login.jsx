import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/*** CSS Imports ***/
import './Login.css';

/*** Redux Imports ***/
import { useSelector } from 'react-redux';
import { useLoginMutation } from 'store/apis/AuthAPI';

/*** Component Imports ***/
import AuthForm from 'components/Common/AuthForm/AuthForm';
import FormInputText from 'components/Form/SPFormInputText/SPFormInputText';
import FormInputPassword from 'components/Form/SPFormInputPassword/SPFormInputPassword';
import FormButton from 'components/Form/SPFormButton/SPFormButton';
import FormError from 'components/Form/SPFormError/SPFormError';
import Metadata from 'components/Common/Metadata/Metadata';

/*** Utility Imports ***/
import validateEmail from 'utils/validateEmail';

/*** Package Imports ***/
import { Bars } from 'react-loader-spinner';

function Login() {

    /* Router */
    const navigate = useNavigate();

    /* useState */
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState({});

    /* ??? */
    const err = {};

    /* Redux */
    const { email } = useSelector(state => state.auth);
    const [login, resultLogin] = useLoginMutation();

    /* Functions */
    const checkEmail = (email) => {
        if (email.length === 0) {
            err['email'] = 'Email address must not be empty';
        }
        else if (!validateEmail(email)) {
            err['email'] = 'Enter a valid email address';
        }
    };

    const checkPassword = (pwd) => {
        if (pwd.length === 0) {
            err['password'] = 'Password must not be empty';
        }
    };

    const checkData = () => {
        checkEmail(data['email']);
        checkPassword(data['password']);

        if (Object.keys(err).length !== 0) {
            setFormError(err);
            return false;
        } else {
            setFormError({});
            return true;
        }
    };

    const handleLogin = () => {
        if (checkData) {
            login(data);
        }
    };

    // const handleLoginWithGoogle = () => {
    //     signInWithPopup(firebaseAuth, firebaseAuthProvider.google)
    //         .then(result => {
    //             // Generates Google Access Token which can be used to access Google API
    //             const credential = GoogleAuthProvider.credentialFromResult(result);
    //             const token = credential.accessToken;

    //             // Signed In User Info
    //             const user = result.user;
    //             setResult([credential, token, user]);

    //             navigate('/home');
    //         }).catch((err) => {
    //             const errCode = err.code;
    //             const errMsg = err.message;
    //             const errEmail = err.customData.email;
    //             const errCredentialType = GoogleAuthProvider.credentialFromError(err);
    //             console.log([errCode, errMsg, errEmail, errCredentialType]);
    //         })
    // };

    /* useEffect */
    useEffect(() => {

    }, []);

    useEffect(() => {
        if (email) {
            setData({ ...data, email: email });
        }
    }, []);

    useEffect(() => {
        if (resultLogin.isSuccess) navigate('/');
    }, [resultLogin]);

    useEffect(() => {
        console.log(resultLogin.error);
        setFormError({});
        if (resultLogin.error?.status === 400) {
            setFormError({ ...formError, email: resultLogin.error?.data?.error });
        }
        if (resultLogin.error?.status === 404) {
            setFormError({ ...formError, email: resultLogin.error?.data?.error });
        }
        if (resultLogin.error?.status === 401) {
            setFormError({ ...formError, password: resultLogin.error?.data?.error });
        }
    }, [resultLogin]);

    return (
        <div className='login'>
            <Metadata title='Login' />
            <AuthForm>
                <AuthForm.Logo onClick={() => navigate('/')} />
                <AuthForm.Header
                    headers={{
                        main: 'Phoenix Talk',
                        sub: 'Login to Account'
                    }}
                />
                <AuthForm.Body>
                    <FormInputText
                        label='Email'
                        placeholder='Enter Email Address'
                        autoFocus
                        value={data['email']}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleLogin();
                        }} />
                    <FormError nbsp>{'email' in formError && formError['email']}</FormError>
                    <FormInputPassword
                        label='Password'
                        placeholder='Enter Password'
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') handleLogin();
                        }} />
                    <FormError nbsp>{'password' in formError && formError['password']}</FormError>
                    <div className='login_sub'>
                        <div id='remember'>
                            <input type='checkbox' />
                            <span>Remember Me</span>
                        </div>
                        <div id='forgot'
                            onClick={() => navigate('/password/forgot')}>
                            <span>Forgot Password?</span>
                        </div>
                    </div>
                </AuthForm.Body>
                <AuthForm.Footer>
                    <FormButton
                        onClick={() => handleLogin()}
                        disabled={resultLogin.isLoading}>
                        {
                            resultLogin.isLoading
                                ? <Bars visible width='25' height='25'
                                    color='#FFFFFF' />
                                : 'Sign In'
                        }
                    </FormButton>
                    <div className='login_footer'>
                        <span>Don't have an account?</span>
                        <span id='register'
                            onClick={() => navigate('/register')}>
                            Register
                        </span>
                    </div>
                </AuthForm.Footer>
                <div className='login_separator'>
                    <hr />
                    <div>or</div>
                    <hr />
                </div>
                <AuthForm.Footer>
                    <div className='login_options'>
                        <FormButton id='google'>
                            Sign in with Google
                        </FormButton>
                        <FormButton id='facebook'>
                            Sign in with Facebook
                        </FormButton>
                        <FormButton id='instagram'>
                            Sign in with Instagram
                        </FormButton>
                    </div>
                </AuthForm.Footer>
            </AuthForm>
        </div>
    );
}

export default Login;