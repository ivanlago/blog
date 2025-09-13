import { relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Enum for post categories
export const categoryEnum = pgEnum("category", [
  "suplementos_naturais",
  "fitness_emagrecimento",
  "saude_mental_sono",
  "cuidados_corpo",
  "alimentacao_saudavel",
]);

// Posts table
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  content: text("content").notNull(),
  mainImage: varchar("main_image", { length: 255 }),
  image2: varchar("image2", { length: 255 }),
  image3: varchar("image3", { length: 255 }),
  image4: varchar("image4", { length: 255 }),
  category: categoryEnum("category").notNull(),
  authorId: varchar("author_id", { length: 255 }).notNull(),
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Users table with authentication fields
export const users = pgTable("users", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hashedPassword: varchar("hashed_password", { length: 255 }),
  isAdmin: boolean("is_admin").default(false),
  emailVerified: timestamp("email_verified"),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));
