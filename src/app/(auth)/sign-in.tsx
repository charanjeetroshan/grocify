import { DecorativeElement } from "@/components"
import { SocialAuthStrategy, useSocialAuth } from "@/hooks"
import { FontAwesome } from "@expo/vector-icons"
import { Image } from "expo-image"
import { Pressable, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

type Provider = {
   strategy: SocialAuthStrategy
   name: "GitHub" | "Google" | "Facebook"
   icon: "github" | "google" | "facebook"
}

const PROVIDERS: Provider[] = [
   { strategy: "oauth_google", name: "Google", icon: "google" },
   { strategy: "oauth_facebook", name: "Facebook", icon: "facebook" },
   { strategy: "oauth_github", name: "GitHub", icon: "github" },
] as const

export default function SignInScreen() {
   const { loadingStrategy, handleSocialAuth } = useSocialAuth()

   return (
      <SafeAreaView className="flex-1 bg-primary dark:bg-secondary" edges={["top"]}>
         <DecorativeElement />
         <View className="px-6 pt-4">
            <Text className="text-center text-5xl tracking-tight text-primary-foreground uppercase font-jetbrains-mono dark:text-foreground">
               GROCIFY
            </Text>
            <Text className="mt-1 text-center text-[14px] text-primary-foreground/80 dark:text-primary-foreground/75">
               Plan smarter. Shop happier.
            </Text>
            <View className="mt-6 rounded-[30px] border border-white/20 bg-white/10 p-3">
               <Image
                  source={require("@/assets/images/auth.png")}
                  style={{ width: "100%", height: 300 }}
                  contentFit="contain"
               />
            </View>
         </View>
         <View className="mt-8 flex-1 rounded-t-[36px] bg-card px-6 pb-8 pt-6 ">
            <View className="self-center rounded-full bg-secondary px-3 py-1">
               <Text className="text-xs font-semibold uppercase tracking-[1px] text-secondary-foreground">
                  Welcome Back
               </Text>
            </View>
            <Text className="mt-2 text-center text-sm leading-6 text-muted-foreground">
               Choose a social provider and jump right into your personalised grocery experience
            </Text>

            <View className="mt-6">
               {PROVIDERS.map(({ strategy, name, icon }) => (
                  <Pressable
                     key={strategy}
                     className={`mb-3 h-14 flex-row items-center rounded-2xl border border-border bg-card px-4 active:opacity-90 ${loadingStrategy && "opacity-70"}`}
                     onPress={() => handleSocialAuth(strategy)}
                     disabled={!!loadingStrategy}>
                     <View className="size-8 items-center justify-center rounded-full bg-white">
                        <FontAwesome name={icon} size={24} color="#111" />
                     </View>
                     <Text className="ml-3 flex-1 text-lg font-semibold text-card-foreground">
                        {loadingStrategy === strategy ? `Connecting ${name}` : `Continue with ${name}`}
                     </Text>
                     <FontAwesome name="angle-right" size={18} color="#5f6e66" />
                  </Pressable>
               ))}
            </View>
            <Text className="mt-3 text-center text-sm leading-5 text-muted-foreground">
               By continuing, you agree to our Terms of Service and Privacy Policy.
            </Text>
         </View>
      </SafeAreaView>
   )
}
