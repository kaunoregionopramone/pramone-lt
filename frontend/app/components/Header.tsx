"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAboutUsDropdownOpen, setIsAboutUsDropdownOpen] = useState(false);
  const [isMembersDropdownOpen, setIsMembersDropdownOpen] = useState(false);
  const [isMobileAboutUsOpen, setIsMobileAboutUsOpen] = useState(false);
  const [isMobileMembersOpen, setIsMobileMembersOpen] = useState(false);

  const aboutUsMenuItems = [
    { href: "/apie/valdymas", label: "Valdymas" },
    { href: "/apie/istorija", label: "Istorija" },
    { href: "/apie/istatai", label: "Įstatai" },
    { href: "/apie/veikla", label: "Veikla" },
    { href: "/apie/partneriai", label: "Partneriai" },
  ];

  const isAboutUsActive = pathname.startsWith("/apie");
  const isNewsActive =
    pathname.startsWith("/naujienos-ir-renginiai") ||
    pathname.startsWith("/naujienos/");
  const isMembersActive = pathname.startsWith("/nariai");
  const isContactsActive = pathname.startsWith("/kontaktai");
  const isHomeActive = pathname === "/";

  // Reset and auto-open mobile dropdowns when menu opens
  useEffect(() => {
    if (isMenuOpen) {
      // First reset all dropdowns
      setIsMobileAboutUsOpen(false);
      setIsMobileMembersOpen(false);

      // Then open only the relevant dropdown if user is on a page in that section
      if (isAboutUsActive) {
        setIsMobileAboutUsOpen(true);
      } else if (isMembersActive) {
        setIsMobileMembersOpen(true);
      }
    }
  }, [isMenuOpen, isAboutUsActive, isMembersActive]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Logo" width={220} height={64}/>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            <Link
              href="/"
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isHomeActive
                  ? "bg-amber-50 text-amber-600 font-medium"
                  : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
              }`}
            >
              <span>Pradžia</span>
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsAboutUsDropdownOpen(true)}
              onMouseLeave={() => setIsAboutUsDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isAboutUsActive
                    ? "bg-amber-50 text-amber-600 font-medium"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                }`}
              >
                <span>Apie mus</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isAboutUsDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isAboutUsDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    {aboutUsMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-3 text-sm transition-all duration-200 ${
                          pathname === item.href
                            ? "bg-amber-50 text-amber-600 font-semibold border-l-4 border-amber-500"
                            : "text-gray-700 hover:bg-amber-50 hover:text-amber-600 hover:pl-5 border-l-4 border-transparent"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/naujienos-ir-renginiai"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isNewsActive
                  ? "bg-amber-50 text-amber-600 font-medium"
                  : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
              }`}
            >
              Naujienos ir renginiai
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setIsMembersDropdownOpen(true)}
              onMouseLeave={() => setIsMembersDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  isMembersActive
                    ? "bg-amber-50 text-amber-600 font-medium"
                    : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
                }`}
              >
                <span>Nariai</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isMembersDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isMembersDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    <Link
                      href="/nariai/narystes-naudos"
                      className={`block px-4 py-3 text-sm transition-all duration-200 ${
                        pathname === "/nariai/narystes-naudos"
                          ? "bg-amber-50 text-amber-600 font-semibold border-l-4 border-amber-500"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-600 hover:pl-5 border-l-4 border-transparent"
                      }`}
                    >
                      Narystės naudos
                    </Link>
                    <Link
                      href="/nariai"
                      className={`block px-4 py-3 text-sm transition-all duration-200 ${
                        pathname === "/nariai"
                          ? "bg-amber-50 text-amber-600 font-semibold border-l-4 border-amber-500"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-600 hover:pl-5 border-l-4 border-transparent"
                      }`}
                    >
                      Nariai
                    </Link>
                    <Link
                      href="/nariai/kaip-tapti-nariu"
                      className={`block px-4 py-3 text-sm transition-all duration-200 ${
                        pathname === "/nariai/kaip-tapti-nariu"
                          ? "bg-amber-50 text-amber-600 font-semibold border-l-4 border-amber-500"
                          : "text-gray-700 hover:bg-amber-50 hover:text-amber-600 hover:pl-5 border-l-4 border-transparent"
                      }`}
                    >
                      Kaip tapti nariu?
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/kontaktai"
              className={`px-4 py-2 rounded-lg transition-colors ${
                isContactsActive
                  ? "bg-amber-50 text-amber-600 font-medium"
                  : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"
              }`}
            >
              Kontaktai
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-x-0 top-20 bottom-0 bg-black/20 z-40 lg:hidden"
              onClick={() => {
                setIsMenuOpen(false);
                setIsMobileAboutUsOpen(false);
                setIsMobileMembersOpen(false);
              }}
            />

            {/* Menu */}
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-50 lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
              <nav className="flex flex-col gap-1 py-4 px-4">
                <Link
                  href="/"
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isHomeActive
                      ? "bg-amber-50 text-amber-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsMobileAboutUsOpen(false);
                    setIsMobileMembersOpen(false);
                  }}
                >
                  Pradžia
                </Link>

                {/* Apie mus dropdown */}
                <div>
                  <button
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      isAboutUsActive
                        ? "bg-amber-50 text-amber-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileAboutUsOpen(!isMobileAboutUsOpen)}
                  >
                    <span>Apie mus</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isMobileAboutUsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isMobileAboutUsOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {aboutUsMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                            pathname === item.href
                              ? "bg-amber-50 text-amber-600 font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                          onClick={() => {
                            setIsMenuOpen(false);
                            setIsMobileAboutUsOpen(false);
                            setIsMobileMembersOpen(false);
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href="/naujienos-ir-renginiai"
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isNewsActive
                      ? "bg-amber-50 text-amber-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsMobileAboutUsOpen(false);
                    setIsMobileMembersOpen(false);
                  }}
                >
                  Naujienos ir renginiai
                </Link>

                {/* Nariai dropdown */}
                <div>
                  <button
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                      isMembersActive
                        ? "bg-amber-50 text-amber-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMobileMembersOpen(!isMobileMembersOpen)}
                  >
                    <span>Nariai</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${isMobileMembersOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isMobileMembersOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      <Link
                        href="/nariai/narystes-naudos"
                        className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                          pathname === "/nariai/narystes-naudos"
                            ? "bg-amber-50 text-amber-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMobileAboutUsOpen(false);
                          setIsMobileMembersOpen(false);
                        }}
                      >
                        Narystės naudos
                      </Link>
                      <Link
                        href="/nariai"
                        className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                          pathname === "/nariai"
                            ? "bg-amber-50 text-amber-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMobileAboutUsOpen(false);
                          setIsMobileMembersOpen(false);
                        }}
                      >
                        Nariai
                      </Link>
                      <Link
                        href="/nariai/kaip-tapti-nariu"
                        className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                          pathname === "/nariai/kaip-tapti-nariu"
                            ? "bg-amber-50 text-amber-600 font-medium"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsMobileAboutUsOpen(false);
                          setIsMobileMembersOpen(false);
                        }}
                      >
                        Kaip tapti nariu?
                      </Link>
                    </div>
                  )}
                </div>

                <Link
                  href="/kontaktai"
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isContactsActive
                      ? "bg-amber-50 text-amber-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsMobileAboutUsOpen(false);
                    setIsMobileMembersOpen(false);
                  }}
                >
                  Kontaktai
                </Link>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
