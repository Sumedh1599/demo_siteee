import React from 'react';
import './MobileTitlebar.css';

function MobileTitlebar({ showMobileMenu, handleMobileMenuToggle, handleMobileNavClick }) {
  console.log('MobileTitlebar render, showMobileMenu:', showMobileMenu);
  
  return (
    <>
      <div className="mobile-titlebar">
        <button className="menu-toggle" onClick={(e) => {
          console.log('Menu toggle button clicked');
          e.preventDefault();
          e.stopPropagation();
          handleMobileMenuToggle();
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="mobile-logo">Verbll</span>
        <button className="early-access-btn" onClick={(e) => {
          console.log('Demo button clicked');
          e.preventDefault();
          e.stopPropagation();
          handleMobileNavClick('demo');
        }}>
          Demo
        </button>
      </div>
      
      {showMobileMenu && (
        <div className="mobile-menu-overlay" onClick={(e) => {
          console.log('Overlay clicked');
          handleMobileMenuToggle();
        }}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <span className="mobile-menu-title">Verbll</span>
              <button className="close-menu" onClick={(e) => {
                console.log('Close menu clicked');
                e.preventDefault();
                e.stopPropagation();
                handleMobileMenuToggle();
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            
            <div className="mobile-menu-items">
              <button className="mobile-menu-item" onClick={(e) => {
                console.log('Home menu item clicked');
                e.preventDefault();
                e.stopPropagation();
                handleMobileNavClick('home');
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Home
              </button>
              
              <button className="mobile-menu-item" onClick={(e) => {
                console.log('Demo menu item clicked');
                e.preventDefault();
                e.stopPropagation();
                handleMobileNavClick('demo');
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5V19L19 12L8 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Demo
              </button>
              
              <button className="mobile-menu-item" onClick={(e) => {
                console.log('AI Chat menu item clicked');
                e.preventDefault();
                e.stopPropagation();
                handleMobileNavClick('aiChat');
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                AI Chat
              </button>
              
              <button className="mobile-menu-item" onClick={(e) => {
                console.log('Brainstorm menu item clicked');
                e.preventDefault();
                e.stopPropagation();
                handleMobileNavClick('brainstorm');
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Brainstorm
              </button>
              
              <button className="mobile-menu-item" onClick={(e) => {
                console.log('Code Now menu item clicked');
                e.preventDefault();
                e.stopPropagation();
                handleMobileNavClick('codeNow');
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Code Now
              </button>
              
              <button className="mobile-menu-item" onClick={(e) => {
                console.log('Course Designer menu item clicked');
                e.preventDefault();
                e.stopPropagation();
                handleMobileNavClick('courseDesigner');
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Course Designer
              </button>
              
              <button className="mobile-menu-item" onClick={(e) => {
                console.log('Deep Research menu item clicked');
                e.preventDefault();
                e.stopPropagation();
                handleMobileNavClick('deepResearch');
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Deep Research
              </button>
              
              <button className="mobile-menu-item" onClick={(e) => {
                console.log('Video Summarizer menu item clicked');
                e.preventDefault();
                e.stopPropagation();
                handleMobileNavClick('videoSummarizer');
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="7" y1="2" x2="7" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="17" y1="2" x2="17" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="2" y1="7" x2="7" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="2" y1="17" x2="7" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="17" y1="17" x2="22" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="17" y1="7" x2="22" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Video Summarizer
              </button>
              
              <button className="mobile-menu-item" onClick={(e) => {
                console.log('My Notes menu item clicked');
                e.preventDefault();
                e.stopPropagation();
                handleMobileNavClick('myNotes');
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="10 9 9 9 8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                My Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileTitlebar;
