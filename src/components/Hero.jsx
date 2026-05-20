import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import './Hero.css';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const btnGroupRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(textRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.2 }
    )
    .fromTo(btnGroupRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.8"
    );
  }, []);

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      {/* Background Overlay */}
      <div className="hero-overlay-green"></div>
      
      {/* Background Image */}
      <div 
        className="hero-bg"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80')` }}
      ></div>

      <div className="container hero-content">
        <div ref={textRef} className="hero-text-container">
          <span className="hero-subtitle">100% Organic & Pure</span>
          <h1 className="hero-title">
            Natural Wellness <br/>
            <span className="text-accent">for Everyday Life.</span>
          </h1>
          <p className="hero-desc">
            Discover the healing power of nature with our premium range of herbal healthcare products, designed to nurture your body and mind.
          </p>
        </div>
        
        <div ref={btnGroupRef} className="hero-btn-group">
          <Link to="/#products" className="btn btn-primary">Shop Now</Link>
          <Link to="/#products" className="btn btn-outline-white">Explore Products</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
