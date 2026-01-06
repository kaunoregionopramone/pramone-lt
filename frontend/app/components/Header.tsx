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
  const [isVeiklaDropdownOpen, setIsVeiklaDropdownOpen] = useState(false);
  const [isMembersDropdownOpen, setIsMembersDropdownOpen] = useState(false);
  const [isMobileAboutUsOpen, setIsMobileAboutUsOpen] = useState(false);
  const [isMobileVeiklaOpen, setIsMobileVeiklaOpen] = useState(false);
  const [isMobileMembersOpen, setIsMobileMembersOpen] = useState(false);

  const aboutUsMenuItems = [
    { href: "/apie/apie-kkpda", label: "Apie KKPDA" },
    { href: "/apie/valdymas", label: "Valdymas" },
    { href: "/apie/istorija", label: "Istorija" },
    { href: "/apie/istatai", label: "Įstatai" },
    { href: "/apie/partneriai", label: "Partneriai" },
  ];

  const veiklaMenuItems = [
    { href: "/apie/atstovavimas", label: "Atstovavimas" },
    { href: "/apie/veiklos-ataskaitos", label: "Veiklos ataskaitos" },
  ];

  const isAboutUsActive =
    pathname.startsWith("/apie") &&
    !veiklaMenuItems.some((item) => pathname === item.href);
  const isVeiklaActive = veiklaMenuItems.some((item) => pathname === item.href);
  const isNewsActive =
    pathname.startsWith("/naujienos-ir-renginiai") ||
    pathname.startsWith("/naujienos/") ||
    pathname.startsWith("/renginiai/");
  const isMembersActive = pathname.startsWith("/nariai");
  const isContactsActive = pathname.startsWith("/kontaktai");
  const isHomeActive = pathname === "/";

  const closeAllMobileDropdowns = () => {
    setIsMobileAboutUsOpen(false);
    setIsMobileVeiklaOpen(false);
    setIsMobileMembersOpen(false);
  };

  // Reset and auto-open mobile dropdowns when menu opens
  useEffect(() => {
    if (isMenuOpen) {
      closeAllMobileDropdowns();

      if (isAboutUsActive) {
        setIsMobileAboutUsOpen(true);
      } else if (isVeiklaActive) {
        setIsMobileVeiklaOpen(true);
      } else if (isMembersActive) {
        setIsMobileMembersOpen(true);
      }
    }
  }, [isMenuOpen, isAboutUsActive, isVeiklaActive, isMembersActive]);

  return (
    <header
      className="bg-white border-b border-gray-100 sticky top-0 z-50"
      style={{ "--header-height": "84px" } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Logo" width={220} height={64} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={`transition-colors ${
                isHomeActive
                  ? "text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Pradžia
            </Link>

            {/* Apie mus dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsAboutUsDropdownOpen(true)}
              onMouseLeave={() => setIsAboutUsDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 transition-colors ${
                  isAboutUsActive
                    ? "text-gray-900 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>Apie mus</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isAboutUsDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isAboutUsDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    {aboutUsMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          pathname === item.href
                            ? "text-gray-900 font-medium bg-gray-50"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Veikla dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsVeiklaDropdownOpen(true)}
              onMouseLeave={() => setIsVeiklaDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 transition-colors ${
                  isVeiklaActive
                    ? "text-gray-900 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>Veikla</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isVeiklaDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isVeiklaDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    {veiklaMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          pathname === item.href
                            ? "text-gray-900 font-medium bg-gray-50"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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
              className={`transition-colors ${
                isNewsActive
                  ? "text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Naujienos
            </Link>

            {/* Nariai dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsMembersDropdownOpen(true)}
              onMouseLeave={() => setIsMembersDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 transition-colors ${
                  isMembersActive
                    ? "text-gray-900 font-medium"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span>Nariai</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isMembersDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isMembersDropdownOpen && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <div className="w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                    <Link
                      href="/nariai/narystes-naudos"
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        pathname === "/nariai/narystes-naudos"
                          ? "text-gray-900 font-medium bg-gray-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      Narystės naudos
                    </Link>
                    <Link
                      href="/nariai"
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        pathname === "/nariai"
                          ? "text-gray-900 font-medium bg-gray-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      Nariai
                    </Link>
                    <Link
                      href="/nariai/kaip-tapti-nariu"
                      className={`block px-4 py-2.5 text-sm transition-colors ${
                        pathname === "/nariai/kaip-tapti-nariu"
                          ? "text-gray-900 font-medium bg-gray-50"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
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
              className={`transition-colors ${
                isContactsActive
                  ? "text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Kontaktai
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 top-full bg-black/20 z-40 lg:hidden"
            onClick={() => {
              setIsMenuOpen(false);
              closeAllMobileDropdowns();
            }}
          />

          {/* Menu */}
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-50 lg:hidden max-h-[calc(100vh-84px)] overflow-y-auto">
            <nav className="flex flex-col gap-1 py-4 px-6">
              <Link
                href="/"
                className={`px-4 py-3 rounded-lg transition-colors ${
                  isHomeActive
                    ? "bg-gray-50 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  closeAllMobileDropdowns();
                }}
              >
                Pradžia
              </Link>

              {/* Apie mus dropdown */}
              <div>
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isAboutUsActive
                      ? "bg-gray-50 text-gray-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
                            ? "bg-gray-50 text-gray-900 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => {
                          setIsMenuOpen(false);
                          closeAllMobileDropdowns();
                        }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Veikla dropdown */}
              <div>
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isVeiklaActive
                      ? "bg-gray-50 text-gray-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMobileVeiklaOpen(!isMobileVeiklaOpen)}
                >
                  <span>Veikla</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isMobileVeiklaOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isMobileVeiklaOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {veiklaMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                          pathname === item.href
                            ? "bg-gray-50 text-gray-900 font-medium"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        onClick={() => {
                          setIsMenuOpen(false);
                          closeAllMobileDropdowns();
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
                    ? "bg-gray-50 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  closeAllMobileDropdowns();
                }}
              >
                Naujienos
              </Link>

              {/* Nariai dropdown */}
              <div>
                <button
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    isMembersActive
                      ? "bg-gray-50 text-gray-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
                          ? "bg-gray-50 text-gray-900 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        closeAllMobileDropdowns();
                      }}
                    >
                      Narystės naudos
                    </Link>
                    <Link
                      href="/nariai"
                      className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                        pathname === "/nariai"
                          ? "bg-gray-50 text-gray-900 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        closeAllMobileDropdowns();
                      }}
                    >
                      Nariai
                    </Link>
                    <Link
                      href="/nariai/kaip-tapti-nariu"
                      className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                        pathname === "/nariai/kaip-tapti-nariu"
                          ? "bg-gray-50 text-gray-900 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        closeAllMobileDropdowns();
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
                    ? "bg-gray-50 text-gray-900 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={() => {
                  setIsMenuOpen(false);
                  closeAllMobileDropdowns();
                }}
              >
                Kontaktai
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
