"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-primary">
            SciCollab
          </Link>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          <ul
            className={`md:flex md:items-center md:space-x-4 ${isMenuOpen ? "block" : "hidden"} absolute md:relative top-16 left-0 right-0 bg-white md:top-0 p-4 md:p-0 shadow-md md:shadow-none z-10`}
          >
            <li>
              <Link href="/" className="block py-2 md:py-0 text-gray-600 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="block py-2 md:py-0 text-gray-600 hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/publications" className="block py-2 md:py-0 text-gray-600 hover:text-primary">
                Publications
              </Link>
            </li>
            <li>
              <Link href="/news" className="block py-2 md:py-0 text-gray-600 hover:text-primary">
                News
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 md:py-0 text-gray-600 hover:text-primary">
                Contact
              </Link>
            </li>
            <li className="mt-4 md:mt-0">
              <Button variant="outline">Login</Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

