import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll('.contact-animate');
    
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container" ref={containerRef}>
        <div className="section-header contact-animate">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info contact-animate glass">
            <h3>Contact Information</h3>
            <p className="info-desc">Reach out to us for any queries regarding our products or bulk orders.</p>
            
            <div className="info-items">
              <div className="info-item">
                <div className="info-icon"><Phone size={20} /></div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon"><Mail size={20} /></div>
                <div>
                  <h4>Email</h4>
                  <p>info@raginiherbocare.com</p>
                </div>
              </div>
              
              <div className="info-item">
                <div className="info-icon"><MapPin size={20} /></div>
                <div>
                  <h4>Address</h4>
                  <p>123 Herbal Avenue, Green City, State 456001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container contact-animate">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Full Name" 
                  required 
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email Address" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number" 
                    required 
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?" 
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
