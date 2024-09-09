import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*** Slice Imports ***/
import { logout, setAccessToken } from 'store/slices/AuthSlice';

/** Declarations **/
const devURL = 'http://localhost:9014'

/* Base Query */
const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL || devURL}/api/v1/auth`,
    credentials: 'include',
    perpareHeaders: (headers, { getState }) => {
        const accessToken = getState().auth.accessToken;
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`)
        }
        return headers;
    }
});

/* Base Query Wrapper */
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.originalStatus === 403) {
        console.log('Sending Refresh Token');
        const refreshResult = await baseQuery('/refresh-token', api, extraOptions);
        console.log('Refreshing Token');
        console.log(refreshResult);
        // Refresh Token is NOT Expired, set New Access Token
        if (refreshResult?.data) {
            // const account = api.getState().auth.account;
            api.dispatch(setAccessToken({ ...refreshResult.data }));

            // Reattempt Original Query with New Access Token
            result = await baseQuery(args, api, extraOptions);
        }
        // Refresh Token is Expired
        else {
            api.dispatch(logout());
        }
    }
    return result;
}

const BaseAPI = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
});

export default BaseAPI;