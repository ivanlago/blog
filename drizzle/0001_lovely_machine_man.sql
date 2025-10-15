ALTER TABLE "posts" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."category";--> statement-breakpoint
CREATE TYPE "public"."category" AS ENUM('suplementos_naturais', 'fitness_emagrecimento', 'cuidados_corpo', 'alimentacao_saudavel');--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "category" SET DATA TYPE "public"."category" USING "category"::"public"."category";