import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { PatientList } from './PatientList';
import { PatientDetail } from './PatientDetail';
import '../App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showThanks, setShowThanks] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate();

  return (
    <Router>
      <div className="app-container">
        <header>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: '1.4rem', color: 'rgb(0, 32, 60)', whiteSpace: 'nowrap' }}>
              Hello Herr. Guerfali
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '105px', flex: 1, justifyContent: 'center' }}>
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="nav-search"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, justifyContent: 'flex-end' }}>
            <div className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </header>
        <div className="layout">
          <aside className="side-nav">
            <div className="sidebar-top">
                {/* Logo doubles as a home link */}
              <button
                type="button"
                onClick={() => navigate('/')}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Go to home"
              >
                <img 
                  src="/pinksuite-logo-maher.svg" 
                  alt="PinkSuite Logo" 
                  style={{ width: '90px', marginBottom: '20px' }}
                />
              </button>
              <button 
                type="button"
                className="refresh-square"
                onClick={() => setRefreshKey((v) => v + 1)}
                aria-label="Refresh patients"
              >
                ⟳
              </button>
            </div>
            <div className="sidebar-bottom">
                {/* Quick about popup */}
              <button
                type="button"
                className="about-btn"
                onMouseEnter={() => setShowAbout(true)}
                onMouseLeave={() => setShowAbout(false)}
                onClick={() => setShowAbout(!showAbout)}
                aria-label="About"
              >
                ⓘ
              </button>
              {showAbout && (
                <div className="about-popup">
                  Made by Maher Guerfali
                </div>
              )}
            </div>
          </aside>
          <div className="gap-spacer" aria-hidden></div>
          <main className="content-area">
            <Routes>
              <Route path="/" element={<PatientList searchTerm={searchTerm} refreshKey={refreshKey} />} />
              <Route path="/patient/:id" element={<PatientDetail />} />
            </Routes>
          </main>
        </div>
        <footer style={{ 
          textAlign: 'center', 
          padding: '2.5rem 1.5rem', 
          backgroundColor: '#334E63',
          color: '#FFFFFF', 
          fontSize: '0.95rem',
          borderTop: '1px solid #f0f0f0',
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          alignItems: 'center'
        }}>
          <img 
            src="https://pinksuite.io/wp-content/uploads/PINKsuite-logo-white.svg" 
            alt="PinkSuite Logo" 
            style={{ height: '36px' }}
          />
          <nav style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="https://pinksuite.io/ueber-uns/" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>About Us</a>
            <a href="https://pinksuite.io/pink-blog/" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>Blog</a>
            <a href="https://pinksuite.io/offene-stellen/" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>Vacancies</a>
            <a href="https://pinksuite.io/kontakt/" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>Contact</a>
            <a href="https://pinksuite.io/produkt/" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 600 }}>Product</a>
          </nav>
          <button 
            onClick={() => setShowThanks(true)}
            style={{
              background: '#DA418A',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px 32px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#b8336e'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#DA418A'}
          >
            Hire Me
          </button>
          <div>© 2026 Radiology Patient Manager | FHIR R4 Integration</div>
        </footer>
        
        {showThanks && (
          <div className="thanks-overlay">
            {/* Full-screen thank-you overlay */}
            <h1 style={{ fontSize: '6rem', fontWeight: 700, color: '#000000', margin: 0 }}>Thanks</h1>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App
