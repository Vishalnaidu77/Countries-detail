import React, { useState } from 'react'

const SearchFilter = ({ search, setSearch, filter, setFilter, countries, setContries }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleInput = (e) => {
    setSearch(e.target.value)
  }

  const handleSelect = (value) => {
    setFilter(value)
    setIsFilterOpen(false)
  }

  const sortCountries = (value) => {
    const sortCountry = [...countries].sort((a, b) => {
      return value === "asc" 
        ? a.name.common.localeCompare(b.name.common) 
        : b.name.common.localeCompare(a.name.common)
    })
    setContries(sortCountry)
  }

  const clearFilters = () => {
    setSearch("")
    setFilter("All")
  }

  const regions = ["All", "Asia", "Europe", "Americas", "Africa", "Oceania", "Antarctic"]

  return (
    <div className="sticky top-0 z-40 bg-zinc-900/95 backdrop-blur-lg border-b border-zinc-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Mobile Layout */}
        <div className="block lg:hidden space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              value={search}
              onChange={handleInput}
              type="text"
              placeholder="Search countries..."
              className="block w-full pl-10 pr-12 py-3 border border-zinc-600 rounded-2xl focus:ring-1 focus:ring-yellow-200 focus:border-transparent outline-none transition-all duration-300 bg-zinc-800 shadow-sm text-white placeholder-zinc-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => sortCountries("asc")}
              className="flex-shrink-0 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              A-Z
            </button>
            <button
              onClick={() => sortCountries("desc")}
              className="flex-shrink-0 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Z-A
            </button>
            
            {/* Region Filter Dropdown */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
              >
                {filter === "All" ? "All Regions" : filter}
                <svg className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isFilterOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700 py-2 z-50">
                  {regions.map((region) => (
                    <button
                      key={region}
                      onClick={() => handleSelect(region)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        filter === region 
                          ? 'bg-zinc-700 text-zinc-300 font-medium' 
                          : 'text-zinc-300 hover:bg-zinc-700'
                      }`}
                    >
                      {region === "All" ? "All Regions" : region}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {(search || filter !== "All") && (
              <button
                onClick={clearFilters}
                className="flex-shrink-0 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between gap-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              value={search}
              onChange={handleInput}
              type="text"
              placeholder="Search countries..."
              className="block w-full pl-12 pr-12 py-3 border border-zinc-600 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all duration-300 bg-zinc-800 shadow-sm text-white placeholder-zinc-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Sort Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => sortCountries("asc")}
              className="px-6 py-3 bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4" />
              </svg>
              A-Z
            </button>
            <button
              onClick={() => sortCountries("desc")}
              className="px-6 py-3 bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Z-A
            </button>
          </div>

          {/* Region Filter */}
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="px-6 py-3 bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 min-w-[140px]"
            >
              {filter === "All" ? "All Regions" : filter}
              <svg className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isFilterOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-800 rounded-xl shadow-xl border border-zinc-700 py-2 z-50 backdrop-blur-lg">
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => handleSelect(region)}
                    className={`w-full text-left px-4 py-3 text-sm transition-all duration-200 ${
                      filter === region 
                        ? 'bg-gradient-to-r from-zinc-700 to-zinc-800 text-zinc-300 font-medium border-l-4 border-yellow-500' 
                        : 'text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {region === "All" ? "All Regions" : region}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {(search || filter !== "All") && (
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-zinc-600 to-zinc-700 hover:from-zinc-700 hover:to-zinc-800 text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear All
            </button>
          )}
        </div>

        {/* Active Filters Display */}
        {(search || filter !== "All") && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-sm text-zinc-300">Active filters:</span>
            {search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-xs">
                Search: "{search}"
                <button onClick={() => setSearch("")} className="hover:text-zinc-100">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
            {filter !== "All" && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full text-xs">
                Region: {filter}
                <button onClick={() => setFilter("All")} className="hover:text-zinc-100">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchFilter