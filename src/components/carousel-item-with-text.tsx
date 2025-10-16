"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface CarouselItemWithTextProps {
  item: {
    id: number;
    title: string;
    subtitle?: string | null;
    mainImage?: string | null;
    imageUrl?: string | null;
    category?: string;
    createdAt?: Date;
    productUrl?: string | null;
  };
  type: "post" | "advertisement";
  priority?: boolean;
}

export function CarouselItemWithText({ item, type, priority = false }: CarouselItemWithTextProps) {
  // Map database category values to URL slugs
  const categorySlugMap: Record<string, string> = {
    suplementos_naturais: "suplementos-naturais",
    fitness_emagrecimento: "fitness-emagrecimento",
    saude_mental_sono: "saude-mental-sono",
    cuidados_corpo: "cuidados-corpo",
    alimentacao_saudavel: "alimentacao-saudavel",
  };

  const categoryMap: Record<string, string> = {
    suplementos_naturais: "Suplementos Naturais",
    fitness_emagrecimento: "Fitness e Emagrecimento",
    saude_mental_sono: "Saúde Mental e Sono",
    cuidados_corpo: "Cuidados com o Corpo",
    alimentacao_saudavel: "Alimentação Saudável",
  };

  // Determine which image field to use based on type
  const imageSrc = type === "post" ? item.mainImage : item.imageUrl || item.mainImage;

  // Determine the main link URL
  const mainUrl = type === "post" ? `/post/${item.id}` : item.productUrl || "#";
  const isExternal = type === "advertisement" && item.productUrl;

  // Get the correct category slug for URLs
  const categorySlug = item.category ? categorySlugMap[item.category] : null;

  return (
    <div className="relative w-full h-80 rounded-lg overflow-hidden group">
      {/* Main link covering the entire image area */}
      <Link
        href={mainUrl}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="absolute inset-0 z-10"
        aria-label={`View ${item.title}`}
      />

      {/* Image */}
      <div className="absolute inset-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={item.title}
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
      </div>

      {/* Text overlay - bottom left */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent z-20 w-full">
        <div className="max-w-md">
          {type === "post" && item.category && categorySlug && (
            <div className="bg-blue-400 w-fit py-1 px-2">
              <Link
                href={`/categoria/${categorySlug}`}
                className="text-sm font-medium text-white inline-block"
              >
                {categoryMap[item.category]}
              </Link>
            </div>
          )}

          <Link
            href={mainUrl}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            <div className="block space-y-1 w-full">
              <h2 className="text-xl font-semibold leading-snug tracking-tight text-white line-clamp-2 group-hover:text-blue-300 transition-colors">
                {item.title}
              </h2>

              {item.subtitle && (
                <p className="text-gray-200 text-sm line-clamp-2">{item.subtitle}</p>
              )}

              {item.createdAt && (
                <p className="text-gray-300 text-xs">{formatDate(item.createdAt)}</p>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
