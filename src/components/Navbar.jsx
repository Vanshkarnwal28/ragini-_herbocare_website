import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Facebook, Instagram, WhatsApp } from './SocialIcons';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart } = useCart();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Products', href: '/#products' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Ragini Herbocare" className="nav-logo-img" />
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </div>

        {/* Icons (Desktop) */}
        <div className="navbar-social">
          <a href="#" className="social-icon"><Instagram size={18} /></a>
          <a href="#" className="social-icon"><Facebook size={18} /></a>
          <a href="https://wa.me/919830023313" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp-icon"><WhatsApp size={18} /></a>
          <Link to="/cart" className="cart-icon-wrapper">
            <ShoppingCart size={22} />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="mobile-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Link to="/cart" className="mobile-link" onClick={() => setIsMobileMenuOpen(false)}>
            Cart ({cartItemCount})
          </Link>
        </div>
        <div className="mobile-social">
          <a href="#"><Instagram size={20} /></a>
          <a href="#"><Facebook size={20} /></a>
          <a href="https://wa.me/919830023313" target="_blank" rel="noopener noreferrer" className="whatsapp-icon"><WhatsApp size={20} /></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
