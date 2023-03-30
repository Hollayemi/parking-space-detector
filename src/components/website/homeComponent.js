import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHamburger } from 'react-icons/fa';
import { Drawer } from 'rsuite';

export const Header = ({ userData }) => {
    const [openNav, setNav] = useState(false);
    return (
        <div className="relative h-14">
            <div className="absolute top-0 left-0 h-full w-full bg-slate-100 opacity-50"></div>
            <div className="flex items-center justify-between px-10 md:px-24 absolute left-0 top-0 w-full h-full">
                <Link to="/">
                    <h5 className="font-black text-xl Lucida text-white min-w-[100px]">
                        KA-PARK
                    </h5>
                </Link>
                <div className="text-white flex justify-center hidden md:flex top-10">
                    <MyLinks
                        link="/pickup-locations"
                        title="Available Pick-ups"
                        mystyle={`${
                            !userData
                                ? ''
                                : userData.register_as !== 'Driver' && 'hidden'
                        }`}
                    />
                    <MyLinks link="/pickup-locations" title="History" />
                    <MyLinks link="/signin" title="Login" auth />
                    <MyLinks
                        link="/create-account"
                        title="Create account"
                        auth
                    />
                </div>
                <i
                    onClick={() => setNav(!openNav)}
                    className="text-xl md:hidden text-white"
                >
                    <FaHamburger />
                </i>
            </div>
            <Drawer
                backdrop={true}
                open={openNav}
                onClose={() => setNav(false)}
                placement="left"
                size="xs"
            >
                <div className="h-full bg-red-600">
                    <Drawer.Header className="text-white shadow website-main-bg-image myAfter">
                        <div className="w-full flex relative website-main-bg-imag items-center justify-between px-5">
                            <h5 className="font-black text-xl ">
                                AAUA SHUTTLE
                            </h5>
                        </div>
                    </Drawer.Header>
                    <div className="h-full bg-slate-500 text-white px-3">
                        <MyLinks
                            link="/pickup-locations"
                            title="Available Pick-ups"
                            mystyle="mb-2"
                        />
                        <MyLinks
                            link="/pickup-locations"
                            title="History"
                            mystyle="mb-2"
                        />
                        <div className="flex items-center">
                            <MyLinks
                                link="/signin"
                                mystyle="mb-2"
                                title="Login"
                                auth
                            />
                            <MyLinks
                                link="/create-account"
                                title="Create account"
                                auth
                                mystyle="mb-2"
                            />
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

const MyLinks = ({ link, title, auth, mystyle }) => (
    <Link to={link}>
        <div
            className={`px-6 text-white ${
                auth && 'bg-blue-600'
            } ${mystyle} py-1.5 cursor-pointer mx-0.5 rounded-sm hover:text-blue-200`}
        >
            {title}
        </div>
    </Link>
);
