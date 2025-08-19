"use client";

import Link from "next/link";

export default function NavLinks({ onClick }: { onClick?: () => void }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="hover:text-[#ffe0b2] block md:inline"
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
