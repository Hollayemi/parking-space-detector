import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import parkingApi from '../api/baseApi';
import { Message, toaster } from 'rsuite';

const parkLogIn = createAsyncThunk('post/kem_signin', async (payload) => {
    const { data } = await parkingApi
        .post('/login', {
            ...payload,
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        });

    return data;
});

const initialState = {
    userData: {},
    loading: false,
    status: 'idle',
    wasGoing: 'no-where',
    error: {},
};

const UserSlice = createSlice({
    name: 'parkLogin',
    initialState,
    reducers: {
        userLogout: () => {
            alert('hrtr');
            return initialState;
        },
    },
    extraReducers: {
        [parkLogIn.pending]: (state) => {
            return {
                ...initialState,
                status: REQUEST_STATUS.PENDING,
                loading: true,
            };
        },
        [parkLogIn.fulfilled]: (state, { payload }) => {
            return {
                ...initialState,
                userData: payload,
                status: REQUEST_STATUS.FULFILLED,
                loading: false,
            };
        },
        [parkLogIn.rejected]: (state, error) => {
            return {
                ...initialState,
                status: REQUEST_STATUS.REJECTED,
                error: error,
            };
        },
    },
});

// export states
export const { userLogout } = UserSlice.actions;

export default UserSlice.reducer;

/*





*/

export const myLogin = (formData, navigate, dispatch) => {
    dispatch(parkLogIn(formData))
        .then(unwrapResult)
        .then((res) => {
            userLogout();
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
            if (res.status === 'success') {
                navigate('/');
            }
        })
        .catch((err) => {
            toaster.push(
                <Message showIcon type={'error'}>
                    No Connection
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
        });
};
