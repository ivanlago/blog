import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  const themes = [
    {
      id: "suplementos-naturais",
      title: "Suplementos Naturais",
      description:
        "Descubra os benefícios dos suplementos naturais para complementar sua saúde e bem-estar. Desde vitaminas essenciais até extratos herbais poderosos, exploramos opções naturais para apoiar seu corpo.",
    },
    {
      id: "fitness-emagrecimento",
      title: "Fitness e Emagrecimento",
      description:
        "Encontre estratégias eficazes de exercícios e perda de peso que promovem não apenas resultados estéticos, mas também melhorias na saúde geral e qualidade de vida.",
    },
    {
      id: "cuidados-corpo",
      title: "Cuidados com o Corpo",
      description:
        "Aprenda sobre práticas de autocuidado e rotinas que nutrem sua pele, cabelos e corpo. Dicas de produtos naturais e técnicas para manter seu corpo saudável e radiante.",
    },
    {
      id: "alimentacao-saudavel",
      title: "Alimentação Saudável",
      description:
        "Explore receitas nutritivas, dicas de nutrição e hábitos alimentares que fortalecem seu corpo e mente. Descubra como comer bem pode transformar sua energia e disposição.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Sobre Nosso Site</h1>

        <div className="mb-12">
          <p className="text-lg mb-6">
            Bem-vindo ao seu guia completo para uma vida mais saudável e equilibrada. Nosso objetivo
            é fornecer informações confiáveis e práticas sobre bem-estar, nutrição, fitness e
            autocuidado.
          </p>
          <p className="text-lg mb-6">
            Acreditamos que a saúde é um equilíbrio entre corpo e mente, e nossa missão é ajudá-lo a
            encontrar esse equilíbrio através de abordagens naturais e sustentáveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Nossa Missão</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Promover um estilo de vida saudável através de conteúdos baseados em evidências,
                ajudando nossos leitores a tomar decisões informadas sobre sua saúde e bem-estar.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Nossos Valores</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Autenticidade, qualidade, transparência e compromisso com a saúde holística.
                Priorizamos soluções naturais e sustentáveis que respeitam o corpo humano e o meio
                ambiente.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Temas Principais</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {themes.map((theme) => (
              <Card key={theme.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{theme.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{theme.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg">
            Junte-se a nós nesta jornada para uma vida mais saudável, equilibrada e plena.
          </p>
        </div>
      </div>
    </div>
  );
}
