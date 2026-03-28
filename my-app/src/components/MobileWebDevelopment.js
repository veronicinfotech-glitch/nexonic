// MobileWebDevelopment.js
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './MobileWebDevelopment.css';
import logo from "../image/logo.jpg";

// Import local images for Intro Section
import introMainImage from "../image/W.jpg";
import codeScreenImage from "../image/Back.jpg";
import dashboardImage from "../image/1.png";

// Import images for Web Services
import frontendImage from "../image/F.jpg";
import backendImage from "../image/Back.jpg";
import fullstackImage from "../image/full.jpg";
import apiImage from "../image/Api1.jpg";

// Import images for Mobile Services
import iosImage from "../image/1.png";
import androidImage from "../image/1.png";
import crossPlatformImage from "../image/1.png";

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
          <button className="btn-nav" onClick={() => handleNavigation('/get-started')}>Get Started</button>
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

// Section 1: HERO SECTION - No Scroll Indicator
const HeroSection = () => {
  const navigate = useNavigate();

  const handleStartProject = () => {
    navigate('/contact', { state: { projectType: 'web-mobile-development' } });
    window.scrollTo(0, 0);
  };

  const handleViewProcess = () => {
    document.getElementById('dev-process').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="dev-hero">
      <div className="dev-hero-background">
        <div className="dev-hero-grid"></div>
        <div className="dev-hero-particles">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="dev-hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                background: i % 3 === 0 ? "#C6FF00" : i % 3 === 1 ? "#7CFF3A" : "#B6FF1A",
              }}
            />
          ))}
        </div>
      </div>

      <div className="dev-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="dev-hero-badge">WEB & MOBILE DEVELOPMENT</span>
        </motion.div>

        <motion.h1
          className="dev-hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Building Powerful <span className="gradient-text">Web & Mobile Experiences</span>
        </motion.h1>

        <motion.p
          className="dev-hero-description"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We develop modern digital platforms using advanced technologies and scalable architecture. 
          From concept to deployment, we create applications that users love.
        </motion.p>

        <motion.div
          className="dev-hero-buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button 
            className="dev-btn-primary"
            onClick={handleStartProject}
          >
            Start Development Project
            <span className="btn-arrow">→</span>
          </button>
          <button 
            className="dev-btn-outline"
            onClick={handleViewProcess}
          >
            View Development Process
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator removed */}
    </div>
  );
};

// Section 2: DEVELOPMENT INTRODUCTION - Single Image
const IntroSection = () => {
  return (
    <div className="dev-intro" id="dev-intro">
      <div className="dev-intro-split">
        <motion.div 
          className="dev-intro-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="dev-intro-badge">OUR APPROACH</span>
          <h2 className="dev-intro-title">
            We Build <span className="gradient-text">Scalable Digital Platforms</span>
          </h2>
          <p className="dev-intro-text">
            We specialize in creating high-performance web applications, mobile apps, and digital platforms 
            that solve complex business challenges. Our development philosophy combines technical excellence 
            with user-centered design to deliver products that not only function flawlessly but also provide 
            exceptional user experiences.
          </p>
          <div className="dev-intro-stats">
            <div className="dev-stat">
              <span className="dev-stat-number">100+</span>
              <span className="dev-stat-label">Projects Delivered</span>
            </div>
            <div className="dev-stat">
              <span className="dev-stat-number">50+</span>
              <span className="dev-stat-label">Active Clients</span>
            </div>
            <div className="dev-stat">
              <span className="dev-stat-number">5+</span>
              <span className="dev-stat-label">Years Experience</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="dev-intro-right"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="dev-intro-single-image">
            <img 
              src={introMainImage} 
              alt="Developer working on code"
              className="dev-intro-main-single-image"
            />
            <div className="dev-image-overlay-gradient"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Section 3: WEB DEVELOPMENT SERVICES - Zig-Zag Layout
const WebServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Frontend Development',
      description: 'Build interactive and responsive interfaces using React, Vue.js, and modern JavaScript frameworks. We create engaging user experiences that load fast and work seamlessly across all devices.',
      image: frontendImage,
      color: '#C6FF00'
    },
    {
      id: 2,
      title: 'Backend Development',
      description: 'Create secure and scalable backend systems using Node.js, Python, and cloud infrastructure. We design robust APIs, database architectures, and server-side logic that power your applications.',
      image: backendImage,
      color: '#7CFF3A'
    },
    {
      id: 3,
      title: 'Full Stack Development',
      description: 'End-to-end development combining frontend and backend expertise. We build complete web applications with seamless integration, optimal performance, and maintainable codebases.',
      image: fullstackImage,
      color: '#B6FF1A'
    },
    {
      id: 4,
      title: 'API Development',
      description: 'Design and implement RESTful and GraphQL APIs that power your applications. We create well-documented, secure, and high-performance APIs that enable seamless integration.',
      image: apiImage,
      color: '#C6FF00'
    }
  ];

  return (
    <div className="dev-web-services">
      <div className="dev-services-header">
        <span className="dev-services-badge">WHAT WE BUILD</span>
        <h2 className="dev-services-title">Web Development <span className="gradient-text">Services</span></h2>
        <p className="dev-services-subtitle">Comprehensive web solutions tailored to your business needs</p>
      </div>

      <div className="dev-zigzag-container">
        {services.map((service, index) => (
          <motion.div 
            key={service.id} 
            className={`dev-zigzag-item ${index % 2 === 0 ? 'dev-zigzag-left' : 'dev-zigzag-right'}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="dev-zigzag-image">
              <img src={service.image} alt={service.title} />
              <div className="dev-image-overlay" style={{ background: `linear-gradient(135deg, ${service.color}20, transparent)` }}></div>
            </div>
            <div className="dev-zigzag-content">
              <span className="dev-service-category" style={{ color: service.color }}>{service.title}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 4: MOBILE APP DEVELOPMENT - Storytelling Section
const MobileServicesSection = () => {
  return (
    <div className="dev-mobile-story">
      <div className="dev-mobile-container">
        <motion.div 
          className="dev-mobile-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="dev-mobile-badge">MOBILE EXCELLENCE</span>
          <h2 className="dev-mobile-title">Mobile App <span className="gradient-text">Development</span></h2>
        </motion.div>

        <div className="dev-mobile-showcase">
          <motion.div 
            className="dev-mobile-visual"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="dev-mockup-stack">
              <div className="dev-mockup dev-mockup-1">
                <img src={iosImage} alt="iOS App" />
              </div>
              <div className="dev-mockup dev-mockup-2">
                <img src={androidImage} alt="Android App" />
              </div>
              <div className="dev-mockup dev-mockup-3">
                <img src={crossPlatformImage} alt="Cross Platform" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="dev-mobile-content"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="dev-mobile-story-text">
              We develop exceptional Android and iOS applications that deliver smooth, intuitive user experiences. 
              Our mobile solutions are built with performance in mind, ensuring your app runs flawlessly on 
              millions of devices.
            </p>

            <div className="dev-mobile-features">
              <div className="dev-mobile-feature">
                <div className="dev-feature-icon">📱</div>
                <div className="dev-feature-text">
                  <h4>Native Android Development</h4>
                  <p>Kotlin, Jetpack Compose, Material Design</p>
                </div>
              </div>
              <div className="dev-mobile-feature">
                <div className="dev-feature-icon">🍎</div>
                <div className="dev-feature-text">
                  <h4>Native iOS Development</h4>
                  <p>Swift, SwiftUI, UIKit, Core Data</p>
                </div>
              </div>
              <div className="dev-mobile-feature">
                <div className="dev-feature-icon">🔄</div>
                <div className="dev-feature-text">
                  <h4>Cross-Platform Solutions</h4>
                  <p>React Native, Flutter, code sharing</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Section 5: TECHNOLOGIES WE USE - Horizontal Scrolling Layout
const TechnologiesSection = () => {
  const technologies = [
    { name: 'React', icon: '⚛️', color: '#61DAFB', level: 'Expert' },
    { name: 'JavaScript', icon: '📜', color: '#F7DF1E', level: 'Expert' },
    { name: 'Node.js', icon: '🟢', color: '#68A063', level: 'Expert' },
    { name: 'TypeScript', icon: '📘', color: '#3178C6', level: 'Advanced' },
    { name: 'Next.js', icon: '▲', color: '#000000', level: 'Advanced' },
    { name: 'Python', icon: '🐍', color: '#3776AB', level: 'Advanced' },
    { name: 'GraphQL', icon: '◼️', color: '#E10098', level: 'Advanced' },
    { name: 'Docker', icon: '🐳', color: '#2496ED', level: 'Advanced' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248', level: 'Advanced' },
    { name: 'PostgreSQL', icon: '🐘', color: '#336791', level: 'Advanced' },
    { name: 'React Native', icon: '📱', color: '#61DAFB', level: 'Expert' },
    { name: 'Flutter', icon: '🦋', color: '#02569B', level: 'Intermediate' },
    { name: 'AWS', icon: '☁️', color: '#FF9900', level: 'Advanced' },
    { name: 'Figma', icon: '🎨', color: '#F24E1E', level: 'Expert' },
  ];

  return (
    <div className="dev-technologies">
      <div className="dev-tech-header">
        <span className="dev-tech-badge">OUR STACK</span>
        <h2 className="dev-tech-title">Technologies <span className="gradient-text">We Use</span></h2>
        <p className="dev-tech-subtitle">Modern tools that enable high-performance applications</p>
      </div>

      <div className="dev-horizontal-scroll">
        <div className="dev-tech-track">
          {technologies.map((tech, index) => (
            <div key={index} className="dev-tech-item">
              <div className="dev-tech-icon" style={{ background: `${tech.color}20` }}>
                <span style={{ color: tech.color }}>{tech.icon}</span>
              </div>
              <h4>{tech.name}</h4>
              <span className="dev-tech-level" style={{ background: `${tech.color}20`, color: tech.color }}>{tech.level}</span>
            </div>
          ))}
          {technologies.map((tech, index) => (
            <div key={`dup-${index}`} className="dev-tech-item">
              <div className="dev-tech-icon" style={{ background: `${tech.color}20` }}>
                <span style={{ color: tech.color }}>{tech.icon}</span>
              </div>
              <h4>{tech.name}</h4>
              <span className="dev-tech-level" style={{ background: `${tech.color}20`, color: tech.color }}>{tech.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 6: DEVELOPMENT PROCESS - Vertical Timeline Layout
const ProcessSection = () => {
  const steps = [
    {
      step: '01',
      title: 'Research',
      description: 'We dive deep into your business goals, user needs, and market opportunities to define project requirements.',
      icon: '🔍',
      color: '#C6FF00'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Creating a comprehensive roadmap with clear milestones, technical specifications, and resource allocation.',
      icon: '📋',
      color: '#7CFF3A'
    },
    {
      step: '03',
      title: 'UI/UX Design',
      description: 'Crafting intuitive user interfaces and experiences through wireframing, prototyping, and user testing.',
      icon: '🎨',
      color: '#B6FF1A'
    },
    {
      step: '04',
      title: 'Development',
      description: 'Agile development with continuous integration, code reviews, and regular progress updates.',
      icon: '⚙️',
      color: '#C6FF00'
    },
    {
      step: '05',
      title: 'Testing',
      description: 'Rigorous quality assurance including unit tests, integration tests, and performance optimization.',
      icon: '✅',
      color: '#7CFF3A'
    },
    {
      step: '06',
      title: 'Deployment',
      description: 'Smooth deployment with CI/CD pipelines, monitoring setup, and post-launch support.',
      icon: '🚀',
      color: '#B6FF1A'
    }
  ];

  return (
    <div className="dev-process" id="dev-process">
      <div className="dev-process-container">
        <motion.div 
          className="dev-process-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="dev-process-badge">HOW WE WORK</span>
          <h2 className="dev-process-title">Development <span className="gradient-text">Process</span></h2>
          <p className="dev-process-subtitle">A structured workflow that ensures successful software delivery</p>
        </motion.div>

        <div className="dev-timeline">
          <div className="dev-timeline-line"></div>
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="dev-timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="dev-timeline-marker" style={{ borderColor: step.color }}>
                <span className="dev-marker-step">{step.step}</span>
              </div>
              <div className="dev-timeline-content" style={{ borderColor: `${step.color}30` }}>
                <div className="dev-timeline-icon" style={{ background: `${step.color}15`, color: step.color }}>
                  {step.icon}
                </div>
                <h3 style={{ color: step.color }}>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 7: PERFORMANCE & SCALABILITY - Large Visual + Text Split Section
const PerformanceSection = () => {
  return (
    <div className="dev-performance">
      <div className="dev-performance-split">
        <motion.div 
          className="dev-performance-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="dev-performance-graph">
            <div className="dev-graph-bar bar-1"></div>
            <div className="dev-graph-bar bar-2"></div>
            <div className="dev-graph-bar bar-3"></div>
            <div className="dev-graph-bar bar-4"></div>
            <div className="dev-graph-bar bar-5"></div>
            <div className="dev-graph-line"></div>
          </div>
          <div className="dev-performance-metrics">
            <div className="dev-metric">
              <span className="dev-metric-value">99.9%</span>
              <span className="dev-metric-label">Uptime</span>
            </div>
            <div className="dev-metric">
              <span className="dev-metric-value">1.2s</span>
              <span className="dev-metric-label">Load Time</span>
            </div>
            <div className="dev-metric">
              <span className="dev-metric-value">10M+</span>
              <span className="dev-metric-label">Requests/Day</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="dev-performance-content"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <span className="dev-performance-badge">OPTIMIZED FOR SPEED</span>
          <h2 className="dev-performance-title">
            Performance & <span className="gradient-text">Scalability</span>
          </h2>
          
          <div className="dev-performance-features">
            <div className="dev-performance-feature">
              <span className="dev-feature-bullet">⚡</span>
              <div>
                <h4>Fast Loading Speed</h4>
                <p>Optimized code, lazy loading, and CDN integration for instant page loads</p>
              </div>
            </div>
            <div className="dev-performance-feature">
              <span className="dev-feature-bullet">📈</span>
              <div>
                <h4>Scalable Infrastructure</h4>
                <p>Auto-scaling cloud architecture that grows with your user base</p>
              </div>
            </div>
            <div className="dev-performance-feature">
              <span className="dev-feature-bullet">🔒</span>
              <div>
                <h4>Enterprise Security</h4>
                <p>Advanced encryption, authentication, and security best practices</p>
              </div>
            </div>
            <div className="dev-performance-feature">
              <span className="dev-feature-bullet">📱</span>
              <div>
                <h4>Cross-Device Compatibility</h4>
                <p>Flawless experience across all devices and screen sizes</p>
              </div>
            </div>
          </div>

          <p className="dev-performance-note">
            Performance optimization is critical in modern web and mobile apps. 
            We ensure your applications are fast, reliable, and ready to scale.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Main MobileWebDevelopment Component
const MobileWebDevelopment = () => {
  return (
    <div className="dev-container">
      <Navbar />
      
      <Section className="dev-section dev-hero-section">
        <HeroSection />
      </Section>

      <Section className="dev-section dev-intro-section">
        <IntroSection />
      </Section>

      <Section className="dev-section dev-web-section">
        <WebServicesSection />
      </Section>

      {/* <Section className="dev-section dev-mobile-section">
        <MobileServicesSection />
      </Section> */}

      <Section className="dev-section dev-tech-section">
        <TechnologiesSection />
      </Section>

      <Section className="dev-section dev-process-section">
        <ProcessSection />
      </Section>

      <Section className="dev-section dev-performance-section">
        <PerformanceSection />
      </Section>

      <Footer />
    </div>
  );
};

export default MobileWebDevelopment;