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

  // Load Razorpay Script dynamically
  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadScript();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Create order on our backend
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: getCartTotal(),
          currency: 'INR',
        }),
      });
      
      const order = await res.json();
      
      if (!order || !order.id) {
        alert('Server Error. Unable to generate order ID.');
        return;
      }

      // 2. Open Razorpay Checkout modal
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_dummy_key', // This is just public key
        amount: order.amount,
        currency: order.currency,
        name: 'Ragini Herbocare',
        description: 'Purchase of Herbal Products',
        image: '/logo.png',
        order_id: order.id,
        handler: async function (response) {
          // 3. Verify Payment Signature on Backend
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyRes.json();
          
          if (verifyRes.ok) {
            alert('Payment Successful! Payment ID: ' + response.razorpay_payment_id);
            clearCart();
            navigate('/');
          } else {
            alert('Payment Verification Failed!');
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.mobile,
        },
        theme: {
          color: '#2e6e3c',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
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
