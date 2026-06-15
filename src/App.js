import React, { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('summary');

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

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #1e293b',
        paddingBottom: '20px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700, background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            DevSecOps Container Audit
          </h1>
          <p style={{ margin: '5px 0 0 0', color: '#64748b', fontSize: '15px' }}>
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
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34d399', display: 'inline-block', animate: 'pulse 2s infinite' }}></span>
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
            backgroundColor: activeTab === 'summary' ? '#1e293b' : 'transparent',
            color: activeTab === 'summary' ? '#38bdf8' : '#94a3b8',
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
            backgroundColor: activeTab === 'pipeline' ? '#1e293b' : 'transparent',
            color: activeTab === 'pipeline' ? '#38bdf8' : '#94a3b8',
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
            <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '16px' }}>
              <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>SECRETS LEAK SCAN</div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#10b981', marginTop: '10px' }}>0 Leaks</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '5px' }}>Audited via Gitleaks rules</div>
            </div>
            <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '16px' }}>
              <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>DEPENDENCY (SCA) VULNS</div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#10b981', marginTop: '10px' }}>0 Critical</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '5px' }}>Validated via Trivy scanner</div>
            </div>
            <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '16px' }}>
              <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>IMAGE COMPLIANCE</div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#38bdf8', marginTop: '10px' }}>Non-Root</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '5px' }}>Enforced user UID 101</div>
            </div>
            <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '24px', borderRadius: '16px' }}>
              <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 600 }}>SIGNATURE STATUS</div>
              <div style={{ fontSize: '36px', fontWeight: 700, color: '#818cf8', marginTop: '10px' }}>Verified</div>
              <div style={{ color: '#94a3b8', fontSize: '13px', marginTop: '5px' }}>Cosign keyless certificate</div>
            </div>
          </div>

          {/* Hardened Container details */}
          <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '30px' }}>
            <h3 style={{ marginTop: 0, borderBottom: '1px solid #374151', paddingBottom: '10px', color: '#f3f4f6' }}>
              Secure Container Specifications
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              {Object.entries(containerSpecs).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ textTransform: 'capitalize', color: '#4b5563', fontWeight: 600, fontSize: '13px' }}>
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span style={{ color: '#e5e7eb', fontSize: '15px', fontFamily: 'monospace' }}>{val}</span>
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
              background: '#1e293b',
              border: '1px solid #334155',
              padding: '20px 30px',
              borderRadius: '12px'
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
                  <h4 style={{ margin: 0, color: '#f1f5f9' }}>{stage.name}</h4>
                  <p style={{ margin: '5px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>{stage.details}</p>
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
  );
}

export default App;
