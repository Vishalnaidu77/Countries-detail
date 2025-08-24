import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
  const handleScroll = () => {
    const halfViewportHeight = window.innerHeight * 0.5
    setIsScrolled(window.scrollY > halfViewportHeight)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
      <header className={`fixed top-0 left-0 right-0 z-50 py-3 bg-gradient-to-b from-zinc-900 via-zinc-700 to-zinc-700 backdrop-blur-sm transition-all duration-300 ${
        isScrolled 
          ? ' absolute top-[-200px] left-0 right-0 ' 
          : ' absolute top-0 left-0 right-0 '
      }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to='/' className="text-2xl font-bold hover:scale-105 transition-transform">
              <span className='text-white'>Globe</span>
              <span className={`bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent`}>
                Quest
              </span>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/country', label: 'Countries' },
              { to: '/contact', label: 'Contact' }
            ].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  px-4 py-2 rounded-lg font-medium transition-all duration-300 relative group
                  ${isActive 
                    ? (isScrolled ? 'text-zinc-600 bg-blue-50' : 'text-white bg-white/20') 
                    : (isScrolled ? 'text-white hover:text-zinc-600 hover:bg-white' : 'text-white/80 hover:text-white hover:bg-white/20')
                  }
                `}
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </NavLink>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-blue-600 hover:bg-blue-50' : 'text-white hover:bg-white/10'
              }`}
            >
              <svg className={`w-6 h-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} 
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-lg border border-white/20">
            <div className="flex flex-col space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About' },
                { to: '/country', label: 'Countries' },
                { to: '/contact', label: 'Contact' }
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => `
                    px-4 py-3 rounded-lg font-medium transition-all duration-300
                    ${isActive 
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:border-l-4 hover:border-blue-200'
                    }
                  `}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header