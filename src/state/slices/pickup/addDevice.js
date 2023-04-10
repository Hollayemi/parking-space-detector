import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import parkingApi from '../api/baseApi';
import { Message, toaster } from 'rsuite';

export const AddDeviceApi = createAsyncThunk(
    'post/RegNewUser',
    async (payload) => {
        console.log(payload);
        const { data } = await parkingApi
            .post(
                '/addSensorNode',
                { ...payload.body },
                {
                    headers: { auth: payload.auth },
                }
            )
            .then((e) => {
                return e;
            })
            .catch((err) => {
                return err.response;
            });
        return data;
    }
);

export const AddDevice = (formData, auth, dispatch, setState) => {
    const payload = {
        body: formData,
        auth,
    };
    dispatch(AddDeviceApi(payload))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            toaster.push(
                <Message showIcon type={res.status}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
            res.status === 'success' && setState(res.data);
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

export const getDeviceApi = createAsyncThunk(
    'post/RegNewUser',
    async (auth) => {
        const { data } = await parkingApi
            .get('/get-sensors', {
                headers: { auth },
            })
            .then((e) => {
                return e;
            })
            .catch((err) => {
                return err.response;
            });
        return data;
    }
);

export const getDevices = (auth, dispatch, setState) => {
    dispatch(getDeviceApi(auth))
        .then(unwrapResult)
        .then((res) => {
            toaster.push(
                <Message showIcon type={res.type}>
                    {res.message}
                </Message>,
                {
                    placement: 'topCenter',
                }
            );
            res.status === 'success' && setState(res.data);
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
