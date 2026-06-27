import { useGroceryStore } from "@/store/grocery-store"
import { useUser } from "@clerk/expo"
import { ActivityIndicator, Pressable, Text } from "react-native"
import { toast } from "../Toaster"

export function ClearPurchasedItemsButton() {
   const { user } = useUser()
   const { isLoading, items, clearPurchased } = useGroceryStore()
   const hasPurchasedItems = items.some((item) => item.purchased)

   const handleClear = async () => {
      if (!user) {
         return toast.error("Log out and try signing in again.")
      }

      if (!hasPurchasedItems) {
         return toast.info("No purchased items to clear.")
      }

      await clearPurchased(user.id)
      toast.success("Purchased items cleared successfully.")
   }

   return (
      <Pressable
         onPress={handleClear}
         className="flex-row justify-center items-center gap-4 p-4 rounded-2xl bg-primary active:bg-primary/70 disabled:bg-primary/70"
         disabled={isLoading}>
         <Text className="text-background font-medium">Clear Purchased Items</Text>
         {isLoading && <ActivityIndicator size="small" color="#000" />}
      </Pressable>
   )
}
