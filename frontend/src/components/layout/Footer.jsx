// frontend/src/components/layout/Footer.jsx
// Flipkart-style multi-column footer

const footerLinks = [
  {
    heading: 'ABOUT',
    links: ['Contact Us', 'About Us', 'Careers', 'Flipkart Stories', 'Press', 'Corporate Information'],
  },
  {
    heading: 'GROUP COMPANIES',
    links: ['Myntra', 'Cleartrip', 'Shopsy'],
  },
  {
    heading: 'HELP',
    links: ['Payments', 'Shipping', 'Cancellation & Returns', 'FAQ', 'Report Infringement'],
  },
  {
    heading: 'CONSUMER POLICY',
    links: ['Return Policy', 'Terms Of Use', 'Security', 'Privacy', 'Sitemap', 'EPR Compliance'],
  },
]

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: 'var(--color-fk-text-deep)' }}
      className="mt-8"
    >
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section) => (
            <div key={section.heading}>
              <h3
                className="font-bold mb-4"
                style={{ color: 'var(--color-fk-text-muted)', fontSize: '12px', letterSpacing: '0.5px' }}
              >
                {section.heading}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition-colors"
                      style={{ color: 'var(--color-fk-white)', fontSize: '13px' }}
                      onMouseEnter={(e) => (e.target.style.color = 'var(--color-fk-blue)')}
                      onMouseLeave={(e) => (e.target.style.color = 'var(--color-fk-white)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t"
        style={{ borderColor: '#2e2e2e' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Brand info */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--color-fk-text-muted)', fontSize: '12px' }}>
                Sold by registered sellers
              </span>
            </div>
          </div>
          {/* Right: Copyright */}
          <p style={{ color: 'var(--color-fk-text-muted)', fontSize: '12px' }}>
            © 2007-2026 Flipkart.com — A demonstration clone
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
