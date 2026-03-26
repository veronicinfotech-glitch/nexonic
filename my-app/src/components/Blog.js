// Blog.js - Updated with Consistent Navbar and Footer
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Blog.css';
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
  const [activeLink, setActiveLink] = useState('blog');
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

// Hero Section Component
const HeroSection = () => {
  return (
    <motion.div 
      className="hero-section-unique"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-gradient-1"></div>
      <div className="hero-gradient-2"></div>
      <div className="hero-particles">
        {[...Array(40)].map((_, i) => (
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
              background: i % 3 === 0 ? "#C6FF00" : i % 3 === 1 ? "#7CFF3A" : "#B6FF1A",
            }}
          />
        ))}
      </div>
      <motion.div 
        className="hero-content-wrapper"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.span 
          className="hero-year-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          EST. 2026
        </motion.span>
        <span className="hero-tagline">NEXONIC BLOG</span>
        <motion.h1 
          className="hero-main-title"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Ideas, Insights & <span className="gradient-text">Digital Strategies</span>
        </motion.h1>
        <motion.p 
          className="hero-description-text"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Explore expert perspectives on digital marketing, web development, and technology trends. 
          Your daily dose of knowledge from industry leaders.
        </motion.p>
        <motion.div 
          className="hero-actions"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <motion.button 
            className="btn-primary-custom"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            Explore Articles
          </motion.button>
          <motion.button 
            className="btn-outline-custom"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            Latest Insights
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div 
        className="scroll-indicator-custom"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>Discover</span>
        <div className="scroll-line-custom"></div>
      </motion.div>
    </motion.div>
  );
};

// Featured Article Section
const FeaturedArticleSection = () => {
  return (
    <div className="featured-unique">
      <div className="featured-container">
        <span className="featured-year-tag">2026 FEATURE</span>
        <div className="featured-split-layout">
          <motion.div 
            className="featured-content-panel"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="featured-category">SEO & PERFORMANCE</span>
            <h2 className="featured-headline">
              How SEO and Web Performance Together Drive Business Growth
            </h2>
            <p className="featured-summary">
              Discover the powerful synergy between technical SEO and website performance optimization. 
              Learn how improving page speed by just 1 second can increase conversions by 27% and boost 
              organic rankings significantly.
            </p>
            <div className="featured-author-details">
              <div className="author-avatar">SC</div>
              <div className="author-info">
                <span className="author-fullname">Sarah Chen</span>
                <span className="author-title">SEO Specialist</span>
              </div>
              <span className="featured-date">March 15, 2026</span>
              <span className="featured-read-time">12 min read</span>
            </div>
          </motion.div>
          <motion.div 
            className="featured-visual-panel"
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="featured-image-frame">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" 
                alt="SEO and Web Performance"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Digital Marketing Knowledge - Magazine Style Layout
const MarketingKnowledgeSection = () => {
  const articles = [
    {
      id: 1,
      title: 'SEO Strategies for 2026',
      description: 'Voice search, AI algorithms, and zero-click searches - the new frontier of SEO',
      category: 'SEO',
      readTime: '8 min',
      number: '01'
    },
    {
      id: 2,
      title: 'Social Media Algorithm Growth',
      description: 'How to leverage AI-driven algorithms for organic reach in 2026',
      category: 'Social Media',
      readTime: '6 min',
      number: '02'
    },
    {
      id: 3,
      title: 'Google Ads Optimization',
      description: 'Advanced strategies for maximizing ROAS in competitive markets',
      category: 'PPC',
      readTime: '10 min',
      number: '03'
    },
    {
      id: 4,
      title: 'Content Marketing Trends',
      description: 'Interactive content, personalization, and AI-generated media',
      category: 'Content',
      readTime: '7 min',
      number: '04'
    },
    {
      id: 5,
      title: 'Email Marketing Automation',
      description: 'Building customer journeys that convert with AI-powered tools',
      category: 'Email',
      readTime: '5 min',
      number: '05'
    },
    {
      id: 6,
      title: 'Analytics & Data Insights',
      description: 'Turning data into actionable marketing strategies',
      category: 'Analytics',
      readTime: '9 min',
      number: '06'
    }
  ];

  return (
    <div className="marketing-magazine">
      <div className="magazine-header">
        <span className="magazine-year">2026 EDITION</span>
        <h2 className="magazine-title">Digital Marketing Knowledge</h2>
        <p className="magazine-subtitle">Latest insights from our marketing experts</p>
      </div>
      <div className="magazine-grid">
        {articles.map((article, index) => (
          <motion.div 
            key={article.id} 
            className="magazine-item"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -3, borderColor: '#C6FF00' }}
          >
            <div className="magazine-number">{article.number}</div>
            <div className="magazine-content">
              <span className="magazine-category">{article.category}</span>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className="magazine-meta">
                <span className="magazine-read-time">{article.readTime} read</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Web Development Insights - Enhanced with Different Colors for Categories
const WebDevInsightsSection = () => {
  const articles = [
    {
      id: 1,
      title: 'Modern React Development Techniques for 2026',
      description: 'Exploring Server Components, Suspense, and the future of React in 2026.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      category: 'Frontend',
      author: 'David Kim',
      date: 'Mar 12, 2026',
      color: '#C6FF00'
    },
    {
      id: 2,
      title: 'Performance Optimization Strategies for 2026',
      description: 'Core Web Vitals, image optimization, and advanced caching strategies.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop',
      category: 'Performance',
      author: 'Michael Lee',
      date: 'Mar 10, 2026',
      color: '#7CFF3A'
    },
    {
      id: 3,
      title: 'UI/UX Trends Shaping 2026',
      description: 'Micro-interactions, 3D elements, and hyper-personalization.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop',
      category: 'Design',
      author: 'Emily Watson',
      date: 'Mar 8, 2026',
      color: '#B6FF1A'
    },
    {
      id: 4,
      title: 'AI-Powered Development in 2026',
      description: 'How AI coding assistants are changing the way developers work.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
      category: 'AI',
      author: 'James Wilson',
      date: 'Mar 5, 2026',
      color: '#C6FF00'
    }
  ];

  return (
    <div className="webdev-enhanced">
      <div className="webdev-header">
        <motion.span 
          className="webdev-year"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          2026 TRENDS
        </motion.span>
        <motion.h2 
          className="webdev-title"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          viewport={{ once: true }}
        >
          Web Development Insights
        </motion.h2>
        <motion.p 
          className="webdev-subtitle"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Deep dives into modern development practices for 2026
        </motion.p>
      </div>
      <div className="webdev-enhanced-list">
        {articles.map((article, index) => (
          <motion.div 
            key={article.id} 
            className="webdev-enhanced-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="webdev-enhanced-image">
              <img src={article.image} alt={article.title} />
              <div className="webdev-image-overlay-enhanced">
                <span className="webdev-image-category-enhanced">2026</span>
              </div>
            </div>
            <div className="webdev-enhanced-content">
              <motion.span 
                className="webdev-item-category-enhanced"
                style={{ color: article.color }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.1 }}
              >
                {article.category}
              </motion.span>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className="webdev-meta-enhanced">
                <span className="webdev-author-enhanced" style={{ color: article.color }}>By {article.author}</span>
                <span className="webdev-date-enhanced">{article.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Industry Trends Timeline
const TrendsTimelineSection = () => {
  const trends = [
    {
      year: '2024',
      title: 'AI in Digital Marketing',
      description: 'Generative AI transforms content creation and personalization.'
    },
    {
      year: '2025',
      title: 'Automation Tools',
      description: 'End-to-end marketing automation platforms.'
    },
    {
      year: '2026',
      title: 'Future of Web Applications',
      description: 'Server components and AI-integrated interfaces.'
    },
    {
      year: '2027',
      title: 'Data-Driven Marketing',
      description: 'Predictive analytics and real-time data processing.'
    },
    {
      year: '2028',
      title: 'Voice & Visual Search',
      description: 'Multimodal search experiences.'
    }
  ];

  return (
    <div className="trends-timeline-unique">
      <div className="trends-header">
        <span className="trends-year-badge">2024-2028</span>
        <h2 className="trends-title">Industry Trends Timeline</h2>
        <p className="trends-subtitle">The future of digital marketing and development</p>
      </div>
      <div className="trends-container">
        {trends.map((trend, index) => (
          <motion.div 
            key={index} 
            className="trends-block"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ x: 5 }}
          >
            <div className="trends-year-marker">
              <span className="trends-year">{trend.year}</span>
              <div className="trends-line"></div>
            </div>
            <div className="trends-content">
              <h3>{trend.title}</h3>
              <p>{trend.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Quick Expert Tips
const ExpertTipsSection = () => {
  const tips = [
    {
      text: "Page speed directly impacts SEO rankings. A 1-second delay can reduce conversions by 7%.",
      emphasis: "7% conversion loss"
    },
    {
      text: "User experience is the foundation of digital success. 88% of users never return after a bad experience.",
      emphasis: "88% never return"
    },
    {
      text: "Mobile-first design is no longer optional. 73% of users will be mobile-only by 2027.",
      emphasis: "73% mobile-only"
    },
    {
      text: "Content personalization can increase engagement by 74% and drive 6x higher transactions.",
      emphasis: "6x higher transactions"
    },
    {
      text: "AI-powered chatbots handle 85% of customer service interactions.",
      emphasis: "85% automation"
    },
    {
      text: "Voice search will account for 50% of all online searches by 2027.",
      emphasis: "50% voice search"
    },
    {
      text: "83% of marketers say AI tools help create more engaging content.",
      emphasis: "83% more engaging"
    },
    {
      text: "Websites with blogs have 434% more indexed pages.",
      emphasis: "434% more pages"
    }
  ];

  return (
    <div className="tips-wall">
      <div className="tips-wall-header">
        <span className="tips-year">EXPERT WISDOM 2026</span>
        <h2 className="tips-wall-title">Quick Expert Tips</h2>
        <p className="tips-wall-subtitle">Bite-sized wisdom from our specialists</p>
      </div>
      <div className="tips-wall-grid">
        {tips.map((tip, index) => (
          <motion.div 
            key={index} 
            className="wall-tip"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            viewport={{ once: true }}
            whileHover={{ y: -3, borderColor: '#C6FF00' }}
          >
            <div className="wall-tip-number">0{index + 1}</div>
            <p className="wall-tip-text">
              <span className="wall-tip-emphasis">{tip.emphasis}</span> — {tip.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Subscribe Section
const SubscribeSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <motion.div 
      className="subscribe-enhanced"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="subscribe-glow-bg-enhanced">
        <div className="glow-orb-1"></div>
        <div className="glow-orb-2"></div>
      </div>
      <motion.div 
        className="subscribe-content-enhanced"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <motion.span 
          className="subscribe-badge-enhanced"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.1 }}
        >
          JOIN OUR 2026 COMMUNITY
        </motion.span>
        <h2 className="subscribe-title-enhanced">
          Stay Updated With <span className="gradient-text">Digital Innovation</span>
        </h2>
        <p className="subscribe-description-enhanced">
          Join 5,000+ marketers and developers who receive our weekly insights on the latest trends 
          and technologies shaping the digital landscape in 2026.
        </p>
        <form className="subscribe-form-enhanced" onSubmit={handleSubmit}>
          <div className="input-group-enhanced">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <motion.button 
              type="submit" 
              className="subscribe-btn-enhanced"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              Subscribe Now
            </motion.button>
          </div>
        </form>
        <p className="privacy-note-enhanced">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </motion.div>
    </motion.div>
  );
};

// Main Blog Component
const Blog = () => {
  return (
    <div className="blog-container">
      <Navbar />
      
      <Section className="blog-section bg-gradient-1">
        <HeroSection />
      </Section>

      <Section className="blog-section bg-gradient-2">
        <FeaturedArticleSection />
      </Section>

      <Section className="blog-section bg-gradient-3">
        <MarketingKnowledgeSection />
      </Section>

      <Section className="blog-section bg-gradient-4">
        <WebDevInsightsSection />
      </Section>

      <Section className="blog-section bg-gradient-5">
        <TrendsTimelineSection />
      </Section>

      <Section className="blog-section bg-gradient-6">
        <ExpertTipsSection />
      </Section>

      <Section className="blog-section bg-gradient-7">
        <SubscribeSection />
      </Section>

      <Footer />
    </div>
  );
};

export default Blog;