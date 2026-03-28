// Portfolio.js - Updated with Consistent Navbar and Footer - All Buttons Working
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Portfolio.css';
import logo from "../image/logo.jpg";

// Import local images
import luxeFashionImage from "../image/Building.jpg";
import fintechImage from "../image/Building.jpg";
import greenLifeImage from "../image/Building.jpg";
import healthcareImage from "../image/DigitalMarketing.jpg";
import aiMarketingImage from "../image/DigitalMarketing.jpg";
import realEstateImage from "../image/DigitalMarketing.jpg";
import fitnessAppImage from "../image/DigitalMarketing.jpg";
import contentPlatformImage from "../image/DigitalMarketing.jpg";
import beforeImage from "../image/DigitalMarketing.jpg";
import afterImage from "../image/DigitalMarketing.jpg";
import caseStudyImage from "../image/How.jpg";
import introAbstractImage from "../image/Building.jpg";

// Section Wrapper with simple animation
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
  const [activeLink, setActiveLink] = useState('portfolio');
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

// Horizontal Scroll Component for Section 3
const HorizontalScrollSection = () => {
  const projects = [
    { 
      id: 1, 
      title: 'LuxeFashion E-Commerce', 
      category: 'Web Development', 
      image: luxeFashionImage, 
      description: 'Complete e-commerce platform for luxury fashion brand launched in 2026',
      client: 'LuxeFashion',
      year: '2026'
    },
    { 
      id: 2, 
      title: 'FinTech Dashboard Pro', 
      category: 'Software Development', 
      image: fintechImage, 
      description: 'Real-time financial analytics dashboard for investment firm',
      client: 'CapitalView',
      year: '2026'
    },
    { 
      id: 3, 
      title: 'GreenLife Campaign', 
      category: 'Digital Marketing', 
      image: greenLifeImage, 
      description: 'Integrated marketing campaign for sustainable products',
      client: 'GreenLife',
      year: '2026'
    },
    { 
      id: 4, 
      title: 'MediCare Connect', 
      category: 'Mobile Development', 
      image: healthcareImage, 
      description: 'Telemedicine platform connecting patients with healthcare providers',
      client: 'MediCare',
      year: '2026'
    },
    { 
      id: 5, 
      title: 'AI Marketing Suite', 
      category: 'Marketing Tech', 
      image: aiMarketingImage, 
      description: 'AI-powered marketing automation platform for agencies',
      client: 'MarketAI',
      year: '2026'
    },
  ];

  return (
    <div className="horizontal-scroll-container">
      <div className="horizontal-scroll-track">
        {projects.map((project) => (
          <div key={project.id} className="horizontal-project-card">
            <div className="horizontal-project-image">
              <img src={project.image} alt={project.title} />
              <div className="horizontal-project-info">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p className="project-client">{project.client} • {project.year}</p>
                <p className="project-desc">{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Timeline Component for Section 4 - Updated for 2026 company
const TimelineSection = () => {
  const campaigns = [
    { 
      quarter: 'Q1 2026', 
      title: 'First Client Launch', 
      result: '5 Successful Projects', 
      description: 'Launched our first 5 client projects including e-commerce and marketing campaigns',
      icon: '🚀'
    },
    { 
      quarter: 'Q2 2026', 
      title: 'SEO Excellence Program', 
      result: '180% Avg. Traffic Boost', 
      description: 'Implemented advanced SEO strategies for 10+ clients with remarkable results',
      icon: '📈'
    },
    { 
      quarter: 'Q3 2026', 
      title: 'Social Media Expansion', 
      result: '500K+ Reach Generated', 
      description: 'Viral content campaigns for lifestyle and tech brands',
      icon: '📱'
    },
    { 
      quarter: 'Q4 2026', 
      title: 'Google Ads Mastery', 
      result: '4.2x Average ROAS', 
      description: 'Optimized PPC campaigns delivering exceptional returns for e-commerce clients',
      icon: '🎯'
    },
  ];

  return (
    <div className="timeline-vertical">
      {campaigns.map((campaign, index) => (
        <div key={index} className="timeline-item-vertical">
          <div className="timeline-year">{campaign.quarter}</div>
          <div className="timeline-content-vertical">
            <div className="timeline-icon">{campaign.icon}</div>
            <h3>{campaign.title}</h3>
            <p className="timeline-result">{campaign.result}</p>
            <p className="timeline-desc">{campaign.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Zigzag Component for Section 5 - Updated for 2026
const ZigzagSection = () => {
  const projects = [
    { 
      id: 1, 
      title: 'Luxury Fashion E-Commerce', 
      tech: 'React 19, Node.js 22, MongoDB 7.0', 
      image: luxeFashionImage, 
      description: 'Built a high-performance e-commerce platform with AR try-on features for a luxury fashion brand. The platform handles 50K+ products and processes 1000+ orders daily.',
      client: 'LuxeFashion',
      year: '2026'
    },
    { 
      id: 2, 
      title: 'Real Estate Investment Platform', 
      tech: 'Next.js 15, PostgreSQL 16, AWS', 
      image: realEstateImage, 
      description: 'Developed a comprehensive real estate platform with virtual property tours, investment calculators, and secure payment processing for property investments.',
      client: 'PropInvest',
      year: '2026'
    },
    { 
      id: 3, 
      title: 'AI-Powered Fitness App', 
      tech: 'React Native, TensorFlow.js, Firebase', 
      image: fitnessAppImage, 
      description: 'Created a mobile fitness app with AI-powered workout recommendations, real-time form correction, and social features for a fitness startup.',
      client: 'FitAI',
      year: '2026'
    },
    { 
      id: 4, 
      title: 'Content Marketing Platform', 
      tech: 'Vue 3, Python, OpenAI API', 
      image: contentPlatformImage, 
      description: 'Built an AI-powered content generation and marketing platform that helps businesses create, schedule, and analyze content performance.',
      client: 'ContentFlow',
      year: '2026'
    },
  ];

  return (
    <div className="zigzag-container">
      {projects.map((project, index) => (
        <div key={project.id} className={`zigzag-item ${index % 2 === 0 ? 'zigzag-left' : 'zigzag-right'}`}>
          <div className="zigzag-image">
            <img src={project.image} alt={project.title} />
          </div>
          <div className="zigzag-content">
            <span className="project-meta">{project.client} • {project.year}</span>
            <h3>{project.title}</h3>
            <p className="zigzag-tech">{project.tech}</p>
            <p className="zigzag-desc">{project.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Process Steps Component for Section 6 - Updated for new company
const ProcessStepsSection = () => {
  const steps = [
    { number: '01', title: 'Discovery', description: 'We dive deep into your business goals, target audience, and market opportunities to create a solid foundation for success.', icon: '🔍' },
    { number: '02', title: 'Strategy', description: 'Our team develops a comprehensive roadmap with clear milestones, KPIs, and timelines tailored to your specific needs.', icon: '📊' },
    { number: '03', title: 'Design', description: 'We create beautiful, intuitive designs that not only look great but also drive engagement and conversions.', icon: '🎨' },
    { number: '04', title: 'Development', description: 'Using the latest technologies, we build robust, scalable solutions with clean code and optimal performance.', icon: '⚙️' },
    { number: '05', title: 'Launch & Grow', description: 'We ensure smooth deployment and continue to optimize and scale your digital presence for long-term success.', icon: '🚀' },
  ];

  return (
    <div className="process-steps">
      <div className="process-connecting-line"></div>
      {steps.map((step, index) => (
        <div key={index} className="process-step">
          <div className="process-step-number">{step.number}</div>
          <div className="process-step-icon">{step.icon}</div>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
      ))}
    </div>
  );
};

// Before/After Component for Section 8
const BeforeAfterSection = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setSliderPosition(Math.min(100, Math.max(0, percentage)));
    }
  };

  return (
    <div className="before-after-container" ref={containerRef} onMouseMove={handleMouseMove}>
      <div className="before-image">
        <img src={beforeImage} alt="Before" />
        <div className="before-label">Before Campaign: 15K Monthly Visitors</div>
      </div>
      <div className="after-image" style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}>
        <img src={afterImage} alt="After" />
        <div className="after-label">After Campaign: 85K Monthly Visitors</div>
      </div>
      <div className="slider-handle" style={{ left: `${sliderPosition}%` }}>
        <div className="slider-circle">↔</div>
      </div>
    </div>
  );
};

// Case Study Component for Section 9 - Updated for 2026
const CaseStudySection = () => {
  const navigate = useNavigate();

  const handleViewProject = () => {
    navigate('/portfolio/urbanstyle-case-study');
    window.scrollTo(0, 0);
  };

  return (
    <div className="case-study-container">
      <div className="case-study-background">
        <img src={caseStudyImage} alt="Case Study" />
        <div className="case-study-overlay"></div>
      </div>
      <div className="case-study-content">
        <div className="case-study-badge">2026 Success Story</div>
        <h2>How We Helped <span className="gradient-text">UrbanStyle</span> Achieve 400% Growth in 6 Months</h2>
        <p className="case-study-description">
          UrbanStyle, a new fashion e-commerce brand, came to us in early 2026 with a vision to disrupt the online fashion space. 
          We built their entire digital presence from scratch - a stunning e-commerce platform, integrated marketing campaigns, 
          and data-driven SEO strategy. Within just 6 months, they achieved remarkable results.
        </p>
        <div className="case-study-results">
          <div className="result-item">
            <span className="result-number">400%</span>
            <span className="result-label">Revenue Growth</span>
          </div>
          <div className="result-item">
            <span className="result-number">250K+</span>
            <span className="result-label">Monthly Visitors</span>
          </div>
          <div className="result-item">
            <span className="result-number">15K+</span>
            <span className="result-label">Orders Processed</span>
          </div>
          <div className="result-item">
            <span className="result-number">4.8★</span>
            <span className="result-label">Customer Rating</span>
          </div>
        </div>
        <button className="case-study-btn" onClick={handleViewProject}>
          View Full Case Study →
        </button>
      </div>
    </div>
  );
};

// Industries Component for Section 10
const IndustriesSection = () => {
  const industries = [
    { name: 'E-Commerce', icon: '🛍️', description: 'Online retail & marketplaces' },
    { name: 'Healthcare', icon: '🏥', description: 'Telemedicine & health tech' },
    { name: 'Education', icon: '🎓', description: 'E-learning platforms' },
    { name: 'FinTech', icon: '💰', description: 'Financial technology' },
    { name: 'Real Estate', icon: '🏢', description: 'Property technology' },
    { name: 'Travel Tech', icon: '✈️', description: 'Travel & hospitality' },
    { name: 'SaaS', icon: '☁️', description: 'Software as a Service' },
    { name: 'Food & Beverage', icon: '🍔', description: 'Food delivery & restaurants' },
    { name: 'Fashion', icon: '👔', description: 'Apparel & accessories' },
    { name: 'Sustainability', icon: '🌱', description: 'Green technology' },
  ];

  return (
    <div className="industries-container">
      <div className="industries-scroll">
        <div className="industries-track">
          {industries.map((industry, index) => (
            <div key={index} className="industry-item">
              <span className="industry-icon">{industry.icon}</span>
              <div className="industry-info">
                <span className="industry-name">{industry.name}</span>
                <span className="industry-desc">{industry.description}</span>
              </div>
            </div>
          ))}
          {industries.map((industry, index) => (
            <div key={`duplicate-${index}`} className="industry-item">
              <span className="industry-icon">{industry.icon}</span>
              <div className="industry-info">
                <span className="industry-name">{industry.name}</span>
                <span className="industry-desc">{industry.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Testimonials Component for Section 11
const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const testimonials = [
    { 
      text: "Nexonic built our entire e-commerce platform from scratch in 2026. Their attention to detail and understanding of our brand was exceptional. We've already seen incredible growth in just a few months.", 
      author: "Sarah Chen", 
      role: "Founder, UrbanStyle",
      year: "2026"
    },
    { 
      text: "As a startup launching in 2026, we needed a partner who could deliver quickly without compromising quality. Nexonic exceeded our expectations with their marketing campaigns and web development.", 
      author: "Michael Rodriguez", 
      role: "CEO, TechFlow",
      year: "2026"
    },
    { 
      text: "The team at Nexonic helped us achieve a 400% increase in organic traffic within 4 months. Their SEO strategy and content marketing approach is simply outstanding.", 
      author: "David Kim", 
      role: "Marketing Director, GreenLife",
      year: "2026"
    },
    { 
      text: "Working with Nexonic has been fantastic. They're a new agency but they deliver like seasoned professionals. Our mobile app has 5-star ratings on both stores.", 
      author: "Emily Watson", 
      role: "Product Manager, FitAI",
      year: "2026"
    },
  ];

  const handleReadMore = () => {
    navigate('/portfolio/testimonials');
    window.scrollTo(0, 0);
  };

  return (
    <div className="testimonials-container">
      <div className="testimonials-track" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-item">
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">{testimonial.text}</p>
            <div className="testimonial-author">
              <span className="author-name">{testimonial.author}</span>
              <span className="author-role">{testimonial.role} • {testimonial.year}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`testimonial-dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
      <button className="testimonials-view-all" onClick={handleReadMore}>
        View All Testimonials →
      </button>
    </div>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const navigate = useNavigate();

  const handleStartJourney = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  const handleExploreWork = () => {
    document.getElementById('marketing-timeline').scrollIntoView({ behavior: 'smooth' });
  };

  const handleScheduleCall = () => {
    navigate('/contact');
    window.scrollTo(0, 0);
  };

  return (
    <div className="portfolio-container">
      <Navbar />
      
      {/* 1. HERO SECTION - No background image, no scroll indicator */}
      <Section className="portfolio-hero-section">
        <div className="portfolio-hero-background">
          <div className="portfolio-hero-gradient"></div>
          <div className="hero-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="hero-particle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
              }} />
            ))}
          </div>
        </div>
        
        <div className="portfolio-hero-content">
          <span className="hero-badge">Founded in 2026</span>
          <h1 className="hero-title">
            Our Work Turns Ideas Into <span className="gradient-text">Digital Success</span>
          </h1>
          <p className="hero-description">
            As a new-generation digital agency founded in 2026, we bring fresh perspectives, 
            cutting-edge technology, and innovative strategies to help brands thrive in the modern digital landscape.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={handleStartJourney}>
              Start Your Journey
            </button>
            <button className="btn btn-outline" onClick={handleExploreWork}>
              Explore Our Work
            </button>
          </div>
        </div>
      </Section>

      {/* 2. PORTFOLIO INTRO SECTION */}
      <Section className="portfolio-intro-section">
        <div className="intro-container">
          <div className="intro-left">
            <span className="intro-subtitle">Our Story</span>
            <h2 className="intro-title">
              Building Digital Excellence <span className="gradient-text">Since 2026</span>
            </h2>
            <p className="intro-text">
              Nexonic was founded in 2026 with a simple mission: to help businesses harness the power of digital technology 
              and marketing to achieve extraordinary growth. In just our first year, we've partnered with innovative startups 
              and established brands alike, delivering solutions that drive real results.
            </p>
            <div className="intro-stats">
              <div className="intro-stat">
                <span className="stat-number">25+</span>
                <span className="stat-label">Projects Delivered</span>
              </div>
              <div className="intro-stat">
                <span className="stat-number">20+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="intro-stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Team Members</span>
              </div>
              <div className="intro-stat">
                <span className="stat-number">2026</span>
                <span className="stat-label">Year Founded</span>
              </div>
            </div>
          </div>
          <div className="intro-right">
            <div className="intro-abstract">
              <img src={introAbstractImage} alt="Digital Excellence" className="intro-abstract-image" />
            </div>
          </div>
        </div>
      </Section>

      {/* 3. DIGITAL MARKETING CAMPAIGN RESULTS */}
      <Section className="marketing-timeline-section" id="marketing-timeline">
        <div className="section-header">
          <h2 className="section-title">2026 Campaign <span className="gradient-text">Results</span></h2>
          <p className="section-subtitle">What we've achieved in our first year</p>
        </div>
        <TimelineSection />
      </Section>

      {/* 4. OUR PROJECT PROCESS */}
      <Section className="process-steps-section">
        <div className="section-header">
          <h2 className="section-title">Our Project <span className="gradient-text">Process</span></h2>
          <p className="section-subtitle">How we bring ideas to life</p>
        </div>
        <ProcessStepsSection />
      </Section>

      {/* 5. CASE STUDY SECTION */}
      <Section className="case-study-section">
        <CaseStudySection />
      </Section>

      {/* 6. INDUSTRIES WE SERVE */}
      <Section className="industries-section">
        <div className="section-header">
          <h2 className="section-title">Industries We <span className="gradient-text">Serve</span></h2>
          <p className="section-subtitle">Expertise across diverse sectors</p>
        </div>
        <IndustriesSection />
      </Section>

      {/* 7. CLIENT TESTIMONIALS */}
      <Section className="testimonials-section">
        <div className="section-header">
          <h2 className="section-title">Client <span className="gradient-text">Testimonials</span></h2>
          <p className="section-subtitle">What our 2026 clients say</p>
        </div>
        <TestimonialsSection />
      </Section>

      {/* 8. CALL TO ACTION SECTION */}
      <Section className="cta-section">
        <div className="cta-background"></div>
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Build Your <span className="gradient-text">2026 Success Story?</span>
          </h2>
          <p className="cta-description">
            Join the innovative brands that have partnered with us in our founding year. 
            Let's create something extraordinary together.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-large" onClick={handleStartJourney}>
              Start Your Project
            </button>
            <button className="btn btn-outline btn-large" onClick={handleScheduleCall}>
              Schedule a Call
            </button>
          </div>
          <p className="cta-note">Founded in 2026 • Fresh perspective • Modern solutions</p>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Portfolio;