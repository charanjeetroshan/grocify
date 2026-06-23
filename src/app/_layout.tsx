import { ClerkProvider } from "@clerk/expo"
import { tokenCache } from "@clerk/expo/token-cache"
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router"
import { useColorScheme } from "react-native"
import { KeyboardProvider } from "react-native-keyboard-controller"
import "../../global.css"

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
   throw new Error("Missing env var EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY")
}

export default function RootLayout() {
   const colorScheme = useColorScheme()

   return (
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
         <KeyboardProvider>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
               <Stack screenOptions={{ headerShown: false }} />
            </ThemeProvider>
         </KeyboardProvider>
      </ClerkProvider>
   )
}
