import React from 'react'
import Image from 'next/image'

function Logo() {
    return (
        <Image src="/info.png" width={100} height={100} alt='Università degli Studi di Padova' />
    )
}

export default Logo