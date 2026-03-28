// LogoDesign.js - Updated with Consistent Navbar and Footer
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './LogoDesign.css';
import logo from "../image/logo.jpg";

// Import local images
import brandImage from "../image/logo1.jpg";
import developerImage from "../image/logo2.png";

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
  const [activeLink, setActiveLink] = useState('logo-design');
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

// Section 1: Hero Section - No background image, no scroll indicator
const HeroSection = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <div className="ld-hero">
      <div className="ld-hero-background">
        <div className="ld-hero-grid"></div>
        <div className="ld-hero-particles">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="ld-hero-particle"
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
      
      <div className="ld-hero-content">
        <motion.div 
          className="ld-hero-text"
          style={{ opacity }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="ld-hero-line-top"
          ></motion.div>
          
          <motion.h1 
            className="ld-hero-title"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Logo Design
            <span className="ld-hero-title-alt">That Builds</span>
            <span className="ld-gradient-text">Identity</span>
          </motion.h1>
          
          <motion.p 
            className="ld-hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            For developers, startups, and visionaries — create a visual identity that speaks your brand's story.
          </motion.p>
          
          <motion.div 
            className="ld-hero-buttons"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button className="ld-btn-primary" onClick={() => navigate('/contact')}>
              Start Design
              <span className="ld-btn-arrow">→</span>
            </button>
            <button className="ld-btn-outline" onClick={() => {
              document.getElementById('ld-showcase').scrollIntoView({ behavior: 'smooth' });
            }}>
              View Portfolio
              <span className="ld-btn-arrow">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Section 2: Brand Identity Section with Local Image
const BrandIdentitySection = () => {
  return (
    <div className="ld-brand" id="ld-brand-identity">
      <div className="ld-brand-container">
        <div className="ld-brand-content">
          <span className="ld-section-badge">BRAND IDENTITY</span>
          <h2 className="ld-brand-title">Your logo is more than <span className="ld-gradient-text">a symbol</span></h2>
          <p className="ld-brand-description">
            For developers and tech creators, a logo represents your code's soul. It's the first impression, 
            the memory anchor, and the visual voice of your product. We create identities that resonate 
            with your audience and stand the test of time.
          </p>
          <div className="ld-brand-stats">
            <div className="ld-stat">
              <span className="ld-stat-number">150+</span>
              <span className="ld-stat-label">Logos Created</span>
            </div>
            <div className="ld-stat">
              <span className="ld-stat-number">98%</span>
              <span className="ld-stat-label">Client Satisfaction</span>
            </div>
          </div>
        </div>
        
        <div className="ld-brand-visual">
          <img 
            src={brandImage} 
            alt="Logo Design Process"
            className="ld-brand-image"
          />
        </div>
      </div>
    </div>
  );
};

// Section 3: Services Section
const ServicesSection = () => {
  const services = [
    { title: "Minimal Logo", description: "Clean, timeless, and versatile designs that work across all platforms.", icon: "◌", color: "#C6FF00" },
    { title: "3D Logo", description: "Dynamic, dimensional logos that pop with depth and modern appeal.", icon: "◆", color: "#7CFF3A" },
    { title: "Brand Identity Kit", description: "Complete visual identity including colors, typography, and brand guidelines.", icon: "◈", color: "#B6FF1A" },
    { title: "Startup Logo", description: "Bold, memorable logos that help new ventures stand out.", icon: "★", color: "#C6FF00" },
    { title: "Rebranding", description: "Fresh, modern updates for established brands seeking new direction.", icon: "⟳", color: "#7CFF3A" }
  ];

  return (
    <div className="ld-services" id="ld-services">
      <div className="ld-section-header">
        <span className="ld-section-badge">WHAT WE CREATE</span>
        <h2 className="ld-section-title">Logo Design <span className="ld-gradient-text">Services</span></h2>
        <p className="ld-section-subtitle">Tailored visual identities for every brand story</p>
      </div>

      <div className="ld-services-stack">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="ld-service-item"
          >
            <div className="ld-service-icon" style={{ color: service.color }}>
              {service.icon}
            </div>
            <div className="ld-service-info">
              <h3 className="ld-service-title">{service.title}</h3>
              <p className="ld-service-description">{service.description}</p>
            </div>
            <div className="ld-service-line"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Section 4: Design Process
const ProcessSection = () => {
  const steps = [
    { step: "01", title: "Idea", description: "We dive deep into your brand story and vision to understand your unique identity.", icon: "💡" },
    { step: "02", title: "Sketch", description: "Creative exploration and concept development with multiple unique directions.", icon: "✏️" },
    { step: "03", title: "Design", description: "Refined digital execution with precision and attention to detail.", icon: "🎨" },
    { step: "04", title: "Final Logo", description: "Delivery of polished, versatile logo files in all formats.", icon: "✨" }
  ];

  return (
    <div className="ld-process">
      <div className="ld-section-header">
        <span className="ld-section-badge">OUR PROCESS</span>
        <h2 className="ld-section-title">From <span className="ld-gradient-text">Concept</span> to Creation</h2>
      </div>

      <div className="ld-process-steps">
        {steps.map((step, index) => (
          <div key={index} className="ld-step-wrapper">
            <div className="ld-step-number">{step.step}</div>
            <div className="ld-step-icon">{step.icon}</div>
            <div className="ld-step-details">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            {index < steps.length - 1 && <div className="ld-step-connector"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// Section 5: Showcase Section - Redesigned with Clean Cards
const ShowcaseSection = () => {
  const logos = [
    { name: "Nexus", style: "Minimal", description: "Clean geometric mark for tech startup", icon: "✦", color: "#C6FF00" },
    { name: "Aether", style: "3D", description: "Dynamic dimensional logo with depth", icon: "⬟", color: "#7CFF3A" },
    { name: "Void", style: "Abstract", description: "Unique abstract symbol for creativity", icon: "◈", color: "#B6FF1A" },
    { name: "Prism", style: "Geometric", description: "Precise geometric shapes and forms", icon: "⬚", color: "#C6FF00" },
    { name: "Echo", style: "Wordmark", description: "Custom typography and lettering", icon: "⚡", color: "#7CFF3A" },
    { name: "Nova", style: "Iconic", description: "Memorable icon with strong presence", icon: "★", color: "#B6FF1A" }
  ];

  return (
    <div className="ld-showcase" id="ld-showcase">
      <div className="ld-section-header">
        <span className="ld-section-badge">PORTFOLIO</span>
        <h2 className="ld-section-title">Logo <span className="ld-gradient-text">Showcase</span></h2>
        <p className="ld-section-subtitle">Explore our creative logo designs for various brands</p>
      </div>

      <div className="ld-showcase-grid">
        {logos.map((logo, index) => (
          <div key={index} className="ld-showcase-card">
            <div className="ld-showcase-preview" style={{ background: `${logo.color}08`, borderColor: `${logo.color}30` }}>
              <div className="ld-preview-icon" style={{ color: logo.color }}>
                {logo.icon}
              </div>
              <div className="ld-preview-letter" style={{ color: logo.color }}>
                {logo.name.charAt(0)}{logo.name.charAt(logo.name.length - 1)}
              </div>
            </div>
            <div className="ld-showcase-details">
              <h4>{logo.name}</h4>
              <span className="ld-showcase-style" style={{ background: `${logo.color}15`, color: logo.color }}>
                {logo.style}
              </span>
              <p className="ld-showcase-description">{logo.description}</p>
              <div className="ld-showcase-line" style={{ background: logo.color }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Section 6: Typography & Style Section
const TypographySection = () => {
  const fonts = [
    { name: "Orbitron", description: "Futuristic, Tech-forward, Display", sample: "ABCD", style: "display" },
    { name: "Poppins", description: "Modern, Clean, Versatile", sample: "EFGH", style: "sans" },
    { name: "Inter", description: "Professional, Readable, Neutral", sample: "IJKL", style: "sans" }
  ];

  return (
    <div className="ld-typography">
      <div className="ld-section-header">
        <span className="ld-section-badge">TYPOGRAPHY & STYLE</span>
        <h2 className="ld-section-title">The Art of <span className="ld-gradient-text">Visual Identity</span></h2>
      </div>

      <div className="ld-typography-container">
        <div className="ld-typography-large">
          <div className="ld-large-text">
            <span className="ld-letter">A</span>
            <span className="ld-letter">B</span>
            <span className="ld-letter">C</span>
          </div>
          <div className="ld-large-subtitle">Typography speaks louder than words</div>
        </div>

        <div className="ld-typography-grid">
          {fonts.map((font, index) => (
            <div key={index} className="ld-font-item">
              <h3 style={{ fontFamily: font.name }}>{font.name}</h3>
              <p>{font.description}</p>
              <div className="ld-font-sample" style={{ fontFamily: font.name }}>
                {font.sample}
              </div>
              <div className="ld-font-line"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 7: Developer Use Section with Local Image
const DeveloperSection = () => {
  const uses = [
    { title: "App Branding", description: "Make your app instantly recognizable with a distinctive logo.", icon: "📱" },
    { title: "Startup Identity", description: "Establish credibility and stand out in competitive markets.", icon: "🚀" },
    { title: "Portfolio Professionalism", description: "Elevate your developer portfolio with a personal brand.", icon: "💼" }
  ];

  return (
    <div className="ld-developer">
      <div className="ld-developer-container">
        <div className="ld-developer-content">
          <span className="ld-section-badge">FOR DEVELOPERS</span>
          <h2 className="ld-developer-title">Logo Design for <span className="ld-gradient-text">Tech Creators</span></h2>
          <p className="ld-developer-description">Your code deserves a visual identity that reflects its quality. We help developers and tech creators build brands that resonate.</p>
          
          <div className="ld-developer-uses">
            {uses.map((use, index) => (
              <div key={index} className="ld-use-item">
                <div className="ld-use-icon">{use.icon}</div>
                <div>
                  <h4>{use.title}</h4>
                  <p>{use.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="ld-developer-visual">
          <img 
            src={developerImage} 
            alt="Developer coding"
            className="ld-developer-image"
          />
        </div>
      </div>
    </div>
  );
};

// Section 8: Final CTA Section
const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="ld-cta">
      <div className="ld-cta-content">
        <h2 className="ld-cta-title">
          Let's Build Your <span className="ld-gradient-text">Brand Identity</span>
        </h2>
        <p className="ld-cta-description">
          Ready to create a logo that tells your story? Let's bring your vision to life.
        </p>
        
        <div className="ld-cta-buttons">
          <button className="ld-cta-primary" onClick={() => navigate('/contact')}>
            Start Logo Design
            <span className="ld-btn-arrow">→</span>
          </button>
          <button className="ld-cta-secondary" onClick={() => navigate('/contact')}>
            Contact Us
            <span className="ld-btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main LogoDesign Component
const LogoDesign = () => {
  return (
    <div className="ld-container">
      <Navbar />
      
      <Section className="ld-hero-section">
        <HeroSection />
      </Section>
      
      <Section className="ld-brand-section">
        <BrandIdentitySection />
      </Section>

      <Section className="ld-services-section">
        <ServicesSection />
      </Section>

      <Section className="ld-process-section">
        <ProcessSection />
      </Section>

      {/* <Section className="ld-showcase-section">
        <ShowcaseSection />
      </Section> */}

      <Section className="ld-typography-section">
        <TypographySection />
      </Section>

      <Section className="ld-developer-section">
        <DeveloperSection />
      </Section>

      <CTASection />

      <Footer />
    </div>
  );
};

export default LogoDesign;