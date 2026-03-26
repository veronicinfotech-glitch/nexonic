// Home.js
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../image/logo.jpg";

// About Section Images - All using home1.png
import aboutHeroImage from "../image/home.jpg";

// Development Cards Images
import webDevImage from "../image/webdev.jpg";
import mobileAppImage from "../image/App.jpg";
import cloudImage from "../image/Cloud solutions.png";
import uiuxImage from "../image/uiux.jpg";
import apiImage from "../image/API.jpg";
import devopsImage from "../image/DEVOPS.png";
import databaseImage from "../image/database.webp";
import securityImage from "../image/Security.png";

// Instagram Images
import instagram1 from "../image/home1.png";
import instagram2 from "../image/home1.png";
import instagram3 from "../image/home1.png";



// Custom hook for scroll animations
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
};

// Section Wrapper with animation
const Section = ({ children, className = "", id = "" }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
          }
        });
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
    <section ref={sectionRef} className={`section-hidden ${className}`} id={id}>
      {children}
    </section>
  );
};

// Particle Component for Hero Section
const Particle = ({ delay, size, color, initialX, initialY, speed }) => {
  const particleRef = useRef(null);

  useEffect(() => {
    const particle = particleRef.current;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      if (particle) {
        const x = Math.sin(elapsed * speed) * 40;
        const y = Math.cos(elapsed * speed * 0.8) * 40;
        const scale = 1 + Math.sin(elapsed * 2) * 0.2;
        const rotate = elapsed * 30;
        particle.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, [speed]);

  return (
    <div
      ref={particleRef}
      className="hero-particle"
      style={{
        width: size,
        height: size,
        background: color,
        left: initialX,
        top: initialY,
        animationDelay: delay,
        boxShadow: `0 0 ${parseInt(size) * 3}px ${color}`,
        borderRadius: "50%",
      }}
    />
  );
};

// Floating Shape Component
const FloatingShape = ({ children, delay, duration, xOffset, yOffset }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.1, 0.2, 0.1],
        x: [0, xOffset, 0],
        y: [0, yOffset, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Glowing Orb Component
const GlowingOrb = ({ position, size, color }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        borderRadius: "50%",
        filter: "blur(50px)",
        zIndex: 0,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    />
  );
};

// Typewriter Text Component
const TypewriterText = ({ text, className, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
    >
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        style={{ marginLeft: "2px" }}
      >
        |
      </motion.span>
    </motion.span>
  );
};

// Development Card Component with Blackest Filter
const DevelopmentCard = ({ card, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="dev-card-new"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="dev-card-image">
        <img src={card.image} alt={card.title} />
        {/* Blackest Filter Overlay */}
        <div className="dev-card-black-filter"></div>
        <motion.div
          className="dev-card-hover-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <h4>{card.title}</h4>
          <p>{card.shortDesc}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Timeline Item Component
const TimelineItem = ({ service, index }) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={itemRef}
      className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="timeline-marker">
        <div className="marker-dot"></div>
        <div className="marker-line"></div>
      </div>

      <motion.div
        className="timeline-card"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="card-icon">{service.icon}</div>
        <div className="card-content">
          <h3>{service.title}</h3>
          <p>{service.description}</p>
          <div className="card-stats">
            <span className="stat-badge">{service.stats}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Testimonial Slider Component
const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      text: "They didn't just build our platform; they transformed how we connect with our customers. The results exceeded all expectations.",
      author: "Sarah Chen, CEO of TechFlow",
    },
    {
      text: "The team's expertise in digital marketing helped us increase our online presence by 300% in just 6 months.",
      author: "Michael Rodriguez, Founder of GrowthLabs",
    },
    {
      text: "Their software development team delivered a flawless product ahead of schedule. Highly recommended!",
      author: "David Kim, CTO of InnovateCorp",
    },
    {
      text: "Working with them has been a game-changer for our business. Their strategic approach is unmatched.",
      author: "Emily Watson, Marketing Director at ScaleUp",
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPaused, testimonials.length]);

  return (
    <div
      className="testimonial-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="testimonial-track"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-slide">
            <div className="testimonial-card">
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{testimonial.text}</p>
              <p className="testimonial-author">— {testimonial.author}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="slider-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isDigitalMarketingDropdownOpen, setIsDigitalMarketingDropdownOpen] =
    useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = [
        "home",
        "about",
        "services",
        "blog",
        "portfolio",
        "contact",
      ];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveLink(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path, sectionId = null) => {
    if (path === "/") {
      navigate(path);
      setTimeout(() => {
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 100);
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsDigitalMarketingDropdownOpen(false);
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
                    Digital Marketing <span className="dropdown-icon">▶</span>
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

// Footer Component
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
                  <Link
                    to="/careers"
                    onClick={() => handleNavigation("/careers")}
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link to="/press" onClick={() => handleNavigation("/press")}>
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    to="/partners"
                    onClick={() => handleNavigation("/partners")}
                  >
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
                  <Link
                    to="/guides"
                    onClick={() => handleNavigation("/guides")}
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="/whitepapers"
                    onClick={() => handleNavigation("/whitepapers")}
                  >
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
                  <Link
                    to="/privacy"
                    onClick={() => handleNavigation("/privacy")}
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" onClick={() => handleNavigation("/terms")}>
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/disclaimer"
                    onClick={() => handleNavigation("/disclaimer")}
                  >
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link
                    to="/compliance"
                    onClick={() => handleNavigation("/compliance")}
                  >
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

// Counter Component
const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
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
          }
        });
      },
      { threshold: 0.5, once: true },
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => {
      if (countRef.current) observer.unobserve(countRef.current);
    };
  }, [end, duration, hasAnimated]);

  return (
    <span ref={countRef} className="counter">
      {count}
      {suffix}
    </span>
  );
};

// Instagram Live Post Container Component
const InstagramLiveContainer = () => {
  const [currentPost, setCurrentPost] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const instagramPosts = [
    {
      id: 1,
      image: instagram1,
      likes: "2.5k",
      comments: "89",
      isLive: true,
      time: "2 hours ago",
    },
    {
      id: 2,
      image: instagram2,
      likes: "1.8k",
      comments: "45",
      isLive: false,
      time: "5 hours ago",
    },
    {
      id: 3,
      image: instagram3,
      likes: "3.2k",
      comments: "120",
      isLive: true,
      time: "3 hours ago",
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(
        () => setCurrentPost((prev) => (prev + 1) % instagramPosts.length),
        4000,
      );
      return () => clearInterval(interval);
    }
  }, [isPaused, instagramPosts.length]);

  const openInstagram = () =>
    window.open("https://www.instagram.com/nexonic.marketing", "_blank");
  const post = instagramPosts[currentPost];

  return (
    <div className="instagram-live-container" onClick={openInstagram}>
      <div className="instagram-header-mini">
        <span className="instagram-badge">
          <span className="live-pulse"></span>LIVE NOW
        </span>
        <span className="instagram-username">@nexonic.marketing</span>
      </div>
      <div
        className="instagram-post-player"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="post-image-wrapper">
          <img
            src={post.image}
            alt="Instagram post"
            className="instagram-post-image"
          />
          {post.isLive && (
            <div className="live-badge-large">
              <span className="live-dot"></span>LIVE
            </div>
          )}
        </div>
        <div className="post-content">
          <div className="post-meta">
            <div className="post-stats">
              <span>❤️ {post.likes}</span>
              <span>💬 {post.comments}</span>
            </div>
            <div className="post-time">{post.time}</div>
          </div>
        </div>
        <div className="instagram-overlay">
          <div className="instagram-profile">
            <div className="profile-icon">📸</div>
            <div className="profile-info">
              <span className="profile-name">@nexonic.marketing</span>
              <span className="profile-follow">Click to follow</span>
            </div>
          </div>
          <button
            className="instagram-follow-button"
            onClick={(e) => {
              e.stopPropagation();
              openInstagram();
            }}
          >
            <i className="fab fa-instagram"></i>Follow
          </button>
        </div>
      </div>
      <div className="instagram-progress">
        {instagramPosts.map((_, index) => (
          <div
            key={index}
            className={`progress-bar ${currentPost === index ? "active" : ""}`}
            style={{ width: `${100 / instagramPosts.length}%` }}
          ></div>
        ))}
      </div>
      <div className="instagram-footer">
        <span className="post-counter">
          {currentPost + 1} / {instagramPosts.length}
        </span>
        <span
          className="instagram-handle"
          onClick={(e) => {
            e.stopPropagation();
            openInstagram();
          }}
        >
          @nexonic.marketing →
        </span>
      </div>
    </div>
  );
};

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [particles, setParticles] = useState([]);
  const [glowingOrbs, setGlowingOrbs] = useState([]);
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        delay: `${i * 0.1}s`,
        size: `${Math.random() * 10 + 3}px`,
        color: `rgba(198, 255, 0, ${Math.random() * 0.3 + 0.1})`,
        initialX: `${Math.random() * 100}%`,
        initialY: `${Math.random() * 100}%`,
        speed: Math.random() * 1 + 0.3,
      });
    }
    setParticles(newParticles);
    const newOrbs = [];
    for (let i = 0; i < 5; i++) {
      newOrbs.push({
        id: i,
        position: {
          x: `${Math.random() * 100}%`,
          y: `${Math.random() * 100}%`,
        },
        size: `${Math.random() * 200 + 100}px`,
        color: `rgba(198, 255, 0, ${Math.random() * 0.1 + 0.05})`,
      });
    }
    setGlowingOrbs(newOrbs);
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const isInHero =
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom &&
          e.clientX >= rect.left &&
          e.clientX <= rect.right;
        if (isInHero) {
          const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
          const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
          setGlowPosition({ x: xPercent, y: yPercent });
          const moveX = (xPercent - 50) * 0.1;
          const moveY = (yPercent - 50) * 0.1;
          setMousePosition({ moveX, moveY });
        }
      }
    };
    const heroElement = heroRef.current;
    if (heroElement) heroElement.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (heroElement)
        heroElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToNext = () =>
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  const handleButtonClick = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const developmentCards = [
    {
      id: 1,
      title: "Web Development",
      shortDesc: "Modern web applications",
      image: webDevImage,
    },
    {
      id: 2,
      title: "Mobile Apps",
      shortDesc: "iOS & Android development",
      image: mobileAppImage,
    },
    {
      id: 3,
      title: "Cloud Solutions",
      shortDesc: "Scalable cloud infrastructure",
      image: cloudImage,
    },
    {
      id: 4,
      title: "UI/UX Design",
      shortDesc: "Beautiful user interfaces",
      image: uiuxImage,
    },
    {
      id: 5,
      title: "API Development",
      shortDesc: "RESTful & GraphQL APIs",
      image: apiImage,
    },
    {
      id: 6,
      title: "DevOps",
      shortDesc: "CI/CD & automation",
      image: devopsImage,
    },
    {
      id: 7,
      title: "Database Design",
      shortDesc: "SQL & NoSQL solutions",
      image: databaseImage,
    },
    {
      id: 8,
      title: "Security",
      shortDesc: "Application security",
      image: securityImage,
    },
  ];

  const marketingServices = [
    {
      title: "SEO Optimization",
      description:
        "Dominate search rankings with advanced SEO strategies that drive organic growth.",
      icon: "🔍",
      stats: "200% avg. traffic increase",
    },
    {
      title: "Social Media Marketing",
      description:
        "Build engaged communities across all platforms with data-driven content strategies.",
      icon: "📱",
      stats: "500k+ reach per campaign",
    },
    {
      title: "Performance Advertising",
      description:
        "Data-driven PPC campaigns that maximize ROI through precise targeting.",
      icon: "🎯",
      stats: "3x ROAS average",
    },
    {
      title: "Content Marketing",
      description:
        "Compelling content that converts visitors into loyal customers.",
      icon: "✍️",
      stats: "85% engagement rate",
    },
    {
      title: "Brand Growth Strategy",
      description:
        "Comprehensive brand strategies for sustainable market growth.",
      icon: "📈",
      stats: "150% brand awareness",
    },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Discover",
      description: "Deep dive into your business, market, and user needs.",
      icon: "🔍",
    },
    {
      step: "02",
      title: "Strategy",
      description: "Data-backed planning with clear milestones.",
      icon: "📊",
    },
    {
      step: "03",
      title: "Design",
      description: "Beautiful, intuitive user interfaces.",
      icon: "🎨",
    },
    {
      step: "04",
      title: "Develop",
      description: "Agile development with continuous iteration.",
      icon: "⚙️",
    },
    {
      step: "05",
      title: "Launch",
      description: "Smooth deployment and go-to-market execution.",
      icon: "🚀",
    },
  ];

  const achievements = [
    { number: 500, label: "Projects Delivered", suffix: "+", icon: "🚀" },
    { number: 200, label: "Clients Worldwide", suffix: "+", icon: "🌍" },
    { number: 10, label: "Marketing Reach", suffix: "M+", icon: "📊" },
    { number: 5, label: "Years Experience", suffix: "+", icon: "⭐" },
  ];

  return (
    <div className="home-container">
      <Navbar />

      {/* HERO SECTION */}
      <Section className="hero-section" id="home">
        <div ref={heroRef} className="hero-background">
          <div className="hero-gradient-bg"></div>
          {glowingOrbs.map((orb) => (
            <GlowingOrb
              key={orb.id}
              position={orb.position}
              size={orb.size}
              color={orb.color}
            />
          ))}
          <FloatingShape delay={0} duration={6} xOffset={30} yOffset={30}>
            <div className="floating-shape shape-1"></div>
          </FloatingShape>
          <FloatingShape delay={1} duration={7} xOffset={-30} yOffset={20}>
            <div className="floating-shape shape-2"></div>
          </FloatingShape>
          <FloatingShape delay={2} duration={8} xOffset={20} yOffset={-30}>
            <div className="floating-shape shape-3"></div>
          </FloatingShape>
          {particles.map((particle) => (
            <Particle
              key={particle.id}
              delay={particle.delay}
              size={particle.size}
              color={particle.color}
              initialX={particle.initialX}
              initialY={particle.initialY}
              speed={particle.speed}
            />
          ))}
          <div
            className="hero-glow-spot"
            style={{ left: `${glowPosition.x}%`, top: `${glowPosition.y}%` }}
          ></div>
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-container">
          <div
            className="hero-content-centered"
            ref={heroContentRef}
            style={{
              transform: `translate(${mousePosition.moveX}px, ${mousePosition.moveY}px)`,
            }}
          >
            <div className="hero-badge">
              <span className="badge-pulse"></span>
              <span>Digital Innovation Agency</span>
            </div>
            <h1 className="hero-title-centered">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {["Build.", "Market.", "Scale", "Your"].map(
                  (word, wordIndex) => (
                    <span
                      key={wordIndex}
                      style={{ marginRight: "10px", display: "inline-block" }}
                    >
                      {word}
                    </span>
                  ),
                )}
              </div>
              <span className="gradient-text">
                <TypewriterText
                  text=" Digital Future"
                  className="gradient-text"
                  delay={1.5}
                />
              </span>
            </h1>
            <p className="hero-description-centered">
              We combine cutting-edge development, data-driven marketing, and
              strategic growth to transform your business.
            </p>
            <div className="hero-cta-group-centered">
              <button
                className="btn btn-primary btn-large"
                onClick={() => handleButtonClick("/contact")}
              >
                Start Project <span className="btn-arrow">→</span>
              </button>
              <button
                className="btn btn-outline btn-large"
                onClick={() => handleButtonClick("/services")}
              >
                Explore Services
              </button>
            </div>
          </div>
        </div>
        <div className="scroll-indicator" onClick={scrollToNext}>
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="scroll-text">Scroll</div>
        </div>
      </Section>

      {/* ABOUT SECTION - WE SHAPE DIGITAL EXCELLENCE - LEFT IMAGE RIGHT CONTENT */}
      <Section className="brand-section" id="about">
        <div className="brand-container-split">
          {/* Left Side - Image */}
          <motion.div 
            className="brand-image-side"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="brand-image-wrapper-split">
              <img src={aboutHeroImage} alt="Digital Excellence" className="brand-main-image" />
              <div className="image-overlay-glow"></div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            className="brand-content-side"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="brand-header">
              <span className="brand-subtitle">About Us</span>
              <h2 className="brand-title-split">
                We Shape <span className="gradient-text">Digital Excellence</span>
              </h2>
              <div className="brand-divider-split">
                <span className="divider-line-split"></span>
                <span className="divider-glow-split"></span>
              </div>
            </div>
            
            <p className="brand-description-split">
              At NEXONIC, we believe in the transformative power of technology and creativity. 
              Our vision is to build digital experiences that not only look exceptional but 
              drive real business growth. We combine cutting-edge development, data-driven 
              marketing, and strategic growth to transform your business.
            </p>
            
            <div className="brand-features-split">
              <div className="feature-item">
                <div className="feature-icon-split">🚀</div>
                <div className="feature-text">
                  <h4>Innovation First</h4>
                  <p>Cutting-edge solutions for modern challenges</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-split">💡</div>
                <div className="feature-text">
                  <h4>Creative Solutions</h4>
                  <p>Unique approaches that stand out</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-split">🎯</div>
                <div className="feature-text">
                  <h4>Results Driven</h4>
                  <p>Measurable outcomes that matter</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-split">⭐</div>
                <div className="feature-text">
                  <h4>Client First</h4>
                  <p>Your success is our priority</p>
                </div>
              </div>
            </div>
            
            <motion.button 
              className="btn-about-more"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleButtonClick("/about")}
            >
              Learn More About Us <span className="btn-arrow">→</span>
            </motion.button>
          </motion.div>
        </div>
      </Section>

      {/* DIGITAL MARKETING EXPERTISE - BACKGROUND REMOVED */}
      <Section className="marketing-timeline-section" id="services">
        <div className="timeline-container">
          <h2 className="section-title text-center">
            Digital Marketing <span className="gradient-text">Expertise</span>
          </h2>
          <div className="vertical-timeline">
            {marketingServices.map((service, index) => (
              <TimelineItem key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* DEVELOPMENT SOLUTIONS - With Blackest Filter */}
      <Section className="development-cards-new-section" id="development">
        <div className="cards-new-container">
          <h2 className="section-title text-center">
            Development <span className="gradient-text">Solutions</span>
          </h2>
          <div className="cards-grid">
            {developmentCards.map((card, index) => (
              <DevelopmentCard key={card.id} card={card} index={index} />
            ))}
          </div>
        </div>
      </Section>

      {/* BLOG SECTION */}
      <Section className="process-modern-section" id="blog">
        <div className="process-modern-container">
          <h2 className="section-title text-center">
            Latest From Our <span className="gradient-text">Blog</span>
          </h2>
          <div className="process-steps-grid">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step-card">
                <div className="process-step-number">{step.step}</div>
                <div className="process-step-icon">{step.icon}</div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* PORTFOLIO SECTION - BACKGROUND REMOVED */}
      <Section className="achievements-perfect-section" id="portfolio">
        <div className="achievements-perfect-container">
          <div className="section-header-wrapper">
            <span className="section-subtitle">Our Portfolio</span>
            <h2 className="section-title">
              Featured <span className="gradient-text">Work</span>
            </h2>
            <div className="section-divider">
              <span className="divider-line"></span>
              <span className="divider-glow"></span>
              <span className="divider-line"></span>
            </div>
          </div>

          <div className="achievements-perfect-grid">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="achievement-perfect-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="achievement-perfect-icon">
                  {achievement.icon}
                </div>
                <div className="achievement-perfect-number">
                  <Counter
                    end={achievement.number}
                    suffix={achievement.suffix}
                  />
                </div>
                <div className="achievement-perfect-label">
                  {achievement.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="testimonial-wrapper">
            <div className="testimonial-header">
              <span className="testimonial-badge">Client Stories</span>
              <h3 className="testimonial-title">
                What Our <span className="gradient-text">Clients Say</span>
              </h3>
            </div>
            <TestimonialSlider />
          </div>
        </div>
      </Section>

      {/* INSTAGRAM LIVE SECTION */}
      <Section className="instagram-live-section" id="instagram">
        <div className="instagram-container">
          <div className="instagram-header">
            <span className="instagram-badge">
              <span className="live-pulse"></span>Live Updates
            </span>
            <h2 className="instagram-title">
              Instagram <span className="gradient-text">Live</span>
            </h2>
            <p className="instagram-subtitle">
              Watch our latest posts and stories
            </p>
          </div>
          <div className="instagram-player-wrapper">
            <InstagramLiveContainer />
          </div>
        </div>
      </Section>

      {/* CONTACT SECTION */}
      <Section className="cta-premium-section" id="contact">
        <div
          className="cta-premium-background"
          // style={{ backgroundImage: `url(${ctaBg})` }}
        ></div>
        <div className="cta-premium-container">
          <div className="cta-premium-content">
            <h2 className="cta-premium-title">
              Ready To Grow Your <span className="white-text">Business?</span>
            </h2>
            <p className="cta-premium-description">
              Join 200+ companies that have transformed their digital presence.
            </p>
            <div className="cta-premium-buttons">
              <button
                className="btn btn-primary btn-xxl"
                onClick={() => handleButtonClick("/contact")}
              >
                Start Your Project <span className="btn-arrow">→</span>
              </button>
              <button
                className="btn btn-outline btn-xxl"
                onClick={() => handleButtonClick("/contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Home;