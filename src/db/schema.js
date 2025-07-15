import {pgTable , serial, text, timestamp, integer} from "drizzle-orm/pg-core";

export const favoriteTable = pgTable("favorites",{
    id : serial("id").primaryKey(),
    userId : text("user_id").notNull(),
    recipeId : text("recipe_id").notNull(),
    title : text("title").notNull(),
    image : text("image"),
    cookTime : text("cook_time"),
    servings : text("servings"),
    createdAt : timestamp("created_At").defaultNow(),
})