import { useGroceryStore } from "@/store/grocery-store"
import { useUser } from "@clerk/expo"
import { FontAwesome6 } from "@expo/vector-icons"
import { Alert, FlatList, Pressable, Text, View } from "react-native"

export function CompletedItems() {
   const { user } = useUser()
   const { items, togglePurchased, removeItem } = useGroceryStore()
   const completedItems = items.filter((item) => item.purchased)

   if (completedItems.length === 0) {
      return null
   }

   const handleTogglePurchased = (id: string) => {
      if (!user) {
         return Alert.alert("Error", "Log out and try signing in again.")
      }

      togglePurchased(id, user.id)
   }

   const handleRemoveItem = (id: string) => {
      if (!user) {
         return Alert.alert("Error", "Log out and try signing in again.")
      }

      removeItem(id, user.id)
   }

   return (
      <View className="mt-3 rounded-3xl border border-border bg-secondary p-4">
         <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">Completed</Text>

         <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={completedItems}
            renderItem={({ item }) => (
               <View
                  key={item.id}
                  className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2">
                  <View className="flex-row items-center gap-2">
                     <Pressable
                        onPress={() => handleTogglePurchased(item.id)}
                        className="h-6 w-6 items-center justify-center rounded-full bg-primary">
                        <FontAwesome6 name="check" size={12} color="#ffffff" />
                     </Pressable>
                     <Text className="text-base text-muted-foreground line-through">{item.name}</Text>
                  </View>

                  <Pressable
                     onPress={() => handleRemoveItem(item.id)}
                     className="h-8 w-8 items-center justify-center rounded-xl bg-destructive">
                     <FontAwesome6 name="trash" size={14} color="#d45f58" />
                  </Pressable>
               </View>
            )}
         />
      </View>
   )
}
