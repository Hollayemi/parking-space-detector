import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img1 from '../../../../assets/images/png/_supreme.png';
import img2 from '../../../../assets/images/png/_supreme3.png';
import { getOnebyId } from '../../../../state/slices/home';
import Loading from '../../Loading';

const ViewProduct = ({ id, verify }) => {
    const dispatch = useDispatch();
    const [info, setInfo] = useState(null);
    useEffect(() => {
        getOnebyId(dispatch, id, setInfo);
    }, []);
    var settings = {
        infinite: false,
        variableWidth: true,
        slidesToScroll: 1,
        pauseOnHover: true,
    };

    return (
        <section>
            {info ? (
                <div className="mt-8">
                    <div className="mx-5 relative">
                        <Slider {...settings}>
                            <img
                                src={img1}
                                className="w-44 h-48"
                                alt={info.prodName}
                            />
                            <img
                                src={img2}
                                className="w-44 h-48"
                                alt={info.prodName}
                            />
                            <img
                                src={img2}
                                className="w-44 h-48"
                                alt={info.prodName}
                            />
                            <img
                                src={img2}
                                className="w-44 h-48"
                                alt={info.prodName}
                            />
                        </Slider>
                        {verify && (
                            <div className="absolute b-0 mt-5 flex justify-center items-center w-full">
                                <button
                                    onClick={() =>
                                        verify(
                                            'approve',
                                            info.prodName,
                                            info.store,
                                            info._id
                                        )
                                    }
                                    className="px-4 py-1 mx-3 font-bold bg-white text-slate-800 Lucida rounded-sm"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() =>
                                        verify(
                                            'reject',
                                            info.prodName,
                                            info.store,
                                            info._id
                                        )
                                    }
                                    className="px-4 py-1 mx-3 font-bold bg-red-500 text-white Lucida rounded-sm"
                                >
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                    <br />
                    {verify && (
                        <>
                            <br /> <br />
                        </>
                    )}
                    <About summary="Product Name" details={info.prodName} />
                    <About summary="Product Price" details={info.prodPrice} />
                    <About summary="Product Group" details={info.prodGroup} />
                    <About summary="Category" details={info.prodCategory} />
                    <About
                        summary="Sub-Category"
                        details={info.prodSub_Category}
                    />
                    <About summary="Gender" details={info.prodVari[0].gender} />
                    <About summary="Size" details={info.prodVari[0].size} />
                    <About summary="Colors" details={info.prodVari[0].color} />
                </div>
            ) : (
                <div className="w-full h-[70vh] flex items-center justify-center">
                    <Loading size="md" />
                </div>
            )}
        </section>
    );
};
export default ViewProduct;

const About = ({ summary, details }) => {
    return (
        <div className="lucida flex border-b items-start my-1 w-full">
            <h5 className="w-28 min-w-32 mr-3 my-1">{summary}</h5>
            {details && (
                <h5 className="my-1">
                    {details.toString().split(',').join(', ')}
                </h5>
            )}
        </div>
    );
};
