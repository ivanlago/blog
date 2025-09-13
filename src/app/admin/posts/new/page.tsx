import { redirect } from "next/navigation";
import { config } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { PostForm } from "../_components/post-form";

export default async function NewPostPage() {
  const session = await getServerSession(config);

  if (!session?.user || session?.user?.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Criar Novo Post</h1>
      <PostForm />
    </div>
  );
}
