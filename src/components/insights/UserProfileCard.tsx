import { useAuth, useUser } from "@clerk/expo"
import { FontAwesome6 } from "@expo/vector-icons"
import { Image } from "expo-image"
import { Pressable, Text, View } from "react-native"

export function UserProfileCard() {
   const { user } = useUser()
   const { signOut } = useAuth()

   if (!user) {
      return null
   }

   return (
      <View className="flex-row bg-card gap-4 border border-border items-center justify-between p-4 rounded-3xl">
         <View className="flex-row gap-4 items-center">
            <View className="size-14 rounded-xl overflow-hidden">
               <Image source={{ uri: user.imageUrl }} style={{ width: "100%", height: "100%" }} />
            </View>
            <View className="flex gap-1">
               <Text className="text-sm tracking-widest text-muted-foreground uppercase">Signed in as</Text>
               <Text className="font-bold text-2xl text-foreground">{user.fullName}</Text>
               <Text className="text-md text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</Text>
            </View>
         </View>
         <Pressable className="bg-destructive p-3 rounded-lg" onPress={() => signOut()}>
            <FontAwesome6 name="right-from-bracket" size={14} color="#d45f58" />
         </Pressable>
      </View>
   )
}
