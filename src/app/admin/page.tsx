import { desc } from "drizzle-orm";
import { config } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import db from "@/db";
import { posts } from "@/db/schema";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusIcon, FileTextIcon, TagIcon } from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(config);

  if (!session?.user || session?.user?.role !== "admin") {
    redirect("/login");
  }

  const allPosts = await db.select().from(posts).orderBy(desc(posts.createdAt));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel de Administração</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <FileTextIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-xl font-bold">Gerenciar Posts</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Crie e edite postagens do blog
          </p>
          <div className="flex space-x-3">
            <Link href="/admin/posts/new">
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Novo Post
              </Button>
            </Link>
            <Link href="/admin/posts">
              <Button variant="outline">Ver todos</Button>
            </Link>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <TagIcon className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-xl font-bold">Gerenciar Anúncios</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Crie e edite anúncios de produtos afiliados
          </p>
          <div className="flex space-x-3">
            <Link href="/admin/advertisements/new">
              <Button>
                <PlusIcon className="h-4 w-4 mr-2" />
                Novo Anúncio
              </Button>
            </Link>
            <Link href="/admin/advertisements">
              <Button variant="outline">Ver todos</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold">Últimos Posts</h2>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allPosts.map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-gray-900">
                      {post.title}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{post.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {formatDate(post.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      post.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.published ? "Publicado" : "Rascunho"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Editar
                  </Link>
                  <Link
                    href={`/post/${post.id}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Visualizar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}