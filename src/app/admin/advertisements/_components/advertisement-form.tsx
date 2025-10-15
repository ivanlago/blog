"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { categoryEnum } from "@/db/schema";
import { useState } from "react";

const advertisementSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  imageUrl: z.string().min(1, "URL da imagem é obrigatória"),
  productUrl: z.string().min(1, "URL do produto é obrigatória"),
  category: z.enum(categoryEnum.enumValues as [string, ...string[]], {
    message: "Selecione uma categoria",
  }),
  isFeatured: z.boolean(),
});

type AdvertisementFormData = z.infer<typeof advertisementSchema>;

interface AdvertisementFormProps {
  initialData?: AdvertisementFormData;
  advertisementId?: number;
}

export function AdvertisementForm({
  initialData,
  advertisementId,
}: AdvertisementFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AdvertisementFormData>({
    resolver: zodResolver(advertisementSchema),
    defaultValues: initialData || {
      isFeatured: false,
    },
  });

  const onSubmit = async (data: AdvertisementFormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/advertisements", {
        method: advertisementId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          id: advertisementId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save advertisement");
      }

      window.location.href = "/admin/advertisements";
    } catch (error) {
      console.error("Error saving advertisement:", error);
      alert("Erro ao salvar o anúncio. Tente novamente.");
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
        <label htmlFor="imageUrl" className="text-sm font-medium">
          URL da Imagem
        </label>
        <input
          {...form.register("imageUrl")}
          className="w-full rounded-md border p-2"
        />
        {form.formState.errors.imageUrl && (
          <p className="text-sm text-red-500">
            {form.formState.errors.imageUrl.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="productUrl" className="text-sm font-medium">
          URL do Produto (Mercado Livre, Shopee, etc.)
        </label>
        <input
          {...form.register("productUrl")}
          className="w-full rounded-md border p-2"
        />
        {form.formState.errors.productUrl && (
          <p className="text-sm text-red-500">
            {form.formState.errors.productUrl.message}
          </p>
        )}
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

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...form.register("isFeatured")}
          id="isFeatured"
        />
        <label htmlFor="isFeatured" className="text-sm font-medium">
          Anúncio em Destaque
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : "Salvar Anúncio"}
      </Button>
    </form>
  );
}
