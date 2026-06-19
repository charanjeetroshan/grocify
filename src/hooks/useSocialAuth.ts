import { useSSO } from "@clerk/expo"
import { useState } from "react"
import { Alert } from "react-native"

export type SocialAuthStrategy = "oauth_google" | "oauth_facebook" | "oauth_github"

export function useSocialAuth() {
   const [loadingStrategy, setLoadingStrategy] = useState<SocialAuthStrategy | null>(null)
   const { startSSOFlow } = useSSO()

   const handleSocialAuth = async (strategy: SocialAuthStrategy) => {
      if (loadingStrategy) {
         return
      }

      setLoadingStrategy(strategy)

      try {
         const { createdSessionId, setActive } = await startSSOFlow({ strategy })

         if (!createdSessionId || !setActive) {
            Alert.alert("Sign-in incomplete", "Unable to complete sign-in. Please try again.")
            return
         }

         setActive({ session: createdSessionId })
      } catch (error) {
         console.log("Error while signing in", error)
         Alert.alert("Sign-in error", "Failed to sign in. Please try again.")
      } finally {
         setLoadingStrategy(null)
      }
   }

   return { handleSocialAuth, loadingStrategy }
}
