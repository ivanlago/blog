import { redirect } from "next/navigation";
import { config } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { PostForm } from "../_components/post-form";
import db from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const session = await getServerSession(config);

  if (!session?.user || session?.user?.role !== "admin") {
    redirect("/login");
  }

  const post = await db
    .select()
    .from(posts)
    .where(eq(posts.id, parseInt(id)))
    .then((res) => res[0]);

  if (!post) {
    redirect("/admin");
  }

  const formData = {
    title: post.title,
    subtitle: post.subtitle || undefined,
    content: post.content,
    category: post.category,
    published: post.published || false,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Editar Post</h1>
      <PostForm initialData={formData} postId={post.id} />
    </div>
  );
}
