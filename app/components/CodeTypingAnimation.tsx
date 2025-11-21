"use client";

import React, { useState, useEffect } from 'react';

interface CodeTypingAnimationProps {
  autoStart?: boolean;
  onLaunchTrigger?: () => void;
  onCodeDisappeared?: () => void;
  onProgressUpdate?: (progress: number) => void;
  className?: string;
}

const CodeTypingAnimation: React.FC<CodeTypingAnimationProps> = ({ 
  autoStart = true, 
  onLaunchTrigger = () => {},
  onCodeDisappeared = () => {},
  onProgressUpdate = () => {},
  className = ""
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [launchTriggered, setLaunchTriggered] = useState(false);

  // Prevent hydration mismatch by only starting animation after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Static part of the code (always visible)
  const staticCode = `
class Business:
    def __init__(self):
        self.growth = 100
        self.profitable = True
        self.scalable = True
        self.optimized = True
    
`;

  //gets typed in real time
  const dynamicCodePart1 = `    def verify_readiness(self):
        return (self.growth >= 100 and 
                self.scalable and 
                self.optimized)
    
    def launch(self):
        self.set_strategy()
        self.optimize_resources()
        self.deploy()

business = Business()

if business.verify_readiness():
    business.launch()`;

  useEffect(() => {
    if (!mounted || !autoStart || !isTyping) return;

    const timer = setTimeout(() => {
      if (currentIndex < dynamicCodePart1.length) {
        setCurrentIndex(prev => prev + 1);

        // Update progress for rocket building
        const progress = (currentIndex + 1) / dynamicCodePart1.length;
        onProgressUpdate(progress);

        const typedText = dynamicCodePart1.substring(0, currentIndex + 1);
        if (typedText.includes('business.launch()') && !launchTriggered) {
          setLaunchTriggered(true);
          onLaunchTrigger();
        }
      } else {
        setIsTyping(false);
      }
    }, getTypingDelay());

    return () => clearTimeout(timer);
  }, [mounted, currentIndex, isTyping, launchTriggered, autoStart, onLaunchTrigger, onProgressUpdate]);

  useEffect(() => {
    if (!launchTriggered) return;

    const timer = setTimeout(() => {
      onCodeDisappeared();
    }, 2000);

    return () => clearTimeout(timer);
  }, [launchTriggered, onCodeDisappeared]);

  const getTypingDelay = () => {
    const char = dynamicCodePart1[currentIndex];
    if (char === '\n') return 200;
    if (char === ' ') return 30;
    if (char === ':') return 150;
    return 20;
  };

  const highlightCode = (code: string) => {
    const keywords = ['class', 'def', '__init__', 'self', 'return', 'if', 'and', 'True', 'False', 'None'];
    const operators = ['=', '>', '<', '>=', '<=', '==', '!=', '+', '-', '*', '/', '%', 'and', 'or', 'not'];
    
    // Split the code into tokens while preserving whitespace, strings, and structure
    const tokens = code.split(/(\s+|[{}();,.\[\]:=+\-*/%!<>&|]|\/\/.*$|"[^"]*"|'[^']*')/gm);
    
    return tokens.map((token, index) => {
      // Skip empty tokens
      if (!token) return null;
      
      // Comments
      if (token.startsWith('//')) {
        return <span key={index} style={{ color: '#e5d4ff' }}>{token}</span>;
      }
      
      // Strings (quoted content)
      if ((token.startsWith('"') && token.endsWith('"')) || (token.startsWith("'") && token.endsWith("'"))) {
        return <span key={index} style={{ color: '#f8f4ff' }}>{token}</span>;
      }
      
      // Keywords
      if (keywords.includes(token)) {
        return <span key={index} style={{ color: '#e8d8ff' }}>{token}</span>;
      }
      
      // Numbers
      if (/^\d+(\.\d+)?$/.test(token)) {
        return <span key={index} style={{ color: '#f2ecfa' }}>{token}</span>;
      }
      
      // Property names (after dots)
      if (tokens[index - 1] === '.') {
        return <span key={index} style={{ color: '#eed9ff' }}>{token}</span>;
      }
      
      // Function names (before parentheses)
      if (tokens[index + 1] === '(' || (tokens[index + 1] === ' ' && tokens[index + 2] === '(')) {
        return <span key={index} style={{ color: '#d8c4ff' }}>{token}</span>;
      }
      
      // Object keys (before colon)
      if (tokens[index + 1] === ':' || (tokens[index + 1] === ' ' && tokens[index + 2] === ':')) {
        return <span key={index} style={{ color: '#eed9ff' }}>{token}</span>;
      }
      
      // Operators
      if (operators.includes(token)) {
        return <span key={index} style={{ color: '#f5f3f8' }}>{token}</span>;
      }
      
      // Brackets and punctuation
      if (/[{}();,.\[\]:]/.test(token)) {
        return <span key={index} style={{ color: '#f5f3f8' }}>{token}</span>;
      }
      
      // Variables and identifiers
      if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(token)) {
        return <span key={index} style={{ color: '#eed9ff' }}>{token}</span>;
      }
      
      // Default text (whitespace, etc.)
      return <span key={index} style={{ color: '#f5f3f8' }}>{token}</span>;
    });
  };

  return (
    <div 
      className={`codeContainer star-wars-code ${className}`}
      style={{
        fontFamily: 'Courier New, monospace',
        overflow: 'visible',
        height: '100%',
        position: 'relative',
        opacity: 1
      }}
    >
      <div className={`star-wars-code-text ${launchTriggered ? 'scrolling-away' : ''}`}>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0
        }}>
          {highlightCode(staticCode)}
          {mounted && (
            <>
              {highlightCode(dynamicCodePart1.substring(0, currentIndex))}
              {isTyping && <span style={{ animation: 'blink 1s infinite', color: '#FFFFFF' }}>█</span>}
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes smoothScrollAway {
          0% {
            transform: rotateX(55deg) translateY(0);
          }
          100% {
            transform: rotateX(55deg) translateY(-200vh);
          }
        }
        
        .star-wars-code {
            position: absolute;
            bottom: 9%;
            left: 30%;
            transform: translateX(0%);
            width: 45%;
            height: 800px;
            background: transparent;
            padding: 20px;
            box-sizing: border-box;
            overflow: hidden;
            z-index: 10;
            pointer-events: none;
            text-align: left;
            perspective: 550px;
        }

        .star-wars-code-text {
            color: #FFFFFF;
            font-weight: normal;
            font-size: 25px;
            line-height: 1.5;
            white-space: pre-wrap;
            height: 100%;
            overflow: hidden;
            position: relative;
            transform: rotateX(55deg);
            transform-origin: bottom center;
            text-shadow: 0 0 2px rgba(255, 255, 255, 0.3);
        }

        .star-wars-code-text.scrolling-away {
            animation: smoothScrollAway 2s cubic-bezier(0.95, 0, 1, 0.1) 2s forwards;
        }

        @media (max-width: 768px) {
            .star-wars-code {
                bottom: 20%;
                left: 10%;
                width: 90%;
                height: 70vh;
            }
            .star-wars-code-text {
                font-size: 14px;
            }
        }

        @media (max-width: 480px) {
            .star-wars-code {
                bottom: 20%;
                left: 8%;
            }
            .star-wars-code-text {
                font-size: 11px;
            }
        }

        /* Fade effect for the upper part of the code block */
        .codeContainer {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.01) 10%, rgba(0,0,0,0.03) 20%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0.85) 93%, rgba(0,0,0,1) 98%);
          mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.01) 10%, rgba(0,0,0,0.03) 20%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0.85) 93%, rgba(0,0,0,1) 98%);
        }
      `}</style>
    </div>
  );
};

export default CodeTypingAnimation;
