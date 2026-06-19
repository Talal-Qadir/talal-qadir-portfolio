import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRegHandshake,
  FaRegSmile,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaArrowRight,
} from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BsPhone } from 'react-icons/bs';
import SectionHeader from './ui/SectionHeader';
import ScrollReveal, { slideLeft, slideRight } from './ui/ScrollReveal';
import './Contact.css';

function Contact({ personalInfo }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => {
          setIsSubmitted(false);
        }, 4000); //  seconds
      }
    } catch (error) {
      console.log(error);
    }

    setIsSubmitting(false);
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email';
    if (!formData.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validate()) return;
  //   setIsSubmitting(true);
  //   await new Promise((r) => setTimeout(r, 1800));
  //   setIsSubmitted(true);
  //   setIsSubmitting(false);
  //   setTimeout(() => { setFormData({ name: '', email: '', message: '' }); setIsSubmitted(false); }, 4000);
  // };

  const contactItems = [
    { icon: MdOutlineAlternateEmail, label: 'Email', value: personalInfo?.email, href: personalInfo?.email ? `mailto:${personalInfo.email}` : null },
    { icon: BsPhone, label: 'Phone', value: personalInfo?.phone, href: personalInfo?.phone ? `tel:${personalInfo.phone}` : null },
    { icon: HiOutlineLocationMarker, label: 'Location', value: personalInfo?.location || 'Pakistan' },
  ].filter((i) => i.value);

  const socialLinks = [
    { icon: FaEnvelope, href: personalInfo?.email ? `mailto:${personalInfo.email}` : null, label: 'Email' },
    { icon: FaLinkedin, href: personalInfo?.linkedin, label: 'LinkedIn' },
    { icon: FaGithub, href: personalInfo?.github, label: 'GitHub' },
  ].filter((s) => s.href);

  return (
    <section id="contact" className="contact">
      <div className="container">
        <SectionHeader badge="Contact" badgeIcon={FaRegHandshake} title="Let's Create Something" highlight=" Amazing" subtitle="Have a project in mind? I'd love to hear from you." />
        <div className="contact__grid">
          <ScrollReveal variant={slideLeft} className="contact__info">
            <h3 className="contact__info-title"><FaRegSmile /> Let's Talk</h3>
            <p className="contact__info-text">I'm open to new opportunities, collaborations, or a friendly chat. Reach out anytime.</p>
            <div className="contact__items">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <motion.div key={label} className="contact__item" whileHover={{ x: 6 }}>
                  <div className="contact__item-icon"><Icon /></div>
                  <div><span className="contact__item-label"></span>{href ? <a href={href}>{value}<FaArrowRight /></a> : <span>{value}</span>}</div>
                </motion.div>
              ))}
            </div>
            {socialLinks.length > 0 && (
              <div className="contact__social">
                <span>Connect</span>
                <div>{socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} whileHover={{ y: -4, scale: 1.08 }}><Icon /></motion.a>
                ))}</div>
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal variant={slideRight} className="contact__form-wrap">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div key="success" className="contact__success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <FaCheckCircle /><h3>Message Sent!</h3><p>Thank you — I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <motion.form key="form" className="contact__form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h3>Send a Message</h3>
                  <p className="contact__form-sub">I'll respond within 24 hours</p>
                  {['name', 'email'].map((field) => (
                    <div key={field} className={`contact__field ${errors[field] ? 'contact__field--error' : ''}`}>
                      <label htmlFor={field}>{field === 'name' ? 'Your Name' : 'Your Email'}</label>
                      <input type={field === 'email' ? 'email' : 'text'} id={field} name={field} value={formData[field]} onChange={(e) => { setFormData({ ...formData, [field]: e.target.value }); setErrors({ ...errors, [field]: '' }); }} placeholder={field === 'name' ? 'John Doe' : 'john@example.com'} />
                      {errors[field] && <span className="contact__error">{errors[field]}</span>}
                    </div>
                  ))}
                  <div className={`contact__field ${errors.message ? 'contact__field--error' : ''}`}>
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" rows="5" value={formData.message} onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: '' }); }} placeholder="Tell me about your project..." />
                    {errors.message && <span className="contact__error">{errors.message}</span>}
                  </div>
                  <motion.button type="submit" className="contact__submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    {isSubmitting ? <><FaSpinner className="contact__spin" /> Sending...</> : <><FaPaperPlane /> Send Message</>}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

export default Contact;
