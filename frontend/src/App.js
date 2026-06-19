import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Button from './components/ui/Button';

function PortfolioApp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/portfolio-summary/');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          className="loader"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading portfolio...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <motion.div
          className="error-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Connection Error</h2>
          <p>Unable to load portfolio data.</p>
          <p className="error-detail">Error: {error}</p>
          <p>Make sure the backend server is running at http://localhost:8000</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </motion.div>
      </div>
    );
  }

  if (!data || !data.personal_info) {
    return (
      <div className="error-container">
        <motion.div
          className="error-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>No Data Found</h2>
          <p>Add your information through the admin panel:</p>
          <Button href="http://localhost:8000/admin" target="_blank" rel="noopener noreferrer">
            Open Admin Panel
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="App"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Navbar personalInfo={data.personal_info} />
        <main>
          <Hero personalInfo={data.personal_info} />
          <About personalInfo={data.personal_info} />
          <Experience experiences={data.experiences || []} />
          <Projects projects={data.projects || []} />
          <Skills skills={data.skills || []} />
          <Education education={data.education || []} />
          <Contact personalInfo={data.personal_info} />
        </main>
        <Footer personalInfo={data.personal_info} />
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}

export default App;
