import { useGroceryStore } from "@/store/grocery-store"
import { useUser } from "@clerk/expo"
import { Alert, Pressable, Text, View } from "react-native"

export function ClearPurchasedItemsButton() {
   const { user } = useUser()
   const { clearPurchased } = useGroceryStore()

   const handleClear = async () => {
      if (!user) {
         return Alert.alert("Error", "Log out and try signing in again.")
      }

      await clearPurchased(user.id)
      Alert.alert("Success", "Purchased items cleared successfully.")
   }

   return (
      <View className="bg-primary p-4 rounded-2xl">
         <Pressable onPress={handleClear} className="flex-row items-center justify-center gap-2">
            <Text className="text-background font-medium">Clear Purchased Items</Text>
         </Pressable>
      </View>
   )
}
