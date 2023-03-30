import React, { useState } from 'react';
import { InputRadio } from '../../components/elements/Input/InputFile';
import InputGroup from '../../components/elements/Input/InputGroup';
import { SelectPicker } from 'rsuite';
import { newPickup } from '../../state/slices/pickup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalPanel from '../elements/ModalPanel';

const BookBus = ({ userData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rideCode, setRideCode] = useState(false);
    const [formData, setFormData] = useState({
        pick_location: '',
        destination: '',
        time: '',
        number_of_students: 1,
        payment: 'Online',
    });
    let newValue = {};
    function updateValue(newVal, variable) {
        variable === 'pickup' && (newValue = { pick_location: newVal });
        variable === 'desti' && (newValue = { destination: newVal });
        variable === 'time' && (newValue = { time: newVal });
        variable === 'numOfStud' && (newValue = { number_of_students: newVal });
        variable === 'payment' && (newValue = { payment: newVal });
        setFormData({
            ...formData,
            ...newValue,
        });
    }
    const PickupLoactions = [
        { value: 'Obj Gate', label: 'Obj Gate' },
        { value: 'ETF 750', label: 'ETF 750' },
        { value: 'Zenith Hostel', label: 'Zenith Hostel' },
    ];
    const destination = PickupLoactions.filter(
        (a) => a.value !== formData.pick_location
    );

    const notifyDriver = () => {
        if (userData) {
            let auth = userData._id + ' ' + userData.accessToken;
            newPickup(
                { ...formData, userId: userData._id },
                auth,
                dispatch,
                setRideCode
            );
        } else {
            navigate('/signin');
        }
    };

    return (
        <section className="flex items-center justify-center">
            <div className="w-full m-2 w-[350px] h-[400px] bg-white rounded-lg px-2 md:px-5 py-2">
                <div className="flex justify-between items-center my-4">
                    <h5 className="font-black text-md md:text-md text-black ml-2">
                        Book a bus faster
                    </h5>
                    <h5 className="text-xs text-slate-400">
                        (
                        {userData
                            ? userData.name.length < 25
                                ? userData.name
                                : userData.name.substring(0, 24) + '...'
                            : 'no acount'}
                        )
                    </h5>
                </div>

                <div className="px-2 w-full mt-1">
                    <SelectPicker
                        data={PickupLoactions}
                        placeholder="Pick-up Location"
                        size="md"
                        className="w-full mb-2.5"
                        onChange={(e) => updateValue(e, 'pickup')}
                    />
                    <SelectPicker
                        data={destination}
                        placeholder="Destination"
                        size="md"
                        className="w-full mb-2.5"
                        onChange={(e) => updateValue(e, 'desti')}
                    />
                </div>
                <div className="flex items-center mt-1">
                    <div className="px-2 w-1/2 -mt-4">
                        <h5 className="text-xs">Time</h5>
                        <input
                            type="time"
                            required={true}
                            name="fName"
                            className="p-1.5 border outline-none border-gray-200 text-gray-600 placeholder-text-xs text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
                            onChange={(e) =>
                                updateValue(e.target.value, 'time')
                            }
                        />
                    </div>
                    <div className="px-2 w-1/2 mt-2">
                        <InputGroup
                            label="How many are you"
                            size="sm"
                            name="fName"
                            placeholder=""
                            type="number"
                            value={formData.number_of_students}
                            max="8"
                            min="1"
                            onChange={(e) =>
                                updateValue(e.target.value, 'numOfStud')
                            }
                        />
                    </div>
                </div>
                <div className="flex flex-col text-xs my-1">
                    <h5 className="font-bold">Choose payment method</h5>
                    <div
                        onChange={(e) =>
                            updateValue(e.target.value, 'interaction')
                        }
                        className="flex md:flex items-center"
                    >
                        <InputRadio
                            name="Reason"
                            value="Online"
                            label="Online"
                            checked={formData.payment === 'Online'}
                            onChange={(e) =>
                                updateValue(e.target.value, 'payment')
                            }
                        />
                        <InputRadio
                            name="Reason"
                            value="On Pick-up"
                            label="On Pick-up"
                            checked={formData.payment === 'On Pick-up'}
                            onChange={(e) =>
                                updateValue(e.target.value, 'payment')
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-end">
                    {formData.payment === 'Online' ? (
                        <button className="h-9 w-36 mr-5 outline-none rounded-md shadow-md text-md font bg-blue-500 text-white">
                            Pay Now
                        </button>
                    ) : (
                        <button
                            onClick={notifyDriver}
                            className="h-9 w-36 mr-5 outline-none rounded-md shadow-md text-md font bg-blue-500 text-white"
                        >
                            Notify Driver
                        </button>
                    )}
                </div>
            </div>
            <ModalPanel
                title="Copy Ride-Code"
                children={
                    <section>
                        <div>Your Ride Code is {rideCode.ride_code}</div>
                    </section>
                }
                hasBackdrop={true}
                keyboard={true}
                open={rideCode && true}
                buttonName="Varify Code"
                closeButton
                handleClose={() => setRideCode(false)}
            />
        </section>
    );
};

export default BookBus;
