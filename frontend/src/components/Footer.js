import React from 'react';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Footer.css';

function Footer({ personalInfo }) {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <span className="footer__name">{personalInfo?.name || 'Developer'}</span>
            <span className="footer__tagline">Building things with code</span>
          </div>
          <div className="footer__links">
            {personalInfo?.github && (
              <motion.a href={personalInfo.github} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} aria-label="GitHub"><FaGithub /></motion.a>
            )}
            {personalInfo?.linkedin && (
              <motion.a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" whileHover={{ y: -3 }} aria-label="LinkedIn"><FaLinkedin /></motion.a>
            )}
          </div>
        </div>
        <div className="footer__bottom">
          <p>© {year} {'Dev'}. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
