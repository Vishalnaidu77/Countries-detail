import React, { useState } from 'react'
import { NavLink } from "react-router-dom"

const CountryCard = ({ country }) => {
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const formatPopulation = (population) => {
    if (population >= 1000000000) {
      return `${(population / 1000000000).toFixed(1)}B`
    } else if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(1)}K`
    }
    return population?.toLocaleString() || "N/A"
  }

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Flag Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {/* Region Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm border border-white/50">
            {country?.region || "Unknown"}
          </span>
        </div>
        
        {/* Flag Image */}
        <div className="w-full h-full flex items-center justify-center p-6">
          {!imageError ? (
            <img
              src={country?.flags?.svg || country?.flags?.png}
              alt={`${country?.name?.common || "Country"} flag`}
              className="max-h-32 max-w-full object-contain rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-blue-600/20 backdrop-blur-sm transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </div>

      {/* Content Section */}
      <div className="relative p-6 space-y-4">
        {/* Country Name */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
            {country?.name?.common || "Unknown Country"}
          </h3>
          {country?.name?.official && country?.name?.official !== country?.name?.common && (
            <p className="text-sm text-gray-500 truncate">
              {country.name.official}
            </p>
          )}
        </div>

        {/* Country Details */}
        <div className="space-y-3">
          {/* Capital */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="truncate">
              <span className="font-medium">Capital:</span> {country?.capital?.[0] || "N/A"}
            </span>
          </div>

          {/* Population */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="truncate">
              <span className="font-medium">Population:</span> {formatPopulation(country?.population)}
            </span>
          </div>

          {/* Currency */}
          {country?.currencies && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span className="truncate">
                <span className="font-medium">Currency:</span> {Object.values(country.currencies)?.[0]?.name || "N/A"}
              </span>
            </div>
          )}
        </div>

        {/* View Details Button */}
        <div className="pt-4 border-t border-gray-100">
          <NavLink to={`/country/${country?.name?.common}`} className="block w-full">
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-medium transition-all duration-300 transform group-hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              <span>View Details</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </NavLink>
        </div>
      </div>

      {/* Loading shimmer effect */}
      <div className={`absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ${
        isHovered ? 'translate-x-full' : ''
      }`}></div>
    </div>
  )
}

export default CountryCard