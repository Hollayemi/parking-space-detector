import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { REQUEST_STATUS } from '../../state/slices/constants';

const AuthOutlet = ({ to }) => {
    const { userData, status } = useSelector(
        (state) => state.reducer.loginReducer
    );
    console.log(userData, 'hghkjh');
    let auth = false;
    let reDir = '/signin';
    if (status === REQUEST_STATUS.FULFILLED) {
        if (userData.data.hasLot === null && to === 'parking-field') {
            reDir = '/register-lot';
        } else {
            auth = true;
        }
    }
    console.log(reDir);
    return auth ? <Outlet /> : <Navigate to={reDir} />;
};

export default AuthOutlet;
