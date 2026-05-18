import { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import './Hero.css';

const Hero = ({ onOpenVideo }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(textRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
    )
    .fromTo(btnRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.6"
    );
  }, []);

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      {/* Background Overlay */}
      <div className="hero-overlay"></div>
      
      {/* Background Image (Could be video) */}
      <div 
        className="hero-bg"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2094&auto=format&fit=crop')` }}
      ></div>

      <div className="container hero-content">
        <div ref={textRef} className="hero-text-container">
          <img src="/logo.png" alt="Ragini Herbocare Logo" className="hero-logo" />
          <h1 className="hero-title">
            Awesome <br/>
            <span className="text-accent">Designs.</span>
          </h1>
        </div>
        
        <div ref={btnRef} className="hero-play-wrapper">
          <button className="play-btn" onClick={onOpenVideo} aria-label="Play Video">
            <Play size={28} fill="currentColor" />
          </button>
          <span className="play-text">Watch Video</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
