import React from 'react'
import CountryData from '../Api/CountryData.json'
import { CardContainer, CardBody, CardItem } from "../Components/UI/3d-Card"

function About() {
  const formatPopulation = (population) => {
    // Handle both string and number formats
    const num = typeof population === 'string' ? 
      parseInt(population.replace(/,/g, '')) : population
    
    if (num >= 1000000000) {
      return `${(num / 1000000000).toFixed(1)}B`
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`
    }
    return num?.toLocaleString() || population || "N/A"
  }

  return (
    <div className='w-full min-h-screen bg-zinc-900 py-12'>

      {/* Cards Grid */}
      <div className='px-8 md:px-18 lg:px-40'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2s">
          {CountryData.map((country, idx) => (
            <CardContainer key={idx} className="inter-var">
              <CardBody className="bg-zinc-800 relative group/card hover:shadow-2xl hover:shadow-yellow-100/[0.1] border-zinc-700 w-[280px] h-[300px] rounded-2xl p-6 border shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col justify-between mx-auto">
                
                {/* Country Name */}
                <CardItem translateZ={50} className="text-xl font-semibold text-white mb-4">
                  {country.countryName}
                </CardItem>

                {/* Country Details */}
                <div className="space-y-3 flex-1">
                  {/* Capital */}
                  <CardItem translateZ={30} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <span className="text-sm text-zinc-400">Capital:</span>
                      <p className="text-zinc-300">{country.capital}</p>
                    </div>
                  </CardItem>

                  {/* Population */}
                  <CardItem translateZ={30} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <div>
                      <span className="text-sm text-zinc-400">Population:</span>
                      <p className="text-zinc-300">{formatPopulation(country.population)}</p>
                    </div>
                  </CardItem>

                  {/* Interesting Fact */}
                  <CardItem translateZ={30} className="flex items-start gap-3">
                    <svg className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <span className="text-sm text-zinc-400">Fun Fact:</span>
                      <p className="text-zinc-300 text-sm leading-relaxed">{country.interestingFact}</p>
                    </div>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-12 px-8">
        <p className="text-zinc-400 text-sm">
          Explore fascinating countries and their unique cultures
        </p>
      </div>
    </div>
  )
}

export default About