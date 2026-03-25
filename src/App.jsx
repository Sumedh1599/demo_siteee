import React, { useState, useEffect, useRef } from 'react';
import { LiquidMetal } from '@paper-design/shaders-react';
import { exchangeCodeForTokens, decodeJWT } from './utils/api';
import './App.css';
import './mobile.css'; // Import mobile-specific styles
import Titlebar from './components/Titlebar';
import MobileTitlebar from './components/MobileTitlebar';
import githubIcon from './components/assets/github.png';
import linkedinIcon from './components/assets/linkedin.png';
import mailIcon from './components/assets/mail.png';

// Add mobile viewport meta tag
const addMobileViewport = () => {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
  }
};

function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showDemo, setShowDemo] = useState(false);
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showBrainstorm, setShowBrainstorm] = useState(false);
  const [showCodeNow, setShowCodeNow] = useState(false);
  const [showCourseDesigner, setShowCourseDesigner] = useState(false);
  const [showDeepResearch, setShowDeepResearch] = useState(false);
  const [showVideoSummarizer, setShowVideoSummarizer] = useState(false);
  const [showMyNotes, setShowMyNotes] = useState(false);
  const [showPersonalisation, setShowPersonalisation] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showFounder, setShowFounder] = useState(false);
  const [showProblem, setShowProblem] = useState(false);
  const [showMarket, setShowMarket] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);
  
  // Refs for all section cards
  const demoCardRef = useRef(null);
  const benchmarkCardRef = useRef(null);
  const aboutCardRef = useRef(null);
  const problemCardRef = useRef(null);
  const marketCardRef = useRef(null);
  const featuresCardRef = useRef(null);
  const aiChatCardRef = useRef(null);
  const brainstormCardRef = useRef(null);
  const codeNowCardRef = useRef(null);
  const courseDesignerCardRef = useRef(null);
  const deepResearchCardRef = useRef(null);
  const videoSummarizerCardRef = useRef(null);
  const myNotesCardRef = useRef(null);
  const founderCardRef = useRef(null);
  const footerCardRef = useRef(null);
  
  // Refs for all video iframes
  const demoVideoRef = useRef(null);
  const aiChatVideoRef = useRef(null);
  const brainstormVideoRef = useRef(null);
  const codeNowVideoRef = useRef(null);
  const courseDesignerVideoRef = useRef(null);
  const deepResearchVideoRef = useRef(null);
  const videoSummarizerVideoRef = useRef(null);
  const myNotesVideoRef = useRef(null);

  const handleExploreClick = () => {
    // Scroll to position with 80px offset for titlebar
    window.scrollTo({
      top: window.innerHeight + 80,
      behavior: 'smooth'
    });
  };

  const handleEarlyAccess = () => {
    const clientId = '1ikn37t8lko525bsfh0io78blj';
    // Use CloudFront distribution for signup
    const signupUrl = `https://d19b9a58mfvcug.cloudfront.net/signup?client_id=${clientId}&response_type=code&scope=email+openid+phone&redirect_uri=https://verbll.com`;
    
    window.location.href = signupUrl;
  };

  const handleDemoVideoClick = () => {
    // Scroll to demo card section
    window.scrollTo({
      top: window.innerHeight * 0.8 + 80,
      behavior: 'smooth'
    });
  };

  const handleAIChatClick = () => {
    window.scrollTo({
      top: window.innerHeight * 6 + 80,
      behavior: 'smooth'
    });
  };

  const handleBrainstormClick = () => {
    window.scrollTo({
      top: window.innerHeight * 7 + 80,
      behavior: 'smooth'
    });
  };

  const handleCodeNowClick = () => {
    window.scrollTo({
      top: window.innerHeight * 8 + 80,
      behavior: 'smooth'
    });
  };

  const handleCourseDesignerClick = () => {
    window.scrollTo({
      top: window.innerHeight * 9 + 80,
      behavior: 'smooth'
    });
  };

  const handleDeepResearchClick = () => {
    window.scrollTo({
      top: window.innerHeight * 10 + 80,
      behavior: 'smooth'
    });
  };

  const handleVideoSummarizerClick = () => {
    window.scrollTo({
      top: window.innerHeight * 11 + 80,
      behavior: 'smooth'
    });
  };

  const handleMyNotesClick = () => {
    window.scrollTo({
      top: window.innerHeight * 12 + 80,
      behavior: 'smooth'
    });
  };

  // Mobile navigation handlers
  const handleMobileMenuToggle = () => {
    console.log('Mobile menu toggle clicked, current state:', showMobileMenu);
    const newState = !showMobileMenu;
    console.log('Setting new state to:', newState);
    setShowMobileMenu(newState);
  };

  const handleMobileNavClick = (section) => {
    console.log('Mobile nav clicked:', section);
    setShowMobileMenu(false);
    
    // For mobile, we need to find the actual mobile elements or use a different approach
    if (window.innerWidth <= 768) {
      // Mobile-specific navigation
      switch(section) {
        case 'home':
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        case 'demo':
          // Find the demo section by looking for it in the DOM
          const demoElements = document.querySelectorAll('.demo-section, [class*="demo"]');
          if (demoElements.length > 0) {
            demoElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        case 'aiChat':
          const aiElements = document.querySelectorAll('.ai-chat-section, [class*="ai-chat"]');
          if (aiElements.length > 0) {
            aiElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        case 'brainstorm':
          const brainstormElements = document.querySelectorAll('.brainstorm-section, [class*="brainstorm"]');
          if (brainstormElements.length > 0) {
            brainstormElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        case 'codeNow':
          const codeElements = document.querySelectorAll('.code-now-section, [class*="code"]');
          if (codeElements.length > 0) {
            codeElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        case 'courseDesigner':
          const courseElements = document.querySelectorAll('.course-designer-section, [class*="course"]');
          if (courseElements.length > 0) {
            courseElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        case 'deepResearch':
          const researchElements = document.querySelectorAll('.deep-research-section, [class*="research"]');
          if (researchElements.length > 0) {
            researchElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        case 'videoSummarizer':
          const videoElements = document.querySelectorAll('.video-summarizer-section, [class*="video"]');
          if (videoElements.length > 0) {
            videoElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        case 'myNotes':
          const notesElements = document.querySelectorAll('.my-notes-section, [class*="notes"]');
          if (notesElements.length > 0) {
            notesElements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          return;
        default:
          return;
      }
    }
    
    // Fallback to desktop behavior (shouldn't reach here on mobile)
    console.log('Using desktop fallback navigation');
    return;
  };

  const handleFounderClick = () => {
    window.scrollTo({
      top: window.innerHeight * 13.5 + 80,
      behavior: 'smooth'
    });
  };

  const handleFeatureClick = (featureName) => {
    if (featureName === 'Personalised AI Chat') {
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

  const handleEarlyAccessCallback = async (code) => {
    try {
      
      
      // Exchange code for tokens
      const tokenResponse = await exchangeCodeForTokens(code);
      
      // Decode ID token to get email and userId
      const idTokenPayload = decodeJWT(tokenResponse.id_token);
      const email = idTokenPayload.email;
      const userId = idTokenPayload.sub;

      if (!email || !userId) {
        console.error('Unable to extract user information from token');
        return;
      }

      

      // Redirect immediately to thank you page
      window.location.href = 'https://www.verbll.com/thank-you.html';

      // Clean URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);

    } catch (error) {
      // Silently redirect to main site on any error
      window.location.href = 'https://www.verbll.com';
    }
  };

  useEffect(() => {
    // Add mobile viewport meta tag
    addMobileViewport();
    
    // Detect mobile device
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Handle early access OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      handleEarlyAccessCallback(code);
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1 for each section)
      const scrollProgress = currentScrollY / viewportHeight;
      
      // Progressive visibility with smooth transitions
      // Sections appear/disappear based on scroll position with overlap
      const welcomeThreshold = 0.3;
      const demoThreshold = 0.8;
      const problemThreshold = 1.5;
      const aboutThreshold = 2.2;
      const benchmarkThreshold = 3.2;
      const marketThreshold = 4.2;
      const featuresThreshold = 5.2;
      const aiChatThreshold = 6.2;
      const brainstormThreshold = 7.2;
      const codeNowThreshold = 8.2;
      const courseDesignerThreshold = 9.2;
      const deepResearchThreshold = 10.2;
      const videoSummarizerThreshold = 11.2;
      const myNotesThreshold = 12.2;
      const founderThreshold = 13.2;
      const footerThreshold = 14.2;
      
      // Set visibility based on scroll position with smooth transitions
      setShowWelcome(scrollProgress < welcomeThreshold);
      setShowDemo(scrollProgress >= demoThreshold && scrollProgress < problemThreshold);
      setShowProblem(scrollProgress >= problemThreshold && scrollProgress < aboutThreshold);
      setShowAbout(scrollProgress >= aboutThreshold && scrollProgress < benchmarkThreshold);
      setShowBenchmark(scrollProgress >= benchmarkThreshold && scrollProgress < marketThreshold);
      setShowMarket(scrollProgress >= marketThreshold && scrollProgress < featuresThreshold);
      setShowFeatures(scrollProgress >= featuresThreshold && scrollProgress < aiChatThreshold);
      setShowAIChat(scrollProgress >= aiChatThreshold && scrollProgress < brainstormThreshold);
      setShowBrainstorm(scrollProgress >= brainstormThreshold && scrollProgress < codeNowThreshold);
      setShowCodeNow(scrollProgress >= codeNowThreshold && scrollProgress < courseDesignerThreshold);
      setShowCourseDesigner(scrollProgress >= courseDesignerThreshold && scrollProgress < deepResearchThreshold);
      setShowDeepResearch(scrollProgress >= deepResearchThreshold && scrollProgress < videoSummarizerThreshold);
      setShowVideoSummarizer(scrollProgress >= videoSummarizerThreshold && scrollProgress < myNotesThreshold);
      setShowMyNotes(scrollProgress >= myNotesThreshold && scrollProgress < founderThreshold);
      setShowFounder(scrollProgress >= founderThreshold && scrollProgress < footerThreshold);
      setShowFooter(scrollProgress >= footerThreshold);

      lastScrollY.current = currentScrollY;

      // Reveal scroll content based on scroll position
      if (showDemo || showBenchmark || showAbout || showProblem || showMarket || showFeatures || showAIChat || showBrainstorm || showCodeNow || showCourseDesigner || showDeepResearch || showVideoSummarizer || showMyNotes || showFounder || showFooter) {
        const scrollElements = scrollRef.current?.querySelectorAll('.scroll-reveal:not(.revealed)');
        if (scrollElements) {
          scrollElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight * 0.8 && elementBottom > 0) {
              element.classList.add('revealed');
            }
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showDemo, showBenchmark, showAbout, showProblem, showMarket, showFeatures, showAIChat, showBrainstorm, showCodeNow, showCourseDesigner, showDeepResearch, showVideoSummarizer, showMyNotes, showFounder, showFooter]);

  // Intersection Observer for card scroll animations (Apple-style)
  useEffect(() => {
    const cardRefs = [
      demoCardRef, problemCardRef, aboutCardRef, benchmarkCardRef, marketCardRef, featuresCardRef,
      aiChatCardRef, brainstormCardRef, codeNowCardRef, courseDesignerCardRef,
      deepResearchCardRef, videoSummarizerCardRef, myNotesCardRef,
      founderCardRef, footerCardRef
    ];

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2 // Trigger when 20% of element is visible from bottom
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    cardRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      cardRefs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Intersection Observer for video autoplay/pause
  useEffect(() => {
    const videoRefs = [
      { ref: demoVideoRef, videoId: '1174038269', platform: 'vimeo' },
      { ref: aiChatVideoRef, videoId: 'M8B-77Fbc7w', platform: 'youtube' },
      { ref: brainstormVideoRef, videoId: 'Nm5RJhaVZ6M', platform: 'youtube' },
      { ref: codeNowVideoRef, videoId: '1cuLXJJbt6w', platform: 'youtube' },
      { ref: courseDesignerVideoRef, videoId: 'SDb-g-rAIZA', platform: 'youtube' },
      { ref: deepResearchVideoRef, videoId: 'pw3r8_B-MIg', platform: 'youtube' },
      { ref: videoSummarizerVideoRef, videoId: 'NrFcNPsHG2c', platform: 'youtube' },
      { ref: myNotesVideoRef, videoId: 'y_3yyfim7ls', platform: 'youtube' }
    ];

    const videoObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // Trigger when 30% visible
    };

    const playVideo = (iframe, platform) => {
      if (!iframe || !iframe.contentWindow) return;
      
      try {
        if (platform === 'vimeo') {
          // Vimeo player API
          iframe.contentWindow.postMessage({
            method: 'play',
            value: true
          }, '*');
        } else {
          // YouTube IFrame API
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'playVideo',
              args: ''
            }),
            'https://www.youtube.com'
          );
          
          // Method 2: Try setting src with autoplay (forces reload)
          const currentSrc = iframe.src;
          if (!currentSrc.includes('autoplay=1')) {
            const newSrc = currentSrc.includes('autoplay=0') 
              ? currentSrc.replace('autoplay=0', 'autoplay=1')
              : currentSrc + (currentSrc.includes('?') ? '&' : '?') + 'autoplay=1';
            iframe.src = newSrc;
          }
        }
      } catch (error) {
        
      }
    };

    const pauseVideo = (iframe, platform) => {
      if (!iframe || !iframe.contentWindow) return;
      
      try {
        if (platform === 'vimeo') {
          // Vimeo player API
          iframe.contentWindow.postMessage({
            method: 'pause',
            value: true
          }, '*');
        } else {
          // YouTube IFrame API
          iframe.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: 'pauseVideo',
              args: ''
            }),
            'https://www.youtube.com'
          );
        }
      } catch (error) {
        
      }
    };

    const videoObserverCallback = (entries) => {
      entries.forEach(entry => {
        const iframe = entry.target;
        if (!iframe) return;

        // Find the platform for this iframe
        const videoRef = videoRefs.find(vr => vr.ref.current === iframe);
        const platform = videoRef ? videoRef.platform : 'youtube';

        if (entry.isIntersecting) {
          // Play video when scrolled into viewport
          // Try multiple times to ensure it works
          playVideo(iframe, platform);
          setTimeout(() => playVideo(iframe, platform), 300);
          setTimeout(() => playVideo(iframe, platform), 800);
          setTimeout(() => playVideo(iframe, platform), 1500);
        } else {
          // Pause video when scrolled out of viewport
          pauseVideo(iframe, platform);
        }
      });
    };

    const videoObserver = new IntersectionObserver(videoObserverCallback, videoObserverOptions);

    // Observe all video iframes
    videoRefs.forEach(({ ref }) => {
      if (ref.current) {
        videoObserver.observe(ref.current);
        ref.current.dataset.observed = 'true';
      }
    });

    // Re-observe when refs become available (for dynamic loading)
    const checkRefs = setInterval(() => {
      videoRefs.forEach(({ ref }) => {
        if (ref.current && !ref.current.dataset.observed) {
          videoObserver.observe(ref.current);
          ref.current.dataset.observed = 'true';
        }
      });
    }, 1000);

    return () => {
      clearInterval(checkRefs);
      videoRefs.forEach(({ ref }) => {
        if (ref.current) {
          videoObserver.unobserve(ref.current);
        }
      });
    };
  }, []);

  const features = [
    {
      name: 'Personalised AI Chat',
      description: 'Context-aware intelligent assistant',
      icon: 'fas fa-comments',
      onClick: handleAIChatClick
    },
    {
      name: 'Brainstorm',
      description: 'AI-powered idea generation',
      icon: 'fas fa-brain',
      onClick: handleBrainstormClick
    },
    {
      name: 'Code Now',
      description: 'Real-time code generation',
      icon: 'fas fa-code',
      onClick: handleCodeNowClick
    },
    {
      name: 'Course Designer',
      description: 'Personalized curriculum creation',
      icon: 'fas fa-chalkboard-teacher',
      onClick: handleCourseDesignerClick
    },
    {
      name: 'Deep Research',
      description: 'Advanced research tools',
      icon: 'fas fa-microscope',
      onClick: handleDeepResearchClick
    },
    {
      name: 'Video Summarizer',
      description: 'Intelligent video analysis',
      icon: 'fas fa-video',
      onClick: handleVideoSummarizerClick
    },
    {
      name: 'My Notes',
      description: 'Organized note-taking system',
      icon: 'fas fa-sticky-note',
      onClick: handleMyNotesClick
    }
  ];

  return (
    <>
      {isMobile ? (
        <MobileTitlebar 
          showMobileMenu={showMobileMenu}
          handleMobileMenuToggle={handleMobileMenuToggle}
          handleMobileNavClick={handleMobileNavClick}
        />
      ) : (
        <Titlebar />
      )}
      <div className={`text-container ${!showWelcome ? 'hidden' : ''}`} data-titlebar-nav="home">
        <div className="welcome-card">
          <div className="title-wrapper">
            <span className="verbll-title">Verbll</span>
            <div className="tagline">Where Curiosity Meets Intelligence</div>
          </div>
          <div className="explore-button-container">
            <button className="explore-btn" onClick={handleExploreClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Explore
            </button>
            <button className="join-early-access-btn" onClick={handleEarlyAccess}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7M12 22L12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Early Access
            </button>
          </div>
        </div>
      </div>
      <div className="gradient-bg" aria-hidden="true">
        <LiquidMetal
          width="100%"
          height="100%"
          colorBack="#ffffff"
          colorTint="#2d2c72"
          shape="metaballs"
          repetition={6}
          softness={1}
          shiftRed={-0.64}
          shiftBlue={-1}
          distortion={0.4}
          contour={0.4}
          angle={86}
          speed={1.8}
          scale={1.68}
          rotation={108}
          offsetX={-0.78}
          offsetY={0}
          fit="cover"
        />
      </div>
      
      <div className={`demo-section ${showDemo ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="demo">
        <div className="demo-card scroll-reveal-card" ref={demoCardRef}>
          <div className="demo-header">
            <h2 className="demo-title">Intelligence That Adapts. Tools That Connect
</h2>
          </div>
          <div className="demo-video-container">
            <iframe
              ref={demoVideoRef}
              src="https://player.vimeo.com/video/1174038269?autoplay=1&loop=1&autopause=0&muted=1&controls=1&byline=0&portrait=0&title=0"
              title="Verbll Demo Video"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      
      <div className={`problem-section ${showProblem ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="platform">
        <div className="about-card scroll-reveal-card" ref={problemCardRef}>
          <div className="about-subtitle">Every learning tool treats you like everyone else. We think that is the actual problem.</div>
          <div className="section-content">
            <p>You already have access to AI chat, research tools, note apps, coding environments, course platforms. You have more tools than any generation of students before you.</p>
            <p>None of them know who you are. None of them remember what you did yesterday. None of them connect to each other. And none of them change based on how you actually think.</p>
            <p>That is not a tool problem. That is an intelligence problem. And it is the only problem Verbll was built to solve.</p>
          </div>
        </div>
      </div>

      <div className={`about-section ${showAbout ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="platform">
        <div className="about-card scroll-reveal-card" ref={aboutCardRef}>
          <div className="about-logo">
            <img src="/logo.png" alt="Verbll Logo" className="about-logo-img" />
          </div>
          <div className="about-subtitle">About Verbll</div>
          <div className="section-content">
            <p className="about-hook">Learning has never been the problem. The tools have.</p>
            <p>Students switch between AI chats, research platforms, note apps, coding environments and course providers just to get through a single day of work. Every platform sells the same experience to every user. None of them adapt. None of them remember. None of them grow with you.</p>
            <p>Verbll was built to change that.</p>
            <p>We are an AI-powered learning platform that unifies every tool a student, researcher or working professional needs — AI Chat, Brainstorm, Code Now, Course Designer, Deep Research, Video Summarizer and My Notes — into one seamless, intelligent workspace. No switching. No repetition. No generic responses.</p>
            <p>What makes Verbll different is not just the tools. It is the intelligence underneath them.

Today, we don't rely on a single large language model. Instead, we intelligently route every query to the best model for the task  whether it's GPT for deep reasoning, Claude for nuanced writing, or a specialized model for code. You don't have to choose. We do the choosing for you. You just experience the best result.</p>
            <p>Built for students in school, professionals upskilling, researchers going deep, and curious minds who refuse to slow down — Verbll is where serious learning actually happens.</p>
          </div>
        </div>
      </div>
      
      <div className={`benchmark-section ${showBenchmark ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="platform">
        <div className="benchmark-card scroll-reveal-card" ref={benchmarkCardRef}>
          <div className="benchmark-header">
            <div className="benchmark-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="benchmark-subtitle">This is where Verbll starts and where everyone else stops.</div>
          </div>
          <div className="section-content">
            <p className="benchmark-hook">Before your first chat, your first search, your first note — Verbll learns how you think.</p>
            <p>Twelve game-based challenges. Not a quiz. Not a survey. A benchmark that measures how you process information, how fast you reason under pressure, where your instincts are strong, and where you need more. It maps you across five dimensions and builds a profile no other platform has.</p>
            <p>That profile is the engine underneath tools. Your Chat responds to you differently than it does to anyone else. Your courses are structured around how you actually learn. Your research workspace surfaces what you need, not what's most popular.</p>
            <p>The longer you use Verbll, the more precisely it works for you. That is not a feature. That is the foundation.</p>
          </div>
          <div className="benchmark-features">
            <div className="benchmark-feature">
              <span className="feature-number">12</span>
              <span className="feature-text">challenges</span>
            </div>
            <div className="benchmark-feature">
              <span className="feature-number">5</span>
              <span className="feature-text">cognitive dimensions</span>
            </div>
            <div className="benchmark-feature">
              <span className="feature-text">Personalize over short time</span>
            </div>
            <div className="benchmark-feature">
              <span className="feature-text">Experience learning with AI</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`features-section visible`} ref={scrollRef} data-titlebar-nav="features">
        <div className="features-card scroll-reveal-card" ref={featuresCardRef}>
          <div className="features-header scroll-reveal">
            <h2 className="features-title">Features</h2>
            <p className="features-subtitle">Choose your learning experience</p>
          </div>
          
          <div className="features-row">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card ${feature.name === 'Personalised AI Chat' || feature.name === 'Brainstorm' || feature.name === 'Code Now' || feature.name === 'Course Designer' || feature.name === 'Deep Research' || feature.name === 'Video Summarizer' || feature.name === 'My Notes' ? 'clickable' : ''}`}
                onClick={() => (feature.name === 'Personalised AI Chat' || feature.name === 'Brainstorm' || feature.name === 'Code Now' || feature.name === 'Course Designer' || feature.name === 'Deep Research' || feature.name === 'Video Summarizer' || feature.name === 'My Notes') && handleFeatureClick(feature.name)}
              >
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <div className="feature-content">
                  <h3 className="feature-name">{feature.name}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`ai-chat-section ${showAIChat ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="features">
        <div className="ai-chat-card scroll-reveal-card" ref={aiChatCardRef}>
          <div className="ai-chat-left">
            <div className="video-container">
              <iframe
                ref={aiChatVideoRef}
                src="https://www.youtube.com/embed/M8B-77Fbc7w?mute=1&rel=0&modestbranding=1&loop=1&playlist=M8B-77Fbc7w&controls=0&showinfo=0&disablekb=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1&fs=0&playsinline=1&autoplay=1&origin=https://www.youtube.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                className="video-frame"
              ></iframe>
              <div className="video-overlay"></div>
            </div>
          </div>
          <div className="ai-chat-right">
            <div className="ai-chat-text-card">
              <h2 className="ai-chat-title">The more you chat, more we personalise</h2>
              <p className="ai-chat-description">
                Meet your always-on intelligent assistant. Most chat tools forget context the moment a session ends — ours doesn't. AI Chat retains full conversation history, tables, charts and code beautifully, and connects seamlessly with every tool on the platform. Whether you're solving a complex problem or exploring an idea, it delivers precise, context-aware guidance every single time.
              </p>

              <div className="ai-chat-features">
                <div className="chat-feature">
                  <i className="fas fa-brain"></i>
                  <span>Adaptive Learning</span>
                </div>
                <div className="chat-feature">
                  <i className="fas fa-user-cog"></i>
                  <span>Personalized Responses</span>
                </div>
                <div className="chat-feature">
                  <i className="fas fa-chart-line"></i>
                  <span>Progress Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`brainstorm-section ${showBrainstorm ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="features">
        <div className="brainstorm-card scroll-reveal-card" ref={brainstormCardRef}>
          <div className="brainstorm-left">
            <div className="brainstorm-text-card">
              <h2 className="brainstorm-title">🧠 Your Boardroom of AI Thinkers</h2>
              <p className="brainstorm-description">
                Great decisions require diverse perspectives but assembling the right minds is costly and slow. Brainstorm deploys four specialized AI agents, each with a distinct role, to debate and challenge your problem from every angle. The result isn't just a conversation, it's a structured, insight-rich exploration that culminates in a comprehensive report, ready to act on immediately.
              </p>
              <div className="brainstorm-features">
                <div className="brainstorm-feature">
                  <i className="fas fa-lightbulb"></i>
                  <span>Idea Generation</span>
                </div>
                <div className="brainstorm-feature">
                  <i className="fas fa-users"></i>
                  <span>Collaborative Thinking</span>
                </div>
                <div className="brainstorm-feature">
                  <i className="fas fa-chart-line"></i>
                  <span>Thought Organization</span>
                </div>
              </div>
            </div>
          </div>
          <div className="brainstorm-right">
            <div className="video-container">
              <iframe
                ref={brainstormVideoRef}
                width="640"
                height="360"
                src="https://www.youtube.com/embed/Nm5RJhaVZ6M?mute=1&rel=0&modestbranding=1&loop=1&playlist=Nm5RJhaVZ6M&controls=0&showinfo=0&disablekb=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1&fs=0&playsinline=1&autoplay=1&origin=https://www.youtube.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                className="video-frame"
              ></iframe>
              <div className="video-overlay"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`code-now-section ${showCodeNow ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="features">
        <div className="code-now-card scroll-reveal-card" ref={codeNowCardRef}>
          <div className="code-now-left">
            <div className="video-container">
              <iframe
                ref={codeNowVideoRef}
                width="640"
                height="360"
                src="https://www.youtube.com/embed/1cuLXJJbt6w?mute=1&rel=0&modestbranding=1&loop=1&playlist=1cuLXJJbt6w&controls=0&showinfo=0&disablekb=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1&fs=0&playsinline=1&autoplay=1&origin=https://www.youtube.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                className="video-frame"
              ></iframe>
              <div className="video-overlay"></div>
            </div>
          </div>
          <div className="code-now-right">
            <div className="code-now-text-card">
              <h2 className="code-now-title">💻 Learn – Code – Run</h2>
              <p className="code-now-description">
                New learners often lose interest in coding journey due to various setups and non-technical backgrounds. Code Now eliminates that friction entirely. Write, run, and debug code across languages, all in one browser-based environment. An integrated AI assistant teaches, explains errors, suggests optimizations and focuses on accelerated learning. From first-time coders to seasoned engineers, it's the fastest path for coding journey.
              </p>
              <div className="code-now-features">
                <div className="code-now-feature">
                  <i className="fas fa-code"></i>
                  <span>Real-time Generation</span>
                </div>
                <div className="code-now-feature">
                  <i className="fas fa-bug"></i>
                  <span>Smart Debugging</span>
                </div>
                <div className="code-now-feature">
                  <i className="fas fa-rocket"></i>
                  <span>Performance Optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`course-designer-section ${showCourseDesigner ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="features">
        <div className="course-designer-card scroll-reveal-card" ref={courseDesignerCardRef}>
          <div className="course-designer-left">
            <div className="course-designer-text-card">
              <h2 className="course-designer-title">📚 Build your own course</h2>
              <p className="course-designer-description">
                Generic courses waste learners' most valuable resource: time. Course Designer builds a fully personalized curriculum around your goals, your schedule, and your learning style. Whether preparing for an exam, an interview, or a career pivot, it generates structured lessons that adapt to what you actually need and have access to other user's generated courses as well.
              </p>
              <div className="course-designer-features">
                <div className="course-designer-feature">
                  <i className="fas fa-chalkboard-teacher"></i>
                  <span>Custom Curriculum</span>
                </div>
                <div className="course-designer-feature">
                  <i className="fas fa-graduation-cap"></i>
                  <span>Adaptive Learning</span>
                </div>
                <div className="course-designer-feature">
                  <i className="fas fa-chart-bar"></i>
                  <span>Progress Analytics</span>
                </div>
              </div>
            </div>
          </div>
          <div className="course-designer-right">
            <div className="video-container">
              <iframe
                ref={courseDesignerVideoRef}
                width="640"
                height="360"
                src="https://www.youtube.com/embed/SDb-g-rAIZA?mute=1&rel=0&modestbranding=1&loop=1&playlist=SDb-g-rAIZA&controls=0&showinfo=0&disablekb=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1&fs=0&playsinline=1&autoplay=1&origin=https://www.youtube.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                className="video-frame"
              ></iframe>
              <div className="video-overlay"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`deep-research-section ${showDeepResearch ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="features">
        <div className="deep-research-card scroll-reveal-card" ref={deepResearchCardRef}>
          <div className="deep-research-left">
            <div className="video-container">
              <iframe
                ref={deepResearchVideoRef}
                width="640"
                height="360"
                src="https://www.youtube.com/embed/pw3r8_B-MIg?mute=1&rel=0&modestbranding=1&loop=1&playlist=pw3r8_B-MIg&controls=0&showinfo=0&disablekb=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1&fs=0&playsinline=1&autoplay=1&origin=https://www.youtube.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                className="video-frame"
              ></iframe>
              <div className="video-overlay"></div>
            </div>
          </div>
          <div className="deep-research-right">
            <div className="deep-research-text-card">
              <h2 className="deep-research-title">🔬 Every Source, One Workspace, Personal Agent</h2>
              <p className="deep-research-description">
                Research today means juggling tabs, PDFs, notes, and citation tools all separately. Deep Research unifies everything: Personalised Agent assistance, AI chat, PDF analysis, web search, knowledge graph visualization, and academic paper generation, all in one workspace. It doesn't just collect information — it connects it, structures it, and helps you produce publication-ready output faster than any traditional workflow.
              </p>
              <div className="deep-research-features">
                <div className="deep-research-feature">
                  <i className="fas fa-microscope"></i>
                  <span>Advanced Analysis</span>
                </div>
                <div className="deep-research-feature">
                  <i className="fas fa-book"></i>
                  <span>Literature Review</span>
                </div>
                <div className="deep-research-feature">
                  <i className="fas fa-search"></i>
                  <span>Intelligent Search</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`video-summarizer-section ${showVideoSummarizer ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="features">
        <div className="video-summarizer-card scroll-reveal-card" ref={videoSummarizerCardRef}>
          <div className="video-summarizer-left">
            <div className="video-summarizer-text-card">
              <h2 className="video-summarizer-title">🎥 Hours of Video. Seconds of Insight</h2>
              <p className="video-summarizer-description">
                The world's knowledge is increasingly locked inside long-form video and watching hours of content to find key insights is simply not scalable. Video Summarizer extracts precisely what matters. Paste any YouTube URL, ask a specific question, and receive a focused, intelligent response in seconds. It transforms passive viewing into active, efficient learning.
              </p>
              <div className="video-summarizer-features">
                <div className="video-summarizer-feature">
                  <i className="fas fa-video"></i>
                  <span>Content Analysis</span>
                </div>
                <div className="video-summarizer-feature">
                  <i className="fas fa-file-alt"></i>
                  <span>Auto Transcription</span>
                </div>
                <div className="video-summarizer-feature">
                  <i className="fas fa-compress"></i>
                  <span>Smart Summarization</span>
                </div>
              </div>
            </div>
          </div>
          <div className="video-summarizer-right">
            <div className="video-container">
              <iframe
                ref={videoSummarizerVideoRef}
                width="640"
                height="360"
                src="https://www.youtube.com/embed/NrFcNPsHG2c?mute=1&rel=0&modestbranding=1&loop=1&playlist=NrFcNPsHG2c&controls=0&showinfo=0&disablekb=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1&fs=0&playsinline=1&autoplay=1&origin=https://www.youtube.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                className="video-frame"
              ></iframe>
              <div className="video-overlay"></div>
            </div>
          </div>
        </div>
      </div>

      <div className={`my-notes-section ${showMyNotes ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="features">
        <div className="my-notes-card scroll-reveal-card" ref={myNotesCardRef}>
          <div className="my-notes-left">
            <div className="video-container">
              <iframe
                ref={myNotesVideoRef}
                width="640"
                height="360"
                src="https://www.youtube.com/embed/y_3yyfim7ls?mute=1&rel=0&modestbranding=1&loop=1&playlist=y_3yyfim7ls&controls=0&showinfo=0&disablekb=1&iv_load_policy=3&cc_load_policy=0&enablejsapi=1&fs=0&playsinline=1&autoplay=1&origin=https://www.youtube.com"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={false}
                className="video-frame"
              ></iframe>
              <div className="video-overlay"></div>
            </div>
          </div>
          <div className="my-notes-right">
            <div className="my-notes-text-card">
              <h2 className="my-notes-title">📝 One Place for Every Thought</h2>
              <p className="my-notes-description">
                Scattered notes across apps is a problem every learner and professional faces. My Notes provides a single, persistent workspace where responses from AI chat, ideas, research, and drafts live together and never get lost. It's not just a note-taking tool; it's a second brain that stays organized, accessible, and ready to support deeper work across the entire platform.
              </p>
              <div className="my-notes-features">
                <div className="my-notes-feature">
                  <i className="fas fa-edit"></i>
                  <span>Smart Organization</span>
                </div>
                <div className="my-notes-feature">
                  <i className="fas fa-sync"></i>
                  <span>Cloud Sync</span>
                </div>
                <div className="my-notes-feature">
                  <i className="fas fa-tags"></i>
                  <span>Tag Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`founder-section ${showFounder ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="contact">
        <div className="founder-card scroll-reveal-card" ref={founderCardRef}>
          <div className="founder-left">
            <img src="/photo.png" alt="Founder" className="founder-photo" />
          </div>
          <div className="founder-right">
            <h2 className="founder-title">Sumedh Patil — Founder, Verbll</h2>
            <p className="founder-description">
              Sumedh holds an MSc in Business Analytics and a BEng in Mechanical Engineering. When the AI race began, he did not watch from the sidelines — he started building. Teaching himself web development and machine learning from scratch, he open-sourced projects on GitHub and shipped his first SaaS product in under three months. But every time he built something to learn faster, he found himself switching between five different tools just to complete one task. No platform connected them. No platform adapted to him. A $29 billion market was selling the same content to every unique individual on the planet — and calling it education. Sumedh did not just identify the gap. He had been living inside it. Verbll is his answer.
            </p>
          </div>
        </div>
      </div>

      <div className={`footer-section ${showFooter ? 'visible' : ''}`} ref={scrollRef} data-titlebar-nav="contact">
        <div className="footer-card scroll-reveal-card" ref={footerCardRef}>
          <div className="footer-content">
            <h2 className="footer-title">Interested in Being Part of What Comes Next?</h2>
            <p className="footer-description">
              Verbll is at the threshold of launch — the product is built, the market is ready, and we are looking for the right partners to scale it. If you are an investor, accelerator, or strategic partner who believes personalised AI learning is the future, we would like to hear from you.
            </p>
            <div className="footer-cta">
              <a href="mailto:admin@aipresso.uk" className="footer-cta-btn">
                <img src={mailIcon} alt="Mail" className="footer-btn-icon" />
                Mail
              </a>
              <a href="https://www.linkedin.com/in/sumedh-patil-7ab0a21a6" target="_blank" rel="noopener noreferrer" className="footer-cta-btn">
                <img src={linkedinIcon} alt="LinkedIn" className="footer-btn-icon" />
                LinkedIn
              </a>
              <a href="https://github.com/Sumedh1599" target="_blank" rel="noopener noreferrer" className="footer-cta-btn">
                <img src={githubIcon} alt="GitHub" className="footer-btn-icon" />
                GitHub
              </a>
            </div>
            <div className="footer-company-details">
              <p className="company-name">Aipresso Private Limited</p>
              <p className="company-info">Registered in England & Wales | Company No. 16218778</p>
              <p className="company-address">Unit 13 Freeland Park, Wareham Road, Lytchett Matravers, Poole, England, BH16 6FA</p>
              <p className="company-date">Incorporated 30 January 2025</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
