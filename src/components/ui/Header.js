import React from 'react';

/* CSS Imports */
import 'styles/components/ui/Header.css';

function Header() {
    return (
        <section className='header'>
            <div className='header_info'>
                <span className='header_userInfo_name'>Stephen</span>
                <span className='header_userInfo_role'>Admin</span>
            </div>
            <div className='header_avatar'>
                <img src='' alt='' />
            </div>
        </section>
    );
}

export default Header;