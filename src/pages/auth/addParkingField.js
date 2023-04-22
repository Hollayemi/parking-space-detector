/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'rsuite';
import { getAddress } from '../../state/slices/address';
import { addParkingField } from '../../state/slices/pickup/parkingField';

const ParkingFieldAccount = () => {
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    let auth = userData.data._id + ' ' + userData.data.accessToken;

    const [formData, setFormData] = useState({
        accountId: userData.data._id,
        lotName: '',
        no_of_zones: '',
        coords: {},
        address: {},
    });
    let newValue = {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
    function updateValue(newVal, variable) {
        variable === 'lotName' && (newValue = { lotName: newVal });
        variable === 'no_of_zones' && (newValue = { no_of_zones: newVal });
        variable === 'coords' && (newValue = { coords: newVal });
        variable === 'address' && (newValue = { address: newVal });
        setFormData({
            ...formData,
            ...newValue,
        });
    }
    const [address, setAddress] = useState(
        formData.address !== '' ? formData.address : null
    );

    console.log(address, 'addtetryh');
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                const data = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    key: 'bdc19c9b2a23467390028dd587dda962',
                };
                updateValue(
                    {
                        lon: position.coords.longitude,
                        lat: position.coords.latitude,
                    },
                    'coords'
                );
                // updateValue({lat: '6.59634', lon: '3.34915'}, 'coordinates')
                console.log(data, 'uoiopi');
                getAddress(data, dispatch, setAddress);
            });
        }
    }, []);

    useEffect(() => {
        if (address && address.component) {
            updateValue({ address }, 'address');
        }
    }, []);

    const ParkingFieldAccountHandler = (e) => {
        e.preventDefault();
        addParkingField(formData, auth, dispatch);
    };

    const fixedStyle =
        'border focus:border-red-100 w-full mb-4 bg-transparent rounded-md w-full h-9 px-4 py-1 ';
    return (
        <div className="website-main-bg-image h-full w-full absolute">
            <div className="absolute h-full w-full bg-slate-900 opacity-80"></div>
            <div className="flex items-center justify-center h-full w-full absolute top-0 left-0">
                <div className="relative flex items-center border border-slate-200 p-6 mx-1 md:w-[370px] bg-gray-100 rounded justify-center flex-col">
                    <h1 className="font-bold">Parking Lot Account</h1>
                    <div>
                        <input
                            className={fixedStyle}
                            placeholder="Parking Lot Name"
                            type="text"
                            onChange={(e) =>
                                updateValue(e.target.value, 'lotName')
                            }
                        />
                        {address !== '' &&
                        address !== null &&
                        address !== {} ? (
                            <textarea
                                className={`${fixedStyle} h-[100px] resize-none`}
                                disabled
                                placeholder="My Location"
                                value={address?.formatted}
                                onChange={(e) =>
                                    updateValue(e.target.value, 'email')
                                }
                            ></textarea>
                        ) : (
                            <div
                                className={`${fixedStyle} h-[100px] flex items-center justify-center`}
                            >
                                <Loader speed="fast" />
                            </div>
                        )}
                        <p className="-mt-4 text-[10px] text-slate-400 mb-4">
                            ( {formData.coords?.lat}, {formData.coords?.lon} )
                        </p>
                        <input
                            className={fixedStyle}
                            placeholder="number of zones or columns"
                            type="number"
                            onChange={(e) =>
                                updateValue(e.target.value, 'no_of_zones')
                            }
                        />
                        <button
                            onClick={(e) => ParkingFieldAccountHandler(e)}
                            className="font-bold h-8 w-full bg-blue-500 text-white rounded-md shadow-lg"
                        >
                            Create
                        </button>

                        <div className="w-full px-2 mt-6 text-xs text-center">
                            <p className="text-sm text-blue-400">
                                We are tracking current location as the parking
                                field location
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParkingFieldAccount;
