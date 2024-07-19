'use client'
import { IoIosArrowDown } from "react-icons/io";
import React from 'react'
import { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { IoMenu } from 'react-icons/io5'
const navBtnStyle = `bg-whiteBg sm:text-navClamp hover:text-accent text-lg px-2 py-2 md:p-1 bg-whiteBg mt-1 font-mono transition duration-300 md:px-2 p-1 w-[85%] md:w-[100%] text-gray-800`
const liStyles = `sm:text-navClamp text-2xl bg-whiteBg whitespace-nowrap block flex justify-center items-center my-2 md:m:0 'w-[90%] md:max-w-[150px] text-lg sm:text-navClamp rounded`

export function Navbar({ }) {
    const [nav, setNav] = useState(false)

    return (
        <nav
            className={`bg-whiteBg font-light flex justify-center items-center fixed w-full z-50 top-0 start-0 shadow-xl`}
        >
            <div
                className={`relative max-w-[1400px] z-50 flex justify-center items-center w-[95%] min-h-[60px] ${nav ? 'flex justify-center items-center flex-col' : ''
                    } pt-1 md:py-1`}
            >

                <h3 className="mr-auto font-bold text-2xl italic">KA</h3>
                {/* <img
                    // src={logo}
                    className="absolute top-[5px] md:top-[5%] left-[0%] h-[60px] object-cover"
                /> */}
                <button
                    onClick={() => setNav(!nav)}
                    className={` absolute ${nav ? 'top-[8px]' : 'top-[50%] translate-y-[-50%]'} right-0 md:hidden text-black`}
                >
                    {nav ? <IoMdClose size={40} /> : <IoMenu size={40} />}
                </button>

                <ul
                    className={`flex flex-col ${nav ? 'h-[100vh] pl-[10%] py-[40%]' : 'md:flex hidden'} w-[100%] transition duration-350 py-0 md:flex-row mx-auto sm:mb-0 mb-10 md:justify-end md:gap-4 justify-start md:items-start items-start rounded-lg `}
                >
                    <li className={liStyles}>
                        <a href="/">
                            <button
                                onClick={() => setNav(false)}
                                className={`${navBtnStyle}`}
                            >
                                Home
                            </button>
                        </a>
                    </li>
                    <li className={liStyles}>
                        <a href="/uploads">
                            <button
                                onClick={() => setNav(false)}
                                className={`${navBtnStyle} `}
                            >
                                My Photos
                            </button>
                        </a>
                    </li>
                    <li className={liStyles}>
                        <a href="/about">
                            <button
                                onClick={() => setNav(false)}
                                className={`${navBtnStyle} `}
                            >
                                Contact Us
                            </button>
                        </a>
                    </li>

                </ul>
            </div>
        </nav>

    )
}