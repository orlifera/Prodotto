"use client"

import React, { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import MobileNav from '@/components/MobileNav';

/**
 * 
 * @returns {JSX.Element} NavSwitcher component
 */

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

        width > 768 ? (
            <Navbar />
        ) : (
            <MobileNav />
        )

    )
}

export default NavSwitcher;
