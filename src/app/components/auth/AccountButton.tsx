import Image from 'next/image'
import React from 'react'
import Trash from '../ui/icons/Trash'

const AccountButton = ({src, alt, userName, userEmail}:{src:string, alt:string, userName:string, userEmail:string}) => {
  return (
    <div className='flex justify-between my-2 items-center h-auto p-2 rounded-lg hover:bg-dark/3 transition duration-200 cursor-pointer'>
        <div className='flex items-center gap-3 w-full'>
            <Image className='rounded-full object cover' src={src} width={36} height={36} alt={alt} />
        <div>
            <h2 className='text-md text-dark font-bold'>{userName}</h2>
            <p className='text-sm font-medium text-accent/65'>{userEmail}</p>
        </div>
        </div>
        <Trash size={18} color="#4E4B6E" />
    </div>
  )
}

export default AccountButton