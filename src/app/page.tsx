import { desc, eq } from "drizzle-orm";
import { AdvertisementCard } from "@/components/advertisement-card";
import { Carousel } from "@/components/carousel";
import { CarouselItemWithText } from "@/components/carousel-item-with-text";
import { Hero } from "@/components/hero";
import { PostCard } from "@/components/post-card";
import db from "@/db";
import { advertisements, type categoryEnum, posts } from "@/db/schema";

type CategoryId = (typeof categoryEnum.enumValues)[number];

interface Category {
  id: CategoryId;
  title: string;
}

async function getLatestPosts(limit = 4) {
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
    .orderBy(desc(posts.createdAt))
    .limit(limit);
}

async function getLatestAdvertisements(limit = 4) {
  return await db
    .select({
      id: advertisements.id,
      title: advertisements.title,
      imageUrl: advertisements.imageUrl,
      productUrl: advertisements.productUrl,
    })
    .from(advertisements)
    .orderBy(desc(advertisements.createdAt))
    .limit(limit);
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

async function getAdvertisementsByCategory(category: CategoryId, limit = 4) {
  return await db
    .select({
      id: advertisements.id,
      title: advertisements.title,
      imageUrl: advertisements.imageUrl,
      productUrl: advertisements.productUrl,
    })
    .from(advertisements)
    .where(eq(advertisements.category, category))
    .orderBy(desc(advertisements.createdAt))
    .limit(limit);
}

async function getFeaturedAdvertisements(limit = 2) {
  return await db
    .select({
      id: advertisements.id,
      title: advertisements.title,
      imageUrl: advertisements.imageUrl,
      productUrl: advertisements.productUrl,
    })
    .from(advertisements)
    .where(eq(advertisements.isFeatured, true))
    .orderBy(desc(advertisements.createdAt))
    .limit(limit);
}

export default async function HomePage() {
  // Map database category values to URL slugs
  const categorySlugMap: Record<string, string> = {
    suplementos_naturais: "suplementos-naturais",
    fitness_emagrecimento: "fitness-emagrecimento",
    saude_mental_sono: "saude-mental-sono",
    cuidados_corpo: "cuidados-corpo",
    alimentacao_saudavel: "alimentacao-saudavel",
  };

  const categories: Category[] = [
    { id: "suplementos_naturais", title: "Suplementos Naturais" },
    { id: "fitness_emagrecimento", title: "Fitness e Emagrecimento" },
    { id: "cuidados_corpo", title: "Cuidados com o Corpo" },
    { id: "alimentacao_saudavel", title: "Alimentação Saudável" },
  ];

  // Get latest posts and advertisements for the carousels
  const latestPosts = await getLatestPosts(4);
  const latestAdvertisements = await getLatestAdvertisements(4);

  // Get category-specific posts and advertisements
  const categoryPosts = await Promise.all(
    categories.map(async (category) => ({
      ...category,
      posts: await getLatestPostsByCategory(category.id),
      advertisements: await getAdvertisementsByCategory(category.id, 4),
    })),
  );

  // Get featured advertisements
  const featuredAdvertisements = await getFeaturedAdvertisements(2);

  return (
    <div className="container mx-auto px-4 py-8">
      <Hero latestPosts={latestPosts} latestAdvertisements={latestAdvertisements} />

      {/* Featured advertisements */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Anúncios em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featuredAdvertisements.map((advertisement) => (
            <AdvertisementCard key={advertisement.id} advertisement={advertisement} />
          ))}
        </div>
      </section>

      <div className="space-y-16">
        {categoryPosts.map((category) => (
          <section key={category.id} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{category.title}</h2>
              <a
                href={`/categoria/${categorySlugMap[category.id]}`}
                className="text-blue-600 hover:text-blue-700"
              >
                Ver mais →
              </a>
            </div>

            {/* Category posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Category advertisements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {category.advertisements.map((advertisement) => (
                <AdvertisementCard key={advertisement.id} advertisement={advertisement} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
