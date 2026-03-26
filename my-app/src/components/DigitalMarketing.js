// DigitalMarketing.js
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./DigitalMarketing.css";
import logo from "../image/logo.jpg";

// Section Wrapper with animation
const Section = ({ children, className = "", id = "" }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
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
      className={`${className} ${isVisible ? "section-visible" : "section-hidden"}`}
      id={id}
    >
      {children}
    </section>
  );
};

// Navbar Component - SAME AS HOME, SERVICES, AND ABOUT PAGES
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDigitalMarketingDropdownOpen, setIsDigitalMarketingDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("digital-marketing");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsDigitalMarketingDropdownOpen(false);
    window.scrollTo(0, 0);
  };

  const services = [
    { name: "Mobile & Web Development", path: "/mobile-web-development" },
    { name: "UI/UX Design", path: "/ui-ux-design" },
    { name: "Cloud Solutions", path: "/cloud-solutions" },
  ];

  const digitalMarketingServices = [
    { name: "Video Editing", path: "/video-editing" },
    { name: "Logo Design", path: "/logo-design" },
    { name: "Instagram Post", path: "/instagram-post" },
    { name: "SEO", path: "/seo-optimization" },
    { name: "Google Ad / Analytics", path: "/google-ads" },
  ];

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-logo" onClick={() => handleNavigation("/")}>
          <img src={logo} alt="Nexonic Logo" />
          <span>NEXONIC</span>
        </div>

        <div className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link
                to="/"
                onClick={() => {
                  setActiveLink("home");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`nav-link ${activeLink === "home" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => {
                  setActiveLink("about");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`nav-link ${activeLink === "about" ? "active" : ""}`}
              >
                About
              </Link>
            </li>
            <li className="dropdown main-dropdown">
              <Link
                to="/services"
                className="nav-link dropdown-toggle"
                onClick={() => {
                  setActiveLink("services");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                onMouseEnter={() => setIsServicesDropdownOpen(true)}
              >
                Services <span className="dropdown-icon">▼</span>
              </Link>
              <ul
                className={`dropdown-menu main-dropdown-menu ${isServicesDropdownOpen ? "show" : ""}`}
                onMouseLeave={() => {
                  setIsServicesDropdownOpen(false);
                  setIsDigitalMarketingDropdownOpen(false);
                }}
              >
                <li className="sub-dropdown">
                  <Link
                    to="/digital-marketing"
                    className="dropdown-toggle sub-dropdown-toggle"
                    onClick={() => handleNavigation("/digital-marketing")}
                    onMouseEnter={() => setIsDigitalMarketingDropdownOpen(true)}
                  >
                    Digital Marketing{" "}
                    <span className="dropdown-icon">▶</span>
                  </Link>
                  <ul
                    className={`sub-dropdown-menu ${isDigitalMarketingDropdownOpen ? "show" : ""}`}
                  >
                    {digitalMarketingServices.map((service, index) => (
                      <li key={index}>
                        <Link
                          to={service.path}
                          onClick={() => {
                            setActiveLink("services");
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
                        setActiveLink("services");
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
                  setActiveLink("blog");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`nav-link ${activeLink === "blog" ? "active" : ""}`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/portfolio"
                onClick={() => {
                  setActiveLink("portfolio");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`nav-link ${activeLink === "portfolio" ? "active" : ""}`}
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => {
                  setActiveLink("contact");
                  setIsMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`nav-link ${activeLink === "contact" ? "active" : ""}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="nav-right">
          <button
            className="btn-nav"
            onClick={() => handleNavigation("/contact")}
          >
            Get Started
          </button>
          <div
            className="mobile-menu-icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Footer Component - SAME AS HOME, SERVICES, AND ABOUT PAGES
const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const digitalMarketingServices = [
    { name: "Video Editing", path: "/video-editing" },
    { name: "Logo Design", path: "/logo-design" },
    { name: "Instagram Post", path: "/instagram-post" },
    { name: "SEO", path: "/seo-optimization" },
    { name: "Google Ad / Analytics", path: "/google-ads" },
  ];

  const developmentServices = [
    { name: "Mobile & Web Development", path: "/mobile-web-development" },
    { name: "UI/UX Design", path: "/ui-ux-design" },
    { name: "Cloud Solutions", path: "/cloud-solutions" },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo-section">
            <img src={logo} alt="Nexonic Logo" className="footer-logo" />
            <h3>NEXONIC</h3>
            <p>
              Founded in 2026, we're a next-generation digital agency combining
              cutting-edge technology with innovative marketing strategies to
              help businesses thrive.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fab fa-github"></i>
              </a>
              <a
                href="https://instagram.com/nexonic.marketing"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="/about" onClick={() => handleNavigation("/about")}>
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/careers" onClick={() => handleNavigation("/careers")}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/press" onClick={() => handleNavigation("/press")}>
                    Press
                  </Link>
                </li>
                <li>
                  <Link to="/partners" onClick={() => handleNavigation("/partners")}>
                    Partners
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                <li>
                  <Link
                    to="/digital-marketing"
                    onClick={() => handleNavigation("/digital-marketing")}
                  >
                    Digital Marketing
                  </Link>
                </li>
                {digitalMarketingServices.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.path}
                      onClick={() => handleNavigation(service.path)}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
                {developmentServices.map((service, index) => (
                  <li key={index}>
                    <Link
                      to={service.path}
                      onClick={() => handleNavigation(service.path)}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Resources</h4>
              <ul>
                <li>
                  <Link to="/blog" onClick={() => handleNavigation("/blog")}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/guides" onClick={() => handleNavigation("/guides")}>
                    Guides
                  </Link>
                </li>
                <li>
                  <Link to="/whitepapers" onClick={() => handleNavigation("/whitepapers")}>
                    Whitepapers
                  </Link>
                </li>
                <li>
                  <Link to="/faq" onClick={() => handleNavigation("/faq")}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li>
                  <Link to="/privacy" onClick={() => handleNavigation("/privacy")}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" onClick={() => handleNavigation("/terms")}>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" onClick={() => handleNavigation("/disclaimer")}>
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link to="/compliance" onClick={() => handleNavigation("/compliance")}>
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>
              &copy; 2026 - {currentYear} NEXONIC. All rights reserved. Founded
              in 2026.
            </p>
          </div>
          <div className="footer-bottom-right">
            <Link to="/privacy" onClick={() => handleNavigation("/privacy")}>
              Privacy
            </Link>
            <Link to="/terms" onClick={() => handleNavigation("/terms")}>
              Terms
            </Link>
            <Link to="/cookies" onClick={() => handleNavigation("/cookies")}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Section 1: Hero Section - Only section with animations
const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="dm-hero">
      <div className="dm-hero-background">
        <div className="dm-hero-grid"></div>
        <div className="dm-hero-particles">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="dm-hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                background:
                  i % 3 === 0 ? "#C6FF00" : i % 3 === 1 ? "#7CFF3A" : "#B6FF1A",
              }}
            />
          ))}
        </div>
      </div>

      <div className="dm-hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="dm-hero-badge">DIGITAL MARKETING AGENCY</span>
        </motion.div>

        <motion.h1
          className="dm-hero-title"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Digital Marketing That{" "}
          <span className="dm-gradient-text">Drives Growth</span>
        </motion.h1>

        <motion.p
          className="dm-hero-description"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          For developers, startups, and forward-thinking brands — we combine
          technical expertise with creative marketing to deliver measurable
          results.
        </motion.p>

        <motion.div
          className="dm-hero-buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button
            className="dm-btn-primary"
            onClick={() => navigate("/contact")}
          >
            Get Started
            <span className="dm-btn-arrow">→</span>
          </button>
          <button
            className="dm-btn-outline"
            onClick={() => {
              document
                .getElementById("dm-services")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Services
            <span className="dm-btn-arrow">→</span>
          </button>
        </motion.div>
      </div>

      <div
        className="dm-scroll-indicator"
        onClick={() => {
          document
            .getElementById("dm-services")
            .scrollIntoView({ behavior: "smooth" });
        }}
      >
        <span>Scroll to explore</span>
        <div className="dm-scroll-line"></div>
      </div>
    </div>
  );
};

// Section 2: Services - Zig-Zag Layout with Online Images
const ServicesSection = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Video Editing",
      description:
        "Transform raw footage into captivating stories that engage your audience and drive conversions. Our expert editors craft compelling narratives that resonate with your brand identity.",
      image:
        "https://images.unsplash.com/photo-1536240476400-bc1b8a3e7a6f?w=600&h=400&fit=crop",
      path: "/video-editing",
    },
    {
      title: "Logo Design",
      description:
        "Create a lasting first impression with a unique, memorable logo that embodies your brand's identity. We design logos that stand out in crowded markets.",
      image:
        "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop",
      path: "/logo-design",
    },
    {
      title: "Instagram Post",
      description:
        "Boost engagement with stunning, scroll-stopping Instagram visuals. Our designs are optimized for maximum reach and engagement on social platforms.",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop",
      path: "/instagram-post",
    },
    {
      title: "SEO",
      description:
        "Dominate search engine results and drive organic traffic with our comprehensive, data-driven SEO strategies. We help you rank higher and attract qualified leads.",
      image:
        "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&h=400&fit=crop",
      path: "/seo-optimization",
    },
    {
      title: "Google Ads / Analytics",
      description:
        "Maximize ROI with targeted Google Ads campaigns and in-depth analytics. We optimize every dollar spent to deliver measurable business growth.",
      image:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
      path: "/google-ads",
    },
  ];

  return (
    <div className="dm-services" id="dm-services">
      <div className="dm-section-header">
        <span className="dm-section-badge">WHAT WE OFFER</span>
        <h2 className="dm-section-title">
          Our Digital Marketing{" "}
          <span className="dm-gradient-text">Services</span>
        </h2>
        <p className="dm-section-subtitle">
          Comprehensive solutions tailored to your business needs
        </p>
      </div>

      <div className="dm-zigzag-container">
        {services.map((service, index) => (
          <div
            key={index}
            className={`dm-zigzag-item ${index % 2 === 0 ? "dm-zigzag-left" : "dm-zigzag-right"}`}
          >
            <div className="dm-zigzag-image">
              <img src={service.image} alt={service.title} />
              <div className="dm-image-overlay"></div>
            </div>
            <div className="dm-zigzag-content">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button
                className="dm-learn-more"
                onClick={() => {
                  navigate(service.path);
                  window.scrollTo(0, 0);
                }}
              >
                Learn More <span className="dm-arrow">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Section 3: Why Choose Us
const WhyChooseUsSection = () => {
  const features = [
    {
      title: "Fast Delivery",
      description:
        "Agile methodology ensuring quick turnaround without compromising quality.",
      icon: "⚡",
    },
    {
      title: "Creative Strategy",
      description:
        "Innovative approaches that make your brand stand out from competitors.",
      icon: "🎨",
    },
    {
      title: "Data-Driven Marketing",
      description:
        "Every decision backed by analytics and performance metrics.",
      icon: "📊",
    },
    {
      title: "Developer-Friendly",
      description:
        "Clean code, API integrations, and technical expertise for dev-focused brands.",
      icon: "💻",
    },
  ];

  return (
    <div className="dm-why-choose">
      <div className="dm-section-header">
        <span className="dm-section-badge">WHY US</span>
        <h2 className="dm-section-title">
          Why Choose <span className="dm-gradient-text">Nexonic</span>
        </h2>
      </div>

      <div className="dm-flow-container">
        <div className="dm-flow-track">
          {features.map((feature, index) => (
            <div key={index} className="dm-flow-item">
              <div className="dm-flow-icon">
                <span>{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 4: Process Section
const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Research",
      description:
        "Deep dive into your market, audience, and competitors to identify opportunities.",
      icon: "🔍",
    },
    {
      number: "02",
      title: "Strategy",
      description:
        "Develop data-driven marketing strategies tailored to your goals.",
      icon: "📋",
    },
    {
      number: "03",
      title: "Execution",
      description:
        "Implement campaigns with precision and attention to detail.",
      icon: "⚙️",
    },
    {
      number: "04",
      title: "Optimization",
      description: "Continuous monitoring and refinement for maximum ROI.",
      icon: "📈",
    },
  ];

  return (
    <div className="dm-process">
      <div className="dm-section-header">
        <span className="dm-section-badge">OUR PROCESS</span>
        <h2 className="dm-section-title">
          How We <span className="dm-gradient-text">Work</span>
        </h2>
      </div>

      <div className="dm-steps-container">
        {steps.map((step, index) => (
          <div key={index} className="dm-step">
            <div className="dm-step-marker">
              <span>{step.number}</span>
            </div>
            <div className="dm-step-content">
              <div className="dm-step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Section 5: Results Section
const ResultsSection = () => {
  const stats = [
    { number: "10K+", label: "Reach Generated", icon: "📢" },
    { number: "200+", label: "Happy Clients", icon: "👥" },
    { number: "95%", label: "Success Rate", icon: "🎯" },
    { number: "500+", label: "Projects Completed", icon: "🚀" },
  ];

  return (
    <div className="dm-results">
      <div className="dm-section-header">
        <span className="dm-section-badge">OUR IMPACT</span>
        <h2 className="dm-section-title">
          Results That <span className="dm-gradient-text">Speak</span>
        </h2>
      </div>

      <div className="dm-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="dm-stat-item">
            <div className="dm-stat-icon">{stat.icon}</div>
            <div className="dm-stat-number">{stat.number}</div>
            <div className="dm-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Section 6: Developer-Focused Section with Images on Left Side
const DeveloperSection = () => {
  const topics = [
    {
      title: "Personal Branding",
      description:
        "Build your developer brand and stand out in the tech industry with strategic content and positioning.",
      icon: "👨‍💻",
    },
    {
      title: "SaaS/Product Growth",
      description:
        "Scale your software product with targeted marketing strategies that drive user acquisition and retention.",
      icon: "📈",
    },
    {
      title: "Portfolio Visibility",
      description:
        "Get your work noticed by the right people and companies through optimized showcase and outreach.",
      icon: "🎯",
    },
  ];

  return (
    <div className="dm-developer">
      <div className="dm-section-header">
        <span className="dm-section-badge">FOR DEVELOPERS</span>
        <h2 className="dm-section-title">
          Marketing That <span className="dm-gradient-text">Speaks Tech</span>
        </h2>
        <p className="dm-section-subtitle">
          We understand developers because we are developers. Here's how we help
          tech professionals grow.
        </p>
      </div>

      <div className="dm-developer-split">
        <div className="dm-developer-left">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=500&fit=crop"
            alt="Developer working on code"
            className="dm-developer-image"
          />
        </div>
        <div className="dm-developer-right">
          {topics.map((topic, index) => (
            <div key={index} className="dm-developer-topic">
              <div className="dm-topic-icon">
                <span>{topic.icon}</span>
              </div>
              <div className="dm-topic-content">
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <div className="dm-topic-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Section 7: Testimonials
const TestimonialsSection = () => {
  const testimonials = [
    {
      text: "Nexonic transformed our digital presence completely. Our organic traffic increased by 300% in just 6 months!",
      author: "Sarah Johnson",
      role: "CEO, TechStart",
    },
    {
      text: "The video editing and social media strategy they provided helped us reach a whole new audience. Incredible work!",
      author: "Michael Chen",
      role: "Founder, DevFlow",
    },
    {
      text: "Their SEO expertise is unmatched. We're now ranking #1 for our key keywords and seeing consistent growth.",
      author: "Emily Rodriguez",
      role: "Marketing Director",
    },
    {
      text: "The team at Nexonic understands both technology and marketing. A rare combination that delivers results.",
      author: "David Kim",
      role: "CTO, InnovateLabs",
    },
  ];

  return (
    <div className="dm-testimonials">
      <div className="dm-section-header">
        <span className="dm-section-badge">CLIENT LOVE</span>
        <h2 className="dm-section-title">
          What Our <span className="dm-gradient-text">Clients Say</span>
        </h2>
      </div>

      <div className="dm-testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="dm-testimonial-item">
            <div className="dm-testimonial-quote">"</div>
            <p>{testimonial.text}</p>
            <div className="dm-testimonial-author">
              <strong>{testimonial.author}</strong>
              <span>{testimonial.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main DigitalMarketing Component
const DigitalMarketing = () => {
  return (
    <div className="dm-container">
      <Navbar />

      <Section className="dm-hero-section">
        <HeroSection />
      </Section>

      <Section className="dm-services-section">
        <ServicesSection />
      </Section>

      <Section className="dm-why-choose-section">
        <WhyChooseUsSection />
      </Section>

      <Section className="dm-process-section">
        <ProcessSection />
      </Section>

      <Section className="dm-results-section">
        <ResultsSection />
      </Section>

      <Section className="dm-developer-section">
        <DeveloperSection />
      </Section>

      <Section className="dm-testimonials-section">
        <TestimonialsSection />
      </Section>

      <Footer />
    </div>
  );
};

export default DigitalMarketing;