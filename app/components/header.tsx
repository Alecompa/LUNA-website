"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { ModeToggle } from "@/components/ui/dark-mode-toggle"
import { useTheme } from "next-themes"

export default function Header() {

  const { setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="background shadow-sm top-0 left-0 w-full z-30">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
            <Link href="/">
              <Image src={useTheme().resolvedTheme === "dark" ? "/logo_v5h_dark.png" : "/logo_v5h.png"} alt="LUNA" width={100} height={20} />
            </Link>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          <ul
            className={`md:flex md:items-center md:space-x-4 ${isMenuOpen ? "block bg-white dark:bg-black/90" : "hidden"} absolute md:relative top-16 left-0 right-0 md:top-0 p-4 md:p-0 shadow-md md:shadow-none z-30`}
          >
            <li>
              <Link href="/" className="block py-2 md:py-0 primary hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="block py-2 md:py-0 primary hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/publications" className="block py-2 md:py-0 primary hover:text-primary">
                Publications
              </Link>
            </li>
            <li>
              <Link href="/news" className="block py-2 md:py-0 primary hover:text-primary">
                News
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 md:py-0 primary hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              < ModeToggle />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

