import Link from "next/link";

const menuItems = [
  { name: "Suplementos Naturais", href: "/categoria/suplementos-naturais" },
  { name: "Fitness e Emagrecimento", href: "/categoria/fitness-emagrecimento" },
  { name: "Saúde Mental e Sono", href: "/categoria/saude-mental-sono" },
  { name: "Cuidados com o Corpo", href: "/categoria/cuidados-corpo" },
  { name: "Alimentação Saudável", href: "/categoria/alimentacao-saudavel" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Para Sua Saúde
            </h2>
            <p className="text-gray-600">
              Seu guia completo para uma vida mais saudável e equilibrada.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Categorias
            </h2>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Links</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-privacidade"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos-uso"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} Para Sua Saúde. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
