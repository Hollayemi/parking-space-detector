import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import BookBus from '../../components/website/bookModal';
import DeviceImage from '../../assets/images/mydevice.jpg';
import HomeWrapper from '../../components/website/HomeWrapper';
import FloatingLabelInput from '../../components/elements/Input/FloatingLabelInput';
import ModalPanel from '../../components/elements/ModalPanel';
import { SelectPicker } from 'rsuite';
import { AddDevice, getDevices } from '../../state/slices/pickup/addDevice';
import { Link } from 'react-router-dom';
// import AvailablePickup from './available_pickup';
const Home = () => {
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const dispatch = useDispatch();
    let auth = userData.data._id + ' ' + userData.data.accessToken;
    const [devices, setDevices] = useState([]);
    const [Reg, setReg] = useState(false);
    useEffect(() => {
        getDevices(auth, dispatch, setDevices);
    }, [auth, dispatch]);
    console.log(userData);
    return (
        <HomeWrapper userData={userData}>
            <div className="flex items-center mt-20 pt-10 md:pt-0 flex-col  absolute top-0 left-0 h-full w-full">
                <div className="my-16">
                    <div className="flex items-center">
                        <h5
                            onClick={() => setReg(true)}
                            className="text-white py-2 px-9 mx-3 bg-green-600 font-bold rounded-md shadow-xl cursor-pointer"
                        >
                            Add new device
                        </h5>
                        <Link to="/register-lot">
                            <h5
                                onClick={() => setReg(true)}
                                className="text-white py-2 px-9 mx-3 bg-green-600 font-bold rounded-md shadow-xl cursor-pointer"
                            >
                                New Parking Lot
                            </h5>
                        </Link>
                    </div>
                </div>
                <div className="w-11/12 bg-white shadow min-h-[200px] max-h-[500px] relative overflow-auto rounded-t-lg">
                    <h5 className="h-8 border-b text-sm leading-8 sticky bg-white top-0 w-full mb-6 px-6">
                        Devices
                    </h5>
                    {devices.length > 0 ? (
                        <div className="p-3">
                            {devices.map((res, index) => {
                                return (
                                    <FieldDevice
                                        key={index}
                                        lot={res._id.parkingLot}
                                        devices={res.elements}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <div className="h-full w-full flex items-center justify-center py-[70px]">
                            No Device Yet
                        </div>
                    )}
                </div>
            </div>
            <ModalPanel
                closeButton
                title="Add new Device"
                children={
                    <NewBranch
                        setReg={setReg}
                        Reg={Reg}
                        setDevices={setDevices}
                    />
                }
                hasBackdrop
                keyboard
                open={Reg}
                buttonName="Varify Code"
                handleClose={() => setReg(!Reg)}
            />
        </HomeWrapper>
    );
};

export default Home;

const NewBranch = ({ setReg, Reg, setDevices }) => {
    const dispatch = useDispatch();
    const { data } = useSelector(
        (state) => state.reducer.loginReducer.userData
    );
    let auth = data._id + ' ' + data.accessToken;
    const myLots = data.lots.map((res) => {
        return { label: res.lotName, value: res.lotName };
    });
    const [formData, setFormData] = useState({
        serialNumber: '',
        max_num: '',
        sensorZone: '',
        desc: '',
        parkingLot: '',
        accountId: data._id,
    });
    console.log(formData);
    const createNewBranch = (e) => {
        e.preventDefault();
        AddDevice(formData, auth, dispatch, setDevices);
        // setReg(false);
    };

    let newValue = {};
    function updateValue(newVal, variable) {
        variable === 'serialNumber' && (newValue = { serialNumber: newVal });
        variable === 'max_num' && (newValue = { max_num: newVal });
        variable === 'sensorZone' && (newValue = { sensorZone: newVal });
        variable === 'desc' && (newValue = { desc: newVal });
        variable === 'parkingLot' && (newValue = { parkingLot: newVal });

        setFormData({
            ...formData,
            ...newValue,
        });
    }
    return (
        <section className="mt-10">
            <div className="px-2">
                <FloatingLabelInput
                    required
                    label=" Device serial number"
                    type="text"
                    onChange={(e) =>
                        updateValue(e.target.value, 'serialNumber')
                    }
                />
            </div>
            <div className="flex items-center">
                <div className="w-1/2 px-2">
                    <FloatingLabelInput
                        required
                        label="Zone or Column name"
                        onChange={(e) =>
                            updateValue(e.target.value, 'sensorZone')
                        }
                    />
                </div>
                <div className="w-1/2 px-2">
                    <FloatingLabelInput
                        required
                        label="Max number of cars"
                        onChange={(e) => updateValue(e.target.value, 'max_num')}
                    />
                </div>
            </div>
            <div className="flex items-center">
                <div className="w-1/2 px-2">
                    <FloatingLabelInput
                        required
                        label="short info"
                        onChange={(e) => updateValue(e.target.value, 'desc')}
                    />
                </div>
                <div className="w-1/2 px-2">
                    <SelectPicker
                        data={myLots}
                        placeholder="Select field"
                        className="w-full"
                        onChange={(e) => updateValue(e, 'parkingLot')}
                    />
                </div>
            </div>
            <div className="flex justify-end px-4 mt-5">
                <button
                    onClick={() => setReg(!Reg)}
                    className="w-20 h-10 bg-slate-50 border rounded-md mr-4"
                >
                    Cancel
                </button>
                <button
                    onClick={createNewBranch}
                    className="w-20 h-10 bg-green-600 text-white font-[400] border rounded-md"
                >
                    Save
                </button>
            </div>
        </section>
    );
};

const FieldDevice = ({ devices, lot }) => {
    return (
        <div className="mt-6">
            <p className="ml-3 font-bold">{lot}</p>
            <div className="flex flex-wrap mt-4">
                {devices.map((res, i) => (
                    <Device device={res} key={i} />
                ))}
            </div>
        </div>
    );
};
const Device = ({ device }) => {
    return (
        <div className="w-40 h-[140px] shadow m-3">
            <img src={DeviceImage} alt="" />
            <div className="flex flex-col items-center">
                <h5 className="font-bold">{device.sensorZone}</h5>
                <h5>Free spaces: {device.freeSpaces}</h5>
            </div>
        </div>
    );
};
