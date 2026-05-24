import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Hero.css';

const Hero = () => {
  const slides = [
    {
      id: 1,
      image: '/banner1.jpg',
      alt: 'Toraz Pain Relief - Reclaim Your Mobility'
    },
    {
      id: 2,
      image: '/banner2.jpg',
      alt: 'Toraz Herbal Ingredients'
    }
  ];

  return (
    <section id="home" className="hero-section">
      <div className="hero-slider-container">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation, Pagination]}
          effect="fade"
          speed={1000}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div 
                className="slide-image"
                style={{ backgroundImage: `url('${slide.image}')` }}
                aria-label={slide.alt}
              >
                <div className="hero-slide-overlay"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hero-actions-container container">
        <motion.div 
          className="hero-btn-group"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link to="/#products" className="btn btn-premium-green">SHOP NOW</Link>
          <Link to="/#products" className="btn btn-outline-green">EXPLORE PRODUCTS</Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
