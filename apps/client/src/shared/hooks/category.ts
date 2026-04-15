import request from "@/shared/lib/request";
import { unstable_cache } from "next/cache";

export const FIXED_CATEGORIES = [
  { key: "new", label: "신상품" },
  { key: "best", label: "실시간 베스트" },
];

export type Category = {
  id: number;
  categoryName: string;
  children: Category[];
};

export const getCategories = unstable_cache(
  async () => {
    // console.log("[getCategories] called");
    return request<Category[]>("/v1/categories");
  },
  ["categories"],
  { revalidate: 3600 }
);

export const findCategoryByName = (
  categories: Category[],
  name: string
): Category | undefined => {
  return categories.find(
    (category) => category.categoryName.toLowerCase() === name.toLowerCase()
  );
};
