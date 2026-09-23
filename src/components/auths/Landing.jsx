

// Landing.jsx
import '../../stylings/Landing.css'

const Landing = () => {
  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar__container">
          <div className="navbar__logo">
            {/* Placeholder for Logo */}
            <div className="logo-placeholder"></div>
            <span className="navbar__brand">VEYRO</span>
          </div>
          <ul className="navbar__links">
            <li><a href="#home">Home</a></li>
            <li><a href="#track">Track Shipment</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="navbar__actions">
            <button className="btn btn--text">Login</button>
            <button className="btn btn--primary">Sign Up</button>
          </div>
          <button className="navbar__hamburger">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero" id="home">
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <p className="hero__eyebrow">LOGISTICS & SHIPMENT TRACKING</p>
          <h1 className="hero__title">
            Your Cargo.<br />
            <span className="hero__title--accent">Our Priority.</span>
          </h1>
          <p className="hero__subtitle">
            Fast, secure and reliable logistics solutions for businesses and individuals. 
            Track your shipments in real time, from pickup to delivery.
          </p>
          <div className="hero__buttons">
            <button className="btn btn--primary">Track Your Shipment &rarr;</button>
            <button className="btn btn--outline">Get Started &rarr;</button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="features__grid">
          <div className="feature-card">
            <div className="feature-card__icon">🕒</div>
            <h3 className="feature-card__title">Real-Time Tracking</h3>
            <p className="feature-card__desc">Know where your shipment is, anytime, anywhere.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">🛡️</div>
            <h3 className="feature-card__title">Secure & Reliable</h3>
            <p className="feature-card__desc">Your cargo is protected at every step.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">🌍</div>
            <h3 className="feature-card__title">Global Reach</h3>
            <p className="feature-card__desc">USA & Canada, and expanding.</p>
          </div>
          <div className="feature-card">
            <div className="feature-card__icon">💰</div>
            <h3 className="feature-card__title">Competitive Rates</h3>
            <p className="feature-card__desc">Quality service without the high cost.</p>
          </div>
        </div>
      </section>

      {/* Tracking Section */}
      <section className="tracking" id="track">
        <div className="tracking__container">
          <div className="tracking__content">
            <p className="tracking__eyebrow">TRACK YOUR SHIPMENT</p>
            <h2 className="tracking__title">Enter Your Tracking ID</h2>
            <p className="tracking__desc">
              Get real-time updates on your shipment's location, status and estimated delivery time.
            </p>
            <div className="tracking__form">
              <input type="text" placeholder="e.g. VY-82K4-91AX" className="tracking__input" />
              <button className="btn btn--primary">Track &rarr;</button>
            </div>
          </div>
          <div className="tracking__visual">
            <div className="tracking__image-placeholder">
              {/* Image placeholder */}
              <span>Image Placeholder</span>
            </div>
            <div className="tracking__timeline">
              <div className="timeline-step">
                <div className="timeline-step__dot"></div>
                <p className="timeline-step__label">Picked Up</p>
                <p className="timeline-step__date">May 12, 2025<br/>08:24</p>
              </div>
              <div className="timeline-step">
                <div className="timeline-step__dot"></div>
                <p className="timeline-step__label">In Transit</p>
                <p className="timeline-step__date">May 14, 2025<br/>16:32</p>
              </div>
              <div className="timeline-step">
                <div className="timeline-step__dot"></div>
                <p className="timeline-step__label">Out for Delivery</p>
                <p className="timeline-step__date">May 16, 2025<br/>08:12</p>
              </div>
              <div className="timeline-step">
                <div className="timeline-step__dot"></div>
                <p className="timeline-step__label">Delivered</p>
                <p className="timeline-step__date">May 16, 2025<br/>14:05</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="services__header">
          <h2 className="services__title">Built for Modern Logistics</h2>
          <p className="services__desc">
            VEYRO combines technology and experience to deliver smarter, faster and more transparent shipping solutions.
          </p>
          <button className="btn btn--primary">Learn More &rarr;</button>
        </div>
        <div className="services__grid">
          <div className="service-card">
            <div className="service-card__image-placeholder"></div>
            <h3 className="service-card__title">Road Freight</h3>
            <p className="service-card__desc">Flexible and reliable trucking across USA & Canada.</p>
            <a href="#" className="service-card__link">Learn More &rarr;</a>
          </div>
          <div className="service-card">
            <div className="service-card__image-placeholder"></div>
            <h3 className="service-card__title">Ocean Freight</h3>
            <p className="service-card__desc">Cost-effective global shipping for large loads.</p>
            <a href="#" className="service-card__link">Learn More &rarr;</a>
          </div>
          <div className="service-card">
            <div className="service-card__image-placeholder"></div>
            <h3 className="service-card__title">Warehousing</h3>
            <p className="service-card__desc">Secure storage and inventory management.</p>
            <a href="#" className="service-card__link">Learn More &rarr;</a>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="footer">
        <div className="footer__content">
          <p className="footer__eyebrow">LET'S MOVE YOUR WORLD</p>
          <h2 className="footer__title">Smarter Logistics. Stronger Business.</h2>
          <button className="btn btn--primary">Get Started &rarr;</button>
        </div>
      </footer>
    </div>
  );
};

export default Landing;