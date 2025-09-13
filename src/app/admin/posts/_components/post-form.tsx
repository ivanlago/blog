"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { categoryEnum } from "@/db/schema";
// Removido import do cloudinary - agora usamos API route
import { useState } from "react";

// Função para fazer upload via API route
async function uploadImageToCloudinary(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Upload error:", errorText);
    throw new Error(`Falha no upload da imagem: ${response.status}`);
  }

  return response.json();
}

const postSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),

  subtitle: z.string().optional(),
  content: z.string().min(1, "Conteúdo é obrigatório"),
  category: z.enum(categoryEnum.enumValues as [string, ...string[]], {
    message: "Selecione uma categoria",
  }),
  published: z.boolean(),
});

type PostFormData = z.infer<typeof postSchema>;

interface PostFormProps {
  initialData?: PostFormData;
  postId?: number;
}

export function PostForm({ initialData, postId }: PostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<{
    main?: File;
    additional: File[];
  }>({
    additional: [],
  });

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: initialData || {
      published: true,
    },
  });

  const onSubmit = async (data: PostFormData) => {
    try {
      setIsSubmitting(true);

      // Upload images (opcional - se falhar, continua sem imagens)
      const imageUploads = [];

      try {
        if (selectedImages.main) {
          const mainImage = await uploadImageToCloudinary(selectedImages.main);
          imageUploads.push(mainImage.url);
        }

        for (const file of selectedImages.additional) {
          const result = await uploadImageToCloudinary(file);
          imageUploads.push(result.url);
        }
      } catch (uploadError) {
        console.warn(
          "Upload de imagens falhou, salvando post sem imagens:",
          uploadError
        );
        alert(
          "Aviso: Falha no upload de imagens. O post será salvo sem as imagens selecionadas. Verifique a configuração do Cloudinary."
        );
        // Continua sem as imagens
      }

      // Submit form data
      const response = await fetch("/api/posts", {
        method: postId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          id: postId,
          mainImage: imageUploads[0] || null,
          image2: imageUploads[1] || null,
          image3: imageUploads[2] || null,
          image4: imageUploads[3] || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save post");
      }

      window.location.href = "/admin";
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Erro ao salvar o post. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Título
        </label>
        <input
          {...form.register("title")}
          className="w-full rounded-md border p-2"
        />
        {form.formState.errors.title && (
          <p className="text-sm text-red-500">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="subtitle" className="text-sm font-medium">
          Subtítulo
        </label>
        <input
          {...form.register("subtitle")}
          className="w-full rounded-md border p-2"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="category" className="text-sm font-medium">
          Categoria
        </label>
        <select
          {...form.register("category")}
          className="w-full rounded-md border p-2"
        >
          <option value="">Selecione uma categoria</option>
          {categoryEnum.enumValues.map((category) => (
            <option key={category} value={category}>
              {category
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>
        {form.formState.errors.category && (
          <p className="text-sm text-red-500">
            {form.formState.errors.category.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="text-sm font-medium">
          Conteúdo
        </label>
        <textarea
          {...form.register("content")}
          rows={10}
          className="w-full rounded-md border p-2"
        />
        {form.formState.errors.content && (
          <p className="text-sm text-red-500">
            {form.formState.errors.content.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Imagem Principal</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setSelectedImages((prev) => ({
              ...prev,
              main: e.target.files?.[0],
            }))
          }
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Imagens Adicionais</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) =>
            setSelectedImages((prev) => ({
              ...prev,
              additional: Array.from(e.target.files || []),
            }))
          }
          className="w-full"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input type="checkbox" {...form.register("published")} id="published" />
        <label htmlFor="published" className="text-sm font-medium">
          Publicar imediatamente
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar Post"}
      </Button>
    </form>
  );
}
