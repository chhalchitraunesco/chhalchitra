import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function LogoHome() {
    return (
        <div>
            <Link href={'/'} className="text-3xl font-bold text-white">
                <Image
                    src="/logo.png"
                    alt="Image"
                    width={30}
                    height={30}
                    className="absolute top-5 left-5"
                />
            </Link>
        </div>
    )
}

export default LogoHome