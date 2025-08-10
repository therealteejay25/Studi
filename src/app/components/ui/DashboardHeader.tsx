import React from 'react'
import UserProfile from './UserProfile'

const DashboardHeader = () => {
  return (
    <div className='flex justify-between items-center w-full'>
        <div>
            <h1 className='bg-gradient-to-r from-accent py-2 to-gradientaccent bg-clip-text text-transparent text-4xl font-bold'>Good Morning, Tayo</h1>
            <p className='text-2xl text-dark'>What are we learning today?</p>
        </div>
        <div>
            <UserProfile src='/assets/userImg.jpg' alt='User Image' size={48} />
        </div>
    </div>
  )
}

export default DashboardHeader