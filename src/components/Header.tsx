import React from 'react'
import Logo from '@/components/Logo'

/**
 * Header component
 *
 * @returns {JSX.Element} Header component
 */

function Header() {
    return (
        <header aria-roledescription='header' aria-label='header' className='flex items-center justify-center w-full h-24 bg-primary shadow-md p-8'>
            <h1> <Logo /></h1>
        </header>
    )
}

export default Header