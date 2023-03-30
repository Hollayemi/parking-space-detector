import React, { useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import InputGroup from '../../components/elements/Input/InputGroup';
import HomeWrapper from '../../components/website/HomeWrapper';
import { confirmCode } from '../../state/slices/pickup/confirm';

const ConfirmCode = () => {
    const params = useParams();
    const [code, setCode] = useState('');
    const [rideCodeConf, setRideCodeConf] = useState('');
    const dispatch = useDispatch();
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    let auth = userData.data._id + ' ' + userData.data.accessToken;
    const confirmBtn = () => {
        confirmCode(
            auth,
            params.pickId,
            code,
            userData.data.register_id,
            dispatch,
            setRideCodeConf
        );
    };
    return (
        <HomeWrapper>
            <section className="absolute top-0 left-0 w-full">
                <div className="flex justify-center items-center flex-col md:flex-row mt-20 pt-5 px-2">
                    <div className="w-[320px] md:w-[350px]">
                        <InputGroup
                            size="md"
                            type="number"
                            label=" "
                            className="pl-3"
                            placeholder="Enter ride-code"
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={confirmBtn}
                        className=" w-36 md:w-32 h-9 rounded-md bg-blue-600 text-white mx-1 md:mx-3"
                    >
                        Confirm code
                    </button>
                </div>
                {rideCodeConf === 'correct' && (
                    <Confirmation
                        icon={<FaCheck />}
                        color="green"
                        text="Confirmed"
                    />
                )}
                {rideCodeConf === 'incorrect' && (
                    <Confirmation
                        icon={<FaTimes />}
                        color="red"
                        text="Incorrect code"
                    />
                )}
            </section>
        </HomeWrapper>
    );
};

const Confirmation = ({ color, icon, text }) => (
    <div className="flex justify-center mt-10">
        <div
            className={`border border-${color}-100 p-3 rounded-full relative overflow-hidden`}
        >
            <div
                className={`absolute w-full z-10 h-full bg-${color}-100 opacity-50 top-0 left-0`}
            ></div>
            <i
                className={`w-40 h-40 z-50 shadow relative flex flex-col justify-center items-center rounded-full bg-${color}-500 text-4xl text-white `}
            >
                {icon}
                <h5 className="text-sm">{text}</h5>
            </i>
        </div>
    </div>
);
export default ConfirmCode;
