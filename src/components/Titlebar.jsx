import React, { useState, useRef, useEffect } from 'react';
import './Titlebar.css';

function Titlebar() {
  const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const dropdownRef = useRef(null);
  const navRatiosRef = useRef(new Map());
  const rafRef = useRef(null);

  useEffect(() => {
    const nodes = document.querySelectorAll('[data-titlebar-nav]');
    if (!nodes.length) return undefined;

    const flush = () => {
      rafRef.current = null;
      const map = navRatiosRef.current;
      const byKey = new Map();
      map.forEach((ratio, el) => {
        const key = el.getAttribute('data-titlebar-nav');
        if (!key) return;
        byKey.set(key, Math.max(byKey.get(key) || 0, ratio));
      });
      let best = 'home';
      let bestR = 0;
      byKey.forEach((r, k) => {
        if (r > bestR) {
          bestR = r;
          best = k;
        }
      });
      if (bestR > 0.02) {
        setActiveNav(best);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          navRatiosRef.current.set(entry.target, entry.intersectionRatio);
        });
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(flush);
      },
      {
        root: null,
        rootMargin: '-32% 0px -32% 0px',
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    nodes.forEach((n) => observer.observe(n));

    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      if (y < vh * 0.42) {
        setActiveNav('home');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      nodes.forEach((n) => observer.unobserve(n));
      navRatiosRef.current.clear();
    };
  }, []);

  // Scroll handlers
  const scrollToHome = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  const scrollToWhyVerbll = () => {
    window.scrollTo({
      top: window.innerHeight * 2 + 80,
      behavior: 'smooth'
    });
  };

  const scrollToContact = () => {
    window.scrollTo({
      top: window.innerHeight * 15.5 + 80,
      behavior: 'smooth'
    });
  };

  const handleDemoVideoClick = () => {
    // Scroll to demo card section
    window.scrollTo({
      top: window.innerHeight * 0.8 + 80,
      behavior: 'smooth'
    });
  };


  const handleFeatureClick = (featureName) => {
    setShowFeaturesDropdown(false);
    if (featureName === 'Chat') {
      window.scrollTo({
        top: window.innerHeight * 6 + 80,
        behavior: 'smooth'
      });
    } else if (featureName === 'Brainstorm') {
      window.scrollTo({
        top: window.innerHeight * 7 + 80,
        behavior: 'smooth'
      });
    } else if (featureName === 'Code Now') {
      window.scrollTo({
        top: window.innerHeight * 8 + 80,
        behavior: 'smooth'
      });
    } else if (featureName === 'Course Designer') {
      window.scrollTo({
        top: window.innerHeight * 9 + 80,
        behavior: 'smooth'
      });
    } else if (featureName === 'Deep Research') {
      window.scrollTo({
        top: window.innerHeight * 10 + 80,
        behavior: 'smooth'
      });
    } else if (featureName === 'Video Summarizer') {
      window.scrollTo({
        top: window.innerHeight * 11 + 80,
        behavior: 'smooth'
      });
    } else if (featureName === 'My Notes') {
      window.scrollTo({
        top: window.innerHeight * 12 + 80,
        behavior: 'smooth'
      });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFeaturesDropdown(false);
      }
    };

    if (showFeaturesDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showFeaturesDropdown]);

  const features = [
    'Chat',
    'Brainstorm',
    'Code Now',
    'Course Designer',
    'Deep Research',
    'Video Summarizer',
    'My Notes'
  ];

  return (
    <div className="titlebar">
      <div className="titlebar-left">
        <img src="/logo.png" alt="Verbll Logo" className="logo" />
        <h1>VERBLL</h1>
      </div>
      <div className="titlebar-right">
        <div className={`nav-item ${activeNav === 'home' ? 'nav-item--active' : ''}`}>
          <button type="button" className="nav-btn" onClick={scrollToHome}>
            Home
          </button>
        </div>
        <div className={`nav-item nav-item--dropdown ${activeNav === 'features' ? 'nav-item--active' : ''}`} ref={dropdownRef}>
          <button
            type="button"
            className="nav-btn dropdown-btn"
            onClick={() => setShowFeaturesDropdown(!showFeaturesDropdown)}
          >
            Features
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '6px' }}>
              <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {showFeaturesDropdown && (
            <div className="dropdown-menu">
              {features.map((feature, index) => (
                <button
                  key={index}
                  type="button"
                  className="dropdown-item"
                  onClick={() => handleFeatureClick(feature)}
                >
                  {feature}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className={`nav-item ${activeNav === 'platform' ? 'nav-item--active' : ''}`}>
          <button type="button" className="nav-btn" onClick={scrollToWhyVerbll}>
            The Platform
          </button>
        </div>
        <div className={`nav-item ${activeNav === 'contact' ? 'nav-item--active' : ''}`}>
          <button type="button" className="nav-btn" onClick={scrollToContact}>
            Contact
          </button>
        </div>
        <div className={`nav-item ${activeNav === 'demo' ? 'nav-item--active' : ''}`}>
          <button type="button" className="nav-btn demo-btn" onClick={handleDemoVideoClick}>
            Demo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Titlebar;
