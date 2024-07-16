import { type ItemRaw } from "./supabase";

export type ItemSelect = Pick<ItemRaw, "id">;
export type ItemInsert = Pick<ItemRaw, "category" | "name" | "description">;
export type ItemDelete = Pick<ItemRaw, "id">;
export type ItemUpdate = ItemInsert & Pick<ItemRaw, "id">;
