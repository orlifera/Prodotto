'use client'

import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import Toggle from '@/components/ui/Toggle'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SquareArrowOutUpRight } from 'lucide-react'
import Avatar from '@/components/Avatar'

/**
 * Navbar component
 * 
 * @returns {JSX.Element} Navbar component
 */

function Navbar() {

    const [width, setWidth] = useState<number>(0); // Iniziamo con valore 0 (indefinito)
    const [isMounted, setIsMounted] = useState<boolean>(false); // Stato per verificare se il componente è montato

    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    useEffect(() => {
        // Funzione che aggiorna la larghezza
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        // Aggiungiamo un listener per il resize
        window.addEventListener("resize", handleResize);

        // Impostiamo la larghezza iniziale subito dopo il montaggio del componente
        handleResize();

        // Iniziamo la fase di montaggio
        setIsMounted(true);

        // Cleanup del listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Se il componente non è ancora montato, non renderizzare nulla
    if (!isMounted) {
        return null; // O puoi mettere un caricamento
    }

    return (
        width > 768 ?
            (<nav className='bg-primary mx-2 mt-2 rounded-t-lg shadow-md shadow-primary/40 flex items-center justify-between p-2' >
                <div id="start" aria-hidden className='sr-only'>start</div>

                <div aria-label="Logo UniPD" className='w-[10em] h-full flex items-start justify-center p-2'>
                    <Logo />
                </div>
                <div className='flex items-center m-4 gap-8'>
                    <ul className='flex items-center text-white'>
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
                            <Link href='https://www.unipd.it/offerta-didattica/corso-di-laurea/scienze?tipo=L&scuola=SC&ordinamento=2025&key=SC2987&cg=scienze' target='_blank' className="flex w-full h-full p-3 rounded-md transition ">
                                Il corso
                                <SquareArrowOutUpRight className='items-center justify-center h-4 w-4' />
                            </Link>
                        </li>
                        <li>
                            <Avatar />
                        </li>
                    </ul>
                    <Toggle />
                </div>
            </nav>) :
            (
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
                        <li >
                            <Link href='https://www.unipd.it/offerta-didattica/corso-di-laurea/scienze?tipo=L&scuola=SC&ordinamento=2025&key=SC2987&cg=scienze' target='_blank' className="flex w-full h-full p-3 rounded-md transition ">
                                Il corso
                                <SquareArrowOutUpRight className='items-center justify-center h-4 w-4' />
                            </Link>
                        </li>
                    </ul>

                </nav >
            )
    )
}

export default Navbar
