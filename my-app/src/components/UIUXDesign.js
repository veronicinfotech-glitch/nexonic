// UIUXDesign.js - Updated with Consistent Navbar and Footer - No Scroll Indicator
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './UIUXDesign.css';
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
  const [activeLink, setActiveLink] = useState('ui-ux-design');
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
  
  const [typedText, setTypedText] = useState('');
  const fullText = 'Crafting Digital Experiences That Inspire';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timer = setTimeout(() => {
        setTypedText(prev => prev + fullText[index]);
        setIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [index, fullText]);

  return (
    <div className="ui-hero">
      <div className="ui-hero-background">
        <div className="ui-hero-grid"></div>
        <div className="ui-hero-particles">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="ui-hero-particle"
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
      
      <div className="ui-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="ui-hero-badge">
            <span className="ui-hero-icon">✨</span> UI/UX DESIGN AGENCY
          </span>
        </motion.div>
        
        <motion.h1 
          className="ui-hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          UI/UX <span className="ui-gradient-text">Design</span>
        </motion.h1>
        
        <motion.div 
          className="ui-typed-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="ui-typed-text">{typedText}<span className="ui-cursor">|</span></p>
        </motion.div>
        
        <motion.p 
          className="ui-hero-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          We create beautiful, intuitive, and high-converting digital experiences that users love and businesses trust.
        </motion.p>
        
        <motion.div 
          className="ui-hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <button className="ui-btn-primary" onClick={() => navigate('/get-started')}>
            Start Your Project
            <span className="ui-btn-arrow">→</span>
          </button>
          <button className="ui-btn-outline" onClick={() => navigate('/portfolio')}>
            View Portfolio
            <span className="ui-btn-arrow">→</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator removed */}
    </div>
  );
};

// Section 2: Horizontal Scroll Section
const HorizontalScrollSection = () => {
  const services = [
    { title: "User Research", icon: "🔍", description: "Deep dive into user behavior" },
    { title: "Wireframing", icon: "📐", description: "Structure and layout planning" },
    { title: "UI Design", icon: "🎨", description: "Visual interface design" },
    { title: "Prototyping", icon: "⚡", description: "Interactive prototypes" },
    { title: "User Testing", icon: "🧪", description: "Validate with real users" },
    { title: "Development", icon: "💻", description: "Pixel-perfect implementation" }
  ];

  return (
    <div className="ui-horizontal" id="ui-horizontal">
      <div className="ui-section-header">
        <span className="ui-section-badge">OUR PROCESS</span>
        <h2 className="ui-section-title">Design <span className="ui-gradient-text">Flow</span></h2>
      </div>

      <div className="ui-horizontal-scroll">
        <div className="ui-horizontal-track">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="ui-horizontal-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="ui-item-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 3: Split Diagonal Section with Image
const SplitDiagonalSection = () => {
  return (
    <div className="ui-split">
      <div className="ui-split-container">
        <div className="ui-split-left">
          <span className="ui-section-badge">WHY CHOOSE US</span>
          <h2>Design That <span className="ui-gradient-text">Drives Results</span></h2>
          <p>Every pixel is intentional. Every interaction matters. We combine creativity with data-driven insights to create experiences that not only look beautiful but also achieve business goals.</p>
          <div className="ui-split-features">
            <div className="ui-feature">✓ User-Centered Approach</div>
            <div className="ui-feature">✓ Data-Informed Decisions</div>
            <div className="ui-feature">✓ Cross-Platform Consistency</div>
          </div>
        </div>
        <div className="ui-split-right">
          <img 
            src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=500&h=400&fit=crop" 
            alt="UI/UX Design Process"
            className="ui-split-image"
          />
        </div>
      </div>
    </div>
  );
};

// Section 4: Interactive Steps Section
const ProcessStepsSection = () => {
  const steps = [
    { step: "01", title: "Discover", description: "Understanding your users, business goals, and market opportunities.", icon: "🔍", direction: "left" },
    { step: "02", title: "Define", description: "Translating insights into clear design strategies and user flows.", icon: "📋", direction: "right" },
    { step: "03", title: "Design", description: "Creating beautiful, intuitive interfaces with attention to detail.", icon: "🎨", direction: "left" },
    { step: "04", title: "Test", description: "Validating designs with real users and iterating based on feedback.", icon: "🧪", direction: "right" },
    { step: "05", title: "Launch", description: "Delivering pixel-perfect experiences across all platforms.", icon: "🚀", direction: "left" }
  ];

  return (
    <div className="ui-steps">
      <div className="ui-section-header">
        <span className="ui-section-badge">OUR PROCESS</span>
        <h2 className="ui-section-title">From Concept to <span className="ui-gradient-text">Launch</span></h2>
      </div>

      <div className="ui-steps-container">
        <div className="ui-steps-line"></div>
        {steps.map((step, index) => (
          <motion.div 
            key={index} 
            className={`ui-step ${step.direction}`}
            initial={{ opacity: 0, x: step.direction === 'left' ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="ui-step-marker">
              <span>{step.step}</span>
            </div>
            <div className="ui-step-content">
              <div className="ui-step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 5: Full-Width Strip Section (Fixed)
const FullWidthStrip = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.3, 0.6], [0, -200]);

  return (
    <div className="ui-strip">
      <div className="ui-strip-background"></div>
      <div className="ui-strip-wrapper">
        <motion.div className="ui-strip-content" style={{ x }}>
          <span className="ui-strip-text">DESIGN INNOVATION</span>
          <span className="ui-strip-text">DESIGN INNOVATION</span>
          <span className="ui-strip-text">DESIGN INNOVATION</span>
          <span className="ui-strip-text">DESIGN INNOVATION</span>
          <span className="ui-strip-text">DESIGN INNOVATION</span>
        </motion.div>
      </div>
    </div>
  );
};

// Section 6: Creative Layout
const CreativeGridSection = () => {
  const items = [
    { title: "Brand Identity", desc: "Visual identity systems that stand out", color: "#C6FF00" },
    { title: "Web Design", desc: "Responsive, engaging websites", color: "#7CFF3A" },
    { title: "Mobile Apps", desc: "Native and cross-platform experiences", color: "#B6FF1A" },
    { title: "Design Systems", desc: "Scalable, consistent frameworks", color: "#C6FF00" },
    { title: "Motion Design", desc: "Animations that delight", color: "#7CFF3A" },
    { title: "Interaction Design", desc: "Micro-interactions that engage", color: "#B6FF1A" }
  ];

  return (
    <div className="ui-creative">
      <div className="ui-section-header">
        <span className="ui-section-badge">OUR EXPERTISE</span>
        <h2 className="ui-section-title">Creative <span className="ui-gradient-text">Capabilities</span></h2>
      </div>

      <div className="ui-creative-grid">
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            className="ui-creative-item"
            style={{ borderColor: item.color }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 7: Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    { text: "Nexonic transformed our digital presence completely. The UI/UX redesign increased conversions by 150%", author: "Sarah Johnson", role: "CEO, TechStart" },
    { text: "Incredible attention to detail. The team delivered a design system that scales perfectly.", author: "Michael Chen", role: "Founder, DevFlow" },
    { text: "Best design agency we've worked with. They truly understand user-centered design.", author: "Emily Rodriguez", role: "Product Lead" },
    { text: "The prototypes were so realistic, we could test them with users immediately.", author: "David Kim", role: "CTO, InnovateLabs" }
  ];

  return (
    <div className="ui-testimonials">
      <div className="ui-section-header">
        <span className="ui-section-badge">CLIENT LOVE</span>
        <h2 className="ui-section-title">What Our <span className="ui-gradient-text">Clients Say</span></h2>
      </div>

      <div className="ui-testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index} 
            className="ui-testimonial-item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="ui-testimonial-quote">"</div>
            <p>{testimonial.text}</p>
            <div className="ui-testimonial-author">
              <strong>{testimonial.author}</strong>
              <span>{testimonial.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Section 8: Final CTA
const CTASection = () => {
  const navigate = useNavigate();

  return (
    <div className="ui-cta">
      <div className="ui-cta-background">
        <div className="ui-cta-glow"></div>
        <div className="ui-cta-grid"></div>
      </div>
      
      <div className="ui-cta-content">
        <motion.h2 
          className="ui-cta-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's Create Something <span className="ui-gradient-text">Beautiful</span>
        </motion.h2>
        <motion.p 
          className="ui-cta-description"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Ready to transform your digital experience? Let's collaborate and bring your vision to life.
        </motion.p>
        
        <motion.div 
          className="ui-cta-buttons"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button className="ui-cta-primary" onClick={() => navigate('/get-started')}>
            Start Your Project
            <span className="ui-btn-arrow">→</span>
          </button>
          <button className="ui-cta-secondary" onClick={() => navigate('/portfolio')}>
            View Portfolio
            <span className="ui-btn-arrow">→</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

// Main UIUXDesign Component
const UIUXDesign = () => {
  return (
    <div className="ui-container">
      <Navbar />
      
      <Section className="ui-hero-section">
        <HeroSection />
      </Section>
      
      <Section className="ui-horizontal-section">
        <HorizontalScrollSection />
      </Section>

      <Section className="ui-split-section">
        <SplitDiagonalSection />
      </Section>

      <Section className="ui-steps-section">
        <ProcessStepsSection />
      </Section>

      <Section className="ui-strip-section">
        <FullWidthStrip />
      </Section>

      <Section className="ui-creative-section">
        <CreativeGridSection />
      </Section>

      <Section className="ui-testimonials-section">
        <TestimonialsSection />
      </Section>

      <Section className="ui-cta-section">
        <CTASection />
      </Section>

      <Footer />
    </div>
  );
};

export default UIUXDesign;