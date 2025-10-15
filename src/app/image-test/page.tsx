import Image from "next/image";

export default function ImageTestPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Image Test</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Mercado Livre Image</h2>
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src="https://http2.mlstatic.com/D_NQ_NP_2X_858141-MLB46074798009_052021-F.webp"
              alt="Test image from Mercado Livre"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Placeholder Image</h2>
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <Image
              src="/ad-placeholder.svg"
              alt="Placeholder image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
