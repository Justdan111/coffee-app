
import { useEffect } from "react"
import { View, Text, Image, Pressable } from "react-native"
import { useRouter } from "expo-router"
import Animated, { FadeInUp, FadeIn, useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated"
import { LinearGradient } from "expo-linear-gradient"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function OnboardingScreen() {
  const router = useRouter()
  const scale = useSharedValue(0.9)

  useEffect(() => {
    scale.value = withSpring(1, {
      damping: 8,
      mass: 1,
      overshootClamping: false,
    })
  }, [])

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const handleGetStarted = () => {
    router.push("/(tab)/home")
  }

  return (
    <LinearGradient colors={["#000000", "#000000"]} style={{ flex: 1 }}>
      <View className="flex-1 justify-center items-center px-6">
        <Animated.View entering={FadeIn.duration(800)} className="w-full items-center mb-8">
          <Image
            source={require("@/assets/Coffee/6.png")}
            style={{ width: "100%", height: 400, borderRadius: 16 }}
          />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(200).duration(800)} className="w-full items-center mb-8">
          <Text className="text-4xl font-bold text-white text-center mb-4">
            Fall in Love with Coffee in Blissful Delight!
          </Text>
          <Text className="text-base text-gray-300 text-center">
            Welcome to our cozy coffee corner, where every cup is a delightful for you.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(400).duration(800)} style={animatedStyle} className="w-full mt-8">
          <AnimatedPressable
            onPress={handleGetStarted}
            className="coffee-button bg-primary flex items-center justify-center py-5"
          >
            <Text className="text-white text-lg font-semibold">Get Started</Text>
          </AnimatedPressable>
        </Animated.View>
      </View>
    </LinearGradient>
  )
}
