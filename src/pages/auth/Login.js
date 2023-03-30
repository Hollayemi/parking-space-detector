import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { myLogin } from '../../state/slices/auth/Login';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formData = {
        email: email,
        password: password,
    };
    const loginHandler = (e) => {
        e.preventDefault();
        myLogin(formData, navigate, dispatch);
    };

    return (
        <div className="website-main-bg-image h-full w-full absolute">
            <div className="absolute h-full w-full bg-slate-900 opacity-80"></div>
            <div className="flex items-center justify-center h-full w-full absolute top-0 left-0">
                <div className="flex items-center w-[350px] md:-mt-20 bg-gray-100 white border border-slate-300 p-8 rounded justify-center flex-col">
                    <h1 className="font-bold text-black">
                        Shuttle Account Login
                    </h1>
                    <div className="w-full">
                        <form
                            onSubmit={loginHandler}
                            className="flex flex-col px-3 items-center w-full justify-center"
                        >
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border focus:border-red-100 w-full m-2 mt-3 bg-transparent rounded-xl px-5 py-1"
                                placeholder="Email or Username"
                            />
                            <div className="w-full flex px-2 text-xs justify-between items-center">
                                <Link
                                    to="/admin/forgot-password"
                                    className="cursor-pointer text-xs hover:text-blue-500 text-blue-500"
                                >
                                    forgot password
                                </Link>
                                <i className="fa fa-eye hover:text-blue-200 text-blue-100"></i>
                            </div>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="border focus:border-red-100 w-full m-2 mb-3 bg-transparent rounded-xl px-5 py-1"
                                placeholder="password"
                                type="Password"
                            />

                            <button className="font-bold h-8 w-full bg-blue-500 text-white rounded-md shadow-lg">
                                Login
                            </button>
                        </form>
                        <div className="w-full flex px-2 text-xs justify-between w-full mt-5 items-center">
                            <p className="text-sm cursor-pointer hover:text-blue-200 text-blue-400">
                                create admin branch
                            </p>
                            <Link
                                to="/create-account"
                                className="text-sm hover:text-blue-200 text-blue-400"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
