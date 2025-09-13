import { desc, eq } from "drizzle-orm";
import db from "@/db";
import { posts, categoryEnum } from "@/db/schema";
import { PostCard } from "@/components/post-card";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const categoryTitles: Record<string, string> = {
  "suplementos-naturais": "Suplementos Naturais",
  "fitness-emagrecimento": "Fitness e Emagrecimento",
  "saude-mental-sono": "Saúde Mental e Sono",
  "cuidados-corpo": "Cuidados com o Corpo",
  "alimentacao-saudavel": "Alimentação Saudável",
};

const categoryMappings: Record<
  string,
  (typeof categoryEnum.enumValues)[number]
> = {
  "suplementos-naturais": "suplementos_naturais",
  "fitness-emagrecimento": "fitness_emagrecimento",
  "saude-mental-sono": "saude_mental_sono",
  "cuidados-corpo": "cuidados_corpo",
  "alimentacao-saudavel": "alimentacao_saudavel",
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoryMappings[slug];
  const title = categoryTitles[slug];

  if (!category || !title) {
    notFound();
  }

  const categoryPosts = await db
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
    .orderBy(desc(posts.createdAt));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoryPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(categoryMappings).map((slug) => ({
    slug,
  }));
}
