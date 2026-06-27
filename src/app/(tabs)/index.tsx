import { CompletedItems, ListHeroCard, PendingItemCard, TabScreenBackground } from "@/components"
import { useColors } from "@/hooks/useColors"
import { useGroceryStore } from "@/store/grocery-store"
import { ActivityIndicator, FlatList, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function ListScreen() {
   const insets = useSafeAreaInsets()
   const { primary: primaryColor } = useColors()
   const { items, isLoading } = useGroceryStore()
   const pendingItems = items.filter((item) => !item.purchased)

   if (isLoading) {
      return (
         <View className="flex-1 items-center justify-center bg-background">
            <TabScreenBackground />
            <ActivityIndicator size="large" color={primaryColor} />
         </View>
      )
   }

   return (
      <FlatList
         className="flex-1 bg-background"
         keyExtractor={(item) => item.id}
         contentContainerStyle={{ paddingInline: 20, paddingTop: insets.top, paddingBottom: insets.bottom, gap: 14 }}
         contentInsetAdjustmentBehavior="automatic"
         showsVerticalScrollIndicator={false}
         data={pendingItems}
         renderItem={({ item }) => <PendingItemCard item={item} />}
         ListHeaderComponent={
            <View style={{ gap: 14, paddingTop: 20 }}>
               <TabScreenBackground />
               <ListHeroCard />
               <View className="flex-row items-center justify-between px-1">
                  <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
                     Shopping items
                  </Text>
                  <Text className="text-sm text-muted-foreground">{pendingItems.length} active</Text>
               </View>
            </View>
         }
         ListFooterComponent={<CompletedItems />}
      />
   )
}
