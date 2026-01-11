import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import Animated from "react-native-reanimated"
import "../global.css"

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#1A1A1A" },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(tab)" />
        </Stack>
      </Animated.View>
    </GestureHandlerRootView>
  )
}
