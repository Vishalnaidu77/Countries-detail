import axios from 'axios'

const baseUrl = axios.create({
    baseURL : ("https://restcountries.com/v3.1")
})

export const GetCountryData = () => {
   return baseUrl.get("/all?fields=name,population,region,capital,flags")
}

export const GetCountryIndData = (name) => {
   return baseUrl.get(`/name/${name}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`)
}

