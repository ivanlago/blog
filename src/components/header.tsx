"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Sheet from "@/components/ui/sheet";
import { menuColors } from "@/styles/colors";
import { useSession } from "next-auth/react";
import "@/styles/menu.css";
import Image from "next/image";

const menuItems = [
  {
    name: "Suplementos Naturais",
    href: "/categoria/suplementos-naturais",
    color: menuColors.suplementos.main,
    bgHover: menuColors.suplementos.light,
  },
  {
    name: "Fitness e Emagrecimento",
    href: "/categoria/fitness-emagrecimento",
    color: menuColors.fitness.main,
    bgHover: menuColors.fitness.light,
  },
  {
    name: "Cuidados com o Corpo",
    href: "/categoria/cuidados-corpo",
    color: menuColors.cuidadosCorpo.main,
    bgHover: menuColors.cuidadosCorpo.light,
  },
  {
    name: "Alimentação Saudável",
    href: "/categoria/alimentacao-saudavel",
    color: menuColors.alimentacao.main,
    bgHover: menuColors.alimentacao.light,
  },
];

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="w-full max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="flex h-20 items-center justify-between relative">
          <Link
            href="/"
            // className="text-3xl font-bold tracking-tight hover:opacity-90 transition-opacity"
          >
            <Image
              src="/logo.png" // Replace with your logo image path
              alt="Logo"
              width={150}
              height={150}
              className="mr-10 py-2"
            />
          </Link>

          <div className="flex flex-col">
            <p className="text-gray-500 text-sm whitespace-nowrap mr-10">
              Seu guia completo para uma vida mais
            </p>
            <p className="text-gray-500 text-sm">saudável e equilibrada</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-semibold py-7 group"
                style={{ color: item.color }}
              >
                {/* Fix: Add type="button" to satisfy Biome requirements */}
                <button
                  type="button"
                  className="block px-2 py-2 rounded-sm transition-colors duration-200 border-none bg-transparent cursor-pointer"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = item.bgHover;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  {item.name}
                </button>
                <div
                  className="absolute bottom-4 left-1/2 w-[calc(100%-2rem)] h-[8px] -translate-x-1/2"
                  style={{ backgroundColor: item.color }}
                ></div>
              </Link>
            ))}
            <div className="h-4 w-px bg-gray-200" />
            <Link href="/sobre" className="relative text-sm font-semibold text-gray-600 py-7 group">
              {/* Fix: Add type="button" to satisfy Biome requirements */}
              <button
                type="button"
                className="block px-4 py-4 rounded-sm transition-colors duration-200 border-none bg-transparent cursor-pointer"
                style={{ backgroundColor: "transparent" }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = menuColors.outros.light;
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                Sobre
              </button>
              <div className="absolute bottom-4 left-1/2 w-[calc(100%-2rem)] h-[8px] -translate-x-1/2 bg-gray-400"></div>
            </Link>
            {session ? (
              <Link
                href="/admin"
                className="relative text-sm font-semibold text-gray-600 py-7 group"
              >
                {/* Fix: Add type="button" to satisfy Biome requirements */}
                <button
                  type="button"
                  className="block px-4 py-4 rounded-sm transition-colors duration-200 border-none bg-transparent cursor-pointer"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = menuColors.outros.light;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  Admin
                </button>
                <div className="absolute bottom-4 left-1/2 w-[calc(100%-2rem)] h-[8px] -translate-x-1/2 bg-gray-400"></div>
              </Link>
            ) : (
              <Link
                href="/login"
                className="relative text-sm font-semibold text-gray-600 py-7 group"
              >
                {/* Fix: Add type="button" to satisfy Biome requirements */}
                <button
                  type="button"
                  className="block px-4 py-4 rounded-sm transition-colors duration-200 border-none bg-transparent cursor-pointer"
                  style={{ backgroundColor: "transparent" }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = menuColors.outros.light;
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = "transparent";
                  }}
                >
                  Acesso
                </button>
                <div className="absolute bottom-4 left-1/2 w-[calc(100%-2rem)] h-[8px] -translate-x-1/2 bg-gray-400"></div>
              </Link>
            )}
          </nav>

          {/* Sombra do header */}
          <div
            className="absolute left-0 right-0 bottom-0 translate-y-full h-[20px] pointer-events-none"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0) 100%)",
            }}
          ></div>

          {/* Mobile Navigation */}
          <Sheet.Sheet>
            <Sheet.SheetTitle></Sheet.SheetTitle>
            <Sheet.SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </Sheet.SheetTrigger>
            <Sheet.SheetContent side="right" className="pl-5 pt-5">
              <nav className="flex flex-col space-y-5">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative text-lg font-semibold pl-3 border-l-[3px] transition-colors"
                    style={
                      {
                        color: item.color,
                        borderColor: item.color,
                        ":hover": {
                          backgroundColor: item.bgHover,
                        },
                      } as React.CSSProperties
                    }
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="h-px w-full bg-gray-200" />
                <Link
                  href="/sobre"
                  className="relative text-lg font-semibold text-gray-600 pl-3 border-l-[3px] border-gray-600 hover:bg-[#75757515] transition-colors"
                >
                  Sobre
                </Link>
                {session ? (
                  <Link
                    href="/admin"
                    className="relative text-lg font-semibold text-gray-600 pl-3 border-l-[3px] border-gray-600 hover:bg-[#75757515] transition-colors"
                  >
                    Admin
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="relative text-lg font-semibold text-gray-600 pl-3 border-l-[3px] border-gray-600 hover:bg-[#75757515] transition-colors"
                  >
                    Acesso
                  </Link>
                )}
              </nav>
            </Sheet.SheetContent>
          </Sheet.Sheet>
        </div>
      </div>
    </header>
  );
}
