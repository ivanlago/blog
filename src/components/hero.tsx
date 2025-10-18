"use client";

import { Carousel } from "@/components/carousel";
import { CarouselItemWithText } from "@/components/carousel-item-with-text";

interface HeroProps {
  latestPosts: {
    id: number;
    title: string;
    subtitle: string | null;
    mainImage: string | null;
    category: string;
    createdAt: Date;
  }[];
  latestAdvertisements: {
    id: number;
    title: string;
    imageUrl: string | null;
    productUrl: string | null;
  }[];
}

export function Hero({ latestPosts, latestAdvertisements }: HeroProps) {
  return (
    <section className="my-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <Carousel
            // title="Últimas Postagens"
            autoPlay={true}
            autoPlayInterval={5000}
            hideIndicators={true}
          >
            {latestPosts.map((post) => (
              <CarouselItemWithText key={post.id} item={post} type="post" />
            ))}
          </Carousel>
        </div>

        <div className="w-full md:w-1/3">
          <Carousel
            // title="Últimos Anúncios"
            autoPlay={true}
            autoPlayInterval={7000}
            hideIndicators={true}
          >
            {latestAdvertisements.map((advertisement) => (
              <CarouselItemWithText
                key={advertisement.id}
                item={advertisement}
                type="advertisement"
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
