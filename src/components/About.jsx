import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const textElements = containerRef.current.querySelectorAll('.animate-text');
    
    gsap.fromTo(textElements, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    );
  }, []);

  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container" ref={containerRef}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="animate-text" style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--text-primary)' }}>
            About Ragini Herbocare
          </h2>
          <p className="animate-text" style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '30px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p className="animate-text" style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
