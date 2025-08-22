import React from 'react'
import CountryData from '../Api/CountryData.json'
import { CardContainer, CardBody, CardItem } from "../Components/UI/3d-Card"

function About() {
  return (
    <div className='w-full px-8 md:px-18 lg:px-32'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {CountryData.map((country, idx) => (
          <CardContainer key={idx} className="inter-var">
            <CardBody className="bg-yellow-500 relative group/card dark:bg-yellow-700 dark:border-white/[0.2] border-black/[0.1] w-full max-w-sm sm:max-w-md lg:max-w-96 h-[170px] rounded-xl p-6 border">
              <CardItem translateZ={50} className="text-xl font-bold text-neutral-800 dark:text-white">
                Country: {country.countryName}
              </CardItem>
              <CardItem as="p" translateZ={60} className="text-neutral-700 text-sm max-w-sm mt-2 dark:text-neutral-200">
                <span className="font-semibold">Capital:</span> {country.capital}
              </CardItem>
              <CardItem as="p" translateZ={40} className="text-neutral-700 text-sm max-w-sm mt-1 dark:text-neutral-200">
                <span className="font-semibold">Population:</span> {country.population}
              </CardItem>
              <CardItem as="p" translateZ={30} className="text-neutral-700 text-sm max-w-sm mt-1 dark:text-neutral-200">
                <span className="font-semibold">Interesting Fact:</span> {country.interestingFact}
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  )
}

export default About
