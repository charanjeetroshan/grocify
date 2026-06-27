import { Colors, useColors } from "@/hooks/useColors"
import { StyleProp, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Toast, { BaseToast, ErrorToast, InfoToast, ToastConfig } from "react-native-toast-message"

function getToastConfig(colors: Colors): ToastConfig {
   const { success, destructive, info } = colors
   const text1Style = { fontSize: 15 } as const
   const text2Style = { fontSize: 14, fontWeight: "400" } as const
   const commonStyles: StyleProp<ViewStyle> = { width: "90%", borderLeftWidth: 8 } as const

   return {
      success: (props) => (
         <BaseToast
            {...props}
            style={{ borderLeftColor: success, ...commonStyles }}
            text1Style={text1Style}
            text2Style={text2Style}
         />
      ),
      error: (props) => (
         <ErrorToast
            {...props}
            style={{ borderLeftColor: destructive, ...commonStyles }}
            text1Style={text1Style}
            text2Style={text2Style}
         />
      ),
      info: (props) => (
         <InfoToast
            {...props}
            style={{ borderLeftColor: info, ...commonStyles }}
            text1Style={text1Style}
            text2Style={text2Style}
         />
      ),
   }
}

export function Toaster() {
   const { top } = useSafeAreaInsets()
   const config = getToastConfig(useColors())

   return <Toast config={config} visibilityTime={5000} topOffset={top + 5} />
}

function success(message: string) {
   Toast.show({
      type: "success",
      text1: "Success",
      text2: message,
   })
}

function error(message: string) {
   Toast.show({
      type: "error",
      text1: "Error",
      text2: message,
   })
}

function info(message: string) {
   Toast.show({
      type: "info",
      text1: "Info",
      text2: message,
   })
}

export const toast = {
   success,
   error,
   info,
}
