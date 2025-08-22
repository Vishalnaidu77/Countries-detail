import React from 'react'
import { NavLink, useRouteError } from 'react-router-dom'

const ErrorPage = () => {

    const error = useRouteError()
    

  return (
    <div className=''>
        <h1 className='bg-red-500 my-10'>Sorry, This page is not avalable.</h1>
        <p className='mb-4'>{error && error.data}</p>
        <NavLink 
        to='/'
        className='bg-blue-400 text-lg py-2 px-4 rounded'
        >Go back to home</NavLink>
    </div>
  )
}

export default ErrorPage;
