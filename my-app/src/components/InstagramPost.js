// InstagramPost.js - Updated with Consistent Navbar and Footer
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './InstagramPost.css';
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

// Navbar Component - SAME AS ALL OTHER PAGES
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDigitalMarketingDropdownOpen, setIsDigitalMarketingDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('instagram-post');
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

// Section 1: Hero Section - No Scroll Indicator
const HeroSection = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <div className="ip-hero">
      <div className="ip-hero-background">
        <div className="ip-hero-grid"></div>
        <div className="ip-hero-particles">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="ip-hero-particle"
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
      
      <div className="ip-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="ip-hero-badge">
            <span className="ip-hero-icon">📱</span> INSTAGRAM CREATIVE AGENCY
          </span>
        </motion.div>
        
        <motion.h1 
          className="ip-hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Scroll-Stopping <span className="ip-gradient-text">Instagram Posts</span>
          <span className="ip-hero-rocket">🚀</span>
        </motion.h1>
        
        <motion.p 
          className="ip-hero-description"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          We design viral-worthy posts that boost engagement, grow your audience, and elevate your brand on Instagram.
        </motion.p>
        
        <motion.div 
          className="ip-hero-buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="ip-btn-primary" onClick={() => navigate('/contact')}>
            Start Designing
            <span className="ip-btn-arrow">→</span>
          </button>
          <button className="ip-btn-outline" onClick={() => {
            document.getElementById('ip-showcase-strip').scrollIntoView({ behavior: 'smooth' });
          }}>
            View Designs
            <span className="ip-btn-arrow">→</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator removed */}
    </div>
  );
};

// Section 2: Post Style Showcase Strip
const ShowcaseStrip = () => {
  const postTypes = [
    "Carousel Posts", "Reels Covers", "Promotional Posts", 
    "Quote Designs", "Ads Creatives", "Story Templates", 
    "Product Showcase", "Behind the Scenes"
  ];

  return (
    <div className="ip-showcase-strip" id="ip-showcase-strip">
      <div className="ip-strip-container">
        <div className="ip-strip-track">
          {[...postTypes, ...postTypes].map((type, index) => (
            <div key={index} className="ip-strip-item">
              <span className="ip-strip-glow"></span>
              {type}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 3: Content Ideas Flow
const ContentIdeasFlow = () => {
  const ideas = [
    { title: "Tips & Tricks", description: "Share valuable insights that educate your audience", icon: "💡", direction: "left" },
    { title: "Product Highlights", description: "Showcase your products in creative ways", icon: "✨", direction: "right" },
    { title: "Before/After", description: "Demonstrate transformation and results", icon: "🔄", direction: "left" },
    { title: "Offers & Discounts", description: "Create urgency with limited-time promotions", icon: "🏷️", direction: "right" },
    { title: "Educational Posts", description: "Establish authority with knowledge sharing", icon: "📚", direction: "left" }
  ];

  return (
    <div className="ip-content-flow">
      <div className="ip-section-header">
        <span className="ip-section-badge">CONTENT IDEAS</span>
        <h2 className="ip-section-title">Viral Content <span className="ip-gradient-text">Concepts</span></h2>
      </div>

      <div className="ip-wave-container">
        {ideas.map((idea, index) => (
          <motion.div 
            key={index} 
            className={`ip-wave-item ${idea.direction}`}
            initial={{ opacity: 0, x: idea.direction === 'left' ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="ip-wave-icon">{idea.icon}</div>
            <div className="ip-wave-content">
              <h3>{idea.title}</h3>
              <p>{idea.description}</p>
              <div className="ip-wave-glow"></div>
            </div>
          </motion.div>
        ))}
        <div className="ip-wave-line"></div>
      </div>
    </div>
  );
};

// Section 4: Instagram Grid Preview
const GridPreview = () => {
  const posts = [
    { color: "#C6FF00", rotate: -3, offset: -10, image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=300&h=300&fit=crop" },
    { color: "#7CFF3A", rotate: 2, offset: 5, image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300&h=300&fit=crop" },
    { color: "#B6FF1A", rotate: -1, offset: -5, image: "https://images.unsplash.com/photo-1536240476400-bc1b8a3e7a6f?w=300&h=300&fit=crop" },
    { color: "#C6FF00", rotate: 4, offset: 8, image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=300&fit=crop" },
    { color: "#7CFF3A", rotate: -2, offset: -8, image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop" },
    { color: "#B6FF1A", rotate: 1, offset: 3, image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=300&fit=crop" },
    { color: "#C6FF00", rotate: -4, offset: -3, image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=300&h=300&fit=crop" },
    { color: "#7CFF3A", rotate: 3, offset: 6, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop" },
    { color: "#B6FF1A", rotate: -5, offset: -12, image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&h=300&fit=crop" }
  ];

  return (
    <div className="ip-grid-preview">
      <div className="ip-section-header">
        <span className="ip-section-badge">FEED PREVIEW</span>
        <h2 className="ip-section-title">Instagram <span className="ip-gradient-text">Grid Aesthetic</span></h2>
      </div>

      <div className="ip-grid-container">
        {posts.map((post, index) => (
          <div 
            key={index} 
            className="ip-grid-item"
            style={{
              transform: `rotate(${post.rotate}deg) translateY(${post.offset}px)`,
              borderColor: post.color
            }}
          >
            <img src={post.image} alt={`Post ${index + 1}`} className="ip-grid-image" />
            <div className="ip-grid-overlay" style={{ background: `linear-gradient(135deg, ${post.color}20, transparent)` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Section 5: Caption + Hashtag Strategy
const CaptionStrategy = () => {
  const [activeText, setActiveText] = useState(0);
  
  const hooks = [
    "✨ Stop scrolling! This is for you...",
    "💡 The secret to viral content?",
    "🔥 3 things nobody tells you about...",
    "⚠️ Warning: This might change your mind"
  ];

  const ctas = [
    "👉 Double tap if you agree!",
    "💬 Drop your thoughts below!",
    "📌 Save this for later!",
    "🔄 Share with a friend!"
  ];

  const hashtags = ["#growth", "#viral", "#marketing", "#instagramtips", "#socialmedia", "#branding"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveText((prev) => (prev + 1) % hooks.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ip-caption-strategy">
      <div className="ip-caption-container">
        <div className="ip-caption-left">
          <span className="ip-section-badge">COPYWRITING</span>
          <h2 className="ip-caption-title">Captions That <span className="ip-gradient-text">Convert</span> ✍️</h2>
          <div className="ip-caption-hooks">
            <div className="ip-hook-label">Powerful Hooks</div>
            <motion.div 
              key={activeText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="ip-hook-text"
            >
              {hooks[activeText]}
            </motion.div>
          </div>
          <div className="ip-cta-examples">
            <div className="ip-cta-label">Strong CTAs</div>
            {ctas.map((cta, i) => (
              <div key={i} className="ip-cta-item">{cta}</div>
            ))}
          </div>
        </div>
        
        <div className="ip-caption-right">
          <div className="ip-hashtag-cloud">
            <div className="ip-hashtag-label">Trending Hashtags</div>
            <div className="ip-hashtag-list">
              {hashtags.map((tag, i) => (
                <span key={i} className="ip-hashtag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="ip-caption-glow"></div>
        </div>
      </div>
    </div>
  );
};

// Section 6: Engagement Boost Elements
const EngagementBoost = () => {
  const elements = [
    { icon: "❤️", label: "Likes", count: "10K+", color: "#FF4D4D" },
    { icon: "💬", label: "Comments", count: "500+", color: "#4CAF50" },
    { icon: "🔁", label: "Shares", count: "2K+", color: "#C6FF00" },
    { icon: "📌", label: "Saves", count: "5K+", color: "#FFB347" }
  ];

  return (
    <div className="ip-engagement">
      <div className="ip-section-header">
        <span className="ip-section-badge">ENGAGEMENT</span>
        <h2 className="ip-section-title">Boost Your <span className="ip-gradient-text">Metrics</span></h2>
      </div>

      <div className="ip-engagement-container">
        {elements.map((el, index) => (
          <motion.div 
            key={index} 
            className="ip-engagement-element"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="ip-engagement-icon" style={{ textShadow: `0 0 20px ${el.color}` }}>{el.icon}</div>
            <div className="ip-engagement-count" style={{ color: el.color }}>{el.count}</div>
            <div className="ip-engagement-label">{el.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 7: Post Creation Process
const CreationProcess = () => {
  const steps = [
    { step: "01", title: "Idea", description: "Brainstorm creative concepts that resonate", icon: "💡", direction: "left" },
    { step: "02", title: "Design", description: "Create stunning visuals with strategic elements", icon: "🎨", direction: "right" },
    { step: "03", title: "Caption", description: "Write compelling copy that drives action", icon: "✍️", direction: "left" },
    { step: "04", title: "Publish", description: "Optimize timing and engagement strategy", icon: "📤", direction: "right" },
    { step: "05", title: "Analyze", description: "Track performance and iterate for success", icon: "📊", direction: "left" }
  ];

  return (
    <div className="ip-process">
      <div className="ip-section-header">
        <span className="ip-section-badge">CREATION PROCESS</span>
        <h2 className="ip-section-title">From Concept to <span className="ip-gradient-text">Viral</span></h2>
      </div>

      <div className="ip-process-zigzag">
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className={`ip-process-step ${step.direction}`}
            initial={{ opacity: 0, x: step.direction === 'left' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
          >
            <div className="ip-step-number">{step.step}</div>
            <div className="ip-step-icon">{step.icon}</div>
            <div className="ip-step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {index < steps.length - 1 && <div className="ip-step-connector"></div>}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 8: Before / After Transformation with Images
const BeforeAfter = () => {
  const [isAfter, setIsAfter] = useState(false);

  return (
    <div className="ip-before-after">
      <div className="ip-section-header">
        <span className="ip-section-badge">TRANSFORMATION</span>
        <h2 className="ip-section-title">Before <span className="ip-gradient-text">→ After</span></h2>
      </div>

      <div className="ip-comparison-container">
        <motion.div 
          className={`ip-comparison-side ${!isAfter ? 'active' : ''}`}
          onClick={() => setIsAfter(false)}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="ip-comparison-label">Ordinary Post</div>
          <div className="ip-comparison-content">
            <div className="ip-before-post">
              <img 
                src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400&h=400&fit=crop" 
                alt="Before - Ordinary Instagram Post"
                className="ip-comparison-image"
              />
              <div className="ip-before-stats">❤️ 50 likes | 💬 5 comments</div>
            </div>
          </div>
        </motion.div>
        
        <div className="ip-comparison-arrow">→</div>
        
        <motion.div 
          className={`ip-comparison-side ${isAfter ? 'active' : ''}`}
          onClick={() => setIsAfter(true)}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="ip-comparison-label">Viral Design</div>
          <div className="ip-comparison-content">
            <div className="ip-after-post">
              <div className="ip-after-glow"></div>
              <img 
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop" 
                alt="After - Viral Instagram Post Design"
                className="ip-comparison-image ip-after-image"
              />
              <div className="ip-after-stats">❤️ 5.2K | 💬 234 | 🔁 1.2K | 📌 890</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Section 9: Final CTA
const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="ip-cta">
      <div className="ip-cta-background">
        <div className="ip-cta-grid"></div>
        <div className="ip-cta-glow"></div>
      </div>
      
      <div className="ip-cta-content">
        <motion.h2 
          className="ip-cta-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Ready to Go Viral? <span className="ip-gradient-text">🔥</span>
        </motion.h2>
        <motion.p 
          className="ip-cta-description"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Join hundreds of brands that trust us to create scroll-stopping Instagram content.
        </motion.p>
        
        <motion.div 
          className="ip-cta-buttons"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button className="ip-cta-primary" onClick={() => navigate('/contact')}>
            Start Designing
            <span className="ip-btn-arrow">→</span>
          </button>
          <button className="ip-cta-secondary" onClick={() => navigate('/contact')}>
            Get Free Strategy
            <span className="ip-btn-arrow">→</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// Main InstagramPost Component
const InstagramPost = () => {
  return (
    <div className="ip-container">
      <Navbar />
      
      <Section className="ip-hero-section">
        <HeroSection />
      </Section>
      
      <ShowcaseStrip />
      
      <Section className="ip-content-section">
        <ContentIdeasFlow />
      </Section>

      <Section className="ip-grid-section">
        <GridPreview />
      </Section>

      <Section className="ip-caption-section">
        <CaptionStrategy />
      </Section>

      <Section className="ip-engagement-section">
        <EngagementBoost />
      </Section>

      <Section className="ip-process-section">
        <CreationProcess />
      </Section>

      <Section className="ip-beforeafter-section">
        <BeforeAfter />
      </Section>

      <CTASection />

      <Footer />
    </div>
  );
};

export default InstagramPost;