"use client"

import { useEffect } from "react"
import { View, Text, Image, Pressable } from "react-native"
import { useRouter } from "expo-router"
import Animated, {
  FadeInUp,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import { ChevronLeft, Phone } from "lucide-react-native"

const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedImage = Animated.createAnimatedComponent(Image)

export default function TrackingScreen() {
  const router = useRouter()
  const opacity = useSharedValue(1)

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.5, { duration: 1000 }), -1, true)
  }, [])

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <View className="flex-1 bg-secondary">
      <AnimatedView
        entering={FadeInDown.duration(400)}
        className="flex-row justify-between items-center px-5 py-4 border-b border-gray-700"
      >
        <Pressable onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#fff" />
        </Pressable>
        <Text className="text-white font-bold text-lg flex-1 text-center">Tracking</Text>
        <View className="w-8" />
      </AnimatedView>

      <AnimatedView
        entering={FadeInUp.delay(100).duration(500)}
        className="flex-1 bg-gray-200 mx-5 my-6 rounded-3xl overflow-hidden"
      >
        <View style={{ width: "100%", height: "100%", backgroundColor: "#E8E8E8" }}>
          <Image
            source={{
              uri: "/images/screenshot-202026-01-10-20at-2023.png",
            }}
            style={{ width: "100%", height: "100%" }}
          />
          <AnimatedView
            style={pulseStyle}
            className="absolute w-12 h-12 bg-primary rounded-full items-center justify-center"
            pointerEvents="none"
          >
            <Text className="text-lg">📍</Text>
          </AnimatedView>
        </View>
      </AnimatedView>

      <AnimatedView entering={FadeInUp.delay(200).duration(500)} className="px-5 mb-6 items-center">
        <Text className="text-white text-xl font-bold mb-1">10 minutes left</Text>
        <Text className="text-gray-400 text-base">Delivery to Jl. Kpg Sutoyo</Text>
      </AnimatedView>

      <AnimatedView entering={FadeInUp.delay(300).duration(500)} className="px-5 mb-6">
        <View className="flex-row gap-1 justify-center mb-6">
          <View className="flex-1 h-1 bg-success rounded-full" />
          <View className="flex-1 h-1 bg-success rounded-full" />
          <View className="flex-1 h-1 bg-success rounded-full" />
          <View className="flex-1 h-1 bg-gray-600 rounded-full" />
        </View>

        <View className="bg-coffee-dark rounded-2xl p-5 mb-6">
          <View className="flex-row items-start mb-3">
            <Text className="text-2xl mr-3">✓</Text>
            <View className="flex-1">
              <Text className="text-white font-semibold mb-1">Delivered your order</Text>
              <Text className="text-gray-400 text-sm">
                We will deliver your goods to you in the shortest possible time.
              </Text>
            </View>
          </View>
        </View>
      </AnimatedView>

      <AnimatedView entering={FadeInUp.delay(400).duration(500)} className="px-5">
        <View className="bg-coffee-dark rounded-2xl p-5 flex-row items-center mb-6">
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=5" }}
            style={{ width: 60, height: 60, borderRadius: 30, marginRight: 12 }}
          />
          <View className="flex-1">
            <Text className="text-white font-semibold">Brooklyn Simmons</Text>
            <Text className="text-gray-400 text-sm">Personal Courier</Text>
          </View>
          <Pressable className="p-2 bg-gray-700 rounded-full">
            <Phone size={20} color="#A0826D" />
          </Pressable>
        </View>

        <Pressable className="py-4 items-center">
          <Text className="text-primary font-semibold">Back to home</Text>
        </Pressable>
      </AnimatedView>
    </View>
  )
}
