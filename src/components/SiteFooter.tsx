export function SiteFooter() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer-grid">
        <div>
          <img src="/logo.svg" alt="NovexTrustPay logo" className="footer-logo" />
          <p>Secure, transparent, and innovation-led digital banking for personal and business customers.</p>
          <p>Email: support@novextrustpay.com<br />Phone: +1 (800) 448-7200</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <a href="#services">Services</a>
          <a href="#trust">Trust Metrics</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#faq">FAQ</a>
        </div>
        <div>
          <h4>Resources</h4>
          <a href="/blog">Financial Education</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/compliance">Compliance</a>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p>Get product updates and market insights.</p>
          <form className="newsletter">
            <input type="email" placeholder="Your email" aria-label="Email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="container footer-bottom">© 2026 NovexTrustPay. All rights reserved.</div>
    </footer>
  )
}
