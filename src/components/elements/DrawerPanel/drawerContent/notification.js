import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFile } from 'react-icons/fa';
import { ChangeTime } from '../../../../pages/seller/Dashboard/Overview/components';
import { deleteNotifications } from '../../../../state/slices/shop/overview';
import { useDispatch } from 'react-redux';

const Notification = ({ data, otpData, store }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        deleteNotifications(dispatch, otpData, store);
    }, []);

    const iconArr = { product: <FaFile /> };
    return (
        <div className="overflow-auto myScroll">
            {data &&
                data.message.map((res, index) => (
                    <div className="pt-5" key={index}>
                        <Each
                            message={res.message}
                            icon={iconArr[res.icon]}
                            time={<ChangeTime prevDate={res.createdAt} />}
                        />
                    </div>
                ))}
        </div>
    );
};

export default Notification;
const Each = ({ icon, message, note, link, time }) => {
    return (
        <div className="flex items-start relative pb-4 border-b my-1 p-2 mx-">
            <div className="pr-3">
                <div className="border w-10 h-10 text-xl flex justify-center items-center p-1 border-blue-400 text-blue-400 rounded-full w-9 h-9 ">
                    {icon}
                </div>
            </div>
            <div>
                <h5 className="text-gray-600">
                    {message}
                    {note && (
                        <Link to={link}>
                            <span className="text-blue-400 ml-3">{note}</span>
                        </Link>
                    )}
                </h5>
                <h5 className="absolute bottom-0 right-2 text-gray-300">
                    {time}
                </h5>
            </div>
        </div>
    );
};
