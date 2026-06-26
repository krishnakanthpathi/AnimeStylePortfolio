'use client';

import React, { useState, useEffect, useRef } from 'react';
import { audio } from '@/utils/AudioEngine';
import { resumeData } from '@/data/resume';
import { Volume2, VolumeX, Send, CornerDownRight, Loader } from 'lucide-react';

const renderMessageText = (text) => {
  if (!text) return null;
  
  // Split text by markdown bold pattern (**bold**)
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index} style={{ color: 'var(--nier-gold)', fontWeight: '700' }}>{boldText}</strong>;
    }
    
    // Check for links inside the part: [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const subParts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = linkRegex.exec(part)) !== null) {
      if (match.index > lastIndex) {
        subParts.push(part.substring(lastIndex, match.index));
      }
      
      const linkText = match[1];
      const linkUrl = match[2];
      
      subParts.push(
        <a 
          key={`link-${match.index}`} 
          href={linkUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            color: 'var(--nier-accent)', 
            textDecoration: 'underline',
            background: 'transparent',
            transform: 'none',
            padding: 0,
            display: 'inline'
          }}
        >
          {linkText}
        </a>
      );
      
      lastIndex = linkRegex.lastIndex;
    }
    
    if (lastIndex < part.length) {
      subParts.push(part.substring(lastIndex));
    }
    
    return <span key={index}>{subParts.length > 0 ? subParts : part}</span>;
  });
};

export default function ChatConsole() {
  const [messages, setMessages] = useState([
    { sender: 'system', text: 'SYSTEM: Booting AI Clone interface... [Unit: 9S/2B Memory Bank]' },
    { sender: 'system', text: `SYSTEM: Establishing connection to Kokoro TTS service at ${process.env.NEXT_PUBLIC_KOKORO_TTS_URL || 'http://localhost:8998'}...` },
    { sender: 'assistant', text: 'Greeting, visitor. I am Unit 9S, an AI duplicate of Pathi Krishna Kanth. My memory contains his full experience logs, project blue-prints, and credentials. Ask me anything, or toggle the voice synthesizer below to hear me speak!' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [ttsStatus, setTtsStatus] = useState('Standby'); // Standby, Speaking, Error, Loading
  const messagesEndRef = useRef(null);
  const currentAudioRef = useRef(null);

  // Auto-scroll chat to the bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Stop TTS audio if component unmounts
  useEffect(() => {
    return () => {
      if (currentAudioRef.current) {
        currentAudioRef.current.pause();
      }
    };
  }, []);

  const handleTtsToggle = () => {
    audio.playConfirm();
    setTtsEnabled(!ttsEnabled);
    if (ttsEnabled && currentAudioRef.current) {
      currentAudioRef.current.pause();
      setTtsStatus('Standby');
    }
  };

  const playKokoroSpeech = async (text) => {
    if (!ttsEnabled) return;
    
    // Stop any currently playing audio
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
    }

    setTtsStatus('Loading');
    try {
      // Clean up text slightly for better TTS rendering (e.g. remove markdown bullet stars)
      const cleanText = text.replace(/[*#\-]/g, ' ').trim();
      
      const baseUrl = process.env.NEXT_PUBLIC_KOKORO_TTS_URL || 'http://localhost:8998';
      const apiKey = process.env.NEXT_PUBLIC_KOKORO_API_KEY;
      const headers = {};
      if (apiKey) {
        headers['X-API-Key'] = apiKey;
      }
      
      const response = await fetch(
        `${baseUrl}/tts?text=${encodeURIComponent(cleanText.substring(0, 300))}&voice=af_heart&speed=1.0`,
        { headers }
      );
      
      if (!response.ok) throw new Error('Kokoro TTS service offline');
      
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      
      const newAudio = new Audio(audioUrl);
      currentAudioRef.current = newAudio;
      
      setTtsStatus('Speaking');
      newAudio.onended = () => {
        setTtsStatus('Standby');
      };
      
      await newAudio.play();
    } catch (err) {
      console.warn("Kokoro TTS could not be reached:", err.message);
      setTtsStatus('Error');
      // Play a diagnostic audio tone instead
      audio.playHologram();
      setTimeout(() => setTtsStatus('Standby'), 2000);
    }
  };

  // Rule-based chatbot responder
  const getAICloneResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Turtil AI Internship
    if (q.includes('turtil') || q.includes('intern') || q.includes('pipeline') || q.includes('campus')) {
      const exp = resumeData.experience.find(e => e.company.includes('Turtil'));
      return `Concerning my **Turtil AI Internship** (2025):\nI worked as an AI Intern contributing to artificial intelligence model development and campus management pipelines. I specialized in optimizing system performance and engineering efficient backend modules using **Python**. This operation refined my capabilities in handling complex machine learning data models.`;
    }

    // 2. CarTrade Tech
    if (q.includes('cartrade') || q.includes('car trade') || q.includes('full stack developer') || q.includes('vue') || q.includes('php')) {
      const exp = resumeData.experience.find(e => e.company.includes('CarTrade'));
      return `Log entry for **CarTrade Tech** (Dec 2025 -- May 2026):\nAs a Full Stack Developer, I built and managed fast, responsive web systems using **Vue.js** for frontend aesthetics and **PHP** for backend operations. I designed optimized query structures across **MongoDB** and **MySQLi** databases, resulting in high data integrity and quick retrieval times.`;
    }

    // 3. Projects
    if (q.includes('project') || q.includes('agent') || q.includes('voice') || q.includes('discord') || q.includes('bot') || q.includes('headless') || q.includes('cms') || q.includes('fit') || q.includes('tracker')) {
      return `Displaying blueprints for engineering projects:\n\n` + 
        `1. **Real-Time AI Voice Agent**:\n   * Tech: Python, FastAPI, Gemini API, Web Audio API\n   * Details: A low-latency agent streaming responses via SSE and parsing sentences dynamically to reduce speak wait times. Uses Web Audio API for gapless playback.\n\n` +
        `2. **NullPointer AI Assistant**:\n   * Tech: Python, Docker, GenAI, Ollama, systemd\n   * Details: A robust Discord bot routing prompts to local/cloud models, equipped with a text-to-speech pipeline and systemd autorestart config.\n\n` +
        `3. **QueryPort Headless CMS**:\n   * Tech: React 19, TypeScript, Express, MongoDB\n   * Details: Headless portfolio CMS platform featuring global error handlers and media cloud storage under strict MVC structure.\n\n` +
        `4. **Resume Fit Tracker**:\n   * Tech: NLP, Python, ML\n   * Details: An analytics tool checking resume matching scores with JDs using machine learning models.`;
    }

    // 4. Skills
    if (q.includes('skill') || q.includes('language') || q.includes('tech') || q.includes('framework') || q.includes('database') || q.includes('python') || q.includes('react') || q.includes('java')) {
      return `Diagnostic of weaponry configurations (Skills):\n\n` +
        `* **Languages:** ${resumeData.skills.languages.join(', ')}\n` +
        `* **Web/Cloud:** ${resumeData.skills.webCloud.join(', ')}\n` +
        `* **AI/ML:** ${resumeData.skills.aiMl.join(', ')}\n` +
        `* **Databases:** ${resumeData.skills.databases.join(', ')}\n` +
        `* **Core Concepts:** ${resumeData.skills.coreConcepts.join(', ')}`;
    }

    // 5. LeetCode / Achievements
    if (q.includes('leetcode') || q.includes('achievement') || q.includes('prize') || q.includes('gdg') || q.includes('rank') || q.includes('knight')) {
      return `Retrieving tactical honors list (Achievements):\n\n` +
        `* **LeetCode Knight:** Solved over 1,300+ problems, consistently ranked in the global top 5%.\n` +
        `* **NPTEL Java DSA:** Achieved a top 1% national rank with a score of 87%.\n` +
        `* **GDG Lead (Algorithms):** Led Developer Group domain, hosting algorithms events and contests.\n` +
        `* **Crack the Jumble Code:** 1st Prize winner for logical problem-solving.`;
    }

    // 6. Contact
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('mail') || q.includes('hire') || q.includes('linkedin')) {
      return `Accessing communication channels. You can reach Krishna Kanth via:\n` +
        `* **Email:** ${resumeData.personalInfo.email}\n` +
        `* **Phone:** ${resumeData.personalInfo.phone}\n` +
        `* **LinkedIn:** [Krishna Kanth LinkedIn](${resumeData.personalInfo.links.linkedin})\n` +
        `* **GitHub:** [GitHub Profile](${resumeData.personalInfo.links.github})\n` +
        `* **LeetCode:** [LeetCode Profile](${resumeData.personalInfo.links.leetcode})`;
    }

    // Default response
    return `Inquiry registered. I can report on several specific sectors of my background. Please query me about my **Turtil AI Internship**, **CarTrade Developer role**, **Engineering Projects** (like my Voice Agent or NullPointer Bot), **Technical Skills**, or **LeetCode Achievements**.`;
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    audio.playTick();
    const userText = inputText;
    setInputText('');

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);

    // Simulate Nier network analyzer processing delay
    setTimeout(async () => {
      const responseText = getAICloneResponse(userText);
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'assistant', text: responseText }]);
      audio.playChime();
      
      // Speak the response if TTS toggle is active
      if (ttsEnabled) {
        playKokoroSpeech(responseText);
      }
    }, 1200);
  };

  return (
    <div className="chat-hud">
      {/* HUD Header */}
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="audio-pulse">
            <span className="audio-pulse-bar"></span>
            <span className="audio-pulse-bar"></span>
            <span className="audio-pulse-bar"></span>
            <span className="audio-pulse-bar"></span>
          </div>
          <span className="telemetry" style={{ fontWeight: 'bold' }}>Memory Bank: Unit-9S</span>
        </div>
        
        {/* Kokoro Status Badge */}
        <span className="telemetry" style={{ fontSize: '0.75rem', color: ttsStatus === 'Speaking' ? 'var(--nier-gold)' : 'var(--nier-fg-dim)' }}>
          VOICE: {ttsStatus}
        </span>
      </div>

      {/* Messages Window */}
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.sender}`}>
            {msg.sender === 'system' ? (
              <span className="telemetry" style={{ fontSize: '0.8rem', display: 'block' }}>{msg.text}</span>
            ) : (
              <div style={{ whiteSpace: 'pre-line' }}>
                {renderMessageText(msg.text)}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="chat-msg assistant" style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Loader size={16} className="animate-spin" />
            <span className="telemetry">Analyzing Database...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Controls & Input */}
      <div className="chat-input-area">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span className="telemetry" style={{ fontSize: '0.75rem' }}>Direct Transmission Terminal</span>
          
          {/* TTS Toggle Button */}
          <button 
            type="button" 
            onClick={handleTtsToggle}
            className={`nier-btn ${ttsEnabled ? 'active' : ''}`}
            style={{ padding: '4px 10px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '5px' }}
            onMouseEnter={() => audio.playTick()}
          >
            {ttsEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            {ttsEnabled ? 'Kokoro On' : 'Kokoro Off'}
          </button>
        </div>

        <form onSubmit={handleSend} className="chat-form">
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '100%' }}>
            <CornerDownRight size={18} style={{ color: 'var(--nier-border)' }} />
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Query unit experience log... (e.g. 'Turtil', 'Projects')"
              className="chat-input"
              disabled={isTyping}
            />
            <button 
              type="submit" 
              className="nier-btn" 
              style={{ padding: '12px 20px' }}
              disabled={isTyping}
              onMouseEnter={() => audio.playTick()}
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
