'use client'

import React from 'react'
import Logo from './Logo'
import Toggle from '@/components/ui/Toggle'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Navbar() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <nav className='bg-primary m-2 rounded-lg flex items-center justify-between p-2'>
            <div aria-label="Logo UniPD" className='w-[10em] h-full flex items-start justify-center p-2'>
                <Logo />
            </div>
            <div className='flex items-center gap-8'>
                <ul className='flex items-center justify-center gap-4 text-white'>
                    <li>
                        <Link
                            href="/"
                            className={`w-full h-full p-3 rounded-md transition ${isActive('/') ? 'bg-white text-primary font-bold' : ''
                                }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/lettori"
                            className={`w-full h-full p-3 rounded-md transition ${isActive('/lettori') ? 'bg-white text-primary font-bold' : ''
                                }`}
                        >
                            Problema dei lettori
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/filosofi"
                            className={`w-full h-full p-3 rounded-md transition ${isActive('/filosofi') ? 'bg-white text-primary font-bold' : ''
                                }`}
                        >
                            Problema dei filosofi
                        </Link>
                    </li>
                </ul>
                <Toggle />
            </div>
        </nav>
    )
}

export default Navbar
