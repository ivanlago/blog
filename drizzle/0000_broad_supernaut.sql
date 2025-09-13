CREATE TYPE "public"."category" AS ENUM('suplementos_naturais', 'fitness_emagrecimento', 'saude_mental_sono', 'cuidados_corpo', 'alimentacao_saudavel');--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"subtitle" varchar(255),
	"content" text NOT NULL,
	"main_image" varchar(255),
	"image2" varchar(255),
	"image3" varchar(255),
	"image4" varchar(255),
	"category" "category" NOT NULL,
	"author_id" varchar(255) NOT NULL,
	"published" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"hashed_password" varchar(255),
	"is_admin" boolean DEFAULT false,
	"email_verified" timestamp,
	"image" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
