import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*** CSS Imports ***/
import './App.css';

/*** Context Imports  ***/
import { AuthContextProvider } from 'contexts/AuthContext';

/*** Layout Imports ***/
import FormLayout from 'layouts/FormLayout/FormLayout';

/* Page Imports */
import Login from 'pages/Login';
import Register from 'pages/Register';
import RegisterSuccess from 'pages/RegisterSuccess';
import ForgotPassword from 'pages/ForgotPassword';
import ForgotPasswordOTP from 'pages/ForgotPasswordOTP';
// import ResetPassword from 'pages/ResetPassword';
// import ResetPasswordSuccess from 'pages/ResetPasswordSuccess';
// // Authorization Roles
// import Layout01 from 'layouts/Layout01';
// import Member from 'pages/Authorization Roles/Member';
// import Staff from 'pages/Authorization Roles/Staff';
// import Contributor from 'pages/Authorization Roles/Contributor';
// import Admin from 'pages/Authorization Roles/Admin';

// Testing
// import ShoppingCart from 'test/ShoppingCart';
// import DrawCircleOnPhoto from 'test/DrawCircleOnPhoto';
// import ImagePreview from 'test/ImagePreview';

import Home from 'pages/Home';

function App() {
    return (
        <Router>
            <main className='app'>
                <AuthContextProvider>
                    <Routes>
                        <Route element={<FormLayout />}>
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/register/success' element={<RegisterSuccess />} />
                            <Route path='/password/forgot/' element={<ForgotPassword />} />
                            <Route path='/password/forgot/otp' element={<ForgotPasswordOTP />} />
                        </Route>
                        {/* 
                    
                    <Route path='/reset-password/:id/submit' element={<ResetPassword />} />
                    <Route path='/reset-password/:id/success' element={<ResetPasswordSuccess />} />
                    <Route path='/home' element={<Home />} /> */}

                        {/* Authorization Roles */}
                        {/* <Route element={<Layout01 />}>
                        <Route path='/authz/member' element={<Member />} />
                        <Route path='/authz/staff' element={<Staff />} />
                        <Route path='/authz/contributor' element={<Contributor />} />
                        <Route path='/authz/admin' element={<Admin />} />
                    </Route> */}

                        {/* Test */}
                        {/* <Route element={<ShoppingCart />} path='/shoppingcart' />
                    <Route element={<ImagePreview />} path='/avatar/preview' />
                    <Route element={<DrawCircleOnPhoto />} path='/avatar/draw' /> */}
                    </Routes>
                </AuthContextProvider>
            </main>
        </Router>
    )
}

export default App;