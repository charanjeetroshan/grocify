import { View } from "react-native"

export function DecorativeElement() {
   return (
      <>
         <View className="absolute -left-16 top-12 size-56 rounded-full bg-primary/80 dark:bg-background/40" />
         <View className="absolute right-[-74px] top-40 size-72 rounded-full bg-primary/70 dark:bg-background/35" />
      </>
   )
}
