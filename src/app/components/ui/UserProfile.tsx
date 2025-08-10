import Image from 'next/image'
import React from 'react'

const UserProfile = ( { src, alt, size }:{ src:string, alt:string, size:number } ) => {
  return (
    <div>
        <Image className='object-cover rounded-full' src={src} alt={alt} width={size} height={size} />
    </div>
  )
}

export default UserProfile