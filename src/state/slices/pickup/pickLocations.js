import { createAsyncThunk, unwrapResult } from '@reduxjs/toolkit';
import martApi from '../api/baseApi';

const locationsApi = createAsyncThunk('post/pickups', async (payload) => {
    const { data } = await martApi
        .get('/pickLocations', {
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

export const pickLocations = (auth, dispatch, setState) => {
    const payload = {
        auth: auth,
    };
    dispatch(locationsApi(payload))
        .then(unwrapResult)
        .then((res) => {
            if (res.status === 'success') {
                setState(res.data);
            }
        })
        .catch();
};
