import React, { useEffect, useState, useTransition } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetCountryIndData } from '../../Api/PostApi'

const CountryDetails = () => {
  const params = useParams()
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()
  const [country, setCountry] = useState(null)
  const [error, setError] = useState(null)
  const [imageError, setImageError] = useState(false)

  // Fetch country data
  useEffect(() => {
    if (!params.id) return
    
    startTransition(async () => {
      try {
        const res = await GetCountryIndData(params.id)
        if (res.status === 200 && res.data.length > 0) {
          setCountry(res.data[0])
          setError(null)
        } else {
          setError('Country not found')
        }
      } catch (error) {
        console.error('Error fetching country data:', error)
        setError('Failed to fetch country data')
      }
    })
  }, [params.id])

  // Helper functions
  const getNativeNames = () => {
    if (!country?.name?.nativeName) return 'N/A'
    return Object.values(country.name.nativeName)
      .map(name => `${name.common} (${name.official})`)
      .join(', ')
  }

  const getCurrencies = () => {
    if (!country?.currencies) return 'N/A'
    return Object.values(country.currencies)
      .map(currency => `${currency.name} (${currency.symbol || 'N/A'})`)
      .join(', ')
  }

  const getLanguages = () => {
    if (!country?.languages) return 'N/A'
    return Object.values(country.languages).join(', ')
  }

  const formatPopulation = (pop) => {
    if (!pop) return 'N/A'
    return new Intl.NumberFormat().format(pop)
  }

  const formatArea = (area) => {
    if (!area) return 'N/A'
    return `${new Intl.NumberFormat().format(area)} km²`
  }

  // Loading state
  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Loading Country Details...</h1>
            <p className="text-gray-600">Fetching information about this amazing place</p>
          </div>
          
          {/* Loading Skeleton */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">
            <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300"></div>
            <div className="p-8 space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  ))}
                </div>
                <div className="h-64 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center pt-16">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate(-1)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              Go Back
            </button>
            <button 
              onClick={() => navigate('/country')}
              className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-xl font-medium transition-all duration-300"
            >
              Browse All Countries
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No country data
  if (!country) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center pt-16">
        <div className="text-center bg-white p-12 rounded-3xl shadow-2xl max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-700 mb-4">No country data found</h1>
          <p className="text-gray-600 mb-8">We couldn't find information for this country.</p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate(-1)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
            >
              Go Back
            </button>
            <button 
              onClick={() => navigate('/country')}
              className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 py-3 px-6 rounded-xl font-medium transition-all duration-300"
            >
              Browse All Countries
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <button 
              onClick={() => navigate('/country')} 
              className="hover:text-blue-600 transition-colors"
            >
              Countries
            </button>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-900 font-medium">{country?.name?.common}</span>
          </div>
        </nav>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          
          {/* Hero Header */}
          <div className="relative h-64 sm:h-80 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px'
              }}></div>
            </div>
            
            {/* Content */}
            <div className="relative h-full flex items-center justify-center p-8">
              <div className="text-center text-white">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                  {country?.name?.common}
                </h1>
                <p className="text-xl sm:text-2xl text-blue-100 mb-6">
                  {country?.name?.official}
                </p>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{country?.region} • {country?.subregion}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-8 sm:p-12">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Left Column - Flag and Basic Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Flag */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center shadow-inner">
                  <div className="mb-4">
                    {!imageError ? (
                      <img
                        src={country?.flags?.svg || country?.flags?.png}
                        alt={`${country?.name?.common} flag`}
                        className="h-32 w-full object-contain rounded-lg shadow-lg"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="h-32 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    {country?.flags?.alt || `Flag of ${country?.name?.common}`}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Facts</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Population</span>
                      <span className="font-semibold text-blue-600">{formatPopulation(country?.population)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Area</span>
                      <span className="font-semibold text-green-600">{formatArea(country?.area)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Region</span>
                      <span className="font-semibold text-purple-600">{country?.region || 'N/A'}</span>
                    </div>
                    
                    {country?.timezones && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Timezone</span>
                        <span className="font-semibold text-orange-600">{country.timezones[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Detailed Information */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Country Information Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  
                  {/* Official Name */}
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Official Name
                    </h3>
                    <p className="text-gray-800 font-medium">{country?.name?.official || 'N/A'}</p>
                  </div>

                  {/* Native Name */}
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      Native Name
                    </h3>
                    <p className="text-gray-800 font-medium break-words">{getNativeNames()}</p>
                  </div>

                  {/* Capital */}
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      Capital
                    </h3>
                    <p className="text-gray-800 font-medium">
                      {country?.capital ? country.capital.join(', ') : 'N/A'}
                    </p>
                  </div>

                  {/* Top Level Domain */}
                  <div className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Domain
                    </h3>
                    <p className="text-gray-800 font-medium">
                      {country?.tld ? country.tld.join(', ') : 'N/A'}
                    </p>
                  </div>

                </div>

                {/* Currency */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Currency
                  </h3>
                  <p className="text-gray-800 font-medium">{getCurrencies()}</p>
                </div>

                {/* Languages */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                    Languages
                  </h3>
                  <p className="text-gray-800 font-medium">{getLanguages()}</p>
                </div>

                {/* Borders */}
                {country?.borders && country.borders.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                    <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Border Countries
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {country.borders.map((border, index) => (
                        <span 
                          key={index} 
                          className="inline-block px-3 py-2 bg-white border border-purple-200 text-purple-800 rounded-lg text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-purple-50"
                        >
                          {border}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Go Back
          </button>
          
          <button 
            onClick={() => navigate('/country')}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Explore More Countries
          </button>
        </div>
      </div>
    </div>
  )
}

export default CountryDetails