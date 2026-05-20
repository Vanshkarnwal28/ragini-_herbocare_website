import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CEOMessage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll('.animate-item');
    
    gsap.fromTo(elements, 
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
    <section id="ceo" className="section" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container" ref={containerRef}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {/* Using a placeholder avatar for CEO */}
          <div className="animate-item" style={{ 
            width: '150px', 
            height: '150px', 
            borderRadius: '50%', 
            overflow: 'hidden',
            boxShadow: 'var(--shadow-soft)',
            border: '4px solid var(--bg-tertiary)'
          }}>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
              alt="CEO"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="animate-item" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', marginBottom: '16px', color: 'var(--text-primary)' }}>
              Message from our CEO
            </h2>
            <blockquote style={{ 
              fontSize: '20px', 
              fontStyle: 'italic', 
              color: 'var(--text-secondary)',
              lineHeight: '1.8',
              marginBottom: '24px',
              position: 'relative',
              padding: '0 20px'
            }}>
              "Our mission has always been to bridge the gap between ancient herbal wisdom and modern healthcare. We believe in the power of nature to heal, restore, and rejuvenate."
            </blockquote>
            <h4 style={{ color: 'var(--accent)', fontSize: '18px', fontWeight: 'bold' }}>- Ragini Devi</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Founder & CEO, Ragini Herbocare</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOMessage;
