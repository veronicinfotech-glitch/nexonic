// GetStarted.js
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './GetStarted.css';
import logo from "../image/logo.jpg";

// Navbar Component (Same as Home.js)
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDigitalMarketingDropdownOpen, setIsDigitalMarketingDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("getstarted");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path, sectionId = null) => {
    if (path === "/") {
      navigate(path);
      setTimeout(() => {
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsDigitalMarketingDropdownOpen(false);
  };

  const services = [
    { name: "Mobile & Web Development", path: "/mobile-web-development" },
    { name: "UI/UX Design", path: "/ui-ux-design" },
    { name: "Cloud Solutions", path: "/cloud-solutions" },
  ];

  const digitalMarketingServices = [
    { name: "Video Editing", path: "/video-editing" },
    { name: "Logo Design", path: "/logo-design" },
    { name: "Instagram Post", path: "/instagram-post" },
    { name: "SEO", path: "/seo-optimization" },
    { name: "Google Ad / Analytics", path: "/google-ads" },
  ];

  return (
    <nav className={`getstarted-navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="getstarted-nav-container">
        <div className="getstarted-nav-logo" onClick={() => handleNavigation("/")}>
          <img src={logo} alt="Nexonic Logo" />
          <span>NEXONIC</span>
        </div>

        <div className={`getstarted-nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="getstarted-nav-links">
            <li>
              <Link
                to="/"
                onClick={() => {
                  setActiveLink("home");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`getstarted-nav-link ${activeLink === "home" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => {
                  setActiveLink("about");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`getstarted-nav-link ${activeLink === "about" ? "active" : ""}`}
              >
                About
              </Link>
            </li>
            <li className="getstarted-dropdown main-dropdown">
              <Link
                to="/services"
                className="getstarted-nav-link dropdown-toggle"
                onClick={() => {
                  setActiveLink("services");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
              >
                Services <span className="dropdown-icon">▼</span>
              </Link>
              <ul
                className={`getstarted-dropdown-menu main-dropdown-menu ${isServicesDropdownOpen ? "show" : ""}`}
                onMouseLeave={() => {
                  setIsServicesDropdownOpen(false);
                  setIsDigitalMarketingDropdownOpen(false);
                }}
              >
                <li className="sub-dropdown">
                  <Link
                    to="/digital-marketing"
                    className="dropdown-toggle sub-dropdown-toggle"
                    onClick={() => handleNavigation("/digital-marketing")}
                    onMouseEnter={() => setIsDigitalMarketingDropdownOpen(true)}
                  >
                    Digital Marketing <span className="dropdown-icon">▶</span>
                  </Link>
                  <ul
                    className={`getstarted-sub-dropdown-menu ${isDigitalMarketingDropdownOpen ? "show" : ""}`}
                  >
                    {digitalMarketingServices.map((service, index) => (
                      <li key={index}>
                        <Link
                          to={service.path}
                          onClick={() => {
                            setActiveLink("services");
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
                        setActiveLink("services");
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
                  setActiveLink("blog");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`getstarted-nav-link ${activeLink === "blog" ? "active" : ""}`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                onClick={() => {
                  setActiveLink("portfolio");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`getstarted-nav-link ${activeLink === "portfolio" ? "active" : ""}`}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => {
                  setActiveLink("contact");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`getstarted-nav-link ${activeLink === "contact" ? "active" : ""}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="getstarted-nav-right">
          <button
            className="getstarted-btn-nav"
            onClick={() => handleNavigation("/get-started")}
          >
            Get Started
          </button>
          <div
            className="getstarted-mobile-menu-icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Footer Component (Same as Home.js)
const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const digitalMarketingServices = [
    { name: "Video Editing", path: "/video-editing" },
    { name: "Logo Design", path: "/logo-design" },
    { name: "Instagram Post", path: "/instagram-post" },
    { name: "SEO", path: "/seo-optimization" },
    { name: "Google Ad / Analytics", path: "/google-ads" },
  ];

  const developmentServices = [
    { name: "Mobile & Web Development", path: "/mobile-web-development" },
    { name: "UI/UX Design", path: "/ui-ux-design" },
    { name: "Cloud Solutions", path: "/cloud-solutions" },
  ];

  return (
    <footer className="getstarted-footer">
      <div className="getstarted-footer-container">
        <div className="getstarted-footer-top">
          <div className="getstarted-footer-logo-section">
            <img src={logo} alt="Nexonic Logo" className="getstarted-footer-logo" />
            <h3>NEXONIC</h3>
            <p>
              Founded in 2026, we're a next-generation digital agency combining
              cutting-edge technology with innovative marketing strategies to
              help businesses thrive.
            </p>
            <div className="getstarted-social-links">
              <a href="#" className="getstarted-social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="getstarted-social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="getstarted-social-link">
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://instagram.com/nexonic.marketing"
                target="_blank"
                rel="noopener noreferrer"
                className="getstarted-social-link"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="getstarted-footer-links">
            <div className="getstarted-footer-column">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="/about" onClick={() => handleNavigation("/about")}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    onClick={() => handleNavigation("/careers")}
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/press" onClick={() => handleNavigation("/press")}>
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partners"
                    onClick={() => handleNavigation("/partners")}
                  >
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div className="getstarted-footer-column">
              <h4>Services</h4>
              <ul>
                <li>
                  <Link
                    to="/digital-marketing"
                    onClick={() => handleNavigation("/digital-marketing")}
                  >
                    Digital Marketing
                  </Link>
                </li>
                {digitalMarketingServices.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.path}
                      onClick={() => handleNavigation(service.path)}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
                {developmentServices.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.path}
                      onClick={() => handleNavigation(service.path)}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="getstarted-footer-column">
              <h4>Resources</h4>
              <ul>
                <li>
                  <Link to="/blog" onClick={() => handleNavigation("/blog")}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guides"
                    onClick={() => handleNavigation("/guides")}
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="/whitepapers"
                    onClick={() => handleNavigation("/whitepapers")}
                  >
                    Whitepapers
                  </Link>
                </li>
                <li>
                  <Link to="/faq" onClick={() => handleNavigation("/faq")}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div className="getstarted-footer-column">
              <h4>Legal</h4>
              <ul>
                <li>
                  <Link
                    to="/privacy"
                    onClick={() => handleNavigation("/privacy")}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" onClick={() => handleNavigation("/terms")}>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/disclaimer"
                    onClick={() => handleNavigation("/disclaimer")}
                  >
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compliance"
                    onClick={() => handleNavigation("/compliance")}
                  >
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="getstarted-footer-bottom">
          <div className="getstarted-footer-bottom-left">
            <p>
              &copy; 2026 - {currentYear} NEXONIC. All rights reserved. Founded
              in 2026.
            </p>
          </div>
          <div className="getstarted-footer-bottom-right">
            <Link to="/privacy" onClick={() => handleNavigation("/privacy")}>
              Privacy
            </Link>
            <Link to="/terms" onClick={() => handleNavigation("/terms")}>
              Terms
            </Link>
            <Link to="/cookies" onClick={() => handleNavigation("/cookies")}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Hero Section
const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToSchedule = () => {
    const scheduleSection = document.getElementById('schedule-section');
    if (scheduleSection) {
      scheduleSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="getstarted-hero">
      <div className="getstarted-hero-bg">
        <div className="getstarted-gradient-orb orb-1"></div>
        <div className="getstarted-gradient-orb orb-2"></div>
        <div className="getstarted-gradient-orb orb-3"></div>
        <div className="getstarted-particles">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="getstarted-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>
      
      <div className="getstarted-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="getstarted-hero-title"
          >
            Start Your <span className="getstarted-gradient-text">Development Journey</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="getstarted-hero-subtitle"
          >
            Transform your ideas into reality with our cutting-edge development solutions.
            Join thousands of developers who've accelerated their journey with Nexonic.
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="getstarted-hero-cta"
            onClick={scrollToSchedule}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
            <span className="getstarted-cta-arrow">→</span>
          </motion.button>
        </motion.div>
      </div>
      
      <div className="getstarted-scroll-indicator">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span>Scroll to explore</span>
          <div className="getstarted-scroll-line"></div>
        </motion.div>
      </div>
    </div>
  );
};

// Developer Journey Step Component
const JourneyStep = ({ step, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <div className={`getstarted-journey-step ${index % 2 === 0 ? 'left' : 'right'}`} ref={ref}>
      <div className="getstarted-journey-container">
        <motion.div 
          className="getstarted-journey-content"
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="getstarted-journey-number">{step.number}</div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
          <div className="getstarted-journey-features">
            {step.features.map((feature, i) => (
              <span key={i}>{feature}</span>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="getstarted-journey-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="getstarted-visual-content">
            {step.visual}
          </div>
        </motion.div>
      </div>
      
      {index < 2 && (
        <motion.div 
          className="getstarted-journey-connector"
          initial={{ height: 0 }}
          animate={isInView ? { height: 100 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="getstarted-connector-line"></div>
          <div className="getstarted-connector-arrow">↓</div>
        </motion.div>
      )}
    </div>
  );
};

// Code Showcase Component
const CodeShowcase = () => {
  const [activeTab, setActiveTab] = useState('api');
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const codeExamples = {
    api: `// REST API Example
const response = await fetch('https://api.nexonic.com/v1/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    name: 'My Awesome Project',
    type: 'web_application',
    framework: 'react'
  })
});

const data = await response.json();
console.log('Project created:', data);`,
    
    javascript: `// JavaScript Implementation
import { NexonicClient } from '@nexonic/sdk';

const client = new NexonicClient({
  apiKey: 'YOUR_API_KEY',
  environment: 'production'
});

// Initialize your project
const project = await client.projects.create({
  name: 'My Project',
  config: {
    framework: 'react',
    database: 'postgresql',
    deployment: 'auto'
  }
});

// Deploy with one command
await project.deploy();
console.log('Deployment successful! 🚀');`,
    
    cli: `# Nexonic CLI Commands

# Install the CLI
npm install -g @nexonic/cli

# Login to your account
nexonic login

# Create a new project
nexonic create my-project --template react

# Navigate to project
cd my-project

# Deploy to production
nexonic deploy --env production

# Monitor your deployment
nexonic logs --follow`
  };
  
  useEffect(() => {
    let timeout;
    const typeCode = () => {
      const code = codeExamples[activeTab];
      setDisplayText('');
      setIsTyping(true);
      
      let i = 0;
      const typing = setInterval(() => {
        if (i < code.length) {
          setDisplayText(code.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
          setIsTyping(false);
        }
      }, 30);
      
      return () => clearInterval(typing);
    };
    
    timeout = setTimeout(typeCode, 100);
    return () => clearTimeout(timeout);
  }, [activeTab]);
  
  return (
    <div className="getstarted-code-showcase">
      <div className="getstarted-code-header">
        <h2>Interactive <span className="getstarted-gradient-text">Code Showcase</span></h2>
        <p>See how easy it is to integrate with our platform</p>
      </div>
      
      <div className="getstarted-code-tabs">
        {['api', 'javascript', 'cli'].map(tab => (
          <button
            key={tab}
            className={`getstarted-code-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      
      <div className="getstarted-code-terminal">
        <div className="getstarted-terminal-header">
          <div className="getstarted-terminal-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="getstarted-terminal-title">terminal</span>
        </div>
        <div className="getstarted-terminal-content">
          <pre>
            <code>{displayText}</code>
            {isTyping && <span className="getstarted-cursor">▊</span>}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Timeline Section
const TimelineSection = () => {
  const milestones = [
    { title: 'Discovery', icon: '🔍', desc: 'Understanding your vision and goals' },
    { title: 'Planning', icon: '📋', desc: 'Strategic roadmap and architecture' },
    { title: 'Development', icon: '💻', desc: 'Agile development process' },
    { title: 'Testing', icon: '🧪', desc: 'Rigorous quality assurance' },
    { title: 'Deployment', icon: '🚀', desc: 'Seamless launch and migration' },
    { title: 'Growth', icon: '📈', desc: 'Continuous optimization' }
  ];
  
  return (
    <div className="getstarted-timeline">
      <h2>Your <span className="getstarted-gradient-text">Journey Timeline</span></h2>
      <p>From concept to success, we're with you every step of the way</p>
      
      <div className="getstarted-timeline-path">
        <div className="getstarted-timeline-line"></div>
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            className="getstarted-timeline-node"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="getstarted-node-marker">
              <span className="getstarted-node-icon">{milestone.icon}</span>
            </div>
            <div className="getstarted-node-content">
              <h4>{milestone.title}</h4>
              <p>{milestone.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Schedule Meeting Section - Updated with dropdown styling and Rupees currency
const ScheduleMeeting = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    date: '',
    time: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const projectTypes = ['Web Development', 'Mobile App', 'UI/UX Design', 'Digital Marketing', 'Cloud Solutions', 'Other'];
  const budgets = ['Under ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹25,000', '₹25,000 - ₹50,000', '₹50,000+', 'Not sure'];
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        date: '',
        time: '',
        message: ''
      });
    }, 3000);
  };
  
  return (
    <div id="schedule-section" className="getstarted-schedule">
      <div className="getstarted-schedule-bg">
        <div className="getstarted-blob blob-1"></div>
        <div className="getstarted-blob blob-2"></div>
      </div>
      
      <div className="getstarted-schedule-container">
        <div className="getstarted-schedule-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Let's Build Something <span className="getstarted-gradient-text">Great Together</span></h2>
            <p>Schedule a meeting with our experts and discover how we can transform your ideas into reality. We'll discuss your goals, timeline, and create a custom roadmap for success.</p>
            
            <div className="getstarted-schedule-features">
              <div className="getstarted-feature-item">
                <span>✓</span>
                <span>Free 30-minute consultation</span>
              </div>
              <div className="getstarted-feature-item">
                <span>✓</span>
                <span>No obligation, no pressure</span>
              </div>
              <div className="getstarted-feature-item">
                <span>✓</span>
                <span>Personalized project roadmap</span>
              </div>
              <div className="getstarted-feature-item">
                <span>✓</span>
                <span>Expert technical guidance</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="getstarted-schedule-right">
          <motion.div
            className="getstarted-schedule-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="getstarted-schedule-form"
                >
                  <div className="getstarted-form-group">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <label>Full Name</label>
                    <span className="getstarted-form-icon">👤</span>
                  </div>
                  
                  <div className="getstarted-form-group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <label>Email Address</label>
                    <span className="getstarted-form-icon">📧</span>
                  </div>
                  
                  <div className="getstarted-form-group">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder=" "
                    />
                    <label>Phone Number</label>
                    <span className="getstarted-form-icon">📞</span>
                  </div>
                  
                  <div className="getstarted-form-group">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder=" "
                    />
                    <label>Company Name (Optional)</label>
                    <span className="getstarted-form-icon">🏢</span>
                  </div>
                  
                  <div className="getstarted-form-group">
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select project type</option>
                      {projectTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <label>Project Type</label>
                    <span className="getstarted-form-icon">📁</span>
                  </div>
                  
                  <div className="getstarted-form-group">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select budget range</option>
                      {budgets.map(budget => (
                        <option key={budget} value={budget}>{budget}</option>
                      ))}
                    </select>
                    <label>Budget Range</label>
                    <span className="getstarted-form-icon">💰</span>
                  </div>
                  
                  <div className="getstarted-form-row">
                    <div className="getstarted-form-group">
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                      <label>Preferred Date</label>
                      <span className="getstarted-form-icon">📅</span>
                    </div>
                    
                    <div className="getstarted-form-group">
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                      <label>Preferred Time</label>
                      <span className="getstarted-form-icon">⏰</span>
                    </div>
                  </div>
                  
                  <div className="getstarted-form-group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      placeholder=" "
                    ></textarea>
                    <label>Message / Requirements</label>
                    <span className="getstarted-form-icon">💬</span>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="getstarted-schedule-submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="getstarted-loading-spinner"></span>
                    ) : (
                      'Schedule Meeting →'
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="getstarted-success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="getstarted-success-icon">✓</div>
                  <h3>Meeting Scheduled!</h3>
                  <p>We'll send a calendar invite to your email shortly. Looking forward to connecting with you!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Final CTA Section
const FinalCTA = () => {
  const navigate = useNavigate();
  
  return (
    <div className="getstarted-final-cta">
      <div className="getstarted-final-content">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to <span className="getstarted-gradient-text">Start?</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Join thousands of successful developers who've accelerated their journey with Nexonic
        </motion.p>
        
        <motion.button
          className="getstarted-final-button"
          onClick={() => navigate('/contact')}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Begin Your Journey
          <span className="getstarted-button-glow"></span>
        </motion.button>
      </div>
    </div>
  );
};

// Main Component
const GetStarted = () => {
  const journeySteps = [
    {
      number: '01',
      title: 'Setup & Installation',
      description: 'Get started in minutes with our streamlined setup process. Our intuitive CLI and comprehensive documentation make onboarding effortless.',
      features: ['One-command installation', 'Interactive setup wizard', 'Environment configuration', 'Dependency management'],
      visual: (
        <div className="getstarted-terminal-preview">
          <div className="getstarted-terminal-mini">
            <div className="getstarted-mini-header">$ npm install -g @nexonic/cli</div>
            <div className="getstarted-mini-content">
              <div className="getstarted-mini-line">✔ Installed successfully</div>
              <div className="getstarted-mini-line">✔ Configured environment</div>
              <div className="getstarted-mini-line">✔ Ready to build</div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: '02',
      title: 'Build & Customize',
      description: 'Leverage our powerful framework to build exactly what you need. Customize every aspect with our flexible architecture and extensive component library.',
      features: ['Modular architecture', 'Custom components', 'Real-time preview', 'Version control integration'],
      visual: (
        <div className="getstarted-code-preview">
          <div className="getstarted-code-snippet">
            <span className="getstarted-code-keyword">import</span> {'{ Nexonic }'} <span className="getstarted-code-keyword">from</span> <span className="getstarted-code-string">'@nexonic/core'</span>;
            <br/><br/>
            <span className="getstarted-code-keyword">const</span> <span className="getstarted-code-function">app</span> = <span className="getstarted-code-keyword">new</span> <span className="getstarted-code-class">Nexonic</span>({'{'})
            <br/>  <span className="getstarted-code-property">framework</span>: <span className="getstarted-code-string">'react'</span>,
            <br/>  <span className="getstarted-code-property">plugins</span>: [<span className="getstarted-code-string">'analytics'</span>, <span className="getstarted-code-string">'seo'</span>]
            <br/>{'}'});
          </div>
        </div>
      )
    },
    {
      number: '03',
      title: 'Deploy & Scale',
      description: 'Deploy with confidence and scale effortlessly. Our infrastructure automatically adapts to your growing needs with zero downtime.',
      features: ['One-click deployment', 'Auto-scaling infrastructure', 'Global CDN', '99.99% uptime guarantee'],
      visual: (
        <div className="getstarted-deploy-preview">
          <div className="getstarted-deploy-stats">
            <div className="getstarted-stat">
              <span className="getstarted-stat-value">99.99%</span>
              <span className="getstarted-stat-label">Uptime</span>
            </div>
            <div className="getstarted-stat">
              <span className="getstarted-stat-value">&lt;100ms</span>
              <span className="getstarted-stat-label">Response Time</span>
            </div>
            <div className="getstarted-stat">
              <span className="getstarted-stat-value">∞</span>
              <span className="getstarted-stat-label">Scalability</span>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  return (
    <div className="getstarted-page">
      <Navbar />
      
      <HeroSection />
      
      <div className="getstarted-journey-section">
        <div className="getstarted-section-header">
          <h2>Your <span className="getstarted-gradient-text">Developer Journey</span></h2>
          <p>Three simple steps to launch your next big idea</p>
        </div>
        
        {journeySteps.map((step, index) => (
          <JourneyStep key={index} step={step} index={index} />
        ))}
      </div>
      
      <TimelineSection />
      
      <ScheduleMeeting />
      
      <FinalCTA />
      
      <Footer />
    </div>
  );
};

export default GetStarted;