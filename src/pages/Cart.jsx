import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart-page fade-in">
        <div className="container">
          <div className="empty-cart-content glass">
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <Link to="/#products" className="btn btn-primary" style={{ marginTop: '20px' }}>
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page fade-in">
      <div className="container">
        <div className="cart-header">
          <h2>Your Shopping Cart</h2>
          <Link to="/#products" className="back-link">
            <ArrowLeft size={18} /> Continue Shopping
          </Link>
        </div>

        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item glass">
                <div className="item-image-wrapper">
                  <img src={item.image} alt={item.name} className="item-image" />
                </div>
                <div className="item-details">
                  <h3 className="item-title">{item.name}</h3>
                  <p className="item-price">₹{item.price}</p>
                </div>
                
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="qty-btn"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="qty-btn"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="item-total">
                    ₹{item.price * item.quantity}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                    title="Remove Item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary glass">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{getCartTotal()}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{getCartTotal()}</span>
            </div>
            
            <Link to="/checkout" className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
