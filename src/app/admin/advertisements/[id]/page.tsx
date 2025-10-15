import { config } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import db from "@/db";
import { advertisements } from "@/db/schema";
import { AdvertisementForm } from "../_components/advertisement-form";

export default async function EditAdvertisementPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(config);

  if (!session?.user || session?.user?.role !== "admin") {
    redirect("/login");
  }

  const advertisement = await db
    .select()
    .from(advertisements)
    .where(eq(advertisements.id, parseInt(params.id)))
    .limit(1);

  if (!advertisement.length) {
    return <div>Anúncio não encontrado</div>;
  }

  const advertisementData = advertisement[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Editar Anúncio</h1>
      <AdvertisementForm
        initialData={{
          title: advertisementData.title,
          imageUrl: advertisementData.imageUrl,
          productUrl: advertisementData.productUrl,
          category: advertisementData.category,
          isFeatured: advertisementData.isFeatured,
        }}
        advertisementId={advertisementData.id}
      />
    </div>
  );
}
