import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Quickserve" />
          <p>
            Quickserve is your go-to platform for fast, fresh, and delicious meals delivered straight to your door. 
            Explore our diverse menu and enjoy a seamless dining experience.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li
              onClick={() => {
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Home
            </li>
            <li
              onClick={() => scrollToSection('#about')}
            >
              About Us
            </li>
            <li
              onClick={() => scrollToSection('#privacy-policy')}
            >
              Privacy Policy
            </li>
            <li
              onClick={() => scrollToSection('#footer')}
            >
              Contact Us
            </li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91 9994053302</li>
            <li>contact@quickserve.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © Quickserve - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
