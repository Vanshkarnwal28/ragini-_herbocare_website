import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, FlaskConical, Medal } from 'lucide-react';
import './About.css';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="about" className="section about-section">
      <div className="container">
        <motion.div 
          className="about-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2>About Ragini Herbocare</h2>
          <p className="about-subtitle">Empowering Wellness, Alleviating Pain: The Ragini Herbocare Story</p>
        </motion.div>

        <motion.div 
          className="about-content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <p>
            At Ragini Herbocare, we believe that true healing begins when modern science harmonizes with the timeless wisdom of Ayurveda. Founded by the visionary Mr. Saibal Maitra, our company is driven by a singular, deeply rooted mission: to provide safe, natural, and highly effective relief from chronic pain, restoring mobility and joy to everyday life.
          </p>
          <p>
            Our journey began with a breakthrough invention—<strong>Toraz</strong>—a premium, herbal Ayurvedic pain relief oil. Formulated through years of meticulous research and a deep understanding of indigenous botanical extracts, Toraz represents a paradigm shift in pain management.
          </p>
        </motion.div>

        <motion.div 
          className="about-quote-container"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <blockquote className="founder-quote">
            "True wellness is not merely the absence of pain, but the revival of your body's natural strength."
          </blockquote>
          <p className="founder-name">— Mr. Saibal Maitra, Founder</p>
        </motion.div>

        <motion.div 
          className="about-features"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="feature-card glass" variants={fadeIn}>
            <div className="feature-icon"><Leaf size={32} /></div>
            <h3>100% Herbal & Ayurvedic</h3>
            <p>Rooted in ancient wisdom, crafted purely from nature's healing herbs.</p>
          </motion.div>
          <motion.div className="feature-card glass" variants={fadeIn}>
            <div className="feature-icon"><FlaskConical size={32} /></div>
            <h3>Scientific Innovation</h3>
            <p>A proprietary formula developed through years of meticulous research.</p>
          </motion.div>
          <motion.div className="feature-card glass" variants={fadeIn}>
            <div className="feature-icon"><ShieldCheck size={32} /></div>
            <h3>Chemical-Free Promise</h3>
            <p>Safe, natural pain relief without any harmful additives or chemicals.</p>
          </motion.div>
          <motion.div className="feature-card glass" variants={fadeIn}>
            <div className="feature-icon"><Medal size={32} /></div>
            <h3>Quality Assured</h3>
            <p>Manufactured under strict quality controls for deep, lasting relief.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
