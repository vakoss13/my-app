import 'react-native-gesture-handler'
import '../src/styles/unistyles'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


/**
 * ПРИМЕЧАНИЕ: Если вы видите ошибку "NitroModules", это означает, что
 * react-native-unistyles 3.x не поддерживается в стандартном Expo Go.
 * Вам нужно использовать Development Build:
 * 1. npx expo run:android 
 * или 
 * 2. Использовать Unistyles 2.x для Expo Go.
 */

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
      </Stack>
    </QueryClientProvider>
  )
}