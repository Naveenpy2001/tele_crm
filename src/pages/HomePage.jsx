import React from 'react';
import Navbar from '../components/Navbar';
import './homepage.css';

const HomePage = () => {
  return (
    <div className="tc-page">
      <Navbar />
      
      <main className="tc-main">
        {/* Hero Section */}
        <section className="tc-hero">
          <div className="tc-hero-content">
            <h1 className="tc-hero-title">Powerful Telecalling CRM Solution</h1>
            <p className="tc-hero-subtitle">Boost your call center productivity with our specialized telecalling software</p>
            <div className="tc-hero-buttons">
              {/* <a href="/demo" className="tc-primary-btn">Request Demo</a>
              <a href="/pricing" className="tc-secondary-btn">View Plans</a> */}
            </div>
          </div>
          <div className="tc-hero-image">
            <img src="/telecalling-hero.jpg" alt="Telecalling Team" />
          </div>
        </section>

        {/* Key Features */}
        <section className="tc-features">
          <h2 className="tc-section-title">Telecalling-Specific Features</h2>
          <div className="tc-features-grid">
            <div className="tc-feature-card">
              <div className="tc-feature-icon">📞</div>
              <h3>Call Management</h3>
              <ul className="tc-feature-list">
                <li>Click-to-call functionality</li>
                <li>Call recording & monitoring</li>
                <li>Automatic call distribution</li>
              </ul>
            </div>
            
            <div className="tc-feature-card">
              <div className="tc-feature-icon">📊</div>
              <h3>Real-time Analytics</h3>
              <ul className="tc-feature-list">
                <li>Agent performance tracking</li>
                <li>Call duration metrics</li>
                <li>Conversion rate analysis</li>
              </ul>
            </div>
            
            <div className="tc-feature-card">
              <div className="tc-feature-icon">🤖</div>
              <h3>Automation Tools</h3>
              <ul className="tc-feature-list">
                <li>Auto-dialer integration</li>
                <li>Follow-up reminders</li>
                <li>Script prompts</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call Center Dashboard Preview */}
        <section className="tc-dashboard-preview">
          <h2 className="tc-section-title">Telecalling Dashboard</h2>
          <div className="tc-dashboard-image">
            <img src="/telecalling-dashboard.png" alt="CRM Dashboard" />
          </div>
          <div className="tc-dashboard-features">
            <div className="tc-dashboard-item">
              <h3>Live Call Monitoring</h3>
              <p>Supervisors can listen to live calls and provide real-time guidance</p>
            </div>
            <div className="tc-dashboard-item">
              <h3>Call Disposition Tracking</h3>
              <p>Quickly categorize call outcomes for better reporting</p>
            </div>
            <div className="tc-dashboard-item">
              <h3>Lead Prioritization</h3>
              <p>Hot leads automatically move to the top of calling queues</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="tc-testimonials">
          <h2 className="tc-section-title">Trusted by Telecalling Teams</h2>
          <div className="tc-testimonial-cards">
            <div className="tc-testimonial-card">
              <p>"Improved our call connect rate by 40% with the power dialer feature."</p>
              <div className="tc-testimonial-author">
                <strong>Rahul Sharma</strong>
                <span>Call Center Manager, TeleSolutions</span>
              </div>
            </div>
            <div className="tc-testimonial-card">
              <p>"The call recording feature helped us improve agent training dramatically."</p>
              <div className="tc-testimonial-author">
                <strong>Priya Patel</strong>
                <span>Operations Head, CallExperts</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="tc-footer">
        <div className="tc-footer-content">
          <div className="tc-footer-logo">
            📞
            TeleCRM
          </div>
          <div className="tc-footer-links">
            <div className="tc-footer-column" style={{visibility:'hidden'}}>
              <h4>Product</h4>
              <a href="/features">Features</a>
              <a href="/pricing">Pricing</a>
              <a href="/integrations">Integrations</a>
            </div>
            <div className="tc-footer-column" style={{visibility:'hidden'}}>
              <h4>Resources</h4>
              <a href="/blog">Blog</a>
              <a href="/guides">Guides</a>
              <a href="/webinars">Webinars</a>
            </div>
            <div className="tc-footer-column">
              <h4>Company</h4>
              <a href="/about">About Us</a>
              <a href="/contact">Contact</a>
              <a href="/careers">Careers</a>
            </div>
          </div>
        </div>
        <div className="tc-footer-bottom">
          <p>© 2025 TeleCRM. All rights reserved.</p>
          <div className="tc-legal-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;