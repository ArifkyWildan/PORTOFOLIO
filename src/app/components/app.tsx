import React from 'react';

const App: React.FC = () => {
  return (
    <>
      <style>{`
        :root {
            --glow-color: rgba(255, 255, 255, 0.75);
            --line-grad-start: #a2a8d3;
            --line-grad-end: #f4f4f4;
            --bg-grad-start: #333842;
            --bg-grad-end: #1f2128;
            --node-bg: rgba(255, 255, 255, 0.05);
            --node-border: rgba(255, 255, 255, 0.1);
        }

        body {
            font-family: 'Inter', sans-serif;
            background: radial-gradient(ellipse at center, var(--bg-grad-start) 0%, var(--bg-grad-end) 70%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow: hidden;
            color: #fff;
            perspective: 1000px;
        }

        .hub-container {
            position: relative;
            width: 90vw;
            height: 80vh;
            max-width: 1000px;
            max-height: 600px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .connector-svg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        }
        
        .connector-svg path {
            fill: none;
            stroke-width: 2;
        }
        
        .particle {
            fill: white;
            filter: drop-shadow(0 0 3px var(--glow-color));
        }

        .node, .central-hub {
            position: absolute;
            z-index: 10;
            width: 72px;
            height: 72px;
            background-color: var(--node-bg);
            border: 1px solid var(--node-border);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 15px 0px rgba(0,0,0,0.3), 
                        inset 0 0 5px rgba(255,255,255,0.05);
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            transform-style: preserve-3d;
        }
        
        .node:hover {
            transform: scale(1.15) translateZ(20px);
            box-shadow: 0 10px 30px 5px rgba(0,0,0,0.4), 
                        0 0 20px 5px var(--glow-color);
            background-color: rgba(255, 255, 255, 0.1);
        }

        .icon {
            width: 36px;
            height: 36px;
            background-color: #fff;
            opacity: 0.7;
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-position: center;
            mask-position: center;
            -webkit-mask-size: contain;
            mask-size: contain;
            transition: opacity 0.3s ease;
        }

        .node:hover .icon {
            opacity: 1.0;
        }
        
        .icon-laravel { -webkit-mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/laravel.svg); mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/laravel.svg); }
        .icon-php { -webkit-mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/php.svg); mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/php.svg); }
        .icon-vscode { -webkit-mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/visualstudiocode.svg); mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/visualstudiocode.svg); }
        .icon-js { -webkit-mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/javascript.svg); mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/javascript.svg); }
        .icon-ts { -webkit-mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/typescript.svg); mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/typescript.svg); }
        .icon-react { -webkit-mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/react.svg); mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons/icons/react.svg); }

        .central-hub {
            width: 96px;
            height: 96px;
            background-color: #ffffff;
            box-shadow: 0 0 20px 5px var(--glow-color), 0 5px 20px rgba(0,0,0,0.5);
            animation: pulse 4s infinite cubic-bezier(0.4, 0, 0.6, 1);
        }

        .central-hub svg {
            width: 54px;
            height: 54px;
            color: #333;
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
                box-shadow: 0 0 20px 5px var(--glow-color), 0 5px 20px rgba(0,0,0,0.5);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 0 30px 10px var(--glow-color), 0 5px 25px rgba(0,0,0,0.5);
            }
        }
        
        /* Desktop Layout */
        .node-laravel { top: 15%; left: 20%; }
        .node-php { top: 50%; left: 5%; transform: translateY(-50%); }
        .node-vscode { top: 85%; left: 20%; transform: translateY(-100%); }
        
        .node-js { top: 15%; right: 20%; }
        .node-ts { top: 50%; right: 5%; transform: translateY(-50%); }
        .node-react { top: 85%; right: 20%; transform: translateY(-100%); }

        .mobile-svg { display: none; }
        .desktop-svg { display: block; }
        
        /* Mobile Layout */
        @media (max-width: 768px) {
            .hub-container {
                width: 100vw;
                height: 100vh;
                max-height: none;
                transform: scale(0.8);
            }
            
            .node, .central-hub {
                width: 64px;
                height: 64px;
            }
            .central-hub {
                width: 80px;
                height: 80px;
            }
            .icon { width: 32px; height: 32px; }
            .central-hub svg { width: 48px; height: 48px; }

            .desktop-svg { display: none; }
            .mobile-svg { display: block; }

            /* Circular arrangement for mobile */
            .node-laravel { top: 50%; left: 50%; transform: translate(-50%, -50%) translateY(-150px) rotate(0deg) translateY(150px) rotate(0deg); }
            .node-js { top: 50%; left: 50%; transform: translate(-50%, -50%) translateY(-150px) rotate(60deg) translateY(150px) rotate(-60deg); }
            .node-ts { top: 50%; left: 50%; transform: translate(-50%, -50%) translateY(-150px) rotate(120deg) translateY(150px) rotate(-120deg); }
            .node-react { top: 50%; left: 50%; transform: translate(-50%, -50%) translateY(-150px) rotate(180deg) translateY(150px) rotate(-180deg); }
            .node-vscode { top: 50%; left: 50%; transform: translate(-50%, -50%) translateY(-150px) rotate(240deg) translateY(150px) rotate(-240deg); }
            .node-php { top: 50%; left: 50%; transform: translate(-50%, -50%) translateY(-150px) rotate(300deg) translateY(150px) rotate(-300deg); }
        }
      `}</style>
      <div className="hub-container">
        {/* SVG for Connector Lines and Animations */}
        <svg className="connector-svg desktop-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: 'var(--line-grad-start)', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: 'var(--line-grad-end)', stopOpacity: 1}} />
                </linearGradient>
            </defs>

            {/* Paths from left nodes */}
            <path id="path-laravel" d="M236,126 C350,150 400,250 452,282" stroke="url(#line-gradient)"></path>
            <path id="path-php" d="M86,300 C250,300 350,300 452,300" stroke="url(#line-gradient)"></path>
            <path id="path-vscode" d="M236,474 C350,450 400,350 452,318" stroke="url(#line-gradient)"></path>

            {/* Paths from right nodes */}
            <path id="path-js" d="M764,126 C650,150 600,250 548,282" stroke="url(#line-gradient)"></path>
            <path id="path-ts" d="M914,300 C750,300 650,300 548,300" stroke="url(#line-gradient)"></path>
            <path id="path-react" d="M764,474 C650,450 600,350 548,318" stroke="url(#line-gradient)"></path>
            
            {/* Particles for animations */}
            <g className="particles">
                <circle className="particle" r="3"><animateMotion dur="4s" repeatCount="indefinite" begin="0s"><mpath href="#path-laravel" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="4s" repeatCount="indefinite" begin="2s"><mpath href="#path-laravel" /></animateMotion></circle>
                <circle className="particle" r="3"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0.5s"><mpath href="#path-php" /></animateMotion></circle>
                <circle className="particle" r="2.5"><animateMotion dur="3.5s" repeatCount="indefinite" begin="2.2s"><mpath href="#path-php" /></animateMotion></circle>
                <circle className="particle" r="3.5"><animateMotion dur="4.2s" repeatCount="indefinite" begin="1s"><mpath href="#path-vscode" /></animateMotion></circle>
                <circle className="particle" r="3"><animateMotion dur="4.2s" repeatCount="indefinite" begin="3.1s"><mpath href="#path-vscode" /></animateMotion></circle>
                <circle className="particle" r="3"><animateMotion dur="4s" repeatCount="indefinite" begin="0.2s"><mpath href="#path-js" /></animateMotion></circle>
                <circle className="particle" r="2.5"><animateMotion dur="4s" repeatCount="indefinite" begin="2.2s"><mpath href="#path-js" /></animateMotion></circle>
                <circle className="particle" r="3.5"><animateMotion dur="3.5s" repeatCount="indefinite" begin="0.7s"><mpath href="#path-ts" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3.5s" repeatCount="indefinite" begin="2.4s"><mpath href="#path-ts" /></animateMotion></circle>
                <circle className="particle" r="3"><animateMotion dur="4.2s" repeatCount="indefinite" begin="1.2s"><mpath href="#path-react" /></animateMotion></circle>
                <circle className="particle" r="2.5"><animateMotion dur="4.2s" repeatCount="indefinite" begin="3.3s"><mpath href="#path-react" /></animateMotion></circle>
            </g>
        </svg>

        <svg className="connector-svg mobile-svg" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="line-gradient-mobile" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: 'var(--line-grad-start)', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: 'var(--line-grad-end)', stopOpacity: 1}} />
                </linearGradient>
            </defs>
            {/* Mobile Paths (straight lines from circle edge to center) */}
            <path id="m-path-1" d="M200,50 L200,160" stroke="url(#line-gradient-mobile)"></path>
            <path id="m-path-2" d="M330,100 L240,160" stroke="url(#line-gradient-mobile)"></path>
            <path id="m-path-3" d="M330,250 L240,220" stroke="url(#line-gradient-mobile)"></path>
            <path id="m-path-4" d="M200,350 L200,240" stroke="url(#line-gradient-mobile)"></path>
            <path id="m-path-5" d="M70,250 L160,220" stroke="url(#line-gradient-mobile)"></path>
            <path id="m-path-6" d="M70,100 L160,160" stroke="url(#line-gradient-mobile)"></path>
            
            {/* Mobile Particles */}
            <g className="particles-mobile">
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#m-path-1" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite" begin="1.5s"><mpath href="#m-path-1" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite" begin="0.5s"><mpath href="#m-path-2" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite" begin="2s"><mpath href="#m-path-2" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite" begin="1s"><mpath href="#m-path-3" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite" begin="2.5s"><mpath href="#m-path-3" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite" begin="0.2s"><mpath href="#m-path-4" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite" begin="1.7s"><mpath href="#m-path-4" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite" begin="0.8s"><mpath href="#m-path-5" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite" begin="2.3s"><mpath href="#m-path-5" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite" begin="1.2s"><mpath href="#m-path-6" /></animateMotion></circle>
                <circle className="particle" r="2"><animateMotion dur="3s" repeatCount="indefinite" begin="2.7s"><mpath href="#m-path-6" /></animateMotion></circle>
            </g>
        </svg>

        {/* Central Hub */}
        <div className="central-hub">
            {/* OpenAI Logo SVG */}
            <svg viewBox="0 0 40.82 40.82" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M40.63,20.41A20.32,20.32,0,0,0,1,20.41a20.32,20.32,0,0,0,39.66,0ZM5.52,20.41a14.89,14.89,0,0,1,29.78,0,14.89,14.89,0,0,1-29.78,0Z"></path><path d="M20.41,38.7A18.28,18.28,0,0,0,38.5,21.13a1.5,1.5,0,0,0-2.88-1,15.28,15.28,0,0,1-31,0,1.5,1.5,0,0,0-2.88,1A18.28,18.28,0,0,0,20.41,38.7ZM20.41,2.12A18.28,18.28,0,0,0,2.32,19.68a1.5,1.5,0,0,0,2.88,1,15.28,15.28,0,0,1,31,0,1.5,1.5,0,0,0,2.88-1A18.28,18.28,0,0,0,20.41,2.12Z"></path><path d="M28,17.18a1.5,1.5,0,0,0,1.5-1.5,8.37,8.37,0,0,0-16.64,1,1.5,1.5,0,1,0,3,.27,5.38,5.38,0,0,1,10.7,0A1.5,1.5,0,0,0,28,17.18Z"></path><path d="M12.87,23.64a1.5,1.5,0,0,0-1.5,1.5,8.37,8.37,0,0,0,16.64-1,1.5,1.5,0,0,0-3-.27,5.38,5.38,0,0,1-10.7,0A1.5,1.5,0,0,0,12.87,23.64Z"></path><path d="M26.24,10.61a1.5,1.5,0,0,0,1.93-1.16,11.2,11.2,0,0,0-21.78,1.4,1.5,1.5,0,0,0,3,.36A8.2,8.2,0,0,1,25.07,9.8,1.5,1.5,0,0,0,26.24,10.61Z"></path><path d="M14.58,30.21a1.5,1.5,0,0,0-1.93,1.16,11.2,11.2,0,0,0,21.78-1.4,1.5,1.5,0,0,0-3-.36A8.2,8.2,0,0,1,15.75,31,1.5,1.5,0,0,0,14.58,30.21Z"></path><path d="M32.84,14.86a1.5,1.5,0,0,0,1.13-.82,15.78,15.78,0,0,0-30.25,2,1.5,1.5,0,0,0,3-.54,12.78,12.78,0,0,1,24.34-1.2,1.5,1.5,0,0,0,1.78.56Z"></path><path d="M8,25.9a1.5,1.5,0,0,0-1.13.82,15.78,15.78,0,0,0,30.25-2,1.5,1.5,0,0,0-3,.54A12.78,12.78,0,0,1,9.78,26.46,1.5,1.5,0,0,0,8,25.9Z"></path></svg>
        </div>

        {/* Nodes on the left */}
        <div className="node node-laravel">
            <div className="icon icon-laravel" title="Laravel"></div>
        </div>
        <div className="node node-php">
            <div className="icon icon-php" title="PHP"></div>
        </div>
        <div className="node node-vscode">
            <div className="icon icon-vscode" title="VS Code"></div>
        </div>

        {/* Nodes on the right */}
        <div className="node node-js">
            <div className="icon icon-js" title="JavaScript"></div>
        </div>
        <div className="node node-ts">
            <div className="icon icon-ts" title="TypeScript"></div>
        </div>
        <div className="node node-react">
            <div className="icon icon-react" title="React"></div>
        </div>
      </div>
    </>
  );
};

export default App;
