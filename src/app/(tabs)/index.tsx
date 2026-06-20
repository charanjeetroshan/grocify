import { useAuth } from "@clerk/expo"
import { Pressable, Text, View } from "react-native"

export default function HomeScreen() {
   const { signOut } = useAuth()

   return (
      <View className="flex-1 items-center justify-center">
         <Text>Home Screen</Text>
         <Pressable onPress={() => signOut()}>
            <Text>Sign out</Text>
         </Pressable>
      </View>
   )
}
