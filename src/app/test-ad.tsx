"use client";

import { useEffect, useState } from "react";
import { AdvertisementCard } from "@/components/advertisement-card";

interface Advertisement {
  id: number;
  title: string;
  imageUrl: string;
  productUrl: string;
}

export default function TestAdPage() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);

  useEffect(() => {
    // Create a test advertisement with a real image from a configured domain
    const testAds: Advertisement[] = [
      {
        id: 1,
        title: "Whey Protein Premium",
        imageUrl:
          "https://http2.mlstatic.com/D_NQ_NP_2X_612352-MLB46402310034_062021-F.webp",
        productUrl: "https://produto.mercadolivre.com.br/test-product",
      },
      {
        id: 2,
        title: "Creatina Monohidratada",
        imageUrl:
          "https://http2.mlstatic.com/D_NQ_NP_2X_982831-MLB45074860073_032021-F.webp",
        productUrl: "https://produto.mercadolivre.com.br/test-product-2",
      },
    ];
    setAdvertisements(testAds);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Test Advertisement Display</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {advertisements.map((ad) => (
          <AdvertisementCard key={ad.id} advertisement={ad} />
        ))}
      </div>
    </div>
  );
}
