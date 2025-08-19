"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./nav-links";
import UserAvatarMenu from "./user-avatar-menu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-[#3e2723] text-white sticky top-0 z-50">
            <div className="container flex items-center justify-between p-4">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-wide">
                    Kindi<span className="text-[#ffe0b2]">Coffee</span>
                </Link>

                {/* Desktop Nav */}
                    <div className="md:space-x-5 md:block hidden">
                        <NavLinks />
                    </div>
                    <div className="md:block hidden">
                        <UserAvatarMenu/>
                    </div>
                {/* Mobile Toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle Menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-[#4e342e] p-4 space-y-4">
                    <NavLinks onClick={() => setIsOpen(false)} />
                    <UserAvatarMenu />
                </div>
            )}
        </header>
    );
}
