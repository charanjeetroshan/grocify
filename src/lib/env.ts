const _REQUIRED_ENV = ["DATABASE_URL", "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY"] as const

type Env = (typeof _REQUIRED_ENV)[number]

export function mustEnv(name: Env): string {
   const envVar = process.env?.[name]

   if (!envVar) {
      throw new Error(`Missing env var ${name}`)
   }

   return envVar
}
