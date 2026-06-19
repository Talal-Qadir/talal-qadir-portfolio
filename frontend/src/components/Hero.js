import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaArrowRight,
  FaDownload,
  FaPaperPlane,
  FaUserAstronaut,
  FaCircle,
  FaChevronDown,
} from 'react-icons/fa';
import { SiLeetcode, SiDevdotto } from 'react-icons/si';
import Button from './ui/Button';
import './Hero.css';

const API_URL = process.env.REACT_APP_API_URL;


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};


const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

function Hero({ personalInfo })
{
  if (!personalInfo) return null;
  console.log(window.location.origin);
  const socialLinks = [
    { icon: FaGithub, href: personalInfo.github, label: 'GitHub' },
    { icon: FaLinkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
    { icon: FaTwitter, href: personalInfo.twitter, label: 'Twitter' },
    { icon: SiLeetcode, href: personalInfo.leetcode, label: 'LeetCode' },
    { icon: SiDevdotto, href: personalInfo.devto, label: 'Dev.to' },
    
  ].filter((s) => s.href);

  const titles = [
    personalInfo.title || 'Full Stack Developer',
    'React Specialist',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Backend Developer',

  
  ];

  const resumeUrl = personalInfo.resume_file
  ? `${API_URL}${personalInfo.resume_file}`
  : null;

  return (
    <section id="home" className="hero">
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero__badge" variants={itemVariants}>
            <FaCircle className="hero__badge-dot" />
            <span>Available for opportunities</span>
          </motion.div>

          <motion.h1 className="hero__title" variants={itemVariants}>
            <span className="hero__greeting">Hi, I'm</span>
            <span className="hero__name">{personalInfo.name}</span>
          </motion.h1>

          <motion.div className="hero__role" variants={itemVariants}>
            <TypeAnimation
              sequence={titles.flatMap((t) => [t, 1800])}
              wrapper="span"
              speed={45}
              repeat={Infinity}
              cursor
              className="hero__typed"
            />
          </motion.div>

          <motion.p className="hero__bio" variants={itemVariants}>
            {personalInfo.bio ||
              'Building exceptional digital experiences with modern web technologies. Passionate about clean code and elegant solutions.'}
          </motion.p>

          <motion.div className="hero__actions" variants={itemVariants}>
            <Button href="#contact" icon={FaPaperPlane} iconRight={FaArrowRight}>
              Let's Connect
            </Button>
            {personalInfo.resume_file && (
              <Button
                variant="secondary"
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={FaDownload}
              >
                Download Resume
              </Button>
            )}
          </motion.div>

          {socialLinks.length > 0 && (
            <motion.div className="hero__social" variants={itemVariants}>
              <span className="hero__social-label">Find me on</span>
              <div className="hero__social-links">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero__social-link"
                    aria-label={label}
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          <motion.a
            href="#about"
            className="hero__scroll"
            variants={itemVariants}
            aria-label="Scroll to about"
          >
            <span>Scroll</span>
            <FaChevronDown className="hero__scroll-icon" />
          </motion.a>
        </motion.div>

        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero__avatar-ring">
            <div className="hero__avatar-glow" />
            <div className="hero__avatar">
              {personalInfo.profile_image ? 
              (
                <img
                  src={`${API_URL}${personalInfo.profile_image}`}
                  alt={personalInfo.name}
                  className="hero__avatar-img"
                />
              ) : (
                <div className="hero__avatar-fallback">
                  <FaUserAstronaut />
                  <span>{personalInfo.name?.charAt(0) || 'D'}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
