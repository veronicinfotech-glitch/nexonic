// VideoEditing.js - Updated with Consistent Navbar and Footer
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './VideoEditing.css';
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
  const [activeLink, setActiveLink] = useState('video-editing');
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

// Section 1: Hero Section with Parallax
const HeroSection = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  return (
    <div className="ve-hero">
      <motion.div className="ve-hero-background" style={{ y }}>
        <div className="ve-hero-gradient"></div>
        <div className="ve-hero-grid"></div>
        <div className="ve-hero-particles">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="ve-hero-particle"
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
      </motion.div>
      
      <motion.div className="ve-hero-content" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="ve-hero-badge">PREMIUM VIDEO EDITING</span>
        </motion.div>
        
        <motion.h1 
          className="ve-hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Video Editing That <span className="ve-gradient-text">Feels Alive</span>
        </motion.h1>
        
        <motion.p 
          className="ve-hero-description"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Transform your vision into cinematic stories that captivate, engage, and inspire.
        </motion.p>
        
        <motion.div 
          className="ve-hero-buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="ve-btn-primary" onClick={() => navigate('/contact')}>
            Start Project
            <span className="ve-btn-arrow">→</span>
          </button>
          <button className="ve-btn-outline" onClick={() => {
            document.getElementById('ve-showcase').scrollIntoView({ behavior: 'smooth' });
          }}>
            View Work
            <span className="ve-btn-arrow">→</span>
          </button>
        </motion.div>
      </motion.div>

      <div className="ve-scroll-indicator" onClick={() => {
        document.getElementById('ve-services').scrollIntoView({ behavior: 'smooth' });
      }}>
        <span>Scroll to explore</span>
        <div className="ve-scroll-line"></div>
      </div>
    </div>
  );
};

// Section 2: Services - Scroll Reveal Vertical Stack
const ServicesSection = () => {
  const services = [
    { title: "Short-form Editing", description: "Create viral-worthy short videos optimized for TikTok, Instagram Reels, and YouTube Shorts that capture attention instantly.", icon: "🎬" },
    { title: "YouTube Videos", description: "Professional YouTube content with engaging intros, seamless transitions, and retention-focused editing.", icon: "📺" },
    { title: "Reels / Shorts", description: "Scroll-stopping vertical content designed for maximum engagement on social media platforms.", icon: "📱" },
    { title: "Motion Graphics", description: "Stunning animated graphics, kinetic typography, and visual effects that bring your brand to life.", icon: "✨" },
    { title: "Color Grading", description: "Professional color correction and grading that establishes mood and gives your videos a cinematic look.", icon: "🎨" }
  ];

  return (
    <div className="ve-services" id="ve-services">
      <div className="ve-section-header">
        <span className="ve-section-badge">WHAT WE CREATE</span>
        <h2 className="ve-section-title">Editing Services That <span className="ve-gradient-text">Stand Out</span></h2>
        <p className="ve-section-subtitle">Professional editing tailored to your unique vision and goals</p>
      </div>

      <div className="ve-services-stack">
        {services.map((service, index) => (
          <motion.div 
            key={index} 
            className="ve-service-item"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="ve-service-icon">{service.icon}</div>
            <div className="ve-service-info">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <div className="ve-service-divider"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 3: Interactive Features - Hover Reactive Area
const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  
  const features = [
    { title: "Fast Editing", description: "Lightning-fast turnaround without compromising quality.", icon: "⚡" },
    { title: "Smooth Transitions", description: "Seamless cuts and transitions that flow naturally.", icon: "🔄" },
    { title: "Audio Sync", description: "Perfect audio synchronization for professional sound.", icon: "🎵" },
    { title: "Effects & Motion", description: "Dynamic effects that enhance visual storytelling.", icon: "✨" },
    { title: "HD Export", description: "4K, 8K, and professional-grade exports.", icon: "🎯" }
  ];

  return (
    <div className="ve-features">
      <div className="ve-section-header">
        <span className="ve-section-badge">CAPABILITIES</span>
        <h2 className="ve-section-title">Powerful <span className="ve-gradient-text">Features</span></h2>
      </div>

      <div className="ve-features-horizontal">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className={`ve-feature-block ${activeFeature === index ? 'active' : ''}`}
            onMouseEnter={() => setActiveFeature(index)}
            onMouseLeave={() => setActiveFeature(null)}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="ve-feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <div className="ve-feature-line"></div>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 4: Process - Vertical Timeline
const ProcessSection = () => {
  const steps = [
    { step: "01", title: "Upload", description: "Share your raw footage and creative brief with our team.", icon: "📤" },
    { step: "02", title: "Edit", description: "Professional editing with precision cuts and sequencing.", icon: "✂️" },
    { step: "03", title: "Enhance", description: "Motion graphics, color grading, and sound design.", icon: "✨" },
    { step: "04", title: "Deliver", description: "Final export and delivery optimized for your platform.", icon: "🚀" }
  ];

  return (
    <div className="ve-process">
      <div className="ve-section-header">
        <span className="ve-section-badge">OUR PROCESS</span>
        <h2 className="ve-section-title">How We <span className="ve-gradient-text">Work</span></h2>
      </div>

      <div className="ve-timeline">
        <div className="ve-timeline-line"></div>
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className="ve-timeline-step"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="ve-timeline-marker">
              <span>{step.step}</span>
            </div>
            <div className="ve-timeline-content">
              <div className="ve-timeline-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 5: Showcase Section
const ShowcaseSection = () => {
  const showcases = [
    { title: "Cinematic Commercial", description: "Stunning motion graphics and visual effects", image: "https://images.unsplash.com/photo-1536240476400-bc1b8a3e7a6f?w=600&h=400&fit=crop", category: "Commercial" },
    { title: "YouTube Vlog Series", description: "Engaging content with smooth transitions", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop", category: "Content" },
    { title: "Instagram Reel", description: "Scroll-stopping short-form content", image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop", category: "Social" },
    { title: "Product Launch", description: "Professional color grading and effects", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop", category: "Marketing" },
    { title: "Music Video", description: "Dynamic editing with visual effects", image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop", category: "Entertainment" },
    { title: "Brand Story", description: "Cinematic storytelling that inspires", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop", category: "Branding" }
  ];

  return (
    <div className="ve-showcase" id="ve-showcase">
      <div className="ve-section-header">
        <span className="ve-section-badge">OUR WORK</span>
        <h2 className="ve-section-title">Creative <span className="ve-gradient-text">Showcase</span></h2>
        <p className="ve-section-subtitle">Explore our latest video editing projects and creative work</p>
      </div>

      <div className="ve-showcase-grid">
        {showcases.map((item, index) => (
          <motion.div 
            key={index} 
            className="ve-showcase-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="ve-showcase-image">
              <img src={item.image} alt={item.title} />
              <div className="ve-showcase-overlay">
                <span className="ve-showcase-category">{item.category}</span>
              </div>
            </div>
            <div className="ve-showcase-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 6: Developer Use - Split Layout with Single Image
const DeveloperSection = () => {
  const uses = [
    { title: "Product Demos", description: "Showcase your app's features with polished demo videos that convert users.", icon: "📱" },
    { title: "SaaS Promotion", description: "Explain your software's value with engaging explainer videos that drive adoption.", icon: "🚀" },
    { title: "Portfolio Videos", description: "Make your developer portfolio stand out with professional video case studies.", icon: "💼" }
  ];

  return (
    <div className="ve-developer">
      <div className="ve-developer-container">
        <motion.div 
          className="ve-developer-content"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="ve-section-badge">FOR DEVELOPERS</span>
          <h2 className="ve-developer-title">Perfect for <span className="ve-gradient-text">Tech Creators</span></h2>
          <p className="ve-developer-description">We understand developers and tech creators. Our video editing services help you showcase your work and grow your brand.</p>
          
          <div className="ve-developer-uses">
            {uses.map((use, index) => (
              <div key={index} className="ve-use-item">
                <div className="ve-use-icon">{use.icon}</div>
                <div>
                  <h4>{use.title}</h4>
                  <p>{use.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="ve-developer-visual"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="ve-developer-single-image">
            <img 
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=500&fit=crop" 
              alt="Developer coding" 
              className="ve-dev-single-img"
            />
            <div className="ve-dev-single-overlay"></div>
            <div className="ve-dev-single-glow"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Section 7: Final CTA
const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="ve-cta">
      <div className="ve-cta-content">
        <motion.h2 
          className="ve-cta-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's Create Something <span className="ve-gradient-text">Powerful</span>
        </motion.h2>
        <motion.p 
          className="ve-cta-description"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Ready to transform your vision into stunning video content? Let's bring your story to life.
        </motion.p>
        
        <motion.div 
          className="ve-cta-buttons"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button className="ve-cta-primary" onClick={() => navigate('/contact')}>
            Start Editing
            <span className="ve-btn-arrow">→</span>
          </button>
          <button className="ve-cta-secondary" onClick={() => navigate('/contact')}>
            Contact Us
            <span className="ve-btn-arrow">→</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// Main VideoEditing Component
const VideoEditing = () => {
  return (
    <div className="ve-container">
      <Navbar />
      
      <Section className="ve-hero-section">
        <HeroSection />
      </Section>
      
      <Section className="ve-services-section">
        <ServicesSection />
      </Section>

      <Section className="ve-features-section">
        <FeaturesSection />
      </Section>

      <Section className="ve-process-section">
        <ProcessSection />
      </Section>

      <Section className="ve-showcase-section">
        <ShowcaseSection />
      </Section>

      <Section className="ve-developer-section">
        <DeveloperSection />
      </Section>

      <CTASection />

      <Footer />
    </div>
  );
};

export default VideoEditing;