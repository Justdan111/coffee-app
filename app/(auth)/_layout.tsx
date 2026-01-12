import { Stack } from "expo-router"
import Animated from "react-native-reanimated"

export default function AuthLayout() {
  return (
      <Animated.View style={{ flex: 1 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#1A1A1A" },
          }}
        >
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </Stack>
      </Animated.View>
  )
}
