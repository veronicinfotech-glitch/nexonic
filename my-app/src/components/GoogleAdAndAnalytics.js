// GoogleAdAndAnalytics.js - Updated with Consistent Navbar and Footer
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './GoogleAdAndAnalytics.css';
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

// Counter Component for Numbers
const Counter = ({ end, duration = 2000 }) => {
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

  return <span ref={countRef}>{count.toLocaleString()}</span>;
};

// Navbar Component - SAME AS ALL OTHER PAGES
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDigitalMarketingDropdownOpen, setIsDigitalMarketingDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('google-ads');
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

// Section 1: Hero Section - Split Layout
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="ga-hero">
      <div className="ga-hero-background">
        <div className="ga-hero-grid"></div>
        <div className="ga-hero-particles">
          {[...Array(60)].map((_, i) => (
            <div key={i} className="ga-hero-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              background: i % 3 === 0 ? '#C6FF00' : i % 3 === 1 ? '#7CFF3A' : '#B6FF1A'
            }}></div>
          ))}
        </div>
      </div>
      
      <div className="ga-hero-container">
        <div className="ga-hero-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="ga-hero-badge">
              <span className="ga-hero-icon">⚡</span> GOOGLE ADS & ANALYTICS
            </span>
          </motion.div>
          
          <motion.h1 
            className="ga-hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Data-Driven <span className="ga-gradient-text">Advertising</span> That Converts
          </motion.h1>
          
          <motion.p 
            className="ga-hero-description"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Maximize ROI with precision-targeted Google Ads campaigns and real-time analytics insights. 
            Our AI-powered platform optimizes every dollar spent.
          </motion.p>
          
          <motion.div 
            className="ga-hero-buttons"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button className="ga-btn-primary" onClick={() => navigate('/contact')}>
              Start Campaign
              <span className="ga-btn-arrow">→</span>
            </button>
            <button className="ga-btn-outline" onClick={() => {
              document.getElementById('ga-flow').scrollIntoView({ behavior: 'smooth' });
            }}>
              View Analytics
              <span className="ga-btn-arrow">→</span>
            </button>
          </motion.div>
          
          <div className="ga-hero-stats">
            <div className="ga-stat-item">
              <span className="ga-stat-number"><Counter end={245} />K+</span>
              <span className="ga-stat-label">Active Campaigns</span>
            </div>
            <div className="ga-stat-item">
              <span className="ga-stat-number">$<Counter end={125} />M+</span>
              <span className="ga-stat-label">Ad Spend Managed</span>
            </div>
            <div className="ga-stat-item">
              <span className="ga-stat-number"><Counter end={320} />%</span>
              <span className="ga-stat-label">Avg. ROAS</span>
            </div>
          </div>
        </div>
        
        <div className="ga-hero-right">
          <div className="ga-analytics-dashboard">
            <div className="ga-dashboard-header">
              <span className="ga-dashboard-title">LIVE METRICS • REAL-TIME DATA</span>
              <span className="ga-dashboard-dot"></span>
            </div>
            <div className="ga-metrics-panel">
              <div className="ga-metric">
                <span className="ga-metric-label">Impressions</span>
                <span className="ga-metric-value"><Counter end={1245} />K</span>
                <span className="ga-metric-trend">↑ +23%</span>
              </div>
              <div className="ga-metric">
                <span className="ga-metric-label">Clicks</span>
                <span className="ga-metric-value"><Counter end={89} />K</span>
                <span className="ga-metric-trend">↑ +18%</span>
              </div>
              <div className="ga-metric">
                <span className="ga-metric-label">Conversions</span>
                <span className="ga-metric-value"><Counter end={12.5} />K</span>
                <span className="ga-metric-trend">↑ +32%</span>
              </div>
            </div>
            <div className="ga-chart-preview">
              <div className="ga-chart-line"></div>
              <div className="ga-chart-bar" style={{ height: '45px' }}></div>
              <div className="ga-chart-bar" style={{ height: '68px' }}></div>
              <div className="ga-chart-bar" style={{ height: '52px' }}></div>
              <div className="ga-chart-bar" style={{ height: '85px' }}></div>
              <div className="ga-chart-bar" style={{ height: '73px' }}></div>
              <div className="ga-chart-bar" style={{ height: '94px' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="ga-scroll-indicator" onClick={() => {
        document.getElementById('ga-flow').scrollIntoView({ behavior: 'smooth' });
      }}>
        <span>Scroll to explore</span>
        <div className="ga-scroll-line"></div>
      </div>
    </div>
  );
};

// Section 2: Google Ads Performance Flow - Horizontal Scroll
const PerformanceFlow = () => {
  const steps = [
    { title: "Impression", icon: "👁️", value: "2.5M+", color: "#C6FF00", description: "Ad views served across network", metric: "Reach" },
    { title: "Click", icon: "🖱️", value: "189K+", color: "#7CFF3A", description: "User engagement & interest", metric: "CTR: 7.6%" },
    { title: "Conversion", icon: "🎯", value: "24.5K+", color: "#B6FF1A", description: "Goal completions & sales", metric: "CVR: 13%" }
  ];

  return (
    <div className="ga-flow" id="ga-flow">
      <div className="ga-section-header">
        <span className="ga-section-badge">PERFORMANCE FUNNEL</span>
        <h2 className="ga-section-title">From Impression to <span className="ga-gradient-text">Conversion</span></h2>
        <p className="ga-section-subtitle">Track every step of your customer journey with real-time metrics</p>
      </div>

      <div className="ga-flow-container">
        <div className="ga-flow-track">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="ga-flow-step"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="ga-step-icon" style={{ borderColor: step.color }}>
                {step.icon}
              </div>
              <div className="ga-step-content">
                <h3 style={{ color: step.color }}>{step.title}</h3>
                <div className="ga-step-value">{step.value}</div>
                <p>{step.description}</p>
                <span className="ga-step-metric">{step.metric}</span>
              </div>
              {index < steps.length - 1 && (
                <div className="ga-step-arrow">
                  <span className="ga-arrow-icon">→</span>
                  <div className="ga-arrow-glow"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 3: Analytics Visual Lab
const AnalyticsLab = () => {
  const [activeData, setActiveData] = useState(null);
  
  const dataPoints = [
    { label: "CTR", value: "3.2%", x: 15, y: 45, trend: "+0.8%" },
    { label: "CPC", value: "$1.24", x: 35, y: 65, trend: "-$0.15" },
    { label: "ROAS", value: "320%", x: 55, y: 28, trend: "+45%" },
    { label: "CPA", value: "$28.50", x: 75, y: 72, trend: "-$4.20" },
    { label: "Conv. Rate", value: "4.8%", x: 90, y: 38, trend: "+0.9%" }
  ];

  return (
    <div className="ga-lab">
      <div className="ga-section-header">
        <span className="ga-section-badge">VISUAL INSIGHTS</span>
        <h2 className="ga-section-title">Real-Time <span className="ga-gradient-text">Analytics</span></h2>
        <p className="ga-section-subtitle">Interactive data visualization with predictive insights</p>
      </div>

      <div className="ga-lab-container">
        <div className="ga-lab-graph">
          <svg viewBox="0 0 500 250" className="ga-graph-svg">
            <motion.path
              d="M0,200 L50,180 L100,150 L150,170 L200,120 L250,160 L300,90 L350,130 L400,70 L450,100 L500,50"
              stroke="#C6FF00"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
            />
            <motion.circle
              cx="300"
              cy="90"
              r="6"
              fill="#C6FF00"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              viewport={{ once: true }}
            />
            <motion.circle
              cx="450"
              cy="100"
              r="4"
              fill="#7CFF3A"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              viewport={{ once: true }}
            />
          </svg>
          {dataPoints.map((point, i) => (
            <motion.div
              key={i}
              className={`ga-data-point ${activeData === i ? 'active' : ''}`}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              onMouseEnter={() => setActiveData(i)}
              onMouseLeave={() => setActiveData(null)}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="ga-data-dot"></div>
              <AnimatePresence>
                {activeData === i && (
                  <motion.div 
                    className="ga-data-tooltip"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: -20 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <span className="ga-tooltip-label">{point.label}</span>
                    <span className="ga-tooltip-value">{point.value}</span>
                    <span className={`ga-tooltip-trend ${point.trend.startsWith('+') ? 'positive' : 'negative'}`}>
                      {point.trend}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <div className="ga-lab-insights">
          <div className="ga-insight-card">
            <span className="ga-insight-icon">📊</span>
            <div className="ga-insight-content">
              <h4>Predicted ROAS</h4>
              <span className="ga-insight-value">345%</span>
              <span className="ga-insight-change">↑ +25% vs last month</span>
            </div>
          </div>
          <div className="ga-insight-card">
            <span className="ga-insight-icon">🎯</span>
            <div className="ga-insight-content">
              <h4>Optimal Budget</h4>
              <span className="ga-insight-value">$12,450</span>
              <span className="ga-insight-change">Maximizes ROI by 32%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section 4: Campaign Structure Breakdown - Vertical Timeline
const CampaignBreakdown = () => {
  const steps = [
    { title: "Campaign Setup", description: "Define goals, budget, and targeting parameters with precision", icon: "🎯", color: "#C6FF00", metrics: "Goal: Conversions" },
    { title: "Ad Group Creation", description: "Organize ads by theme and audience segments for optimal performance", icon: "📁", color: "#7CFF3A", metrics: "5+ Segments" },
    { title: "Ad Creative", description: "Design compelling visuals and copy that drive engagement", icon: "✨", color: "#B6FF1A", metrics: "A/B Testing" },
    { title: "Bid Strategy", description: "Optimize bidding for maximum ROI with AI-powered algorithms", icon: "💰", color: "#C6FF00", metrics: "Smart Bidding" },
    { title: "Performance Tracking", description: "Monitor and optimize in real-time with custom dashboards", icon: "📊", color: "#7CFF3A", metrics: "Live Updates" }
  ];

  return (
    <div className="ga-campaign">
      <div className="ga-section-header">
        <span className="ga-section-badge">CAMPAIGN STRUCTURE</span>
        <h2 className="ga-section-title">Build & Optimize <span className="ga-gradient-text">Like a Pro</span></h2>
        <p className="ga-section-subtitle">Systematic approach to campaign excellence</p>
      </div>

      <div className="ga-timeline">
        <div className="ga-timeline-line"></div>
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="ga-timeline-step"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="ga-timeline-dot" style={{ background: step.color }}></div>
            <div className="ga-timeline-content">
              <div className="ga-timeline-icon">{step.icon}</div>
              <h3 style={{ color: step.color }}>{step.title}</h3>
              <p>{step.description}</p>
              <div className="ga-timeline-metrics">{step.metrics}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 5: Smart Optimization Engine - Split Screen
const OptimizationEngine = () => {
  const [isActive, setIsActive] = useState(true);
  const [bidValue, setBidValue] = useState(75);
  const [roasValue, setRoasValue] = useState(320);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setBidValue(prev => Math.min(prev + Math.random() * 2, 95));
        setRoasValue(prev => Math.min(prev + Math.random() * 5, 450));
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setBidValue(75);
      setRoasValue(320);
    }
  }, [isActive]);

  return (
    <div className="ga-engine">
      <div className="ga-engine-container">
        <div className="ga-engine-left">
          <span className="ga-section-badge">AI POWERED</span>
          <h2 className="ga-engine-title">Smart <span className="ga-gradient-text">Optimization Engine</span></h2>
          <p className="ga-engine-description">
            Our AI continuously analyzes performance data to optimize bids, audiences, and creatives in real-time, 
            maximizing your ROI automatically. Machine learning algorithms predict optimal spend allocation.
          </p>
          <div className="ga-engine-features">
            <div className="ga-engine-feature">
              <span className="ga-feature-icon">⚡</span>
              <span>Real-time Bid Optimization</span>
            </div>
            <div className="ga-engine-feature">
              <span className="ga-feature-icon">🎯</span>
              <span>Audience Segmentation & Lookalikes</span>
            </div>
            <div className="ga-engine-feature">
              <span className="ga-feature-icon">📈</span>
              <span>Predictive Analytics & Forecasting</span>
            </div>
            <div className="ga-engine-feature">
              <span className="ga-feature-icon">🤖</span>
              <span>Automated A/B Testing</span>
            </div>
          </div>
        </div>
        
        <div className="ga-engine-right">
          <div className="ga-dashboard-mock">
            <div className="ga-dashboard-header">
              <span>OPTIMIZATION DASHBOARD</span>
              <div className="ga-toggle" onClick={() => setIsActive(!isActive)}>
                <motion.div 
                  className="ga-toggle-slider"
                  animate={{ x: isActive ? 28 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </div>
            </div>
            <div className="ga-dashboard-metrics">
              <div className="ga-dash-metric">
                <span>Bid Adjustment</span>
                <motion.span 
                  className="ga-dash-value"
                  animate={{ color: isActive ? "#C6FF00" : "#6B7280" }}
                >
                  {isActive ? `+${Math.floor(bidValue)}%` : "0%"}
                </motion.span>
              </div>
              <div className="ga-dash-metric">
                <span>CTR Lift</span>
                <motion.span 
                  className="ga-dash-value"
                  animate={{ color: isActive ? "#C6FF00" : "#6B7280" }}
                >
                  {isActive ? `+${Math.floor(bidValue * 0.3)}%` : "0%"}
                </motion.span>
              </div>
              <div className="ga-dash-metric">
                <span>ROAS Increase</span>
                <motion.span 
                  className="ga-dash-value"
                  animate={{ color: isActive ? "#C6FF00" : "#6B7280" }}
                >
                  {isActive ? `+${Math.floor(roasValue - 320)}%` : "0%"}
                </motion.span>
              </div>
              <div className="ga-dash-metric">
                <span>CPA Reduction</span>
                <motion.span 
                  className="ga-dash-value"
                  animate={{ color: isActive ? "#C6FF00" : "#6B7280" }}
                >
                  {isActive ? `-${Math.floor(bidValue * 0.2)}%` : "0%"}
                </motion.span>
              </div>
            </div>
            <div className="ga-dashboard-footer">
              <span className="ga-status">AI Engine Active</span>
              <span className="ga-update-time">Last optimization: 2s ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section 6: Data Stream
const DataStream = () => {
  const logs = [
    "▶ [ANALYTICS] Real-time data sync active | 2,345 events processed",
    "▶ [GOOGLE ADS] Campaign performance updated | CTR: 3.2% ▲ | CPC: $1.24 ▼",
    "▶ [CONVERSION] New goal completion detected | Value: $1,245 | Source: Google Search",
    "▶ [AUDIENCE] Segment 'Tech Enthusiasts' engaged | +12% lift | 45,678 users",
    "▶ [BIDDING] Auto-optimization applied | CPA decreased by 8% | New bid: $1.85",
    "▶ [INSIGHTS] Top performing ad: 'Summer Sale' | CTR: 5.1% | Conversions: 234",
    "▶ [ROAS] Campaign 'Brand Awareness' | ROAS: 412% | Budget remaining: $2,450",
    "▶ [PREDICTION] Q4 forecast | Expected conversions: 12,500 | Revenue: $312K"
  ];

  const [currentLog, setCurrentLog] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLog((prev) => (prev + 1) % logs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ga-stream">
      <div className="ga-section-header">
        <span className="ga-section-badge">LIVE FEED</span>
        <h2 className="ga-section-title">Real-Time <span className="ga-gradient-text">Data Stream</span></h2>
        <p className="ga-section-subtitle">Monitor campaign performance as it happens</p>
      </div>

      <div className="ga-stream-container">
        <div className="ga-stream-console">
          <div className="ga-console-header">
            <span className="ga-console-dot ga-red"></span>
            <span className="ga-console-dot ga-yellow"></span>
            <span className="ga-console-dot ga-green"></span>
            <span className="ga-console-title">analytics_stream.log</span>
            <span className="ga-console-live">LIVE</span>
          </div>
          <div className="ga-console-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLog}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="ga-console-line"
              >
                {logs[currentLog]}
              </motion.div>
            </AnimatePresence>
            <div className="ga-console-cursor">_</div>
          </div>
          <div className="ga-console-footer">
            <span className="ga-console-stats">📊 Events/sec: 342</span>
            <span className="ga-console-stats">⚡ Latency: 0.23ms</span>
            <span className="ga-console-stats">🔌 Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section 7: Final CTA
const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="ga-cta">
      <div className="ga-cta-background">
        <div className="ga-cta-glow"></div>
        <div className="ga-cta-grid"></div>
      </div>
      
      <div className="ga-cta-content">
        <motion.h2 
          className="ga-cta-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Scale Smarter with <span className="ga-gradient-text">Data</span>
        </motion.h2>
        <motion.p 
          className="ga-cta-description"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Transform your advertising with AI-powered insights and real-time optimization. 
          Join 500+ businesses already scaling with Nexonic.
        </motion.p>
        
        <motion.div 
          className="ga-cta-buttons"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button className="ga-cta-primary" onClick={() => navigate('/contact')}>
            Start Your Campaign
            <span className="ga-btn-arrow">→</span>
          </button>
          <button className="ga-cta-secondary" onClick={() => navigate('/contact')}>
            Request Demo
            <span className="ga-btn-arrow">→</span>
          </button>
        </motion.div>
        
        <div className="ga-cta-trust">
          <span>⭐ Trusted by 500+ businesses</span>
          <span>🔒 30-day money-back guarantee</span>
          <span>⚡ Free consultation included</span>
        </div>
      </div>
    </div>
  );
};

// Main GoogleAdAndAnalytics Component
const GoogleAdAndAnalytics = () => {
  return (
    <div className="ga-container">
      <Navbar />
      
      <Section className="ga-hero-section">
        <HeroSection />
      </Section>
      
      <Section className="ga-flow-section">
        <PerformanceFlow />
      </Section>

      <Section className="ga-lab-section">
        <AnalyticsLab />
      </Section>

      <Section className="ga-campaign-section">
        <CampaignBreakdown />
      </Section>

      <Section className="ga-engine-section">
        <OptimizationEngine />
      </Section>

      <Section className="ga-stream-section">
        <DataStream />
      </Section>

      <CTASection />

      <Footer />
    </div>
  );
};

export default GoogleAdAndAnalytics;