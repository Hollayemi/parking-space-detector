import { createSlice, createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import { REQUEST_STATUS } from '../constants';
import martApi from '../api/baseApi';
import { Message, toaster } from 'rsuite';

const pickApi = createAsyncThunk('post/pickups', async (payload) => {
    const { data } = await martApi
        .post('/newPickup', payload.body, {
            headers: { auth: payload.auth },
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

const PickupSlice = createSlice({
    name: 'aauaPickup',
    initialState,
    extraReducers: {
        [pickApi.pending]: (state) => {
            return {
                ...initialState,
                status: REQUEST_STATUS.PENDING,
                loading: true,
            };
        },
        [pickApi.fulfilled]: (state, { payload }) => {
            return {
                ...initialState,
                userData: payload,
                status: REQUEST_STATUS.FULFILLED,
                loading: false,
            };
        },
        [pickApi.rejected]: (state, error) => {
            return {
                ...initialState,
                status: REQUEST_STATUS.REJECTED,
                error: error,
            };
        },
    },
});

export default PickupSlice.reducer;

/*





*/

export const newPickup = (formData, auth, dispatch, setState) => {
    const payload = {
        body: formData,
        auth: auth,
    };
    dispatch(pickApi(payload))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message.replaceAll('_', ' ')}
                </Message>,
                {
                    placement: 'topEnd',
                }
            );
            if (res.status === 'success') {
                setState(res.data);
            }
        })
        .catch();
};
