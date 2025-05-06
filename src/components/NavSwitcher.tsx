"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import MobileNav from '@/components/MobileNav';

function NavSwitcher() {
    const [width, setWidth] = useState(0); // valore iniziale sicuro per SSR

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        // inizializza lo stato al montaggio
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full h-full'>
                {width > 768 ? (
                    <Navbar />
                ) : (
                    <MobileNav />
                )}
            </div>
        </div>
    )
}

export default NavSwitcher;
