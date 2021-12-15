import React from 'react';
import HomeProducts from '../HomeProducts/HomeProducts';
import MiddleBanner from '../MiddleBanner/MiddleBanner';
import Newsletter from '../Newsletter/Newsletter';
import Slider from '../Slider/Slider';
import banner1 from '../../../images/small-banner-1.jpg';
import banner2 from '../../../images/small-banner-2.jpg';
import banner3 from '../../../images/small-banner-3.jpg';

const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <div className="max-w-6xl mx-auto mt-10 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <img src={banner1} alt="" />
                    </div>
                    <div>
                        <img src={banner2} alt="" />
                    </div>
                    <div>
                        <img src={banner3} alt="" />
                    </div>
                </div>
            </div>
            <HomeProducts></HomeProducts>
            <MiddleBanner></MiddleBanner>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;