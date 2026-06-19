import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaBook } from 'react-icons/fa';
import SectionHeader from './ui/SectionHeader';
import ScrollReveal from './ui/ScrollReveal';
import './Education.css';

function Education({ education }) {
  if (!education || education.length === 0) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <section id="education" className="education">
      <div className="container">
        <SectionHeader badge="Education" badgeIcon={FaGraduationCap} title="Academic" highlight=" Background" subtitle="My educational foundation and continuous learning journey" />
        <div className="education__timeline">
          <div className="education__line" aria-hidden="true" />
          {education.map((edu, index) => (
            <ScrollReveal key={edu.id} delay={index * 0.1} className="education__item">
              <div className="education__node"><div className="education__dot" /></div>
              <motion.article className="education__card" whileHover={{ x: 6 }}>
                <div className="education__accent" />
                <div className="education__header">
                  <div>
                    <h3 className="education__degree">{edu.degree}</h3>
                    <p className="education__field"><FaBook />{edu.field_of_study}</p>
                    <p className="education__institution">{edu.institution}</p>
                  </div>
                  <div className="education__meta">
                    <span className="education__tag"><FaCalendarAlt />{formatDate(edu.start_date)} – {formatDate(edu.end_date)}</span>
                    {edu.location && <span className="education__tag education__tag--loc"><FaMapMarkerAlt />{edu.location}</span>}
                  </div>
                </div>
                {edu.description && <p className="education__desc">{edu.description}</p>}
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;
