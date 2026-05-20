import { useEffect, useRef } from 'react';
import { ShoppingCart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import './Products.css';

gsap.registerPlugin(ScrollTrigger);

const productsData = [
  {
    id: 'p1',
    name: 'Herbal Hair Oil',
    desc: 'Promotes hair growth and prevents dandruff naturally.',
    price: 350,
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p2',
    name: 'Organic Immunity Booster',
    desc: 'A blend of rare herbs to strengthen your immune system.',
    price: 550,
    image: 'https://images.unsplash.com/photo-1611078810237-9759d8ab8bfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p3',
    name: 'Ayurvedic Skin Cream',
    desc: 'Nourishes and revitalizes skin for a natural glow.',
    price: 450,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p4',
    name: 'Herbal Detox Tea',
    desc: 'Cleanses the body and aids in healthy digestion.',
    price: 250,
    image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220afa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
  },
];

const Products = () => {
  const containerRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll('.product-card');
    
    gsap.fromTo(cards, 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, []);

  return (
    <section id="products" className="section" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
      <div className="container" ref={containerRef}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '36px', color: 'var(--text-primary)', marginBottom: '16px' }}>Our Natural Products</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Carefully crafted from pure organic ingredients for your well-being.
          </p>
        </div>

        <div className="products-grid">
          {productsData.map((product) => (
            <div key={product.id} className="product-card glass elevation-hover">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
              <div className="product-content">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-desc">{product.desc}</p>
                <div className="product-footer">
                  <span className="product-price">₹{product.price}</span>
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => {
                      addToCart(product);
                      // Optional: Add a small toast or animation here
                    }}
                  >
                    <ShoppingCart size={18} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
