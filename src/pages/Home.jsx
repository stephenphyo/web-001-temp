import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* CSS Imports */
import './Home.css';

/* Function Imports */
import convertDT from 'utils/convertDateTime';
import getDTinLocalTZ from 'utils/getDateTimeInLocalTimeZone';

function Home() {

    /* useState */
    const [auth, setAuth] = useState({});

    /* useNavigate */
    const navigate = useNavigate();

    /* useEffect */
    useEffect(() => {
        if (sessionStorage.getItem('auth') != null) {
            setAuth(JSON.parse(sessionStorage.getItem('auth')));
        }
        else {
            navigate('/login');
        }
    }, []);

    /* Functions */
    const convertDTinLocalTZ = (DT_string) => {
        if (DT_string) {
            return convertDT(getDTinLocalTZ(DT_string));
        }
    };

    const logout = () => {
        sessionStorage.removeItem('auth');
        navigate('/login');
    };

    return (
        <main className='home'>
            <div className='form' style={{ width: '580px', height: '650px' }}>
                <div className='form_container'>
                    <div className='form_header'>
                        <h2>You have successfully logged in</h2>
                    </div>
                    <div className='home_avatar'>
                        <img src={auth['avatar']} alt='avatar' />
                    </div>
                    <div className='home_info'>
                        <ul className='home_info_label'>
                            <li>First Name: </li>
                            <li>Last Name: </li>
                            <li>Username: </li>
                            <li>Email Address: </li>
                            <li>Date of Birth: </li>
                            <li>Account Created: </li>
                            <li>Last Updated: </li>
                            <li>Last Login: </li>
                        </ul>
                        <ul className='home_info_data'>
                            <li>{auth['firstName'] ? auth['firstName'] : 'null'}</li>
                            <li>{auth['lastName'] ? auth['lastName'] : 'null'}</li>
                            <li>{auth['username']}</li>
                            <li>{auth['email']}</li>
                            <li>{auth['dob'] ? convertDTinLocalTZ(auth['dob'])?.date : 'null'}</li>
                            <li>{`${convertDTinLocalTZ(auth['created_at'])?.date} ${convertDTinLocalTZ(auth['created_at'])?.time}`}</li>
                            <li>
                                {
                                    auth['updated_at']
                                        ?
                                        `${convertDTinLocalTZ(auth['updated_at'])?.date} ${convertDTinLocalTZ(auth['updated_at'])?.time}`
                                        :
                                        'null'
                                }
                            </li>
                            <li>
                                {
                                    auth['lastLoginAt']
                                        ?
                                        `${convertDTinLocalTZ(auth['lastLoginAt'])?.date} ${convertDTinLocalTZ(auth['lastLoginAt'])?.time}`
                                        :
                                        'null'
                                }
                            </li>
                        </ul>
                    </div>
                    <div className='form_button filled'
                        onClick={() => logout()}>
                        Logout
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;