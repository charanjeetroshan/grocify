import { useColors } from "@/hooks/useColors"
import { useGroceryStore } from "@/store/grocery-store"
import { GroceryCategory, GroceryPriority } from "@/types"
import { useUser } from "@clerk/expo"
import { FontAwesome6 } from "@expo/vector-icons"
import { useState } from "react"
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from "react-native"
import { categories, categoryIcons, priorities } from "./constants"

export function PlannerFormCard() {
   const { user } = useUser()
   const { textForeground: iconColor } = useColors()

   const { isLoading, error, addItem } = useGroceryStore()

   const [name, setName] = useState<string>("")
   const [quantity, setQuantity] = useState<string>("1")
   const [category, setCategory] = useState<GroceryCategory>("Produce")
   const [priority, setPriority] = useState<GroceryPriority>("medium")

   const canCreateItem = name.trim().length > 0

   const handleQuantityChange = (value: string) => {
      setQuantity(value.replace(/[^0-9]/g, ""))
   }

   const createItem = async () => {
      if (!canCreateItem) return

      if (!user) {
         return Alert.alert("Error", "Log out and try signing in again.")
      }

      await addItem(
         {
            name: name.trim(),
            quantity: Number(quantity),
            category,
            priority,
         },
         user.id,
      )

      setName("")
      setQuantity("1")
      setCategory("Produce")
      setPriority("medium")
   }

   return (
      <View className="rounded-3xl border border-border bg-card p-4">
         <Text className="text-sm font-semibold text-foreground">Item name</Text>
         <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-2">
            <FontAwesome6 name="bag-shopping" size={13} color="#5b7567" />
            <TextInput
               value={name}
               onChangeText={setName}
               placeholder="e.g. Bananas"
               className="ml-3 flex-1 text-base text-foreground"
               placeholderTextColor="#8aa397"
            />
         </View>

         <Text className="mt-4 text-sm font-semibold text-foreground">Quantity</Text>
         <View className="mt-2 flex-row items-center rounded-2xl border border-border bg-muted px-4 py-2">
            <FontAwesome6 name="hashtag" size={13} color="#5b7567" />
            <TextInput
               value={quantity}
               onChangeText={handleQuantityChange}
               keyboardType="number-pad"
               placeholder="1"
               placeholderTextColor="#8aa397"
               className="ml-3 flex-1 text-base text-foreground"
            />
         </View>

         <Text className="mt-4 text-sm font-semibold text-foreground">Category</Text>
         <View className="mt-2 flex-row flex-wrap gap-2">
            {categories.map((cat) => {
               const active = cat === category

               return (
                  <Pressable
                     key={cat}
                     onPress={() => setCategory(cat)}
                     className={`flex-row items-center rounded-full px-4 py-2 ${
                        active ? "bg-primary" : "bg-secondary"
                     }`}>
                     <FontAwesome6 name={categoryIcons[cat]} size={12} color={active ? iconColor : "#486856"} />
                     <Text
                        className={`ml-2 text-sm font-semibold ${
                           active ? "text-background" : "text-secondary-foreground"
                        }`}>
                        {cat}
                     </Text>
                  </Pressable>
               )
            })}
         </View>

         <Text className="mt-4 text-sm font-semibold text-foreground">Priority</Text>
         <View className="mt-2 flex-row gap-2">
            {priorities.map((prio) => {
               const active = prio === priority
               const icon = prio === "high" ? "bolt" : prio === "medium" ? "compass" : "seedling"
               return (
                  <Pressable
                     key={prio}
                     onPress={() => setPriority(prio)}
                     className={`flex-1 flex-row items-center justify-center gap-2 rounded-2xl py-2 ${
                        active ? "bg-primary" : "bg-secondary"
                     }`}>
                     <FontAwesome6 name={icon} size={12} color={active ? iconColor : "#486856"} />
                     <Text
                        className={`mt-1 text-sm font-semibold capitalize ${
                           active ? "text-background" : "text-secondary-foreground"
                        }`}>
                        {prio}
                     </Text>
                  </Pressable>
               )
            })}
         </View>

         <Pressable
            className={`mt-5 flex-row items-center justify-center rounded-2xl py-3 ${
               canCreateItem && !isLoading ? "bg-primary" : "bg-primary/40"
            }`}
            onPress={createItem}
            disabled={!canCreateItem || isLoading}>
            <FontAwesome6 name="plus" size={14} color={canCreateItem && !isLoading ? iconColor : "#7a9386"} />
            <View className="flex-row items-center gap-4">
               <Text
                  className={`ml-2 text-base font-semibold ${
                     canCreateItem && !isLoading ? "text-background" : "text-muted-foreground"
                  }`}>
                  Add to Grocery List
               </Text>
               {isLoading && <ActivityIndicator size="small" color="#fff" />}
            </View>
         </Pressable>

         {error ? (
            <View className="mt-3 rounded-2xl border border-destructive bg-destructive px-3 py-2">
               <Text className="text-sm dark:text-white text-center uppercase">{error}</Text>
            </View>
         ) : null}
      </View>
   )
}
