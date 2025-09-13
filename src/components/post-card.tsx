import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: {
    id: number;
    title: string;
    subtitle?: string | null;
    mainImage?: string | null;
    category: string;
    createdAt: Date;
  };
  priority?: boolean;
}

export function PostCard({ post, priority = false }: PostCardProps) {
  const categoryMap: Record<string, string> = {
    suplementos_naturais: "Suplementos Naturais",
    fitness_emagrecimento: "Fitness e Emagrecimento",
    saude_mental_sono: "Saúde Mental e Sono",
    cuidados_corpo: "Cuidados com o Corpo",
    alimentacao_saudavel: "Alimentação Saudável",
  };

  return (
    <article className="group relative flex flex-col space-y-2">
      <Link
        href={`/post/${post.id}`}
        className="relative aspect-[16/9] overflow-hidden rounded-lg"
      >
        {post.mainImage ? (
          <Image
            src={post.mainImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Sem imagem</span>
          </div>
        )}
      </Link>
      <div className="flex flex-col space-y-1">
        <Link
          href={`/categoria/${post.category}`}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          {categoryMap[post.category]}
        </Link>
        <Link
          href={`/post/${post.id}`}
          className="space-y-1 group-hover:text-blue-600"
        >
          <h2 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight">
            {post.title}
          </h2>
          {post.subtitle && (
            <p className="line-clamp-2 text-sm text-gray-600">
              {post.subtitle}
            </p>
          )}
        </Link>
        <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
      </div>
    </article>
  );
}
