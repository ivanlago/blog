import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Sheet from "@/components/ui/sheet";
// Removido headers não utilizado
import { config } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

const menuItems = [
  { name: "Suplementos Naturais", href: "/categoria/suplementos-naturais" },
  { name: "Fitness e Emagrecimento", href: "/categoria/fitness-emagrecimento" },
  { name: "Saúde Mental e Sono", href: "/categoria/saude-mental-sono" },
  { name: "Cuidados com o Corpo", href: "/categoria/cuidados-corpo" },
  { name: "Alimentação Saudável", href: "/categoria/alimentacao-saudavel" },
];

export async function Header() {
  const session = await getServerSession(config);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Para Sua Saúde
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                {item.name}
              </Link>
            ))}
            <div className="h-4 w-px bg-gray-200" />
            <Link
              href="/sobre"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Sobre
            </Link>
            {session ? (
              <Link
                href="/admin"
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Admin
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Acesso
              </Link>
            )}
          </nav>

          {/* Mobile Navigation */}
          <Sheet.Sheet>
            <Sheet.SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </Sheet.SheetTrigger>
            <Sheet.SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="h-px w-full bg-gray-200" />
                <Link
                  href="/sobre"
                  className="text-lg font-medium text-gray-500 hover:text-gray-700"
                >
                  Sobre
                </Link>
                {session ? (
                  <Link
                    href="/admin"
                    className="text-lg font-medium text-gray-500 hover:text-gray-700"
                  >
                    Admin
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="text-lg font-medium text-gray-500 hover:text-gray-700"
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
