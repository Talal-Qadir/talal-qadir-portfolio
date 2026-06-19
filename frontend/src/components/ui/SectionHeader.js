import React from 'react';
import ScrollReveal from './ScrollReveal';
import './SectionHeader.css';

function SectionHeader({ badge, badgeIcon: BadgeIcon, title, highlight, subtitle }) {
  return (
    <ScrollReveal className="section-header">
      {badge && (
        <div className="section-badge">
          {BadgeIcon && <BadgeIcon />}
          <span>{badge}</span>
        </div>
      )}
      <h2 className="section-title">
        {title}
        {highlight && <span className="title-highlight">{highlight}</span>}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </ScrollReveal>
  );
}

export default SectionHeader;
