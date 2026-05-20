import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    // Redirect to cart if empty
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    // Razorpay dummy integration
    const options = {
      key: "rzp_test_dummy_key", // Dummy key as requested
      amount: getCartTotal() * 100, // Amount in paise
      currency: "INR",
      name: "Ragini Herbocare",
      description: "Purchase of Herbal Products",
      image: "/logo.png", // Use real logo path
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
        clearCart();
        navigate('/');
      },
      prefill: {
        name: formData.name,
        contact: formData.mobile,
      },
      theme: {
        color: "#2e6e3c"
      }
    };
    
    // Simulate Razorpay opening (In a real app, you load Razorpay script first)
    if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
    } else {
        // Fallback dummy simulation if script isn't loaded
        const confirmPayment = window.confirm(`Proceed to pay ₹${getCartTotal()} via Dummy Razorpay?`);
        if (confirmPayment) {
            alert("Payment Successful! Dummy ID: pay_dummy12345");
            clearCart();
            navigate('/');
        }
    }
  };

  if (cart.length === 0) return null;

  return (
    <div className="checkout-page fade-in">
      <div className="container">
        <h2 className="page-title">Checkout</h2>
        
        <div className="checkout-container">
          <div className="checkout-form-section glass">
            <h3>Shipping Details</h3>
            <p className="guest-note">Guest checkout enabled. No login required.</p>
            
            <form onSubmit={handlePayment} className="checkout-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required pattern="[0-9]{10}" />
              </div>
              
              <div className="form-group full-width">
                <label>Complete Address</label>
                <textarea name="address" value={formData.address} onChange={handleChange} required rows="3"></textarea>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input type="text" name="state" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required pattern="[0-9]{6}" />
                </div>
              </div>
              
              <button type="submit" className="btn btn-primary pay-btn">
                Pay Securely with Razorpay (₹{getCartTotal()})
              </button>
            </form>
          </div>

          <div className="order-summary-section glass">
            <h3>Order Summary</h3>
            <div className="checkout-items">
              {cart.map(item => (
                <div key={item.id} className="checkout-item">
                  <div className="checkout-item-info">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-qty">x {item.quantity}</span>
                  </div>
                  <span className="checkout-item-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            
            <div className="checkout-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="total-row grand-total">
                <span>Total Amount</span>
                <span>₹{getCartTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
