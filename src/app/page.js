'use client';

import React, { useEffect } from 'react';
import { audio } from '@/utils/AudioEngine';
import { resumeData } from '@/data/resume';
import ChatConsole from '@/components/ChatConsole';
import { Mail, Linkedin, Github, Code, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';

export default function Home() {
  // Initialize audio engine on first click/interaction
  useEffect(() => {
    const handleInteraction = () => {
      audio.init();
    };
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return (
    <div className="nier-layout">
      {/* Decorative Top Telemetry Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span className="telemetry" style={{ fontSize: '0.75rem' }}>SYSTEM: COGNITION LEVEL 100% /// LOGGED IN AS PATHI_KRISHNA_KANTH</span>
        <span className="telemetry" style={{ fontSize: '0.75rem' }}>SER. NO: 9S-31252-06-26</span>
      </div>

      {/* Main Nier HUD Header */}
      <header className="nier-box" style={{ padding: '30px 20px', marginBottom: '40px', backgroundColor: 'rgba(78, 75, 66, 0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', lineHeight: '1.1' }}>
              {resumeData.personalInfo.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
              <Cpu size={16} style={{ color: 'var(--nier-accent)' }} />
              <span className="telemetry" style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
                Classification: {resumeData.personalInfo.title}
              </span>
            </div>
          </div>

          {/* Quick Stats Block */}
          <div className="nier-box" style={{ margin: 0, padding: '12px 20px', backgroundColor: 'rgba(242, 239, 233, 0.5)' }}>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.85rem' }}>
              <div>
                <span className="telemetry" style={{ fontSize: '0.7rem' }}>Unit Status</span><br />
                <span style={{ fontWeight: 'bold', color: 'green', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> ACTIVE
                </span>
              </div>
              <div style={{ width: '1px', backgroundColor: 'var(--nier-border-dim)' }}></div>
              <div>
                <span className="telemetry" style={{ fontSize: '0.7rem' }}>Combat Level</span><br />
                <span style={{ fontWeight: 'bold' }}>FINAL YEAR</span>
              </div>
            </div>
          </div>
        </div>

        <div className="nier-double-line"></div>

        {/* Dynamic Contact Bar */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
          <a 
            href={`mailto:${resumeData.personalInfo.email}`} 
            className="nier-btn"
            onClick={() => audio.playConfirm()}
            onMouseEnter={() => audio.playTick()}
            style={{ fontSize: '0.8rem' }}
          >
            <Mail size={14} style={{ marginRight: '8px' }} /> Send Raven (Email)
          </a>
          <a 
            href={resumeData.personalInfo.links.linkedin} 
            target="_blank" 
            className="nier-btn"
            onClick={() => audio.playConfirm()}
            onMouseEnter={() => audio.playTick()}
            style={{ fontSize: '0.8rem' }}
          >
            <Linkedin size={14} style={{ marginRight: '8px' }} /> Alliance Records
          </a>
          <a 
            href={resumeData.personalInfo.links.github} 
            target="_blank" 
            className="nier-btn"
            onClick={() => audio.playConfirm()}
            onMouseEnter={() => audio.playTick()}
            style={{ fontSize: '0.8rem' }}
          >
            <Github size={14} style={{ marginRight: '8px' }} /> Blueprints (GitHub)
          </a>
          <a 
            href={resumeData.personalInfo.links.leetcode} 
            target="_blank" 
            className="nier-btn"
            onClick={() => audio.playConfirm()}
            onMouseEnter={() => audio.playTick()}
            style={{ fontSize: '0.8rem' }}
          >
            <Code size={14} style={{ marginRight: '8px' }} /> LeetCode Kills
          </a>
        </div>
      </header>

      {/* Main Two-Column Nier Grid */}
      <div className="nier-grid">
        
        {/* Left Column: Stats and Equipment */}
        <aside>
          
          {/* Intellect / Education Box */}
          <div className="nier-box">
            <h2 className="nier-section-title">Academic Record</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--nier-fg)' }}>
                {resumeData.education.institution}
              </h3>
              <p className="telemetry" style={{ fontSize: '0.8rem' }}>{resumeData.education.duration}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--nier-fg-dim)' }}>
                {resumeData.education.degree}
              </p>
              
              <div className="nier-double-line" style={{ margin: '10px 0' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                <span>GPA (INTELLECT STATUS):</span>
                <strong style={{ color: 'var(--nier-accent)' }}>{resumeData.education.cgpa}</strong>
              </div>
            </div>
          </div>

          {/* Weapon Configuration / Technical Skills Box */}
          <div className="nier-box">
            <h2 className="nier-section-title">Equipment Configuration</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <span className="telemetry" style={{ fontWeight: 'bold' }}>Blades (Programming Languages)</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                  {resumeData.skills.languages.map((lang, idx) => (
                    <span key={idx} className="nier-btn" style={{ padding: '3px 8px', fontSize: '0.75rem', cursor: 'default' }} onMouseEnter={() => audio.playBuild()}>{lang}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="telemetry" style={{ fontWeight: 'bold' }}>Combat Armor (Web & Cloud)</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                  {resumeData.skills.webCloud.map((web, idx) => (
                    <span key={idx} className="nier-btn" style={{ padding: '3px 8px', fontSize: '0.75rem', cursor: 'default' }} onMouseEnter={() => audio.playBuild()}>{web}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="telemetry" style={{ fontWeight: 'bold' }}>AI Protocols (Models & Pipelines)</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                  {resumeData.skills.aiMl.map((ai, idx) => (
                    <span key={idx} className="nier-btn" style={{ padding: '3px 8px', fontSize: '0.75rem', cursor: 'default', borderColor: 'var(--nier-gold)', color: 'var(--nier-gold)' }} onMouseEnter={() => audio.playBuild()}>{ai}</span>
                  ))}
                </div>
              </div>

              <div>
                <span className="telemetry" style={{ fontWeight: 'bold' }}>Databases & Concepts</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                  {[...resumeData.skills.databases, ...resumeData.skills.coreConcepts].map((item, idx) => (
                    <span key={idx} className="nier-btn" style={{ padding: '3px 8px', fontSize: '0.75rem', cursor: 'default', borderStyle: 'dashed' }} onMouseEnter={() => audio.playBuild()}>{item}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Commendations / Achievements Box */}
          <div className="nier-box">
            <h2 className="nier-section-title">Commendations</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {resumeData.achievements.map((ach, idx) => (
                <div key={idx} style={{ paddingLeft: '12px', borderLeft: '3px solid var(--nier-border)' }}>
                  <span className="telemetry" style={{ fontWeight: 'bold', fontSize: '0.85rem', color: 'var(--nier-accent)' }}>
                    {ach.title}
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--nier-fg-dim)', marginTop: '4px', lineHeight: '1.4' }}>
                    {ach.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </aside>

        {/* Right Column: AI Chat Console and Work Expedition Logs */}
        <main>
          
          {/* Expedition Logs (Experience) */}
          <div className="nier-box">
            <h2 className="nier-section-title">Expedition Logs (Work)</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {resumeData.experience.map((exp, idx) => (
                <div 
                  key={idx} 
                  className="nier-box interactive" 
                  style={{ margin: 0, padding: '20px', borderStyle: 'double', borderWidth: '3px' }}
                  onMouseEnter={() => audio.playHologram()}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '10px' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>{exp.role}</h3>
                    <span className="telemetry" style={{ fontSize: '0.8rem', color: 'var(--nier-accent)', fontWeight: 'bold' }}>{exp.duration}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '4px' }}>
                    <span className="telemetry" style={{ fontSize: '0.85rem', color: 'var(--nier-fg)' }}>{exp.company}</span>
                    <span className="telemetry" style={{ fontSize: '0.75rem', backgroundColor: 'rgba(78, 75, 66, 0.1)', padding: '2px 6px' }}>{exp.type}</span>
                  </div>
                  
                  <ul style={{ listStyleType: 'square', paddingLeft: '20px', marginTop: '12px', fontSize: '0.9rem', color: 'var(--nier-fg-dim)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {exp.highlights.map((hl, hlIdx) => (
                      <li key={hlIdx} style={{ lineHeight: '1.4' }}>{hl}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Corps (Projects) */}
          <div className="nier-box">
            <h2 className="nier-section-title">Engineering Blueprints (Projects)</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {resumeData.projects.map((proj, idx) => (
                <div 
                  key={idx} 
                  className="nier-box interactive" 
                  style={{ margin: 0, padding: '20px' }}
                  onMouseEnter={() => audio.playHologram()}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem' }}>{proj.title}</h3>
                      <span className="telemetry" style={{ fontSize: '0.8rem', color: 'var(--nier-gold)', display: 'block', marginTop: '2px' }}>
                        {proj.tech}
                      </span>
                    </div>

                    {/* Project Links */}
                    {proj.links && (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {proj.links.code && (
                          <a 
                            href={proj.links.code} 
                            target="_blank" 
                            className="nier-btn" 
                            style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                            onClick={() => audio.playConfirm()}
                            onMouseEnter={() => audio.playTick()}
                          >
                            Code
                          </a>
                        )}
                        {proj.links.live && (
                          <a 
                            href={proj.links.live} 
                            target="_blank" 
                            className="nier-btn" 
                            style={{ padding: '4px 8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                            onClick={() => audio.playConfirm()}
                            onMouseEnter={() => audio.playTick()}
                          >
                            Live <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '12px', fontSize: '0.85rem', color: 'var(--nier-fg-dim)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {proj.highlights.map((hl, hlIdx) => (
                      <li key={hlIdx} style={{ lineHeight: '1.4' }}>{hl}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* AI Chat Console directly integrated */}
          <div className="nier-box" style={{ padding: 0 }}>
            <ChatConsole />
          </div>

        </main>
      </div>

      {/* Nier styled Footer */}
      <footer className="nier-box" style={{ marginTop: '50px', padding: '20px', textAlign: 'center', backgroundColor: 'rgba(78, 75, 66, 0.05)' }}>
        <p className="telemetry" style={{ fontSize: '0.9rem', color: 'var(--nier-fg)' }}>
          GLORY TO MANKIND /// UNIT: 9S EXTRACTION TERMINAL
        </p>
        <p className="telemetry" style={{ fontSize: '0.75rem', color: 'var(--nier-fg-dim)', marginTop: '5px' }}>
          Built with Next.js, Web Audio API, and local Kokoro TTS Integration.
        </p>
      </footer>
    </div>
  );
}
