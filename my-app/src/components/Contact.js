// Contact.js - Updated with Consistent Navbar and Footer
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Contact.css';
import logo from "../image/logo.jpg";

// Section Wrapper with animation
const Section = ({ children, className = '', id = '' }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`${className} ${isVisible ? 'section-visible' : 'section-hidden'}`} 
      id={id}
    >
      {children}
    </section>
  );
};

// Navbar Component - SAME AS ALL OTHER PAGES
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDigitalMarketingDropdownOpen, setIsDigitalMarketingDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('contact');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsDigitalMarketingDropdownOpen(false);
    window.scrollTo(0, 0);
  };

  const services = [
    { name: 'Mobile & Web Development', path: '/mobile-web-development' },
    { name: 'UI/UX Design', path: '/ui-ux-design' },
    { name: 'Cloud Solutions', path: '/cloud-solutions' }
  ];

  const digitalMarketingServices = [
    { name: 'Video Editing', path: '/video-editing' },
    { name: 'Logo Design', path: '/logo-design' },
    { name: 'Instagram Post', path: '/instagram-post' },
    { name: 'SEO', path: '/seo-optimization' },
    { name: 'Google Ad / Analytics', path: '/google-ads' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => handleNavigation('/')}>
          <img src={logo} alt="Nexonic Logo" />
          <span>NEXONIC</span>
        </div>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                onClick={() => {
                  setActiveLink('home');
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                onClick={() => {
                  setActiveLink('about');
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
              >
                About
              </Link>
            </li>
            <li className="dropdown main-dropdown">
              <Link 
                to="/services"
                className="nav-link dropdown-toggle"
                onClick={() => {
                  setActiveLink('services');
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
              >
                Services <span className="dropdown-icon">▼</span>
              </Link>
              <ul 
                className={`dropdown-menu main-dropdown-menu ${isServicesDropdownOpen ? 'show' : ''}`}
                onMouseLeave={() => {
                  setIsServicesDropdownOpen(false);
                  setIsDigitalMarketingDropdownOpen(false);
                }}
              >
                <li className="sub-dropdown">
                  <Link 
                    to="/digital-marketing"
                    className="dropdown-toggle sub-dropdown-toggle"
                    onClick={() => handleNavigation('/digital-marketing')}
                    onMouseEnter={() => setIsDigitalMarketingDropdownOpen(true)}
                  >
                    Digital Marketing <span className="dropdown-icon">▶</span>
                  </Link>
                  <ul className={`sub-dropdown-menu ${isDigitalMarketingDropdownOpen ? 'show' : ''}`}>
                    {digitalMarketingServices.map((service, index) => (
                      <li key={index}>
                        <Link 
                          to={service.path}
                          onClick={() => {
                            setActiveLink('services');
                            setIsServicesDropdownOpen(false);
                            setIsDigitalMarketingDropdownOpen(false);
                            setIsMobileMenuOpen(false);
                            window.scrollTo(0, 0);
                          }}
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                {services.map((service, index) => (
                  <li key={index}>
                    <Link 
                      to={service.path}
                      onClick={() => {
                        setActiveLink('services');
                        setIsServicesDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link 
                to="/blog" 
                onClick={() => {
                  setActiveLink('blog');
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`nav-link ${activeLink === 'blog' ? 'active' : ''}`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link 
                to="/portfolio" 
                onClick={() => {
                  setActiveLink('portfolio');
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`nav-link ${activeLink === 'portfolio' ? 'active' : ''}`}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                onClick={() => {
                  setActiveLink('contact');
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <button className="btn-nav" onClick={() => handleNavigation('/contact')}>Get Started</button>
          <div className="mobile-menu-icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Footer Component - SAME AS ALL OTHER PAGES
const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const digitalMarketingServices = [
    { name: 'Video Editing', path: '/video-editing' },
    { name: 'Logo Design', path: '/logo-design' },
    { name: 'Instagram Post', path: '/instagram-post' },
    { name: 'SEO', path: '/seo-optimization' },
    { name: 'Google Ad / Analytics', path: '/google-ads' }
  ];

  const developmentServices = [
    { name: 'Mobile & Web Development', path: '/mobile-web-development' },
    { name: 'UI/UX Design', path: '/ui-ux-design' },
    { name: 'Cloud Solutions', path: '/cloud-solutions' }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-section">
            <img src={logo} alt="Nexonic Logo" className="footer-logo" />
            <h3>NEXONIC</h3>
            <p>Founded in 2026, we're a next-generation digital agency combining cutting-edge technology with innovative marketing strategies to help businesses thrive.</p>
            <div className="social-links">
              <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link"><i className="fab fa-linkedin"></i></a>
              <a href="#" className="social-link"><i className="fab fa-github"></i></a>
              <a href="https://instagram.com/nexonic.marketing" target="_blank" rel="noopener noreferrer" className="social-link"><i className="fab fa-instagram"></i></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about" onClick={() => window.scrollTo(0, 0)}>About Us</Link></li>
                <li><Link to="/careers" onClick={() => window.scrollTo(0, 0)}>Careers</Link></li>
                <li><Link to="/press" onClick={() => window.scrollTo(0, 0)}>Press</Link></li>
                <li><Link to="/partners" onClick={() => window.scrollTo(0, 0)}>Partners</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li><Link to="/digital-marketing" onClick={() => window.scrollTo(0, 0)}>Digital Marketing</Link></li>
                {digitalMarketingServices.map((service, index) => (
                  <li key={index}>
                    <Link to={service.path} onClick={() => window.scrollTo(0, 0)}>{service.name}</Link>
                  </li>
                ))}
                {developmentServices.map((service, index) => (
                  <li key={index}>
                    <Link to={service.path} onClick={() => window.scrollTo(0, 0)}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/blog" onClick={() => window.scrollTo(0, 0)}>Blog</Link></li>
                <li><Link to="/guides" onClick={() => window.scrollTo(0, 0)}>Guides</Link></li>
                <li><Link to="/whitepapers" onClick={() => window.scrollTo(0, 0)}>Whitepapers</Link></li>
                <li><Link to="/faq" onClick={() => window.scrollTo(0, 0)}>FAQ</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link></li>
                <li><Link to="/terms" onClick={() => window.scrollTo(0, 0)}>Terms of Service</Link></li>
                <li><Link to="/disclaimer" onClick={() => window.scrollTo(0, 0)}>Disclaimer</Link></li>
                <li><Link to="/compliance" onClick={() => window.scrollTo(0, 0)}>Compliance</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; 2026 - {currentYear} NEXONIC. All rights reserved. Founded in 2026.</p>
          </div>
          <div className="footer-bottom-right">
            <Link to="/privacy" onClick={() => window.scrollTo(0, 0)}>Privacy</Link>
            <Link to="/terms" onClick={() => window.scrollTo(0, 0)}>Terms</Link>
            <Link to="/cookies" onClick={() => window.scrollTo(0, 0)}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Section 1: Hero Contact Section
const ContactHeroSection = () => {
  const [particles, setParticles] = useState([]);
  const heroRef = useRef(null);

  useEffect(() => {
    // Create particles
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * 6 + 2,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 10 + 10}s`,
        color: i % 3 === 0 ? '#C6FF00' : i % 3 === 1 ? '#7CFF3A' : '#B6FF1A'
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="contact-hero" ref={heroRef}>
      <div className="contact-hero-background">
        <div className="contact-hero-grid"></div>
        <div className="contact-hero-particles">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="hero-particle"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                left: particle.left,
                top: particle.top,
                animationDelay: particle.delay,
                animationDuration: particle.duration,
                background: particle.color
              }}
            />
          ))}
        </div>
      </div>
      
      <motion.div 
        className="contact-hero-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hero-badge-wrapper"
        >
          <span className="hero-badge">
            LET'S CONNECT
          </span>
        </motion.div>
        
        <motion.h1 
          className="hero-main-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Let's Build Something <span className="gradient-text">Amazing Together</span>
        </motion.h1>
        
        <motion.p 
          className="hero-description"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Whether you're looking to build a cutting-edge web application, launch a data-driven marketing campaign, 
          or transform your digital presence — our team is ready to bring your vision to life.
        </motion.p>
        
        <motion.div 
          className="hero-actions"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.button 
            className="btn-primary-glow"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
            onClick={() => {
              document.getElementById('contact-form-section').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Start Your Project
            <span className="btn-arrow">→</span>
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div 
        className="scroll-indicator-contact"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        onClick={() => {
          document.getElementById('contact-form-section').scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span>Scroll to Connect</span>
        <div className="scroll-line-contact"></div>
      </motion.div>
    </div>
  );
};

// Section 2: Contact Form & Agency Info
const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const services = [
    'Web Development',
    'Mobile Development',
    'Digital Marketing',
    'SEO Optimization',
    'UI/UX Design',
    'Cloud Solutions'
  ];

  return (
    <div className="contact-form-section" id="contact-form-section">
      <div className="form-split-layout">
        <motion.div 
          className="form-left"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="form-section-badge">GET IN TOUCH</span>
          <h2 className="form-section-title">Tell Us About Your Project</h2>
          <p className="form-section-description">
            Fill out the form below and our team will get back to you within 24 hours to discuss how we can help transform your digital presence.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-field">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onFocus={() => setFocusedField('fullName')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <label className={focusedField === 'fullName' || formData.fullName ? 'active' : ''}>
                Full Name
              </label>
              <div className="field-border"></div>
            </div>

            <div className="form-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
              />
              <label className={focusedField === 'email' || formData.email ? 'active' : ''}>
                Email Address
              </label>
              <div className="field-border"></div>
            </div>

            <div className="form-field">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                onFocus={() => setFocusedField('company')}
                onBlur={() => setFocusedField(null)}
              />
              <label className={focusedField === 'company' || formData.company ? 'active' : ''}>
                Company / Business Name
              </label>
              <div className="field-border"></div>
            </div>

            <div className="form-field select-field">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                onFocus={() => setFocusedField('service')}
                onBlur={() => setFocusedField(null)}
                required
              >
                <option value="" disabled></option>
                {services.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
              <label className={focusedField === 'service' || formData.service ? 'active' : ''}>
                Service Interested In
              </label>
              <div className="field-border"></div>
            </div>

            <div className="form-field textarea-field">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows="4"
                required
              ></textarea>
              <label className={focusedField === 'message' || formData.message ? 'active' : ''}>
                Project Message
              </label>
              <div className="field-border"></div>
            </div>

            <motion.button 
              type="submit" 
              className="form-submit-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              Send Message
              <span className="btn-arrow">→</span>
            </motion.button>
          </form>
        </motion.div>

        <motion.div 
          className="form-right"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="agency-info">
            <span className="info-badge">CONNECT WITH US</span>
            
            <div className="info-item">
              <div className="info-icon">✉️</div>
              <div className="info-content">
                <span className="info-label">Email Us</span>
                <a href="mailto:hello@nexonic.com" className="info-value">hello@nexonic.com</a>
                <a href="mailto:support@nexonic.com" className="info-value">support@nexonic.com</a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <span className="info-label">Call Us</span>
                <a href="tel:+1234567890" className="info-value">+1 (234) 567-890</a>
                <a href="tel:+0987654321" className="info-value">+1 (098) 765-432</a>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <span className="info-label">Visit Us</span>
                <span className="info-value">123 Digital Avenue</span>
                <span className="info-value">San Francisco, CA 94105</span>
              </div>
            </div>

            <div className="social-info">
              <span className="info-label">Follow Us</span>
              <div className="social-links-contact">
                <motion.a 
                  href="#" 
                  className="social-link-contact"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.1 }}
                >
                  <i className="fab fa-twitter"></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link-contact"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.1 }}
                >
                  <i className="fab fa-linkedin"></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link-contact"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.1 }}
                >
                  <i className="fab fa-github"></i>
                </motion.a>
                <motion.a 
                  href="#" 
                  className="social-link-contact"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.1 }}
                >
                  <i className="fab fa-instagram"></i>
                </motion.a>
              </div>
            </div>
          </div>

          <div className="office-hours">
            <div className="hours-item">
              <span className="hours-day">Monday - Friday</span>
              <span className="hours-time">9:00 AM - 6:00 PM</span>
            </div>
            <div className="hours-item">
              <span className="hours-day">Saturday</span>
              <span className="hours-time">10:00 AM - 4:00 PM</span>
            </div>
            <div className="hours-item">
              <span className="hours-day">Sunday</span>
              <span className="hours-time">Closed</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Section 3: Digital Partnership CTA
const PartnershipSection = () => {
  return (
    <div className="partnership-section">
      <div className="partnership-background">
        <div className="partnership-glow-1"></div>
        <div className="partnership-glow-2"></div>
      </div>
      
      <motion.div 
        className="partnership-content"
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.span 
          className="partnership-badge"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          viewport={{ once: true }}
        >
          DIGITAL PARTNERSHIP
        </motion.span>

        <motion.h2 
          className="partnership-title"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to Grow Your <span className="gradient-text">Business Online?</span>
        </motion.h2>

        <motion.p 
          className="partnership-description"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Partner with us to unlock your business's full digital potential. Whether you need a powerful web application, 
          a data-driven marketing strategy, or complete digital transformation — we're here to help you succeed in the digital age.
        </motion.p>

        <motion.div 
          className="partnership-stats"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">30+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5+</span>
            <span className="stat-label">Team Experts</span>
          </div>
        </motion.div>

        <motion.button 
          className="partnership-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.1 }}
        >
          Schedule a Free Consultation
          <span className="btn-arrow">→</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

// Main Contact Component
const Contact = () => {
  return (
    <div className="contact-container">
      <Navbar />
      
      <Section className="contact-section hero-section">
        <ContactHeroSection />
      </Section>

      <Section className="contact-section form-section">
        <ContactFormSection />
      </Section>

      <Section className="contact-section partnership-section-wrapper">
        <PartnershipSection />
      </Section>
      
      <Footer />
    </div>
  );
};

export default Contact;