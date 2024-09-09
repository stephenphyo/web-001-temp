/*** Slice Imports ***/
import { login, logout, setEmail } from 'store/slices/AuthSlice';

/*** API Imports  ***/
import BaseAPI from './BaseAPI';

/*** Package Imports ***/
import Cookies from 'js-cookie';

const AuthAPI = BaseAPI.injectEndpoints({
    endpoints: (builder) => ({

        register: builder.mutation({
            query: (body) => {
                return {
                    url: '/register',
                    method: 'POST',
                    credentials: 'include',
                    body: body
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setEmail(data?.data?.email));
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),

        login: builder.mutation({
            query: (body) => {
                return {
                    url: '/login',
                    method: 'POST',
                    credentials: 'include',
                    body: body,
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(login(data?.data));
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),

        logout: builder.query({
            query: () => {
                return {
                    url: '/logout',
                    credentials: 'include'
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
                try {
                    const state = getState();
                    const userId = state.auth.account?._id;
                    console.log(userId);

                    await queryFulfilled;
                    dispatch(logout());
                    Cookies.remove('token');
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),

        forgotPassword: builder.mutation({
            query: (body) => {
                return {
                    url: `/password/reset`,
                    method: 'POST',
                    body: body
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setEmail(data?.data?.email));
                }
                catch (err) {
                    console.log(err);
                }
            }
        }),

        resetPassword: builder.mutation({
            query: (body) => {
                return {
                    url: `/password/reset`,
                    method: 'POST',
                    body: body
                }
            }
        }),

        updatePassword: builder.mutation({
            query: (body) => {
                return {
                    url: `/password/update`,
                    method: 'PUT',
                    body: body,
                    credentials: 'include'
                }
            }
        }),

    })
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLazyLogoutQuery,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useUpdatePasswordMutation
} = AuthAPI;

export default AuthAPI;