import { config } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { AdvertisementForm } from "../_components/advertisement-form";

export default async function NewAdvertisementPage() {
  const session = await getServerSession(config);

  if (!session?.user || session?.user?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Novo Anúncio</h1>
      <AdvertisementForm />
    </div>
  );
}
