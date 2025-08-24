import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: "Explore",
      links: [
        { label: "All Countries", path: "/country" },
        { label: "By Region", path: "/country" },
        { label: "Popular Destinations", path: "/country" },
        { label: "Random Country", path: "/country" }
      ]
    },
    {
      title: "About",
      links: [
        { label: "Our Story", path: "/about" },
        { label: "Team", path: "/about" },
        { label: "Mission", path: "/about" },
        { label: "Contact Us", path: "/contact" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "API Documentation", path: "#" },
        { label: "Data Sources", path: "#" },
        { label: "Help Center", path: "#" },
        { label: "Blog", path: "#" }
      ]
    }
  ]

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
      ),
      title: "Visit Us",
      info: "123 Explorer Street, Adventure City"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Call Us",
      info: "+1 (555) 123-4567"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Us",
      info: "contact@worldatlas.com"
    }
  ]

  return (
    <footer className="bg-zinc-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}>
        </div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-3xl font-bold">
                  <span className="text-white">Globe</span>
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Quest</span>
                </h2>
                <p className="text-gray-400 mt-4 leading-relaxed">
                  Discover the world through comprehensive country data. Your gateway to exploring nations, cultures, and geographical wonders.
                </p>
              </div>

              {/* Social Media Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {[
                    { name: 'Facebook', color: 'hover:text-blue-400' },
                    { name: 'Twitter', color: 'hover:text-blue-400' },
                    { name: 'Instagram', color: 'hover:text-pink-400' },
                    { name: 'LinkedIn', color: 'hover:text-blue-600' },
                    { name: 'YouTube', color: 'hover:text-red-500' }
                  ].map((social) => (
                    <button
                      key={social.name}
                      className={`text-gray-400 ${social.color} transition-colors duration-300 transform hover:scale-110`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {footerSections.map((section, index) => (
                <div key={index}>
                  <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <button
                          onClick={() => navigate(link.path)}
                          className="text-gray-400 hover:text-white transition-colors duration-300 hover:underline"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-6">
                Contact Info
              </h3>
              <div className="space-y-4">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
                      {contact.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{contact.title}</h4>
                      <p className="text-gray-400 text-sm">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <span>© {currentYear} WorldAtlas. All rights reserved.</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <button className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </button>
                <button className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </button>
                <button className="text-gray-400 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer