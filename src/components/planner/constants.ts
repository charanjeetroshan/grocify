import { GroceryCategory, GroceryPriority } from "@/types"

export const categories: GroceryCategory[] = [
   "Produce",
   "Dairy",
   "Meat",
   "Bakery",
   "Frozen Foods",
   "Beverages",
   "Snacks",
   "Household Items",
   "Personal Care",
] as const

export const priorities: GroceryPriority[] = ["low", "medium", "high"] as const

export const categoryIcons: Record<GroceryCategory, string> = {
   Produce: "leaf",
   Dairy: "cow",
   Meat: "drumstick-bite",
   "Frozen Foods": "snowflake",
   Beverages: "mug-saucer",
   "Household Items": "house",
   "Personal Care": "person",
   Bakery: "bread-slice",
   Snacks: "cookie-bite",
} as const
