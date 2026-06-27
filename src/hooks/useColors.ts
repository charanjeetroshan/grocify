import { useColorScheme } from "nativewind"

export type Colors = {
   primary: string
   success: string
   destructive: string
   info: string
   textForeground: string
}

export function useColors(): Colors {
   const { colorScheme } = useColorScheme()
   const isDarkMode = colorScheme === "dark"

   return {
      primary: isDarkMode ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)",
      success: isDarkMode ? "hsl(142 70% 54%)" : "hsl(147 75% 33%)",
      destructive: isDarkMode ? "hsl(354 81.2% 38.2%)" : "hsl(355 53.2% 24.3%)",
      info: "#0074cc",
      textForeground: isDarkMode ? "hsl(150 31% 9%)" : "hsl(138 47% 97%)",
   }
}
