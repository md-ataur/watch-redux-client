import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { FaPinterest } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer-bar pt-10 md:pt-20">
            <div className="max-w-7xl mx-auto px-4 mb-6 md:mb-10 grid grid-cols-1 md:grid-cols-4 gap-x-10 gap-y-4 text-center md:text-left">
                <div className="footer-nav">
                    <h4>Watch</h4>
                    <p className="mb-5">We’re curious, passionate, and committed to helping our valuable customer.</p>
                    <div className="flex justify-center md:justify-start mb-3">
                        <Link className="text-gray-400 hover:text-gray-300 text-2xl mr-4" to="#"><span><FaFacebook /></span></Link>
                        <Link className="text-gray-400 hover:text-gray-300 text-2xl mr-4" to="#"><span><FaTwitter /></span></Link>
                        <Link className="text-gray-400 hover:text-gray-300 text-2xl mr-4" to="#"><span><FaPinterest /></span></Link>
                        <Link className="text-gray-400 hover:text-gray-300 text-2xl" to="#"><span><FaLinkedin /></span></Link>
                    </div>
                </div>
                <div className="footer-nav">
                    <h4>Company Policy</h4>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Return Policy</a></li>
                        <li><a href="#">Terms &amp; Condition</a></li>
                        <li><a href="#">Payment Options</a></li>
                    </ul>
                </div>
                <div className="footer-nav">
                    <h4>Your Account</h4>
                    <ul>
                        <li><a href="#">My Account</a></li>
                        <li><a href="#">My Orders</a></li>
                        <li><a href="#">My History</a></li>
                        <li><a href="#">Create Account</a></li>
                    </ul>
                </div>
                <div className="footer-nav">
                    <h4>Our Support</h4>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Repair Center</a></li>
                        <li><a href="#">Support Team</a></li>
                        <li><a href="#">Membership</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-gray-200 border-t border-gray-700 py-6 md:py-8 px-4 text-center">
                <p>Copyright &copy; 2021 All Rights Reserved by Watch.</p>
            </div>
        </div>
    );
};

export default Footer;