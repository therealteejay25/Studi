import React from 'react'
import Logo from '../Logo'
import Dashboard from '../icons/Dashboard'
import Note from '../icons/Note'
import Session from '../icons/Session'
import Calendar from '../icons/Calendar'
import Settings from '../icons/Settings'
import Logout from '../icons/Logout'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className='w-auto p-6 justify-between items-center flex flex-col bg-white/35 h-screen fixed'>
        <Logo size={44} />
        <div className='space-y-6'>
            <div className='p-2 bg-gradient-to-r from-accent/10 to-gradientaccent/10 rounded-xl'><Link href=""><Dashboard size={32} /></Link></div>
            <div className='p-2 rounded-xl'><Link href=""><Note size={32} /></Link></div>
            <div className='p-2 rounded-xl'><Link href=""><Session size={32} /></Link></div>
            <div className='p-2 rounded-xl'><Link href=""><Calendar size={32} /></Link></div>
            <div className='p-2 rounded-xl'><Link href=""><Settings size={32} /></Link></div>
        </div>
        <div className='p-2 rounded-xl'><Link href=""><Logout size={32} /></Link></div>
    </div>
  )
}

export default Sidebar