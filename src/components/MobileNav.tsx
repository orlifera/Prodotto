import Link from 'next/link'
import React from 'react'
import Toggle from '@/components/ui/Toggle'
import { usePathname } from 'next/navigation'

/**
 * MobileNav component
 *
 * @returns {JSX.Element} MobileNav component
 */

function MobileNav() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path


    return (
        <nav aria-roledescription='navbar' aria-label='nav bar' className='text-white flex items-center justify-between p-4 fixed bottom-0 w-full bg-primary'>
            <ul aria-label='nav list' className='w-full flex items-center justify-between text-center'>
                <li aria-label='nav item'>
                    <Link href='/' className={`w-full h-full p-3 rounded-md transition ${isActive('/') ? 'bg-white text-primary font-bold' : ''
                        }`}>
                        Home
                    </Link>
                </li>
                <li aria-label='nav item'>
                    <Link href='/lettori' className={`w-full h-full p-3 rounded-md transition ${isActive('/lettori') ? 'bg-white text-primary font-bold' : ''
                        }`}>
                        Lettori
                    </Link>
                </li>
                <li aria-label='nav item' className='text-black'>
                    <Toggle />
                </li>
                <li aria-label='nav item' >
                    <Link href='/filosofi' className={`w-full h-full p-3 rounded-md transition ${isActive('/filosofi') ? 'bg-white text-primary font-bold' : ''
                        }`}>
                        Filosofi
                    </Link>
                </li>
                <li aria-label='nav-item'>
                    <Link href='https://www.unipd.it/offerta-didattica/corso-di-laurea/scienze?tipo=L&scuola=SC&ordinamento=2025&key=SC2987&cg=scienze' target='_blank' className={`w-full h-full p-3 rounded-md transition ${isActive('/about') ? 'bg-white text-primary font-bold' : ''
                        }`}>
                        About
                    </Link>
                </li>
            </ul>


        </nav >
    )
}

export default MobileNav