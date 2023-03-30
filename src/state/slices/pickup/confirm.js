import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';

const confirmApi = createAsyncThunk('post/confirm', async (payload) => {
    const { data } = await martApi
        .post('/confirmCode', payload.body, {
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
/*





*/

export const confirmCode = (auth, id, code, car_no, dispatch, setState) => {
    const payload = {
        body: {
            id: id,
            code: code,
            car_no: car_no,
        },
        auth: auth,
    };
    console.log(payload);
    dispatch(confirmApi(payload))
        .then(unwrapResult)
        .then((res) => {
            console.log(res);
            if (res.status === 'success') {
                setState(res.message);
            }
        })
        .catch();
};
