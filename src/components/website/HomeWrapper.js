import React from 'react';
import { Header } from '../../components/website/homeComponent';
const HomeWrapper = (prop) => {
    return (
        <section className="w-full h-screen relative website-main-bg-image">
            <div className="absolute h-full w-full bg-black opacity-70"></div>
            <div className="absolute top-0 left-0 w-full z-50">
                <Header userData={prop.userData} />
            </div>
            {prop.children}
        </section>
    );
};

export default HomeWrapper;
