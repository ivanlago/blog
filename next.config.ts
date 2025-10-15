import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'res.cloudinary.com',
      'example.com',
      'mercadolivre.com.br',
      'produto.mercadolivre.com.br',
      'http2.mlstatic.com',
      'mlstatic.com',
      'shopee.com.br',
      'amazon.com.br'
    ],
  },
};

export default nextConfig;