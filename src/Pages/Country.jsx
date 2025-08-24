import React, { useEffect, useState, useTransition } from 'react'
import { GetCountryData } from '../Api/PostApi'
import CountryCard from './CountryCard'
import SearchFilter from '../Components/UI/SearchFilter'

const Country = () => {
  const [isPending, startTransition] = useTransition()
  const [countries, setContries] = useState([])
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [viewMode, setViewMode] = useState('grid') // grid or list

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await GetCountryData()
        setContries(res.data)
      } catch (error) {
        console.error('Error fetching countries:', error)
      }
    })
  }, [])

  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase())
    }
    return country
  }

  const filterCountry = (country) => {
    if (filter === "All") return country
    return country.region === filter
  }

  const filterCountries = countries.filter((country) => searchCountry(country) && filterCountry(country))

  // Loading Component
  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Loading Header */}
          <div className="text-center mb-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <h1 className="text-3xl font-bold text-white mb-2">Loading Countries...</h1>
            <p className="text-zinc-300">Discovering amazing places around the world</p>
          </div>

          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Hero Section */}
      <div className="pt-16 pb-8 bg-gradient-to-r from-zinc-800 to-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Discover <span className="text-yellow-400">Countries</span>
            </h1>
            <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
              Explore detailed information about {countries.length} countries from around the world
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{countries.length}</div>
                <div className="text-sm text-zinc-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">7</div>
                <div className="text-sm text-zinc-300">Continents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{filterCountries.length}</div>
                <div className="text-sm text-zinc-300">Filtered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">∞</div>
                <div className="text-sm text-zinc-300">Adventures</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <SearchFilter 
        search={search} 
        setSearch={setSearch} 
        filter={filter} 
        setFilter={setFilter} 
        countries={countries} 
        setCountries={setContries}
      />

      

      {/* Countries Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filterCountries.length === 0 ? (
            /* No Results */
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No countries found</h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearch("")
                    setFilter("All")
                  }}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-300"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          ) : (
            /* Countries Grid */
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
                : 'space-y-6'
            } animate-in`}>
              {filterCountries.map((country, idx) => (
                <div
                  key={country.cca3 || idx}
                  className="animate-fade-in"
                  style={{ animationDelay: `${(idx % 8) * 100}ms` }}
                >
                  <CountryCard country={country} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-yellow-500 hover:bg-yellow-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}

export default Country