// CloudSolutions.js - Updated with Consistent Navbar and Footer - No Scroll Indicator
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './CloudSolutions.css';
import logo from "../image/logo.jpg";

// Section Wrapper with scroll animation
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
      { threshold: 0.2 }
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

// Counter Component
const Counter = ({ end, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
};

// Navbar Component - SAME AS ALL OTHER PAGES
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDigitalMarketingDropdownOpen, setIsDigitalMarketingDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('cloud-solutions');
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

// Section 1: Hero Section - Full Screen with Simple Design - No Scroll Indicator
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="cs-hero">
      <div className="cs-hero-background">
        <div className="cs-hero-grid"></div>
        <div className="cs-hero-particles">
          {[...Array(60)].map((_, i) => (
            <div key={i} className="cs-hero-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              background: i % 3 === 0 ? '#C6FF00' : i % 3 === 1 ? '#7CFF3A' : '#B6FF1A'
            }}></div>
          ))}
        </div>
      </div>
      
      <div className="cs-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="cs-hero-badge">
            <span className="cs-hero-icon">☁️</span> CLOUD SOLUTIONS
          </span>
        </motion.div>
        
        <motion.h1 
          className="cs-hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Scale Beyond Limits with <span className="cs-gradient-text">Cloud Solutions</span>
        </motion.h1>
        
        <motion.p 
          className="cs-hero-description"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Future-proof your infrastructure with scalable, secure, and intelligent cloud architecture. 
          Deploy globally in minutes, scale automatically, and pay only for what you use.
        </motion.p>
        
        <motion.div 
          className="cs-hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="cs-stat">
            <span className="cs-stat-number"><Counter end={99.99} suffix="%" /></span>
            <span className="cs-stat-label">Uptime SLA</span>
          </div>
          <div className="cs-stat">
            <span className="cs-stat-number"><Counter end={50} suffix="+" /></span>
            <span className="cs-stat-label">Global Regions</span>
          </div>
          <div className="cs-stat">
            <span className="cs-stat-number"><Counter end={10000} suffix="+" /></span>
            <span className="cs-stat-label">Enterprise Clients</span>
          </div>
        </motion.div>
        
        <motion.div 
          className="cs-hero-buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="cs-btn-primary" onClick={() => navigate('/about')}>
            Start Your Journey
            <span className="cs-btn-arrow">→</span>
          </button>
          <button className="cs-btn-outline" onClick={() => {
            document.getElementById('cs-ecosystem').scrollIntoView({ behavior: 'smooth' });
          }}>
            Explore Architecture
            <span className="cs-btn-arrow">→</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator removed */}
    </div>
  );
};

// Section 2: Cloud Ecosystem Flow - No Hover Effects
const EcosystemSection = () => {
  const services = [
    { title: "Compute", icon: "💻", description: "Scalable virtual machines and containers with auto-scaling capabilities", color: "#C6FF00", metric: "99.99% Uptime", details: "EC2, Lambda, Kubernetes" },
    { title: "Storage", icon: "💾", description: "Secure, durable object and block storage with 11x9s durability", color: "#7CFF3A", metric: "∞ Scalable", details: "S3, EBS, Glacier" },
    { title: "DevOps", icon: "⚙️", description: "CI/CD pipelines and infrastructure as code for rapid deployment", color: "#B6FF1A", metric: "Automated", details: "Jenkins, Terraform, Ansible" },
    { title: "AI/ML", icon: "🧠", description: "Machine learning models and AI services for intelligent applications", color: "#C6FF00", metric: "Intelligent", details: "SageMaker, Rekognition" },
    { title: "Database", icon: "🗄️", description: "Managed SQL and NoSQL databases with high availability", color: "#7CFF3A", metric: "High Performance", details: "RDS, DynamoDB, Aurora" },
    { title: "Networking", icon: "🌐", description: "Global load balancing and CDN for low-latency delivery", color: "#B6FF1A", metric: "Global Reach", details: "CloudFront, VPC, Direct Connect" }
  ];

  return (
    <div className="cs-ecosystem" id="cs-ecosystem">
      <div className="cs-section-header">
        <span className="cs-section-badge">CLOUD ECOSYSTEM</span>
        <h2 className="cs-section-title">Complete <span className="cs-gradient-text">Infrastructure</span></h2>
        <p className="cs-section-subtitle">Everything you need to build, deploy, and scale modern applications</p>
      </div>

      <div className="cs-ecosystem-scroll">
        <div className="cs-ecosystem-track">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="cs-ecosystem-node"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="cs-node-icon" style={{ borderColor: service.color }}>
                {service.icon}
              </div>
              <div className="cs-node-content">
                <h3 style={{ color: service.color }}>{service.title}</h3>
                <p>{service.description}</p>
                <div className="cs-node-details">{service.details}</div>
                <span className="cs-node-metric">{service.metric}</span>
              </div>
              {index < services.length - 1 && (
                <div className="cs-node-connector">
                  <div className="cs-connector-line"></div>
                  <div className="cs-connector-glow"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 3: Architecture Visual Section - No Hover Effects
const ArchitectureSection = () => {
  const [activeLayer, setActiveLayer] = useState(null);
  
  const layers = [
    { name: "Frontend", icon: "🌐", color: "#C6FF00", description: "CDN, Edge Computing, Web Apps", details: "Global content delivery with sub-second latency" },
    { name: "Backend", icon: "⚙️", color: "#7CFF3A", description: "Microservices, APIs, Serverless", details: "Event-driven architecture with auto-scaling" },
    { name: "Cloud Platform", icon: "☁️", color: "#B6FF1A", description: "AWS, Azure, GCP Integration", details: "Multi-cloud deployment with unified management" },
    { name: "Database", icon: "🗄️", color: "#C6FF00", description: "Distributed Databases, Caching", details: "Global replication with ACID compliance" },
    { name: "Storage", icon: "💾", color: "#7CFF3A", description: "Object Storage, Data Lakes", details: "Petabyte-scale storage with intelligent tiering" }
  ];

  return (
    <div className="cs-architecture">
      <div className="cs-section-header">
        <span className="cs-section-badge">ARCHITECTURE</span>
        <h2 className="cs-section-title">Layered <span className="cs-gradient-text">Cloud Stack</span></h2>
        <p className="cs-section-subtitle">Modern, scalable architecture designed for enterprise needs</p>
      </div>

      <div className="cs-architecture-stack">
        {layers.map((layer, index) => (
          <motion.div 
            key={index} 
            className={`cs-arch-layer ${activeLayer === index ? 'active' : ''}`}
            onMouseEnter={() => setActiveLayer(index)}
            onMouseLeave={() => setActiveLayer(null)}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{ borderColor: layer.color }}
          >
            <div className="cs-layer-icon" style={{ background: `${layer.color}20` }}>
              {layer.icon}
            </div>
            <div className="cs-layer-content">
              <h3 style={{ color: layer.color }}>{layer.name}</h3>
              <p>{layer.description}</p>
              <span className="cs-layer-details">{layer.details}</span>
            </div>
            <div className="cs-layer-glow" style={{ background: `radial-gradient(circle, ${layer.color}40, transparent)` }}></div>
          </motion.div>
        ))}
        <div className="cs-arch-connector"></div>
      </div>
    </div>
  );
};

// Section 4: Performance & Scalability Section - No Hover Effects
const PerformanceSection = () => {
  const metrics = [
    { label: "Auto-scaling Response", value: "0.3s", target: 0.95 },
    { label: "Load Balancing Efficiency", value: "99.9%", target: 0.99 },
    { label: "Global Latency", value: "45ms", target: 0.92 },
    { label: "Throughput", value: "1.2M req/s", target: 0.98 }
  ];

  return (
    <div className="cs-performance">
      <div className="cs-section-header">
        <span className="cs-section-badge">PERFORMANCE</span>
        <h2 className="cs-section-title">Scale with <span className="cs-gradient-text">Confidence</span></h2>
        <p className="cs-section-subtitle">Enterprise-grade performance that grows with your business</p>
      </div>

      <div className="cs-performance-container">
        <div className="cs-performance-graph">
          <svg className="cs-graph-svg" viewBox="0 0 600 300">
            <motion.path
              d="M0,250 L50,220 L100,200 L150,180 L200,150 L250,120 L300,90 L350,70 L400,50 L450,40 L500,30 L550,25 L600,20"
              stroke="#C6FF00"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            />
            <motion.path
              d="M0,250 L50,240 L100,230 L150,210 L200,190 L250,170 L300,150 L350,130 L400,110 L450,95 L500,85 L550,80 L600,75"
              stroke="#7CFF3A"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </svg>
        </div>
        
        <div className="cs-performance-metrics">
          {metrics.map((metric, index) => (
            <div key={index} className="cs-metric-bar">
              <div className="cs-metric-label">{metric.label}</div>
              <div className="cs-bar-bg">
                <motion.div 
                  className="cs-bar-fill" 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: metric.target }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ transformOrigin: "left" }}
                ></motion.div>
              </div>
              <span className="cs-metric-value">{metric.value}</span>
            </div>
          ))}
        </div>
        
        <div className="cs-performance-stats">
          <div className="cs-perf-stat">
            <span className="cs-perf-number"><Counter end={99.99} suffix="%" /></span>
            <span className="cs-perf-label">Uptime Guarantee</span>
          </div>
          <div className="cs-perf-stat">
            <span className="cs-perf-number"><Counter end={45} suffix="ms" /></span>
            <span className="cs-perf-label">Avg. Latency</span>
          </div>
          <div className="cs-perf-stat">
            <span className="cs-perf-number"><Counter end={1000} suffix="x" /></span>
            <span className="cs-perf-label">Scalability Factor</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section 5: Security Section - No Hover Effects
const SecuritySection = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  
  const features = [
    { 
      title: "Encryption at Rest", 
      icon: "🔒", 
      color: "#C6FF00", 
      description: "All data stored is encrypted using AES-256 encryption, ensuring your sensitive information remains protected.",
      details: "AES-256 | FIPS 140-2 | Customer Managed Keys"
    },
    { 
      title: "Encryption in Transit", 
      icon: "🔐", 
      color: "#7CFF3A", 
      description: "TLS 1.3 encryption for all data moving between services, preventing man-in-the-middle attacks.",
      details: "TLS 1.3 | Perfect Forward Secrecy | Certificate Management"
    },
    { 
      title: "Identity Management", 
      icon: "👤", 
      color: "#B6FF1A", 
      description: "Centralized identity with SSO, MFA, and RBAC controls to ensure only authorized access to resources.",
      details: "SSO | MFA | RBAC | SCIM Provisioning"
    },
    { 
      title: "Threat Detection", 
      icon: "🛡️", 
      color: "#C6FF00", 
      description: "AI-powered threat detection continuously monitors for suspicious activities and potential security breaches.",
      details: "24/7 Monitoring | Anomaly Detection | Automated Response"
    },
    { 
      title: "Compliance", 
      icon: "✅", 
      color: "#7CFF3A", 
      description: "Meets global compliance standards including SOC2, ISO27001, GDPR, and HIPAA requirements.",
      details: "SOC2 Type II | ISO 27001 | GDPR | HIPAA"
    },
    { 
      title: "Audit Logging", 
      icon: "📝", 
      color: "#B6FF1A", 
      description: "Complete audit trail of all actions, changes, and access attempts for security and compliance.",
      details: "Immutable Logs | API Audit | Retention Policies"
    }
  ];

  return (
    <div className="cs-security">
      <div className="cs-section-header">
        <span className="cs-section-badge">SECURITY</span>
        <h2 className="cs-section-title">Zero-Trust <span className="cs-gradient-text">Security Architecture</span></h2>
        <p className="cs-section-subtitle">Never trust, always verify — every request is authenticated, authorized, and encrypted</p>
      </div>

      <div className="cs-security-layout">
        <div className="cs-security-principles">
          <div className="cs-principle">
            <div className="cs-principle-icon">🔐</div>
            <div className="cs-principle-content">
              <h4>Verify Explicitly</h4>
              <p>Always authenticate and authorize based on all available data points</p>
            </div>
          </div>
          <div className="cs-principle">
            <div className="cs-principle-icon">⚡</div>
            <div className="cs-principle-content">
              <h4>Least Privilege</h4>
              <p>Limit user access with Just-In-Time and Just-Enough-Access principles</p>
            </div>
          </div>
          <div className="cs-principle">
            <div className="cs-principle-icon">📡</div>
            <div className="cs-principle-content">
              <h4>Assume Breach</h4>
              <p>Segment access, verify end-to-end encryption, and use analytics for threat detection</p>
            </div>
          </div>
        </div>

        <div className="cs-security-features-grid">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className={`cs-security-card ${activeFeature === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              style={{ borderColor: feature.color }}
            >
              <div className="cs-card-icon" style={{ background: `${feature.color}20`, color: feature.color }}>
                {feature.icon}
              </div>
              <h3 style={{ color: feature.color }}>{feature.title}</h3>
              <p>{feature.description}</p>
              <motion.div 
                className="cs-card-details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: activeFeature === index ? 1 : 0,
                  height: activeFeature === index ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="cs-details-tags">
                  {feature.details.split(' | ').map((tag, i) => (
                    <span key={i} className="cs-tag">{tag}</span>
                  ))}
                </div>
              </motion.div>
              <div className="cs-card-glow" style={{ background: `radial-gradient(circle, ${feature.color}30, transparent)` }}></div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="cs-security-compliance">
        <div className="cs-compliance-header">
          <span className="cs-compliance-icon">🏆</span>
          <h3>Enterprise-Grade Compliance</h3>
        </div>
        <div className="cs-compliance-badges">
          <div className="cs-badge">SOC 2 Type II</div>
          <div className="cs-badge">ISO 27001</div>
          <div className="cs-badge">GDPR Compliant</div>
          <div className="cs-badge">HIPAA Eligible</div>
          <div className="cs-badge">PCI DSS Level 1</div>
          <div className="cs-badge">FedRAMP</div>
        </div>
      </div>
    </div>
  );
};

// Section 6: Global Infrastructure Map - No Hover Effects
const GlobalMapSection = () => {
  const [hoveredRegion, setHoveredRegion] = useState(null);
  
  const regions = [
    { name: "North America", x: 20, y: 35, active: true, latency: "15ms", zones: 6, cities: "us-east-1, us-west-2, ca-central-1" },
    { name: "Europe", x: 55, y: 30, active: true, latency: "25ms", zones: 5, cities: "eu-west-1, eu-central-1, eu-north-1" },
    { name: "Asia Pacific", x: 80, y: 45, active: true, latency: "35ms", zones: 7, cities: "ap-southeast-1, ap-northeast-1, ap-south-1" },
    { name: "South America", x: 40, y: 70, active: true, latency: "45ms", zones: 3, cities: "sa-east-1" },
    { name: "Middle East", x: 65, y: 48, active: true, latency: "40ms", zones: 2, cities: "me-south-1, me-central-1" },
    { name: "Africa", x: 55, y: 65, active: true, latency: "55ms", zones: 2, cities: "af-south-1" },
    { name: "Australia", x: 88, y: 72, active: true, latency: "50ms", zones: 2, cities: "ap-southeast-2" }
  ];

  return (
    <div className="cs-global">
      <div className="cs-section-header">
        <span className="cs-section-badge">GLOBAL REACH</span>
        <h2 className="cs-section-title">Worldwide <span className="cs-gradient-text">Infrastructure</span></h2>
        <p className="cs-section-subtitle">50+ regions, 150+ edge locations, 99.99% availability guarantee</p>
      </div>

      <div className="cs-map-wrapper">
        <div className="cs-map-container">
          <div className="cs-map-background">
            <div className="cs-map-grid"></div>
          </div>
          
          <div className="cs-map-regions">
            {regions.map((region, index) => (
              <motion.div
                key={index}
                className={`cs-region-node ${hoveredRegion === index ? 'hovered' : ''}`}
                style={{ left: `${region.x}%`, top: `${region.y}%` }}
                onMouseEnter={() => setHoveredRegion(index)}
                onMouseLeave={() => setHoveredRegion(null)}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
              >
                <div className="cs-region-dot">
                  <div className="cs-dot-pulse"></div>
                </div>
                <div className="cs-region-label">{region.name}</div>
                <AnimatePresence>
                  {hoveredRegion === index && (
                    <motion.div 
                      className="cs-region-tooltip"
                      initial={{ opacity: 0, y: -10, scale: 0.9 }}
                      animate={{ opacity: 1, y: -20, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="cs-tooltip-header">
                        <span className="cs-tooltip-icon">📍</span>
                        <strong>{region.name}</strong>
                      </div>
                      <div className="cs-tooltip-content">
                        <div className="cs-tooltip-row">
                          <span>Latency:</span>
                          <span className="cs-highlight">{region.latency}</span>
                        </div>
                        <div className="cs-tooltip-row">
                          <span>Availability Zones:</span>
                          <span className="cs-highlight">{region.zones}</span>
                        </div>
                        <div className="cs-tooltip-row">
                          <span>Data Centers:</span>
                          <span className="cs-highlight">{region.cities}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="cs-map-stats-grid">
          <div className="cs-map-stat-card">
            <div className="cs-stat-icon">🌍</div>
            <div className="cs-stat-number"><Counter end={50} suffix="+" /></div>
            <div className="cs-stat-label">Global Regions</div>
          </div>
          <div className="cs-map-stat-card">
            <div className="cs-stat-icon">⚡</div>
            <div className="cs-stat-number"><Counter end={150} suffix="+" /></div>
            <div className="cs-stat-label">Edge Locations</div>
          </div>
          <div className="cs-map-stat-card">
            <div className="cs-stat-icon">🎯</div>
            <div className="cs-stat-number"><Counter end={99.99} suffix="%" /></div>
            <div className="cs-stat-label">Availability SLA</div>
          </div>
          <div className="cs-map-stat-card">
            <div className="cs-stat-icon">📡</div>
            <div className="cs-stat-number"><Counter end={45} suffix="ms" /></div>
            <div className="cs-stat-label">Average Latency</div>
          </div>
        </div>

        <div className="cs-map-network-info">
          <div className="cs-network-item">
            <div className="cs-network-dot cs-network-active"></div>
            <span>Active Regions</span>
          </div>
          <div className="cs-network-item">
            <div className="cs-network-line"></div>
            <span>Global Backbone</span>
          </div>
          <div className="cs-network-item">
            <div className="cs-network-line cs-network-dashed"></div>
            <span>Edge Network</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section 7: Why Choose Our Cloud - No Hover Effects
const WhyChooseSection = () => {
  const [activePoint, setActivePoint] = useState(0);
  
  const points = [
    { title: "99.99% Uptime SLA", description: "Guaranteed availability with multi-region redundancy and automatic failover", icon: "📈", details: "Industry-leading reliability with financial backing" },
    { title: "Pay-as-you-grow", description: "Optimize costs with flexible pricing models and automatic scaling", icon: "💰", details: "Save up to 60% compared to on-premises" },
    { title: "24/7 Expert Support", description: "Dedicated cloud architects available around the clock", icon: "🎧", details: "Enterprise support with 15-minute response time" },
    { title: "Enterprise Security", description: "SOC2, ISO27001, GDPR compliant infrastructure", icon: "🔒", details: "Military-grade encryption and compliance" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePoint((prev) => (prev + 1) % points.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cs-why">
      <div className="cs-why-container">
        <div className="cs-why-left">
          <span className="cs-section-badge">WHY US</span>
          <h2 className="cs-why-title">Intelligent <span className="cs-gradient-text">Cloud, Smarter Business</span></h2>
          <p className="cs-why-description">Built for modern enterprises, powered by AI-driven automation and global infrastructure. Join thousands of businesses already scaling with confidence.</p>
          
          <div className="cs-why-points">
            {points.map((point, index) => (
              <motion.div 
                key={index} 
                className={`cs-point ${activePoint === index ? 'active' : ''}`}
                onClick={() => setActivePoint(index)}
              >
                <div className="cs-point-icon">{point.icon}</div>
                <div className="cs-point-content">
                  <h4>{point.title}</h4>
                  <p>{point.description}</p>
                  {activePoint === index && (
                    <motion.div 
                      className="cs-point-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {point.details}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="cs-why-right">
          <div className="cs-why-visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePoint}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="cs-visual-content"
              >
                <div className="cs-visual-icon">{points[activePoint].icon}</div>
                <h3>{points[activePoint].title}</h3>
                <p>{points[activePoint].details}</p>
              </motion.div>
            </AnimatePresence>
            <div className="cs-visual-glow"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section 8: Final CTA
const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="cs-cta">
      <div className="cs-cta-background">
        <div className="cs-cta-particles">
          {[...Array(40)].map((_, i) => (
            <div key={i} className="cs-cta-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              background: i % 2 === 0 ? '#C6FF00' : '#7CFF3A'
            }}></div>
          ))}
        </div>
      </div>
      
      <div className="cs-cta-content">
        <motion.h2 
          className="cs-cta-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to Transform Your <span className="cs-gradient-text">Infrastructure?</span>
        </motion.h2>
        <motion.p 
          className="cs-cta-description"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Join over 10,000 businesses scaling with confidence on our cloud platform. 
          Get started with $500 free credits and 24/7 enterprise support.
        </motion.p>
        
        <motion.div 
          className="cs-cta-buttons"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button className="cs-cta-primary" onClick={() => navigate('/get-started')}>
            Start Free Trial
            <span className="cs-btn-arrow">→</span>
          </button>
          <button className="cs-cta-secondary" onClick={() => navigate('/contact')}>
            Contact Sales
            <span className="cs-btn-arrow">→</span>
          </button>
        </motion.div>
        
        <div className="cs-cta-features">
          <div className="cs-feature-item">
            <span className="cs-feature-icon">✓</span>
            <span>No credit card required</span>
          </div>
          <div className="cs-feature-item">
            <span className="cs-feature-icon">✓</span>
            <span>$500 free credits</span>
          </div>
          <div className="cs-feature-item">
            <span className="cs-feature-icon">✓</span>
            <span>24/7 support included</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main CloudSolutions Component
const CloudSolutions = () => {
  return (
    <div className="cs-container">
      <Navbar />
      
      <Section className="cs-hero-section">
        <HeroSection />
      </Section>
      
      <Section className="cs-ecosystem-section">
        <EcosystemSection />
      </Section>

      <Section className="cs-architecture-section">
        <ArchitectureSection />
      </Section>

      <Section className="cs-performance-section">
        <PerformanceSection />
      </Section>

      <Section className="cs-security-section">
        <SecuritySection />
      </Section>

      {/* <Section className="cs-global-section">
        <GlobalMapSection />
      </Section> */}

      <Section className="cs-why-section">
        <WhyChooseSection />
      </Section>

      <CTASection />

      <Footer />
    </div>
  );
};

export default CloudSolutions;