import { View } from "react-native"

export function TabScreenBackground() {
   return (
      <>
         <View pointerEvents="none" className="absolute -left-24 -top-10 size-64 rounded-full bg-accent" />
         <View pointerEvents="none" className="absolute right-[-80px] top-20 size-72 rounded-full bg-secondary" />
      </>
   )
}
