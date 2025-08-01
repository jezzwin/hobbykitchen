"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.classList.toggle("nav-active")
  }

  const handleLinkClick = () => {
    if (isMenuOpen) {
      toggleMenu()
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-30 transition-all duration-300 ${
          isScrolled ? "bg-primary-purple py-3" : "bg-transparent py-6"
        } ${isHidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="container mx-auto flex items-center justify-between px-px pl-0 pr-0">
          <a href="#" className="flex items-center flex-row shadow-none ml-2.5">
            <Image
              src="/logo-white.png"
              alt="Hobby Kitchen Logo"
              width={400}
              height={120}
              className={`w-auto transition-all duration-300 ${isScrolled ? "h-16" : "h-28"}`}
              priority
            />
          </a>

          <nav
            className={`fixed top-0 left-0 h-full w-80 bg-primary-dark transform transition-transform duration-500 z-50 ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } md:static md:transform-none md:bg-transparent md:w-auto md:h-auto`}
          >
            <button
              onClick={toggleMenu}
              className="absolute top-8 right-8 text-white border border-white rounded-full p-1 md:hidden hover:text-gold hover:border-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="pt-20 px-8 md:pt-0 md:px-0 bg-primary-purple sm:bg-transparent h-screen sm:h-auto">
              <a href="#" className="block mb-16 md:hidden">
                <Image
                  src="/logo-white.png"
                  alt="Hobby Kitchen Logo"
                  width={220}
                  height={75}
                  className="h-24 w-auto mx-auto"
                />
              </a>

              <ul className="space-y-4 md:flex md:space-y-0 md:space-x-8 md:items-center font-light text-sm">
                <li>
                  <a
                    href="#home"
                    onClick={handleLinkClick}
                    className="block py-2 hover-underline text-gold md:text-white uppercase tracking-wider font-bold active"
                  >
                    <div className="separator inline-block mr-2 md:hidden"></div>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#menu"
                    onClick={handleLinkClick}
                    className="block py-2 hover-underline text-white uppercase tracking-wider font-bold"
                  >
                    <div className="separator inline-block mr-2 md:hidden"></div>
                    <span>Menus</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={handleLinkClick}
                    className="block py-2 hover-underline text-white uppercase tracking-wider font-bold"
                  >
                    <div className="separator inline-block mr-2 md:hidden"></div>
                    <span>About Us</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={handleLinkClick}
                    className="block py-2 hover-underline text-white uppercase tracking-wider font-bold"
                  >
                    <div className="separator inline-block mr-2 md:hidden"></div>
                    <span>Contact</span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <button onClick={toggleMenu} className="md:hidden p-3 mr-2.5">
            <div className="space-y-1">
              <span className="block w-8 h-0.5 bg-white transition-transform duration-300"></span>
              <span className="block w-8 h-0.5 bg-white transition-transform duration-300"></span>
              <span className="block w-8 h-0.5 bg-white transition-transform duration-300"></span>
            </div>
          </button>
        </div>
      </header>
    </>
  )
}
