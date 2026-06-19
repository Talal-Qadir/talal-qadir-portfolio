import React from 'react';
import { motion } from 'framer-motion';
import { FaLayerGroup } from 'react-icons/fa';
import SectionHeader from './ui/SectionHeader';
import ScrollReveal from './ui/ScrollReveal';
import './Skills.css';

const categoryLabels = {
  language: 'Languages',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools',
  other: 'Other',
};

function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  const grouped = skills.reduce((acc, skill) => {
    const cat = skill.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="skills">
      <div className="container">
        <SectionHeader badge="Skills" badgeIcon={FaLayerGroup} title="Tech" highlight=" Stack" subtitle="Technologies and tools I use to bring ideas to life" />
        <div className="skills__grid">
          {Object.entries(grouped).map(([category, items], catIndex) => (
            <ScrollReveal key={category} delay={catIndex * 0.08}>
              <motion.div className="skills__category" whileHover={{ y: -4 }}>
                <h3 className="skills__category-title">{categoryLabels[category] || category}</h3>
                <div className="skills__badges">
                  {items.map((skill) => (
                    <motion.span key={skill.id} className="skills__badge" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.98 }}>
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
