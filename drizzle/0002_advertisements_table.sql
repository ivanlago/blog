CREATE TABLE IF NOT EXISTS "advertisements" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"image_url" varchar(255) NOT NULL,
	"product_url" varchar(255) NOT NULL,
	"category" "category" NOT NULL,
	"is_featured" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);