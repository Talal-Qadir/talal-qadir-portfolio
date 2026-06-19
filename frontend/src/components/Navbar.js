import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

function Navbar({ personalInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const firstName = 'Talal' || 'Dev';

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container navbar__inner">
        <a href="#home" className="navbar__brand">
          <span className="navbar__brand-dot" />
          {firstName}
          <span className="navbar__brand-accent">.</span>
        </a>

        <ul className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
          {navLinks.map((link, i) => (
            <motion.li
              key={link.href}
              initial={false}
              animate={isOpen ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: isOpen ? i * 0.05 : 0 }}
            >
              <a href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </a>
            </motion.li>
          ))}
          <li className="navbar__theme-desktop">
            <button
              type="button"
              className="navbar__theme-btn"
              onClick={toggleDarkMode}
              aria-label="Toggle theme"
            >
              {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
            </button>
          </li>
        </ul>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__theme-btn navbar__theme-mobile"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
          >
            {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
          </button>
          <button
            type="button"
            className="navbar__menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX /> : <HiMenuAlt3 />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="navbar__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
