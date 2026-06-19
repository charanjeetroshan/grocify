import { mustEnv } from "@/lib/env"
import { ClerkProvider } from "@clerk/expo"
import { tokenCache } from "@clerk/expo/token-cache"
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router"
import { useColorScheme } from "react-native"
import "../../global.css"

const publishableKey = mustEnv("EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY")

export default function RootLayout() {
   const colorScheme = useColorScheme()

   return (
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
         <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }} />
         </ThemeProvider>
      </ClerkProvider>
   )
}
