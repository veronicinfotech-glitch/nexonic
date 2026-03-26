// About.js
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './About.css';
import logo from "../image/logo.jpg";

// All images using proper imports
// import homeImage from "../image/home.jpg";
import marketingImage from "../image/marketing.jpg";
import creativeArt from "../image/Live.jpg";

// Development Cards Images
import webDevImage from "../image/webdev.jpg";
import mobileAppImage from "../image/App.jpg";
import cloudImage from "../image/Cloudsolutions.png";
import uiuxImage from "../image/uiux.jpg";
import apiImage from "../image/API.jpg";
import devopsImage from "../image/DEVOPS.png";
import databaseImage from "../image/database.webp";
import securityImage from "../image/Security.png";

// Custom hook for scroll animations
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
};

// Section Wrapper
const Section = ({ children, className = '', id = '' }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
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
    <section ref={sectionRef} className={`section-hidden ${className}`} id={id}>
      {children}
    </section>
  );
};

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDigitalMarketingDropdownOpen, setIsDigitalMarketingDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('about');
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

// Footer Component
const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

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
                <li><Link to="/about" onClick={() => handleNavigation('/about')}>About Us</Link></li>
                <li><Link to="/careers" onClick={() => handleNavigation('/careers')}>Careers</Link></li>
                <li><Link to="/press" onClick={() => handleNavigation('/press')}>Press</Link></li>
                <li><Link to="/partners" onClick={() => handleNavigation('/partners')}>Partners</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li><Link to="/digital-marketing" onClick={() => handleNavigation('/digital-marketing')}>Digital Marketing</Link></li>
                {digitalMarketingServices.map((service, index) => (
                  <li key={index}>
                    <Link to={service.path} onClick={() => handleNavigation(service.path)}>{service.name}</Link>
                  </li>
                ))}
                {developmentServices.map((service, index) => (
                  <li key={index}>
                    <Link to={service.path} onClick={() => handleNavigation(service.path)}>{service.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li><Link to="/blog" onClick={() => handleNavigation('/blog')}>Blog</Link></li>
                <li><Link to="/guides" onClick={() => handleNavigation('/guides')}>Guides</Link></li>
                <li><Link to="/whitepapers" onClick={() => handleNavigation('/whitepapers')}>Whitepapers</Link></li>
                <li><Link to="/faq" onClick={() => handleNavigation('/faq')}>FAQ</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy" onClick={() => handleNavigation('/privacy')}>Privacy Policy</Link></li>
                <li><Link to="/terms" onClick={() => handleNavigation('/terms')}>Terms of Service</Link></li>
                <li><Link to="/disclaimer" onClick={() => handleNavigation('/disclaimer')}>Disclaimer</Link></li>
                <li><Link to="/compliance" onClick={() => handleNavigation('/compliance')}>Compliance</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>&copy; 2026 - {currentYear} NEXONIC. All rights reserved. Founded in 2026.</p>
          </div>
          <div className="footer-bottom-right">
            <Link to="/privacy" onClick={() => handleNavigation('/privacy')}>Privacy</Link>
            <Link to="/terms" onClick={() => handleNavigation('/terms')}>Terms</Link>
            <Link to="/cookies" onClick={() => handleNavigation('/cookies')}>Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Journey Step Component
const JourneyStep = ({ step, index }) => {
  const { ref, controls } = useScrollAnimation(0.3);
  
  return (
    <motion.div
      ref={ref}
      className="journey-step"
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
      }}
    >
      <div className="step-year">{step.year}</div>
      <div className="step-content" style={{ backgroundImage: `linear-gradient(rgba(15,23,42,0.9), rgba(15,23,42,0.9)), url(${step.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <h3>{step.title}</h3>
        <p>{step.desc}</p>
      </div>
      <div className="step-line"></div>
    </motion.div>
  );
};

// Hero Section
const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
        setMousePosition({ x, y });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="hero-neon-grid" ref={heroRef}>
      <div className="grid-lines"></div>
      <div className="floating-cubes">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`cube cube-${i+1}`} />
        ))}
      </div>
      <div className="hero-content-center">
        <motion.div
          className="hero-title-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        >
          <h1 className="hero-main-title">
            Who We Are & How We Build <span className="neon-text">Digital Success</span>
          </h1>
          <p className="hero-subtitle">
            We're architects of digital experiences, blending creativity with technology to build solutions that matter.
          </p>
        </motion.div>
        <motion.div 
          className="scroll-indicator-new"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </div>
  );
};

// Vision Section
const VisionSection = () => {
  return (
    <div className="vision-center">
      <div className="vision-background">
        <div className="glowing-ring ring-1"></div>
        <div className="glowing-ring ring-2"></div>
        <div className="glowing-ring ring-3"></div>
      </div>
      <div className="vision-content">
        <motion.h2
          className="vision-title"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          We Don't Just Build Websites, <span className="gradient-text">We Build Futures</span>
        </motion.h2>
        <motion.div
          className="vision-divider"
          initial={{ width: 0 }}
          whileInView={{ width: '200px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        />
        <motion.p
          className="vision-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Every line of code we write, every strategy we craft, is driven by a singular purpose: 
          to empower businesses to thrive in the digital age. We believe technology should be human, 
          marketing should be authentic, and growth should be sustainable.
        </motion.p>
      </div>
    </div>
  );
};

// Journey Section
const JourneySection = () => {
  const journeySteps = [
    { year: '2020', title: 'The Beginning', desc: 'Started in a small garage with big dreams' },
    { year: '2022', title: 'First Milestone', desc: 'Reached 50 happy clients'},
    { year: '2024', title: 'Global Expansion', desc: 'Opened offices in 3 countries'},
    { year: '2026', title: 'Innovation Award', desc: 'Recognized as industry leaders'}
  ];

  return (
    <div className="journey-scroll">
      <div className="journey-track">
        {journeySteps.map((step, index) => (
          <JourneyStep key={index} step={step} index={index} />
        ))}
      </div>
    </div>
  );
};

// Marketing Philosophy Section - Clean Image Display (No animations, dots, or camera overlays)
const MarketingPhilosophySection = () => {
  const philosophies = [
    { icon: '🎯', text: 'Data-Driven Decisions' },
    { icon: '🤝', text: 'Authentic Connections' },
    { icon: '📈', text: 'Sustainable Growth' },
    { icon: '💡', text: 'Creative Innovation' },
    { icon: '⚡', text: 'Agile Adaptation' },
    { icon: '🌟', text: 'Brand Excellence' }
  ];

  return (
    <div className="marketing-philosophy-new">
      <div className="philosophy-bg-lines"></div>
      <div className="philosophy-split-container">
        <motion.div 
          className="philosophy-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="philosophy-single-image-clean">
            <img src={marketingImage} alt="Marketing Philosophy" className="philosophy-image-clean" />
          </div>
        </motion.div>

        <motion.div 
          className="philosophy-right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="philosophy-title">
            Our Marketing <span className="gradient-text">Philosophy</span>
          </h2>
          <p className="philosophy-subtitle">
            We believe in marketing that connects, converts, and creates lasting value
          </p>
          
          <div className="philosophy-items">
            {philosophies.map((item, index) => (
              <motion.div
                key={index}
                className="philosophy-item"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="philosophy-icon">{item.icon}</span>
                <span className="philosophy-text">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="philosophy-quote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="quote-mark">"</div>
            <p>Marketing is no longer about the stuff you make, but about the stories you tell.</p>
            <div className="quote-author">— Seth Godin</div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Digital Solutions Section
const DigitalSolutionsSection = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        setScrollProgress(progress);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const solutions = [
    { icon: '🚀', title: 'Digital Transformation', desc: 'End-to-end digital transformation strategies to modernize your business operations and drive innovation.', image: webDevImage },
    { icon: '🤖', title: 'AI-Powered Automation', desc: 'Intelligent automation solutions that streamline workflows and boost operational efficiency.', image: apiImage },
    { icon: '📱', title: 'Cross-Platform Development', desc: 'Build once, deploy everywhere with our expert cross-platform mobile and web solutions.', image: mobileAppImage },
    { icon: '☁️', title: 'Cloud Migration Services', desc: 'Seamless cloud migration and optimization for AWS, Azure, and Google Cloud platforms.', image: cloudImage },
    { icon: '🔒', title: 'Blockchain Solutions', desc: 'Secure, transparent blockchain applications for supply chain, finance, and digital identity.', image: securityImage },
    { icon: '📊', title: 'Business Intelligence', desc: 'Transform raw data into actionable insights with advanced BI dashboards and analytics.', image: databaseImage },
    { icon: '⚡', title: 'Edge Computing', desc: 'Low-latency solutions that process data closer to the source for real-time applications.', image: devopsImage },
    { icon: '🎨', title: 'Immersive Experiences', desc: 'AR/VR solutions that create engaging, interactive experiences for your audience.', image: uiuxImage },
    { icon: '🔧', title: 'DevSecOps', desc: 'Secure DevOps practices that integrate security at every stage of development.', image: devopsImage },
    { icon: '📈', title: 'Growth Marketing Tech', desc: 'Marketing technology stacks that automate and optimize your customer acquisition.', image: databaseImage }
  ];

  return (
    <div className="digital-solutions-horizontal">
      <div className="solutions-bg-particles"></div>
      <div className="solutions-container">
        <motion.h2
          className="solutions-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Digital <span className="gradient-text">Solutions</span>
        </motion.h2>
        <motion.p
          className="solutions-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Explore our innovative digital solutions
        </motion.p>

        <div className="horizontal-scroll-container">
          <div className="scroll-progress">
            <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
          </div>
          
          <div className="solutions-scroll" ref={scrollRef}>
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                className="solution-card-horizontal"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${solution.image})` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <div className="card-overlay"></div>
                <div className="card-content">
                  <span className="solution-icon">{solution.icon}</span>
                  <h3>{solution.title}</h3>
                  <p>{solution.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="solutions-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="solutions-stat">
            <span className="solutions-stat-number">150+</span>
            <span className="solutions-stat-label">Solutions Deployed</span>
          </div>
          <div className="solutions-stat">
            <span className="solutions-stat-number">98%</span>
            <span className="solutions-stat-label">Client Satisfaction</span>
          </div>
          <div className="solutions-stat">
            <span className="solutions-stat-number">24/7</span>
            <span className="solutions-stat-label">Expert Support</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Creative Section - Simplified with Only Image and Animations
const CreativeSection = () => {
  const words = ['Innovation', 'Creativity', 'Technology', 'Growth'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="creative-new">
      <div className="creative-left-side">
        <motion.div 
          className="creative-image-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="creative-abstract-art">
            <img src={creativeArt} alt="We Live By - Creative Art" className="creative-art-image" />
          </div>
        </motion.div>
      </div>
      
      <div className="creative-right-side">
        <motion.div
          className="creative-content-wrapper"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.span 
            className="creative-tagline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            We Live By
          </motion.span>
          
          <div className="creative-words-container">
            {words.map((word, index) => (
              <motion.span
                key={word}
                className={`creative-dynamic-word ${currentIndex === index ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={currentIndex === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {word}
              </motion.span>
            ))}
          </div>
          
          <motion.p 
            className="creative-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            These aren't just words — they're the principles that guide every project, 
            every decision, and every relationship we build.
          </motion.p>
          
          <motion.div
            className="creative-features"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="creative-feature">
              <span className="feature-dot"></span>
              <span>User-centered design</span>
            </div>
            <div className="creative-feature">
              <span className="feature-dot"></span>
              <span>Data-driven decisions</span>
            </div>
            <div className="creative-feature">
              <span className="feature-dot"></span>
              <span>Continuous innovation</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// How We Work Section
const HowWeWorkSection = () => {
  const workSteps = [
    {
      number: '01',
      title: 'Discovery & Research',
      description: 'We dive deep into your business goals, target audience, and market landscape to uncover opportunities and define clear objectives.',
      icon: '🔍',
      color: '#C6FF00'
    },
    {
      number: '02',
      title: 'Strategy & Planning',
      description: 'We craft a comprehensive roadmap with milestones, timelines, and deliverables to ensure every step is aligned with your vision.',
      icon: '📊',
      color: '#7CFF3A'
    },
    {
      number: '03',
      title: 'Design & Prototyping',
      description: 'Our creative team brings ideas to life through wireframes, mockups, and interactive prototypes that capture your brand essence.',
      icon: '🎨',
      color: '#B6FF1A'
    },
    {
      number: '04',
      title: 'Development & Integration',
      description: 'We build robust, scalable solutions using cutting-edge technologies, ensuring seamless integration with your existing systems.',
      icon: '⚙️',
      color: '#C6FF00'
    },
    {
      number: '05',
      title: 'Testing & Optimization',
      description: 'Rigorous testing across devices and platforms ensures flawless performance, followed by continuous optimization for maximum results.',
      icon: '🚀',
      color: '#7CFF3A'
    },
    {
      number: '06',
      title: 'Launch & Growth',
      description: 'We deploy your solution with precision and provide ongoing support to drive sustained growth and long-term success.',
      icon: '📈',
      color: '#B6FF1A'
    }
  ];

  return (
    <div className="how-we-work-section">
      <div className="how-we-work-bg">
        <div className="bg-grid-pattern"></div>
        <div className="bg-glow-orb"></div>
        <div className="bg-particles">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="bg-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`
            }} />
          ))}
        </div>
      </div>

      <div className="how-we-work-container">
        <motion.div
          className="how-we-work-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-badge">Our Process</span>
          <h2 className="how-we-work-title">
            How We <span className="gradient-text">Work</span>
          </h2>
          <div className="title-underline">
            <span className="underline-line"></span>
            <span className="underline-dot"></span>
            <span className="underline-line"></span>
          </div>
          <p className="how-we-work-subtitle">
            A proven methodology that transforms ideas into impactful digital solutions
          </p>
        </motion.div>

        <div className="work-steps-grid">
          {workSteps.map((step, index) => (
            <motion.div
              key={index}
              className="work-step-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="step-number-badge" style={{ borderColor: step.color }}>
                {step.number}
              </div>
              <div className="step-icon-wrapper" style={{ background: `${step.color}20`, borderColor: step.color }}>
                <span className="step-icon">{step.icon}</span>
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              <div className="step-glow-line" style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}></div>
              <div className="step-corner" style={{ borderColor: step.color }}></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="work-stats"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="work-stat">
            <span className="work-stat-number">98%</span>
            <span className="work-stat-label">Client Satisfaction</span>
          </div>
          <div className="work-stat">
            <span className="work-stat-number">2x</span>
            <span className="work-stat-label">Faster Delivery</span>
          </div>
          <div className="work-stat">
            <span className="work-stat-number">24/7</span>
            <span className="work-stat-label">Support Available</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Success Stories Section
const SuccessStoriesSection = () => {
  const stories = [
    {
      client: 'TechFlow',
      industry: 'SaaS',
      result: '300% traffic increase',
      description: 'Revolutionized their digital presence with SEO optimization and content marketing strategies.',
      icon: '📈'
    },
    {
      client: 'GrowthLabs',
      industry: 'Marketing',
      result: '150% conversion boost',
      description: 'Implemented data-driven marketing strategies that transformed their customer acquisition.',
      icon: '🎯'
    },
    {
      client: 'InnovateCorp',
      industry: 'Enterprise',
      result: '2x revenue growth',
      description: 'Custom software solution that streamlined operations and scaled their business.',
      icon: '🚀'
    },
    {
      client: 'EcoChain',
      industry: 'Sustainability',
      result: '500% engagement increase',
      description: 'Blockchain-based supply chain solution that enhanced transparency and trust.',
      icon: '🔗'
    },
    {
      client: 'FinTech Plus',
      industry: 'Financial Services',
      result: '$10M in new funding',
      description: 'AI-powered analytics platform that attracted major investor interest.',
      icon: '💰'
    },
    {
      client: 'HealthCore',
      industry: 'Healthcare',
      result: '99.9% uptime achieved',
      description: 'Cloud migration that ensured mission-critical system reliability.',
      icon: '🏥'
    }
  ];

  return (
    <div className="success-stories-section">
      <div className="stories-bg-gradient"></div>
      <div className="stories-container">
        <motion.h2
          className="stories-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Success <span className="gradient-text">Stories</span>
        </motion.h2>
        <motion.p
          className="stories-subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Real results for real businesses
        </motion.p>

        <div className="stories-showcase">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              className="story-card-new-no-image"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="story-icon-large">{story.icon}</div>
              <div className="story-header">
                <h3 className="story-client">{story.client}</h3>
                <span className="story-industry">{story.industry}</span>
              </div>
              <div className="story-result">
                <span className="result-badge">{story.result}</span>
              </div>
              <p className="story-description">{story.description}</p>
              <div className="story-glow"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="stories-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <span className="cta-text">Join our success stories →</span>
        </motion.div>
      </div>
    </div>
  );
};

// Culture Section
const CultureSection = () => {
  return (
    <div className="culture-square-section">
      <div className="culture-header">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Company <span className="gradient-text">Culture</span>
        </motion.h2>
      </div>

      <div className="culture-square-grid">
        <motion.div 
          className="culture-square-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
        >
          <div className="square-card-inner">
            <div className="square-icon-wrapper">
              <div className="square-icon-glow"></div>
              <span className="square-icon">🤝</span>
            </div>
            <h3>Collaboration</h3>
            <p>We believe the best ideas emerge when diverse minds come together. Our open-door policy means every voice matters.</p>
            <div className="square-card-shine"></div>
            <div className="square-card-corner"></div>
          </div>
        </motion.div>
        
        <motion.div 
          className="culture-square-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
        >
          <div className="square-card-inner">
            <div className="square-icon-wrapper">
              <div className="square-icon-glow"></div>
              <span className="square-icon">🎨</span>
            </div>
            <h3>Creative Environment</h3>
            <p>Ideas flourish where creativity is nurtured. From brainstorming sessions to innovation labs, we make space for imagination.</p>
            <div className="square-card-shine"></div>
            <div className="square-card-corner"></div>
          </div>
        </motion.div>
        
        <motion.div 
          className="culture-square-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          whileHover={{ y: -8 }}
        >
          <div className="square-card-inner">
            <div className="square-icon-wrapper">
              <div className="square-icon-glow"></div>
              <span className="square-icon">📚</span>
            </div>
            <h3>Continuous Learning</h3>
            <p>In tech, standing still means falling behind. We invest in workshops, courses, and conferences to keep our skills sharp.</p>
            <div className="square-card-shine"></div>
            <div className="square-card-corner"></div>
          </div>
        </motion.div>
      </div>
      
      <div className="culture-bg-glow-square"></div>
    </div>
  );
};

// CTA Section
const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="cta-floating">
      <div className="cta-content-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Let's Create Digital <span className="neon-text">Impact Together</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Your journey to extraordinary begins with a single click
        </motion.p>
        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button className="cta-btn-primary" onClick={() => navigate('/contact')}>Start Your Project</button>
          <button className="cta-btn-secondary" onClick={() => navigate('/contact')}>Contact Us</button>
        </motion.div>
      </div>
    </div>
  );
};

// Main About Component
const About = () => {
  return (
    <div className="about-container">
      <Navbar />
      
      <Section className="about-section" id="about">
        <HeroSection />
      </Section>

      <Section className="about-section">
        <VisionSection />
      </Section>

      <Section className="about-section">
        <JourneySection />
      </Section>

      <Section className="about-section">
        <MarketingPhilosophySection />
      </Section>

      <Section className="about-section">
        <DigitalSolutionsSection />
      </Section>

      <Section className="about-section">
        <CreativeSection />
      </Section>

      <Section className="about-section">
        <HowWeWorkSection />
      </Section>

      <Section className="about-section">
        <SuccessStoriesSection />
      </Section>

      <Section className="about-section">
        <CultureSection />
      </Section>

      <Section className="about-section">
        <CTASection />
      </Section>

      <Footer />
    </div>
  );
};

export default About;