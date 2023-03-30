import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import parkingApi from '../api/baseApi';
import { Message, toaster } from 'rsuite';

export const RegNewUser = createAsyncThunk(
    'post/RegNewUser',
    async (payload) => {
        console.log(payload);
        const { data } = await parkingApi
            .post('/createAccount', { ...payload }, {})
            .then((e) => {
                return e;
            })
            .catch((err) => {
                return err.response;
            });
        return data;
    }
);

export const newAccount = (formData, dispatch) => {
    dispatch(RegNewUser(formData))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
        })
        .catch((err) => {
            toaster.push(
                <Message showIcon type={'error'}>
                    No Connection
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
        });
};
