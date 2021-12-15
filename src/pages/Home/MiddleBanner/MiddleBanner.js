import React from 'react';
import middleBanner from '../../../images/banner.jpg';
import banner4 from '../../../images/small-banner-4.jpg';
import banner5 from '../../../images/small-banner-5.jpg';

const MiddleBanner = () => {
    return (
        <div className="mb-10 md:mb-20">
            <div className="mb-10">
                <img className="w-full" src={middleBanner} alt="" />
            </div>
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <img src={banner4} alt="" />
                    </div>
                    <div>
                        <img src={banner5} alt="" />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MiddleBanner;