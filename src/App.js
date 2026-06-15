import React, { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('summary');
  const [darkMode, setDarkMode] = useState(true);

  // Web Audio API Synthesizer for click sound
  const playToggleSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); // Frequency start at 600Hz
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.08); // Ascending pop sound

      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.08);
    } catch (error) {
      console.warn('Audio synthesis skipped:', error);
    }
  };

  const handleToggleMode = () => {
    playToggleSound();
    setDarkMode(!darkMode);
  };

  const pipelineStages = [
    { name: 'Git Commit Scan', status: 'Passed', tool: 'Gitleaks v8.18', details: 'No secrets or private keys detected.' },
    { name: 'Dependency Audit (SCA)', status: 'Passed', tool: 'Trivy v0.49', details: '0 high or critical vulnerabilities in package.json' },
    { name: 'Multi-Stage Docker Build', status: 'Passed', tool: 'Docker Buildx', details: 'Optimized build complete. Output size: 28MB.' },
    { name: 'Image Vulnerability Scan', status: 'Passed', tool: 'Trivy Image Scan', details: 'OS dependencies scanned. Compliant status.' },
    { name: 'Cryptographic Image Signing', status: 'Passed', tool: 'Cosign v2.2', details: 'Container signed with keyless signature.' }
  ];

  const containerSpecs = {
    parentImage: 'nginx:1.25-alpine (Security Hardened)',
    runtimeUser: 'nginx (UID 101) - Non-Root Enforced',
    listeningPort: '8080 (Non-Privileged)',
    securityHeaders: 'X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Server-Tokens: Disabled'
  };

  // Theme configuration variables
  const theme = {
    bg: darkMode ? '#0f172a' : '#f8fafc',
    text: darkMode ? '#f8fafc' : '#0f172a',
    cardBg: darkMode ? '#1e293b' : '#ffffff',
    cardBorder: darkMode ? '1px solid #334155' : '1px solid #e2e8f0',
    headerBorder: darkMode ? '1px solid #1e293b' : '1px solid #e2e8f0',
    textMuted: darkMode ? '#94a3b8' : '#475569',
    textHeaderMuted: darkMode ? '#64748b' : '#4b5563',
    specBg: darkMode ? '#111827' : '#f1f5f9',
    specBorder: darkMode ? '1px solid #1f2937' : '1px solid #e2e8f0',
    specTextVal: darkMode ? '#e5e7eb' : '#0f172a',
    buttonActiveBg: darkMode ? '#334155' : '#e2e8f0',
    buttonActiveText: darkMode ? '#38bdf8' : '#0284c7'
  };

  return (
    <div style={{
      backgroundColor: theme.bg,
      color: theme.text,
      minHeight: '100vh',
      transition: 'background-color 0.3s ease, color 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px'
      }}>
        {/* Header */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: theme.headerBorder,
          paddingBottom: '20px',
          transition: 'border-color 0.3s ease'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700, background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              DevSecOps Container Audit
            </h1>
            <p style={{ margin: '5px 0 0 0', color: theme.textHeaderMuted, fontSize: '15px', transition: 'color 0.3s ease' }}>
              Multi-stage package orchestration & verification dashboard
            </p>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#064e3b',
            color: '#34d399',
            padding: '8px 16px',
            borderRadius: '30px',
            fontWeight: 600,
            fontSize: '14px',
            border: '1px solid #059669'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34d399', display: 'inline-block' }}></span>
            PIPELINE SECURE
          </div>
        </header>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={() => setActiveTab('summary')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: activeTab === 'summary' ? theme.buttonActiveBg : 'transparent',
              color: activeTab === 'summary' ? theme.buttonActiveText : theme.textMuted,
              transition: 'all 0.3s ease'
            }}
          >
            Security Summary
          </button>
          <button 
            onClick={() => setActiveTab('pipeline')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: activeTab === 'pipeline' ? theme.buttonActiveBg : 'transparent',
              color: activeTab === 'pipeline' ? theme.buttonActiveText : theme.textMuted,
              transition: 'all 0.3s ease'
            }}
          >
            CI/CD Scan Steps
          </button>
        </div>

        {activeTab === 'summary' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ background: theme.cardBg, border: theme.cardBorder, padding: '24px', borderRadius: '16px', transition: 'background-color 0.3s ease, border 0.3s ease' }}>
                <div style={{ color: theme.textHeaderMuted, fontSize: '14px', fontWeight: 600 }}>SECRETS LEAK SCAN</div>
                <div style={{ fontSize: '36px', fontWeight: 700, color: '#10b981', marginTop: '10px' }}>0 Leaks</div>
                <div style={{ color: theme.textMuted, fontSize: '13px', marginTop: '5px' }}>Audited via Gitleaks rules</div>
              </div>
              <div style={{ background: theme.cardBg, border: theme.cardBorder, padding: '24px', borderRadius: '16px', transition: 'background-color 0.3s ease, border 0.3s ease' }}>
                <div style={{ color: theme.textHeaderMuted, fontSize: '14px', fontWeight: 600 }}>DEPENDENCY (SCA) VULNS</div>
                <div style={{ fontSize: '36px', fontWeight: 700, color: '#10b981', marginTop: '10px' }}>0 Critical</div>
                <div style={{ color: theme.textMuted, fontSize: '13px', marginTop: '5px' }}>Validated via Trivy scanner</div>
              </div>
              <div style={{ background: theme.cardBg, border: theme.cardBorder, padding: '24px', borderRadius: '16px', transition: 'background-color 0.3s ease, border 0.3s ease' }}>
                <div style={{ color: theme.textHeaderMuted, fontSize: '14px', fontWeight: 600 }}>IMAGE COMPLIANCE</div>
                <div style={{ fontSize: '36px', fontWeight: 700, color: '#38bdf8', marginTop: '10px' }}>Non-Root</div>
                <div style={{ color: theme.textMuted, fontSize: '13px', marginTop: '5px' }}>Enforced user UID 101</div>
              </div>
              <div style={{ background: theme.cardBg, border: theme.cardBorder, padding: '24px', borderRadius: '16px', transition: 'background-color 0.3s ease, border 0.3s ease' }}>
                <div style={{ color: theme.textHeaderMuted, fontSize: '14px', fontWeight: 600 }}>SIGNATURE STATUS</div>
                <div style={{ fontSize: '36px', fontWeight: 700, color: '#818cf8', marginTop: '10px' }}>Verified</div>
                <div style={{ color: theme.textMuted, fontSize: '13px', marginTop: '5px' }}>Cosign keyless certificate</div>
              </div>
            </div>

            {/* Hardened Container details */}
            <div style={{ background: theme.specBg, border: theme.specBorder, borderRadius: '16px', padding: '30px', transition: 'background-color 0.3s ease, border 0.3s ease' }}>
              <h3 style={{ marginTop: 0, borderBottom: `1px solid ${darkMode ? '#374151' : '#e2e8f0'}`, paddingBottom: '10px', color: theme.text, transition: 'color 0.3s ease, border-color 0.3s ease' }}>
                Secure Container Specifications
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                {Object.entries(containerSpecs).map(([key, val]) => (
                  <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <span style={{ textTransform: 'capitalize', color: theme.textMuted, fontWeight: 600, fontSize: '13px' }}>
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span style={{ color: theme.specTextVal, fontSize: '15px', fontFamily: 'monospace', transition: 'color 0.3s ease' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* CI/CD Stages List */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {pipelineStages.map((stage, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: theme.cardBg,
                border: theme.cardBorder,
                padding: '20px 30px',
                borderRadius: '12px',
                transition: 'background-color 0.3s ease, border 0.3s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: '#064e3b',
                    color: '#34d399',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}>✓</div>
                  <div>
                    <h4 style={{ margin: 0, color: theme.text }}>{stage.name}</h4>
                    <p style={{ margin: '5px 0 0 0', color: theme.textMuted, fontSize: '13px' }}>{stage.details}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    background: '#0284c7',
                    color: '#e0f2fe',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600
                  }}>{stage.tool}</span>
                  <div style={{ color: '#34d399', fontSize: '14px', fontWeight: 600, marginTop: '5px' }}>
                    {stage.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pill-shaped Light/Dark Mode Toggle Switch in Bottom-Right */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: theme.cardBg,
        border: theme.cardBorder,
        padding: '8px 14px',
        borderRadius: '30px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.3s ease',
        zIndex: 1000
      }} onClick={handleToggleMode}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted }}>
          {darkMode ? 'DARK' : 'LIGHT'}
        </span>
        <div style={{
          width: '44px',
          height: '24px',
          backgroundColor: darkMode ? '#38bdf8' : '#cbd5e1',
          borderRadius: '15px',
          position: 'relative',
          transition: 'background-color 0.3s ease'
        }}>
          <div style={{
            width: '18px',
            height: '18px',
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            position: 'absolute',
            top: '3px',
            left: darkMode ? '23px' : '3px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'left 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
          }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
