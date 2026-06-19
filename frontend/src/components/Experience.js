import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import SectionHeader from './ui/SectionHeader';
import ScrollReveal from './ui/ScrollReveal';
import './Experience.css';

function Experience({ experiences }) {
  if (!experiences || experiences.length === 0) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="experience" className="experience">
      <div className="container">
        <SectionHeader badge="Experience" badgeIcon={FaBriefcase} title="Work" highlight=" Journey" subtitle="My professional path and the roles that shaped my craft" />
        <div className="experience__timeline">
          <div className="experience__line" aria-hidden="true" />
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id} delay={index * 0.1} className="experience__item">
              <div className="experience__node"><motion.div className="experience__dot" whileHover={{ scale: 1.3 }} /></div>
              <motion.article className="experience__card" whileHover={{ x: 6 }} transition={{ type: 'spring', stiffness: 300 }}>
                <div className="experience__card-accent" />
                <header className="experience__header">
                  <div><h3 className="experience__position">{exp.position}</h3><p className="experience__company">{exp.company}</p></div>
                  <span className="experience__date"><FaCalendarAlt />{formatDate(exp.start_date)} – {exp.is_current ? 'Present' : formatDate(exp.end_date)}</span>
                </header>
                {exp.location && <p className="experience__location"><FaMapMarkerAlt />{exp.location}</p>}
                {exp.description && <p className="experience__description">{exp.description}</p>}
                {exp.responsibilities?.length > 0 && (
                  <ul className="experience__list">{exp.responsibilities.map((resp, i) => (<li key={resp.id || i}>{resp.text}</li>))}</ul>
                )}
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
