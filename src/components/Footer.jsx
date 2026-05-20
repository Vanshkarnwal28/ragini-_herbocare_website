import { Link } from 'react-router-dom';
import { Facebook, Instagram } from './SocialIcons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon herb-icon">🌿</span>
              Ragini Herbocare
            </Link>
            <p className="footer-desc">
              Natural Wellness for Everyday Life. We provide 100% organic and pure herbal healthcare products.
            </p>
          </div>
          
          <div className="footer-links-group">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/#home">Home</a></li>
              <li><a href="/#about">About Us</a></li>
              <li><a href="/#products">Products</a></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4>Follow Us</h4>
            <div className="footer-social">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>©️2026 Ragini Herbocare. Crafted by <a href="https://techvisiondigital.in/" target="_blank" rel="noopener noreferrer" className="techvision-link">TechVision Digital</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
