// Services.js
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Services.css';
import logo from "../image/logo.jpg";

// Import images for cards
import marketingImg from "../image/DigitalMarketing.jpg";
import webDevImg from "../image/Mobile & WebDevelopment.jpg";
import uiuxImg from "../image/uiux.jpg";
import cloudImg from "../image/Cloudsolutions.png";
import mobileAppImg from "../image/App.jpg";
import apiImg from "../image/API.jpg";
import devopsImg from "../image/DEVOPS.png";
import databaseImg from "../image/database.webp";
import securityImg from "../image/Security.png";

// Import images for Intro Section
import introImage from "../image/DigitalSuccess.jpg";

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

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDigitalMarketingDropdownOpen, setIsDigitalMarketingDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('services');
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

// Section 1: Hero Section - Full Screen
const HeroSection = () => {
  return (
    <div className="services-hero">
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="hero-particles">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                background: i % 3 === 0 ? '#C6FF00' : i % 3 === 1 ? '#7CFF3A' : '#B6FF1A'
              }}
            />
          ))}
        </div>
        <div className="floating-cubes">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`cube cube-${i+1}`} />
          ))}
        </div>
      </div>
      
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="hero-badge"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            DIGITAL INNOVATION AGENCY
          </motion.span>
        </motion.div>
        
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Transforming Businesses Through <span className="gradient-text">Digital Innovation</span>
        </motion.h1>
        
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Helping brands grow with powerful web development and advanced digital marketing strategies.
        </motion.p>
        
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button 
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('core-services').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Our Services
          </motion.button>
          <motion.button 
            className="btn-outline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('partner').scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Partner With Us
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        onClick={() => {
          document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span>Discover Our Services</span>
        <div className="scroll-line"></div>
      </motion.div>
    </div>
  );
};

// Section 2: Services Introduction - Split Layout with Single Image
const IntroSection = () => {
  return (
    <div className="intro-section" id="intro">
      <div className="intro-split">
        <motion.div 
          className="intro-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="intro-badge">COMPLETE DIGITAL SOLUTIONS</span>
          <h2 className="intro-title">
            We Build, Market & Scale <span className="gradient-text">Digital Success</span>
          </h2>
          <p className="intro-text">
            Our agency provides end-to-end digital solutions that combine cutting-edge web development 
            with data-driven marketing strategies. From custom software development to SEO growth and 
            cloud infrastructure, we deliver comprehensive solutions that drive real business results.
          </p>
          <div className="intro-stats">
            <div className="stat">
              <span className="stat-number">150+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
            <div className="stat">
              <span className="stat-number">8+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="intro-right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* <div className="intro-image-gallery"> */}
            <div className="image-static">
              <img 
                src={introImage} 
                alt="Digital Success" 
                className="intro-main-image"
              />
            </div>
            <div className="image-overlay-text">
              {/* <span>Innovation</span>
              <span>Excellence</span>
              <span>Growth</span> */}
            </div>
          {/* </div> */}
        </motion.div>
      </div>
    </div>
  );
};

// Section 3: Core Services - Zig-Zag Layout with Local Images
const CoreServicesSection = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      id: 1,
      title: 'Digital Marketing',
      description: 'Grow your business through data-driven marketing strategies including social media campaigns, video editing, logo design, Instagram posts, SEO optimization, and Google Ads. We help you reach the right audience at the right time.',
      image: marketingImg,
      path: '/digital-marketing',
      color: '#6C5CE7'
    },
    {
      id: 2,
      title: 'Mobile & Web Development',
      description: 'Build fast, scalable, and secure websites and mobile apps using modern technologies like React, Node.js, React Native, and cloud infrastructure. Our solutions are designed for performance, security, and exceptional user experiences.',
      image: webDevImg,
      path: '/mobile-web-development',
      color: '#FF6B6B'
    },
    {
      id: 3,
      title: 'UI/UX Design',
      description: 'Create visually stunning and user-friendly designs that improve engagement and user satisfaction. Our design process focuses on user research, wireframing, prototyping, and visual design for both web and mobile platforms.',
      image: uiuxImg,
      path: '/ui-ux-design',
      color: '#FFD93D'
    },
    {
      id: 4,
      title: 'Cloud Solutions',
      description: 'Deploy scalable cloud infrastructure to improve performance, security, and reliability of applications. From AWS to Azure, we help you leverage the cloud for business agility and cost savings.',
      image: cloudImg,
      path: '/cloud-solutions',
      color: '#9B59B6'
    }
  ];

  return (
    <div className="core-services" id="core-services">
      <div className="section-header">
        <span className="section-badge">WHAT WE DO</span>
        <h2 className="section-title">Our Core <span className="gradient-text">Services</span></h2>
        <p className="section-subtitle">Comprehensive digital solutions tailored to your business needs</p>
      </div>

      <div className="zigzag-container">
        {services.map((service, index) => (
          <motion.div 
            key={service.id} 
            className={`zigzag-item ${index % 2 === 0 ? 'zigzag-left' : 'zigzag-right'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="zigzag-image">
              <img src={service.image} alt={service.title} />
              <div className="image-overlay" style={{ background: `linear-gradient(135deg, ${service.color}20, transparent)` }}></div>
            </div>
            <div className="zigzag-content">
              <span className="service-category" style={{ color: service.color }}>{service.title}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <motion.button 
                className="read-more-btn"
                style={{ borderColor: service.color, color: service.color }}
                whileHover={{ backgroundColor: service.color, color: '#0B0F14', x: 5 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  navigate(service.path);
                  window.scrollTo(0, 0);
                }}
              >
                Read More
                <span className="btn-arrow">→</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 4: Digital Marketing Strategies - Vertical Timeline with Perfect Button
const MarketingStrategiesSection = () => {
  const navigate = useNavigate();
  
  const strategies = [
    {
      step: '01',
      title: 'Market Research',
      description: 'We dive deep into your industry, competitors, and target audience to identify opportunities and challenges.',
      icon: '🔍'
    },
    {
      step: '02',
      title: 'Competitor Analysis',
      description: 'Analyzing competitor strategies to find gaps and opportunities for your brand to stand out.',
      icon: '📊'
    },
    {
      step: '03',
      title: 'Campaign Strategy',
      description: 'Developing data-driven campaign strategies tailored to your business goals and audience.',
      icon: '🎯'
    },
    {
      step: '04',
      title: 'Performance Tracking',
      description: 'Real-time monitoring and analysis of campaign performance to optimize for better results.',
      icon: '📈'
    },
    {
      step: '05',
      title: 'Growth Optimization',
      description: 'Continuous optimization and scaling of successful campaigns to maximize ROI.',
      icon: '🚀'
    }
  ];

  return (
    <div className="strategies-section">
      <div className="section-header">
        <span className="section-badge">MARKETING PROCESS</span>
        <h2 className="section-title">Digital Marketing <span className="gradient-text">Strategies</span></h2>
        <p className="section-subtitle">Our proven process to increase brand visibility, traffic, and conversions</p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>
        {strategies.map((strategy, index) => (
          <motion.div 
            key={index} 
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="timeline-marker">
              <span className="marker-step">{strategy.step}</span>
            </div>
            <div className="timeline-content">
              <div className="strategy-icon">{strategy.icon}</div>
              <h3>{strategy.title}</h3>
              <p>{strategy.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="strategies-cta"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.button 
          className="btn-digital-marketing"
          whileHover={{ scale: 1.05, backgroundColor: '#C6FF00', color: '#000000' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            navigate('/digital-marketing');
            window.scrollTo(0, 0);
          }}
        >
          Learn More About Digital Marketing
          <span className="btn-arrow">→</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

// Section 5: Technologies & Tools - Horizontal Scroll (Commented out)
const TechnologiesSection = () => {
  const technologies = [
    { name: 'React', icon: '⚛️', level: 'Expert', color: '#61DAFB' },
    { name: 'Node.js', icon: '🟢', level: 'Expert', color: '#68A063' },
    { name: 'JavaScript', icon: '📜', level: 'Expert', color: '#F7DF1E' },
    { name: 'TypeScript', icon: '📘', level: 'Advanced', color: '#3178C6' },
    { name: 'Python', icon: '🐍', level: 'Advanced', color: '#3776AB' },
    { name: 'React Native', icon: '📱', level: 'Expert', color: '#61DAFB' },
    { name: 'Next.js', icon: '▲', level: 'Advanced', color: '#000000' },
    { name: 'Cloud Platforms', icon: '☁️', level: 'Advanced', color: '#FF9900' },
    { name: 'SEO Tools', icon: '🔍', level: 'Expert', color: '#C6FF00' },
    { name: 'Google Ads', icon: '📊', level: 'Expert', color: '#4285F4' },
    { name: 'Analytics', icon: '📈', level: 'Advanced', color: '#E37400' },
    { name: 'MongoDB', icon: '🍃', level: 'Intermediate', color: '#47A248' },
    { name: 'PostgreSQL', icon: '🐘', level: 'Advanced', color: '#336791' },
    { name: 'Docker', icon: '🐳', level: 'Advanced', color: '#2496ED' },
    { name: 'AWS', icon: '☁️', level: 'Advanced', color: '#FF9900' },
    { name: 'Figma', icon: '🎨', level: 'Expert', color: '#F24E1E' },
    { name: 'Adobe XD', icon: '🎨', level: 'Advanced', color: '#FF61F6' },
    { name: 'Shopify', icon: '🛍️', level: 'Expert', color: '#7AB55C' },
    { name: 'WordPress', icon: '📝', level: 'Expert', color: '#21759B' },
    { name: 'GraphQL', icon: '📊', level: 'Advanced', color: '#E10098' }
  ];

  return (
    <div className="technologies-section">
      <div className="section-header">
        <span className="section-badge">OUR TECH STACK</span>
        <h2 className="section-title">Technologies & <span className="gradient-text">Tools</span></h2>
        <p className="section-subtitle">Modern tools and platforms we use to build exceptional digital solutions</p>
      </div>

      <div className="tech-scroll-container">
        <div className="tech-track">
          {technologies.map((tech, index) => (
            <motion.div 
              key={index} 
              className="tech-item"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="tech-icon" style={{ background: `${tech.color}20` }}>
                <span style={{ color: tech.color }}>{tech.icon}</span>
              </div>
              <h4>{tech.name}</h4>
              <span className="tech-level" style={{ background: `${tech.color}20`, color: tech.color }}>{tech.level}</span>
            </motion.div>
          ))}
          {technologies.map((tech, index) => (
            <motion.div 
              key={`duplicate-${index}`} 
              className="tech-item"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="tech-icon" style={{ background: `${tech.color}20` }}>
                <span style={{ color: tech.color }}>{tech.icon}</span>
              </div>
              <h4>{tech.name}</h4>
              <span className="tech-level" style={{ background: `${tech.color}20`, color: tech.color }}>{tech.level}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 6: Project Development Process - Step Layout
const ProcessSection = () => {
  const steps = [
    { number: '01', title: 'Research', description: 'Understanding your business goals, target audience, and market opportunities.', icon: '🔍' },
    { number: '02', title: 'Planning', description: 'Creating a comprehensive roadmap with clear milestones and deliverables.', icon: '📋' },
    { number: '03', title: 'Design', description: 'Crafting intuitive and visually stunning user interfaces and experiences.', icon: '🎨' },
    { number: '04', title: 'Development', description: 'Building robust, scalable solutions using cutting-edge technologies.', icon: '⚙️' },
    { number: '05', title: 'Testing', description: 'Rigorous quality assurance to ensure flawless performance and user experience.', icon: '✅' },
    { number: '06', title: 'Launch', description: 'Smooth deployment and ongoing support to ensure long-term success.', icon: '🚀' }
  ];

  return (
    <div className="process-section">
      <div className="section-header">
        <span className="section-badge">OUR PROCESS</span>
        <h2 className="section-title">Project Development <span className="gradient-text">Process</span></h2>
        <p className="section-subtitle">A structured workflow that ensures successful digital products and marketing campaigns</p>
      </div>

      <div className="process-steps">
        <div className="process-connecting-line"></div>
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="process-step"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="step-number">{step.number}</div>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 7: Client Success Stories - Storytelling Layout
const SuccessStoriesSection = () => {
  const navigate = useNavigate();
  
  const stories = [
    {
      title: 'Digital Marketing ROI',
      result: '450% Increase',
      description: 'A leading brand saw 450% increase in engagement through our comprehensive digital marketing strategy including video content, social media management, and targeted Google Ads.',
      icon: '📈',
      path: '/digital-marketing'
    },
    {
      title: 'E-Commerce Revenue Growth',
      result: '350% Increase',
      description: 'A leading fashion retailer saw 350% increase in online sales after our complete digital transformation including web development, SEO optimization, and targeted marketing campaigns.',
      icon: '🛍️',
      path: '/mobile-web-development'
    },
    {
      title: 'SaaS User Acquisition',
      result: '200K+ Users',
      description: 'A B2B SaaS platform acquired over 200,000 users in 12 months through our growth marketing strategies and performance optimization.',
      icon: '📱',
      path: '/digital-marketing'
    },
    {
      title: 'Local Business Visibility',
      result: '#1 Rankings',
      description: 'A local service business achieved #1 rankings for 50+ keywords, resulting in 400% increase in organic traffic and 200% more qualified leads.',
      icon: '📍',
      path: '/seo-optimization'
    }
  ];

  return (
    <div className="stories-section">
      <div className="section-header">
        <span className="section-badge">CLIENT SUCCESS</span>
        <h2 className="section-title">Success <span className="gradient-text">Stories</span></h2>
        <p className="section-subtitle">Real results from real businesses we've helped transform</p>
      </div>

      <div className="stories-grid">
        {stories.map((story, index) => (
          <motion.div 
            key={index} 
            className="story-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            onClick={() => {
              navigate(story.path);
              window.scrollTo(0, 0);
            }}
            style={{ cursor: 'pointer' }}
          >
            <div className="story-icon">{story.icon}</div>
            <span className="story-result">{story.result}</span>
            <h3>{story.title}</h3>
            <p>{story.description}</p>
            <span className="story-link">Learn More →</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 8: Industries We Serve - Horizontal Scroll
const IndustriesSection = () => {
  const industries = [
    { name: 'E-commerce', icon: '🛍️', description: 'Online retail & marketplaces' },
    { name: 'Healthcare', icon: '🏥', description: 'Medical & wellness platforms' },
    { name: 'Education', icon: '🎓', description: 'E-learning & EdTech' },
    { name: 'Startups', icon: '🚀', description: 'Early-stage & scaling' },
    { name: 'Corporate', icon: '🏢', description: 'Enterprise solutions' },
    { name: 'Technology', icon: '💻', description: 'SaaS & software' },
    { name: 'Finance', icon: '💰', description: 'FinTech & banking' },
    { name: 'Real Estate', icon: '🏠', description: 'Property & construction' },
    { name: 'Marketing', icon: '📊', description: 'Digital agencies & brands' },
    { name: 'Media', icon: '🎬', description: 'Content & production' },
    { name: 'Travel', icon: '✈️', description: 'Travel & hospitality' },
    { name: 'Food & Beverage', icon: '🍔', description: 'Restaurants & food delivery' }
  ];

  return (
    <div className="industries-section">
      <div className="section-header">
        <span className="section-badge">INDUSTRIES</span>
        <h2 className="section-title">Industries We <span className="gradient-text">Serve</span></h2>
        <p className="section-subtitle">Tailored digital solutions for diverse business sectors</p>
      </div>

      <div className="industries-scroll">
        <div className="industries-track">
          {industries.map((industry, index) => (
            <motion.div 
              key={index} 
              className="industry-item"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="industry-icon">{industry.icon}</span>
              <div className="industry-info">
                <h4>{industry.name}</h4>
                <p>{industry.description}</p>
              </div>
            </motion.div>
          ))}
          {industries.map((industry, index) => (
            <motion.div 
              key={`duplicate-${index}`} 
              className="industry-item"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="industry-icon">{industry.icon}</span>
              <div className="industry-info">
                <h4>{industry.name}</h4>
                <p>{industry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 9: Let's Partner Section
const PartnerSection = () => {
  const navigate = useNavigate();

  const benefits = [
    { icon: '🚀', title: 'Strategic Growth', description: 'Partner with us to accelerate your digital transformation journey.' },
    { icon: '💡', title: 'Innovation First', description: 'Access cutting-edge technologies and forward-thinking strategies.' },
    { icon: '🤝', title: 'Long-term Partnership', description: 'We build lasting relationships focused on your success.' },
    { icon: '📈', title: 'Measurable Results', description: 'Data-driven approaches that deliver real business impact.' },
    { icon: '⚡', title: 'Agile Execution', description: 'Fast, flexible development and marketing implementation.' },
    { icon: '🌟', title: 'Expert Team', description: 'Work with industry veterans and creative problem solvers.' }
  ];

  return (
    <div className="partner-section" id="partner">
      <div className="partner-background">
        <div className="partner-glow-1"></div>
        <div className="partner-glow-2"></div>
        <div className="partner-glow-3"></div>
      </div>

      <div className="partner-container">
        <motion.div 
          className="partner-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="partner-badge">BECOME A PARTNER</span>
          <h2 className="partner-title">
            Let's Build Something <span className="gradient-text">Extraordinary Together</span>
          </h2>
          <p className="partner-description">
            Join forces with Nexonic to transform your digital presence. Whether you're a startup looking to make your mark or an established enterprise seeking innovation, we're here to help you succeed.
          </p>
        </motion.div>

        <div className="partner-benefits">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className="partner-benefit-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="partner-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="cta-box">
            <h3>Ready to start your journey?</h3>
            <p>Let's discuss how we can work together to achieve your goals.</p>
            <motion.button 
              className="partner-cta-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate('/contact')}
            >
              Schedule a Consultation
              <span className="btn-arrow">→</span>
            </motion.button>
          </div>
        </motion.div>

        <div className="partner-testimonial">
          <motion.div 
            className="testimonial-quote"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="quote-mark">"</div>
            <p>Partnering with Nexonic has been transformative for our business. Their expertise and dedication helped us achieve results we never thought possible.</p>
            <div className="quote-author">
              <span className="author-name">Michael Chen</span>
              <span className="author-title">CEO, TechFlow</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Main Services Component
const Services = () => {
  return (
    <div className="services-container">
      <Navbar />
      
      <Section className="services-section hero-section">
        <HeroSection />
      </Section>

      <Section className="services-section intro-wrapper">
        <IntroSection />
      </Section>

      <Section className="services-section core-wrapper">
        <CoreServicesSection />
      </Section>

      <Section className="services-section strategies-wrapper">
        <MarketingStrategiesSection />
      </Section>

      {/* Technologies Section - Commented out as requested */}
      {/* <Section className="services-section technologies-wrapper">
        <TechnologiesSection />
      </Section> */}

      <Section className="services-section process-wrapper">
        <ProcessSection />
      </Section>

      <Section className="services-section stories-wrapper">
        <SuccessStoriesSection />
      </Section>

      <Section className="services-section industries-wrapper">
        <IndustriesSection />
      </Section>

      <Section className="services-section partner-wrapper">
        <PartnerSection />
      </Section>

      <Footer />
    </div>
  );
};

export default Services;