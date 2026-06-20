import { useGroceryStore } from "@/store/grocery-store"
import { Text, View } from "react-native"

export function ListHeroCard() {
   const { items } = useGroceryStore()

   const completedCount = items.filter((item) => item.purchased).length
   const pendingCount = items.length - completedCount
   const completionRate = !!items.length ? Math.round((completedCount / items.length) * 100) : 0

   return (
      <View className="rounded-3xl bg-primary p-5">
         <Text className="text-sm font-semibold uppercase tracking-[1px] text-background/80">Today</Text>

         <Text className="mt-1 text-3xl font-extrabold text-background">Your Grocery Board</Text>

         <Text className="mt-1 text-sm text-background/80">
            {pendingCount} pending · {completedCount} completed
         </Text>

         <View className="mt-4 overflow-hidden rounded-full bg-white/50">
            <View className="h-2 rounded-full bg-secondary" style={{ width: `${completionRate}%` }} />
         </View>
      </View>
   )
}
