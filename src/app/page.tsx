import { desc, eq } from "drizzle-orm";
import db from "@/db";
import { posts, advertisements, categoryEnum } from "@/db/schema";
import { PostCard } from "@/components/post-card";
import { AdvertisementCard } from "@/components/advertisement-card";
import { Carousel } from "@/components/carousel";

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
    }))
  );

  // Get featured advertisements
  const featuredAdvertisements = await getFeaturedAdvertisements(2);

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

      {/* Carousels for latest posts and advertisements in a single row */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Carousel for latest posts - 2/3 width */}
          <div className="w-full md:w-2/3">
            <Carousel
              title="Últimas Postagens"
              autoPlay={true}
              autoPlayInterval={7000}
            >
              {latestPosts.map((post) => (
                <div key={post.id} className="p-4 flex flex-col h-full">
                  <div className="flex-grow">
                    <PostCard post={post} />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Carousel for latest advertisements - 1/3 width */}
          <div className="w-full md:w-1/3">
            <Carousel
              title="Últimos Anúncios"
              autoPlay={true}
              autoPlayInterval={7000}
            >
              {latestAdvertisements.map((advertisement) => (
                <div
                  key={advertisement.id}
                  className="p-4 flex flex-col h-full"
                >
                  <div className="flex-grow">
                    <AdvertisementCard advertisement={advertisement} />
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Featured advertisements */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Anúncios em Destaque</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {featuredAdvertisements.map((advertisement) => (
            <AdvertisementCard
              key={advertisement.id}
              advertisement={advertisement}
            />
          ))}
        </div>
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

            {/* Category posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Category advertisements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {category.advertisements.map((advertisement) => (
                <AdvertisementCard
                  key={advertisement.id}
                  advertisement={advertisement}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
