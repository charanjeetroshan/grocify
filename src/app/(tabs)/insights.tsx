import { TabScreenBackground, UserProfileCard } from "@/components"
import { useUser } from "@clerk/expo"
import { ScrollView } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export default function InsightsScreen() {
   const insets = useSafeAreaInsets()
   const { user } = useUser()

   if (!user) {
      return null
   }

   return (
      <ScrollView
         className="flex-1 bg-background py-4"
         contentContainerStyle={{ paddingInline: 20, gap: 14, paddingTop: insets.top, paddingBottom: insets.bottom }}>
         <TabScreenBackground />
         <UserProfileCard />
      </ScrollView>
   )
}
