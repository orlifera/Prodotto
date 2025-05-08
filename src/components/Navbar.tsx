'use client'

import React from 'react'
import Logo from './Logo'
import Toggle from '@/components/ui/Toggle'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SquareArrowOutUpRight } from 'lucide-react'

/**
 * Navbar component
 * 
 * @returns {JSX.Element} Navbar component
 */

function Navbar() {
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    return (
        <nav className='bg-primary m-2 rounded-lg flex items-center justify-between p-2'>
            <div id="start" aria-hidden className='sr-only'>start</div>

            <div aria-label="Logo UniPD" className='w-[10em] h-full flex items-start justify-center p-2'>
                <Logo />
            </div>
            <div className='flex items-center m-4 gap-8'>
                <ul className='flex text-white'>
                    <li>
                        <Link
                            href="/"
                            className={`flex w-full h-full p-3 rounded-md transition ${isActive('/') ? 'bg-white text-primary font-bold' : ''
                                }`}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/lettori"
                            className={`flex w-full h-full p-3 rounded-md transition ${isActive('/lettori') ? 'bg-white text-primary font-bold' : ''
                                }`}
                        >
                            Problema dei lettori
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/filosofi"
                            className={`flex w-full h-full p-3 rounded-md transition ${isActive('/filosofi') ? 'bg-white text-primary font-bold' : ''
                                }`}
                        >
                            Problema dei filosofi
                        </Link>
                    </li>

                    <li >
                        <Link href='https://www.unipd.it/offerta-didattica/corso-di-laurea/scienze?tipo=L&scuola=SC&ordinamento=2025&key=SC2987&cg=scienze' target='_blank' className={`flex w-full h-full p-3 rounded-md transition ${isActive('/about') ? 'bg-white text-primary font-bold' : ''
                            }`}>
                            About
                            <SquareArrowOutUpRight className='items-center justify-center h-4 w-4' />
                        </Link>
                    </li>
                </ul>
                <Toggle />
            </div>
        </nav >
    )
}

export default Navbar
