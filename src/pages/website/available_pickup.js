import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Loader, Table } from 'rsuite';
import HomeWrapper from '../../components/website/HomeWrapper';
import { pickLocations } from '../../state/slices/pickup/pickLocations';

const AvailablePickup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const { userData } = useSelector((state) => state.reducer.loginReducer);
    useEffect(() => {
        let auth = userData
            ? userData.data._id + ' ' + userData.data.accessToken
            : '';
        pickLocations(auth, dispatch, setData);
    }, [userData, dispatch, setData]);

    return (
        <HomeWrapper>
            <section className="absolute top-0 left-0 w-full">
                <div className="flex justify-center mt-20 pt-5 px-2">
                    <div className=" w-[700px] bg-slate-300 shadow-lg">
                        {data ? (
                            <Table height={500} data={data}>
                                <Table.Column width={100} fixed>
                                    <Table.HeaderCell>
                                        Pick-up Location
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="pick_location" />
                                </Table.Column>
                                <Table.Column width={100}>
                                    <Table.HeaderCell>
                                        Destination
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="destination" />
                                </Table.Column>

                                <Table.Column width={80}>
                                    <Table.HeaderCell>
                                        No Of Students
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="number_of_students" />
                                </Table.Column>

                                <Table.Column width={100}>
                                    <Table.HeaderCell>
                                        Payment Type
                                    </Table.HeaderCell>
                                    <Table.Cell dataKey="payment" />
                                </Table.Column>
                                <Table.Column width={100}>
                                    <Table.HeaderCell>Info</Table.HeaderCell>
                                    <Table.Cell dataKey="info" />
                                </Table.Column>
                                <Table.Column width={220}>
                                    <Table.HeaderCell>Date</Table.HeaderCell>
                                    <Table.Cell dataKey="createdAt" />
                                </Table.Column>
                                <Table.Column width={220}>
                                    <Table.HeaderCell>Action</Table.HeaderCell>
                                    <Table.Cell>
                                        {(rowData) => {
                                            function confirm() {
                                                navigate(
                                                    '/confirm-code/' +
                                                        rowData._id
                                                );
                                            }
                                            return (
                                                <span className="flex items-center ">
                                                    <button
                                                        className="cursor-pointer mx-1 text-white bg-blue-400 hover:bg-blue-500 -mt-2 px-2 py-1 rounded-sm"
                                                        onClick={confirm}
                                                    >
                                                        confirm ride-code
                                                    </button>
                                                </span>
                                            );
                                        }}
                                    </Table.Cell>
                                </Table.Column>
                            </Table>
                        ) : (
                            <Loader speed="fast" />
                        )}
                    </div>
                </div>
            </section>
        </HomeWrapper>
    );
};

export default AvailablePickup;
