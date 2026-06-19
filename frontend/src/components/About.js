import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaArrowRight,
  FaCode,
  FaRocket,
  FaUsers,
  FaAward,
} from 'react-icons/fa';
import SectionHeader from './ui/SectionHeader';
import ScrollReveal, { slideLeft, slideRight } from './ui/ScrollReveal';
import Button from './ui/Button';
import './About.css';

const API_URL = process.env.REACT_APP_API_URL;

const highlights = [
  { icon: FaCode, value: '2+', label: 'Years Experience', color: '#6366f1' },
  { icon: FaRocket, value: '15+', label: 'Projects Done', color: '#22c55e' },
  { icon: FaUsers, value: '10+', label: 'Happy Clients', color: '#f59e0b' },
  { icon: FaAward, value: '5+', label: 'Certifications', color: '#ec4899' },
];

function About({ personalInfo }) {
  if (!personalInfo) return null;

  const details = [
    { icon: FaEnvelope, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: FaPhone, label: 'Phone', value: personalInfo.phone, href: personalInfo.phone ? `tel:${personalInfo.phone}` : null },
    { icon: FaMapMarkerAlt, label: 'Location', value: personalInfo.location || 'Pakistan' },
    { icon: FaBriefcase, label: 'Role', value: personalInfo.title || 'Developer' },
  ].filter((d) => d.value);

  return (
    <section id="about" className="about">
      <div className="about__glow" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          badge="About Me"
          badgeIcon={FaUser}
          title="Know Me"
          highlight=" Better"
          subtitle="Passionate developer crafting digital experiences with precision and creativity"
        />

        <div className="about__grid">
          <ScrollReveal variant={slideLeft} className="about__main">
            <div className="about__card about__card--bio">
              <p className="about__bio">
                {personalInfo.summary ||
                  'Passionate developer building innovative solutions with modern technologies.'}
              </p>

              <div className="about__details">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="about__detail">
                    <div className="about__detail-icon">
                      <Icon />
                    </div>
                    <div>
                      <span className="about__detail-label">{label}</span>
                      {href ? (
                        <a href={href} className="about__detail-value">{value}</a>
                      ) : (
                        <span className="about__detail-value">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Button href="#contact" iconRight={FaArrowRight}>
                Let's Talk
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal variant={slideRight} className="about__aside">
            <div className="about__highlights">
              {highlights.map(({ icon: Icon, value, label, color }, i) => (
                <motion.div
                  key={label}
                  className="about__highlight"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{ '--accent': color }}
                >
                  <div className="about__highlight-icon">
                    <Icon />
                  </div>
                  <div>
                    <span className="about__highlight-value">{value}</span>
                    <span className="about__highlight-label">{label}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {personalInfo.profile_image && (
              <div className="about__photo">
                <img src={`${API_URL}${personalInfo.image2}`} alt={personalInfo.name} />
                <div className="about__photo-overlay" />
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default About;
