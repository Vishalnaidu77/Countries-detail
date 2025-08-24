"use client"
import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import { CardContainer, CardBody, CardItem } from "../Components/UI/3d-Card"

const CountryCard = ({ country }) => {
  const [imageError, setImageError] = useState(false)

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
    <CardContainer className="inter-var">
      <CardBody className="bg-zinc-800 relative group/card  border-zinc-700 w-[280px] h-[480px] rounded-2xl p-6 border shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between mx-auto">
        
        {/* Region Badge */}
        <CardItem translateZ={80} className="absolute top-4 right-4">
          <span className="bg-zinc-700/90 backdrop-blur-sm text-zinc-300 px-3 py-1 rounded-full text-xs font-medium shadow-sm border border-zinc-600/50">
            {country?.region || "Unknown"}
          </span>
        </CardItem>

        {/* Country Name Section */}
        <div className="space-y-2">
          <CardItem translateZ={50} className="text-xl font-bold text-white">
            {country?.name?.common?.length > 25 ? country.name.common.slice(0, 25) + "..." : country?.name?.common || "Unknown Country"}
          </CardItem>
          
          {country?.name?.official && country?.name?.official !== country?.name?.common && (
            <CardItem as="p" translateZ={40} className="text-sm text-zinc-400">
              {country.name.official.length > 30 ? country.name.official.slice(0, 30) + "..." : country.name.official}
            </CardItem>
          )}
        </div>

        {/* Flag Section */}
        <CardItem translateZ={100} className="w-full mt-4 flex-1 flex items-center justify-center bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-xl overflow-hidden">
          {!imageError ? (
            <img
              src={country?.flags?.svg || country?.flags?.png}
              alt={`${country?.name?.common || "Country"} flag`}
              className="max-h-32 max-w-full object-contain rounded-lg shadow-md group-hover/card:scale-110 transition-transform duration-300"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-32 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </CardItem>

        {/* Country Details */}
        <div className="space-y-3 mt-4">
          {/* Capital */}
          <CardItem translateZ={30} className="flex items-center gap-2 text-sm text-zinc-300">
            <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="truncate">
              <span className="font-medium">Capital:</span> {country?.capital?.[0] || "N/A"}
            </span>
          </CardItem>

          {/* Population */}
          <CardItem translateZ={30} className="flex items-center gap-2 text-sm text-zinc-300">
            <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <span className="truncate">
              <span className="font-medium">Population:</span> {formatPopulation(country?.population)}
            </span>
          </CardItem>

          {/* Currency */}
          {country?.currencies && (
            <CardItem translateZ={30} className="flex items-center gap-2 text-sm text-zinc-300">
              <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span className="truncate">
                <span className="font-medium">Currency:</span> {Object.values(country.currencies)?.[0]?.name || "N/A"}
              </span>
            </CardItem>
          )}
        </div>

        {/* View Details Button */}
        <div className="mt-6 pt-4 border-t border-zinc-700">
          <NavLink to={`/country/${country?.name?.common}`} className="block w-full">
            <CardItem
              translateZ={20}
              as="button"
              className="w-full bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white py-3 rounded-xl font-medium transition-all duration-300 group-hover/card:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <span>View Details</span>
              <svg className="w-4 h-4 transition-transform group-hover/card:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </CardItem>
          </NavLink>
        </div>

      </CardBody>
    </CardContainer>
  )
}

export default CountryCard