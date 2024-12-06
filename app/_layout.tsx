import { AuthContextProvider, useAuth } from "@/context/authContext";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

const MainLayout = () => {
  const { isAuthenticated } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated === undefined) return
    const inApp = segments[0] == '(app)'
    if (isAuthenticated && !inApp) {
      router.replace('/home')
    }
    if (!isAuthenticated) {
      router.replace('/gettingstarted')
    }
  }, [isAuthenticated])

  return <Slot />
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  )
}
