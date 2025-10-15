"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface AdvertisementCardProps {
  advertisement: {
    id: number;
    title: string;
    imageUrl: string;
    productUrl: string;
  };
  priority?: boolean;
}

export function AdvertisementCard({
  advertisement,
  priority = false,
}: AdvertisementCardProps) {
  const [imageError, setImageError] = useState(false);

  // Fallback to a local placeholder if the image URL is not properly configured
  const getImageSrc = () => {
    // For testing purposes, we'll use a placeholder image
    if (advertisement.imageUrl.includes("example.com") || imageError) {
      return "/ad-placeholder.svg";
    }
    return advertisement.imageUrl;
  };

  return (
    <article className="group relative flex flex-col space-y-2">
      <Link
        href={advertisement.productUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative aspect-[16/9] overflow-hidden rounded-lg"
      >
        <Image
          src={getImageSrc()}
          alt={advertisement.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
          priority={priority}
          onError={() => setImageError(true)}
        />
      </Link>
      <div className="flex flex-col space-y-1">
        <Link
          href={advertisement.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="space-y-1 group-hover:text-blue-600"
        >
          <h2 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight">
            {advertisement.title}
          </h2>
        </Link>
      </div>
    </article>
  );
}
