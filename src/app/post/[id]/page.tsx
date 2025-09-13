import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import db from "@/db";
import { posts, users } from "@/db/schema";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

interface PostPageProps {
  params: Promise<{
    id: string;
  }>;
}

const categoryTitles: Record<string, string> = {
  suplementos_naturais: "Suplementos Naturais",
  fitness_emagrecimento: "Fitness e Emagrecimento",
  saude_mental_sono: "Saúde Mental e Sono",
  cuidados_corpo: "Cuidados com o Corpo",
  alimentacao_saudavel: "Alimentação Saudável",
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await db
    .select({
      id: posts.id,
      title: posts.title,
      subtitle: posts.subtitle,
      content: posts.content,
      mainImage: posts.mainImage,
      image2: posts.image2,
      image3: posts.image3,
      image4: posts.image4,
      category: posts.category,
      createdAt: posts.createdAt,
      authorName: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.id, parseInt(id)))
    .then((res) => res[0]);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        {post.subtitle && (
          <p className="text-xl text-gray-600 mb-4">{post.subtitle}</p>
        )}
        <div className="flex items-center text-gray-500 text-sm mb-8">
          <span>{formatDate(post.createdAt)}</span>
          <span className="mx-2">•</span>
          <span>{categoryTitles[post.category]}</span>
          {post.authorName && (
            <>
              <span className="mx-2">•</span>
              <span>Por {post.authorName}</span>
            </>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        {post.mainImage && (
          <div className="relative aspect-[16/9] mb-8">
            <Image
              src={post.mainImage}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          {post.content.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {(post.image2 || post.image3 || post.image4) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[post.image2, post.image3, post.image4]
              .filter(Boolean)
              .map((image, index) => (
                <div key={index} className="relative aspect-[4/3]">
                  <Image
                    src={image!}
                    alt={`Imagem adicional ${index + 2}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </article>
  );
}
