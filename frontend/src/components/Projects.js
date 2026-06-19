import React from 'react';
import { motion } from 'framer-motion';
import { FaFolderOpen, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import SectionHeader from './ui/SectionHeader';
import ScrollReveal, { scaleIn } from './ui/ScrollReveal';
import './Projects.css';

const API_URL = process.env.REACT_APP_API_URL;

function Projects({ projects }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="projects">
      <div className="container">
        <SectionHeader badge="Portfolio" badgeIcon={FaFolderOpen} title="Featured" highlight=" Projects" subtitle="A selection of work I'm proud of — built with care and modern tech" />
        <div className="projects__grid">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} variant={scaleIn} delay={index * 0.08}>
              <motion.article className="project-card" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260 }}>
                <div className="project-card__preview">
                  {project.image ? (
                    <img src={`${API_URL}${project.image}`} alt={project.title} className="project-card__img" />
                  ) : (
                    <div className="project-card__placeholder"><FaFolderOpen /></div>
                  )}
                  <div className="project-card__overlay">
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="project-card__btn" aria-label="Live preview">
                        <FaExternalLinkAlt />
                      </a>
                    )}
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="project-card__btn" aria-label="GitHub">
                        <FaGithub />
                      </a>
                    )}
                  </div>
                </div>
                <div className="project-card__body">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  {project.tech_list?.length > 0 && (
                    <div className="project-card__tags">
                      {project.tech_list.map((tech, i) => (<span key={i} className="project-card__tag">{tech}</span>))}
                    </div>
                  )}
                  <div className="project-card__links">
                    {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer">Live Demo <FaExternalLinkAlt /></a>}
                    {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer">Source <FaGithub /></a>}
                  </div>
                </div>
              </motion.article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
