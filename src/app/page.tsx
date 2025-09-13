import { desc, eq } from "drizzle-orm";
import db from "@/db";
import { posts, categoryEnum } from "@/db/schema";
import { PostCard } from "@/components/post-card";

type CategoryId = (typeof categoryEnum.enumValues)[number];

interface Category {
  id: CategoryId;
  title: string;
}

async function getLatestPostsByCategory(category: CategoryId, limit = 4) {
  return await db
    .select({
      id: posts.id,
      title: posts.title,
      subtitle: posts.subtitle,
      mainImage: posts.mainImage,
      category: posts.category,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .where(eq(posts.category, category))
    .orderBy(desc(posts.createdAt))
    .limit(limit);
}

export default async function HomePage() {
  const categories: Category[] = [
    { id: "suplementos_naturais", title: "Suplementos Naturais" },
    { id: "fitness_emagrecimento", title: "Fitness e Emagrecimento" },
    { id: "saude_mental_sono", title: "Saúde Mental e Sono" },
    { id: "cuidados_corpo", title: "Cuidados com o Corpo" },
    { id: "alimentacao_saudavel", title: "Alimentação Saudável" },
  ];

  const categoryPosts = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      posts: await getLatestPostsByCategory(category.id),
    }))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          Para Sua Saúde
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
          Seu guia completo para uma vida mais saudável e equilibrada
        </p>
      </section>

      <div className="space-y-16">
        {categoryPosts.map((category) => (
          <section key={category.id} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <a
                href={`/categoria/${category.id}`}
                className="text-blue-600 hover:text-blue-700"
              >
                Ver mais →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
