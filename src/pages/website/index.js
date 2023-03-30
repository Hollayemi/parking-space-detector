import React from 'react';
import { useSelector } from 'react-redux';
// import BookBus from '../../components/website/bookModal';
import HomeWrapper from '../../components/website/HomeWrapper';
// import AvailablePickup from './available_pickup';
const Home = () => {
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    const myData = userData && userData.data ? userData.data : null;
    return (
        <HomeWrapper userData={myData}>
            <div className="flex items-center pt-10 md:pt-0 flex-col sm:flex-row justify-evenly absolute top-0 left-0 h-full w-full">
                <div className="w-full flex flex-col items-center sm:w-3/4 md:w-1/2 px-6 md:px-24 text-center">
                    <h2 className="font-black text-2xl sm:text-4xl text-white">
                        Parking Management Services
                    </h2>
                    <p className="text-md text-white mt-5 text-center">
                        Smart Management for Owners. Simple Solutions for
                        Parkers.
                    </p>
                    <h5 className="h-10 text-white w-44 rounded-md bg-blue-600 leading-10 p-0 mt-5">
                        Nearest Parking To Me
                    </h5>
                </div>
                {/* <div className="md:w-1/2 md:mt-10">
                    <BookBus userData={myData} />
                    <AvailablePickup />
                </div> */}
            </div>
        </HomeWrapper>
    );
};

export default Home;
