// SEO.js - Updated with Consistent Navbar and Footer - No Hover Effects
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './SEO.css';
import logo from "../image/logo.jpg";

// Import local images
import splitScreenImage from "../image/Omnichannel Marketing That Works.jpg";

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

// Navbar Component - SAME AS ALL OTHER PAGES
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDigitalMarketingDropdownOpen, setIsDigitalMarketingDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('seo');
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

// Footer Component - SAME AS ALL OTHER PAGES - No Hover Effects
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

// Section 1: Hero Section - No background image, no scroll indicator
const HeroSection = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <div className="seo-hero">
      <div className="seo-hero-background">
        <div className="seo-hero-grid"></div>
        <div className="seo-hero-particles">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="seo-hero-particle" style={{
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
      
      <div className="seo-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="seo-hero-badge">
            <span className="seo-hero-icon">⚡</span> NEXT-GEN DIGITAL MARKETING
          </span>
        </motion.div>
        
        <motion.h1 
          className="seo-hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Digital Marketing That <span className="seo-gradient-text">Drives Real Growth</span>
        </motion.h1>
        
        <motion.p 
          className="seo-hero-description"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Data-driven strategies that transform your brand into a market leader. SEO, Social Media, Ads & Analytics.
        </motion.p>
        
        <motion.div 
          className="seo-hero-buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="seo-btn-primary" onClick={() => navigate('/contact')}>
            Start Growing
            <span className="seo-btn-arrow">→</span>
          </button>
          <button className="seo-btn-outline" onClick={() => {
            document.getElementById('seo-services').scrollIntoView({ behavior: 'smooth' });
          }}>
            Explore Services
            <span className="seo-btn-arrow">→</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// Section 2: Scrolling Marquee Strip - No Hover Effects
const MarqueeStrip = () => {
  const words = ["SEO", "Branding", "Ads", "Growth", "Analytics", "Social Media", "Content", "Strategy", "ROI", "Conversion"];

  return (
    <div className="seo-marquee">
      <div className="seo-marquee-container">
        <div className="seo-marquee-track">
          {[...words, ...words].map((word, index) => (
            <span key={index} className="seo-marquee-item">
              {word} <span className="seo-marquee-dot">●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 3: Services Flow - Zig-Zag Layout - No Hover Effects
const ServicesSection = () => {
  const services = [
    { title: "SEO Optimization", description: "Dominate search rankings with data-driven SEO strategies that drive organic traffic.", icon: "📈", direction: "left", color: "#C6FF00" },
    { title: "Social Media Marketing", description: "Build authentic connections and grow your audience across all major platforms.", icon: "📱", direction: "right", color: "#7CFF3A" },
    { title: "Paid Ads Strategy", description: "Maximize ROI with targeted ad campaigns across Google, Meta, and LinkedIn.", icon: "🎯", direction: "left", color: "#B6FF1A" },
    { title: "Content Marketing", description: "Create compelling content that educates, engages, and converts.", icon: "✍️", direction: "right", color: "#C6FF00" },
    { title: "Email Marketing", description: "Nurture leads and build loyalty with personalized email campaigns.", icon: "📧", direction: "left", color: "#7CFF3A" },
    { title: "Analytics & Tracking", description: "Data-driven insights to optimize performance and scale what works.", icon: "📊", direction: "right", color: "#B6FF1A" }
  ];

  return (
    <div className="seo-services" id="seo-services">
      <div className="seo-section-header">
        <span className="seo-section-badge">WHAT WE DO</span>
        <h2 className="seo-section-title">Growth <span className="seo-gradient-text">Solutions</span></h2>
      </div>

      <div className="seo-services-flow">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className={`seo-service-item ${service.direction}`}
            initial={{ opacity: 0, x: service.direction === 'left' ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="seo-service-icon" style={{ borderColor: service.color }}>
              {service.icon}
            </div>
            <div className="seo-service-content">
              <h3 style={{ color: service.color }}>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 4: Interactive Timeline - No Hover Effects
const TimelineSection = () => {
  const steps = [
    { step: "01", title: "Research", description: "Deep dive into your market, competitors, and audience", icon: "🔍" },
    { step: "02", title: "Strategy", description: "Data-driven roadmap tailored to your goals", icon: "📋" },
    { step: "03", title: "Execution", description: "Flawless implementation across all channels", icon: "⚙️" },
    { step: "04", title: "Optimization", description: "Continuous testing and performance improvement", icon: "📈" },
    { step: "05", title: "Scaling", description: "Amplify what works and expand reach", icon: "🚀" }
  ];

  return (
    <div className="seo-timeline">
      <div className="seo-section-header">
        <span className="seo-section-badge">OUR PROCESS</span>
        <h2 className="seo-section-title">From Insight to <span className="seo-gradient-text">Impact</span></h2>
      </div>

      <div className="seo-timeline-container">
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="seo-timeline-step"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="seo-timeline-dot"></div>
            <div className="seo-timeline-content">
              <div className="seo-timeline-number">{step.step}</div>
              <div className="seo-timeline-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {index < steps.length - 1 && <div className="seo-timeline-line"></div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 5: Typography Feature Section - No Hover Effects
const TypographySection = () => {
  return (
    <div className="seo-typography">
      <div className="seo-typography-background">
        <span className="seo-big-text">GROWTH</span>
        <span className="seo-big-text seo-big-text-2">SCALE</span>
        <span className="seo-big-text seo-big-text-3">IMPACT</span>
      </div>
      <div className="seo-typography-content">
        <div className="seo-typography-left">
          <h2>Data-Driven <span className="seo-gradient-text">Decisions</span></h2>
          <p>We don't guess — we analyze, test, and optimize based on real data. Every strategy is backed by insights that drive measurable results.</p>
        </div>
        <div className="seo-typography-right">
          <div className="seo-typography-stat">
            <span className="seo-stat-number">200%</span>
            <span className="seo-stat-label">Average Growth</span>
          </div>
          <div className="seo-typography-stat">
            <span className="seo-stat-number">5M+</span>
            <span className="seo-stat-label">Monthly Reach</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section 6: Split Screen Section with Single Image on Left - No Hover Effects
const SplitScreenSection = () => {
  return (
    <div className="seo-split">
      <div className="seo-split-container">
        <div className="seo-split-left">
          <div className="seo-split-image-wrapper">
            <img 
              src={splitScreenImage} 
              alt="Omnichannel Marketing Strategy"
              className="seo-split-single-image"
            />
            <div className="seo-split-glow"></div>
          </div>
        </div>
        <div className="seo-split-right">
          <span className="seo-section-badge">INTEGRATED APPROACH</span>
          <h2>Omnichannel <span className="seo-gradient-text">Marketing</span> That Works</h2>
          <p>We connect every touchpoint — from search to social, email to ads — creating seamless experiences that convert at every stage.</p>
          <div className="seo-split-features">
            <div className="seo-feature">✓ Cross-platform Integration</div>
            <div className="seo-feature">✓ Real-time Analytics</div>
            <div className="seo-feature">✓ AI-powered Optimization</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section 7: Performance Metrics Strip - No Hover Effects
const MetricsSection = () => {
  const metrics = [
    { number: "200%", label: "Average Growth", icon: "📈" },
    { number: "5M+", label: "Monthly Reach", icon: "👥" },
    { number: "120+", label: "Happy Clients", icon: "⭐" },
    { number: "98%", label: "Retention Rate", icon: "💯" }
  ];

  return (
    <div className="seo-metrics">
      <div className="seo-metrics-container">
        {metrics.map((metric, index) => (
          <motion.div 
            key={index} 
            className="seo-metric-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="seo-metric-icon">{metric.icon}</div>
            <div className="seo-metric-number">{metric.number}</div>
            <div className="seo-metric-label">{metric.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 8: Testimonial Wave Section - No Hover Effects
const TestimonialsSection = () => {
  const testimonials = [
    { text: "Nexonic transformed our digital presence. Our organic traffic increased by 300% in 6 months!", author: "Sarah Johnson", role: "CEO, TechStart" },
    { text: "The team's SEO expertise is unmatched. We're ranking #1 for our key keywords.", author: "Michael Chen", role: "Founder, DevFlow" },
    { text: "Their data-driven approach delivered results we couldn't achieve with other agencies.", author: "Emily Rodriguez", role: "Marketing Director" },
    { text: "Professional, creative, and results-focused. Highly recommend!", author: "David Kim", role: "CTO, InnovateLabs" }
  ];

  return (
    <div className="seo-testimonials">
      <div className="seo-section-header">
        <span className="seo-section-badge">CLIENT LOVE</span>
        <h2 className="seo-section-title">What Our <span className="seo-gradient-text">Clients Say</span></h2>
      </div>

      <div className="seo-testimonials-wave">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index} 
            className="seo-testimonial-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="seo-testimonial-quote">"</div>
            <p>{testimonial.text}</p>
            <div className="seo-testimonial-author">
              <strong>{testimonial.author}</strong>
              <span>{testimonial.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 9: Industry Expertise Section - No Hover Effects
const IndustrySection = () => {
  const industries = [
    { name: "E-commerce", icon: "🛍️", description: "Boost online sales with targeted strategies" },
    { name: "SaaS", icon: "☁️", description: "Drive user acquisition and retention" },
    { name: "Healthcare", icon: "🏥", description: "Navigate complex regulations with expertise" },
    { name: "Education", icon: "🎓", description: "Connect with students and educators" },
    { name: "Finance", icon: "💰", description: "Build trust and authority" },
    { name: "Entertainment", icon: "🎬", description: "Create buzz and engagement" }
  ];

  return (
    <div className="seo-industry">
      <div className="seo-section-header">
        <span className="seo-section-badge">INDUSTRY EXPERTISE</span>
        <h2 className="seo-section-title">We Speak Your <span className="seo-gradient-text">Language</span></h2>
        <p className="seo-section-subtitle">Specialized strategies for diverse business sectors</p>
      </div>

      <div className="seo-industry-grid">
        {industries.map((industry, index) => (
          <motion.div 
            key={index} 
            className="seo-industry-item"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <div className="seo-industry-icon">{industry.icon}</div>
            <h3>{industry.name}</h3>
            <p>{industry.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 10: Technology Stack Section - No Hover Effects
const TechnologySection = () => {
  const techs = [
    { name: "Google Analytics", icon: "📊", level: "Expert" },
    { name: "SEMrush", icon: "🔍", level: "Expert" },
    { name: "Ahrefs", icon: "📈", level: "Advanced" },
    { name: "Meta Ads Manager", icon: "📱", level: "Expert" },
    { name: "Google Ads", icon: "🎯", level: "Expert" },
    { name: "HubSpot", icon: "📧", level: "Advanced" },
    { name: "Salesforce", icon: "☁️", level: "Advanced" },
    { name: "Hotjar", icon: "🔥", level: "Expert" }
  ];

  return (
    <div className="seo-technology">
      <div className="seo-section-header">
        <span className="seo-section-badge">TECH STACK</span>
        <h2 className="seo-section-title">Powered by <span className="seo-gradient-text">Industry-Leading Tools</span></h2>
      </div>

      <div className="seo-tech-flow">
        {techs.map((tech, index) => (
          <motion.div 
            key={index} 
            className="seo-tech-item"
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <div className="seo-tech-icon">{tech.icon}</div>
            <div className="seo-tech-info">
              <h4>{tech.name}</h4>
              <span className="seo-tech-level">{tech.level}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 11: Final CTA - No Hover Effects
const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="seo-cta">
      <div className="seo-cta-background">
        <div className="seo-cta-glow"></div>
        <div className="seo-cta-grid"></div>
      </div>
      
      <div className="seo-cta-content">
        <motion.h2 
          className="seo-cta-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's Scale Your Brand <span className="seo-gradient-text">🚀</span>
        </motion.h2>
        <motion.p 
          className="seo-cta-description"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Ready to dominate your market? Let's create a custom strategy that drives real growth.
        </motion.p>
        
        <motion.div 
          className="seo-cta-buttons"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button className="seo-cta-primary" onClick={() => navigate('/get-started')}>
            Start Growing
            <span className="seo-btn-arrow">→</span>
          </button>
          <button className="seo-cta-secondary" onClick={() => navigate('/contact')}>
            Free Consultation
            <span className="seo-btn-arrow">→</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// Main SEO Component
const SEO = () => {
  return (
    <div className="seo-container">
      <Navbar />
      
      <Section className="seo-hero-section">
        <HeroSection />
      </Section>
      
      <MarqueeStrip />
      
      <Section className="seo-services-section">
        <ServicesSection />
      </Section>

      <Section className="seo-timeline-section">
        <TimelineSection />
      </Section>

      <Section className="seo-typography-section">
        <TypographySection />
      </Section>

      <Section className="seo-split-section">
        <SplitScreenSection />
      </Section>

      <Section className="seo-metrics-section">
        <MetricsSection />
      </Section>

      <Section className="seo-testimonials-section">
        <TestimonialsSection />
      </Section>

      <Section className="seo-industry-section">
        <IndustrySection />
      </Section>

      <Section className="seo-technology-section">
        <TechnologySection />
      </Section>

      <CTASection />

      <Footer />
    </div>
  );
};

export default SEO;