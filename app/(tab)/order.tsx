
import { useState } from "react"
import { View, Text, Pressable, ScrollView, Image } from "react-native"
import { useRouter } from "expo-router"
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated"
import { ChevronLeft } from "lucide-react-native"

const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function OrderScreen() {
  const router = useRouter()
  const [deliveryType, setDeliveryType] = useState("deliver")
  const [quantity, setQuantity] = useState(1)

  const handleOrder = () => {
    router.push("/(tab)/tracking")
  }

  return (
    <View className="flex-1 bg-secondary">
      <AnimatedView
        entering={FadeInDown.duration(400)}
        className="flex-row justify-between items-center px-5 py-4 border-b border-gray-700"
      >
        <Pressable onPress={() => router.back()} className="p-2">
          <ChevronLeft size={24} color="#fff" />
        </Pressable>
        <Text className="text-white font-bold text-lg flex-1 text-center">Order</Text>
        <View className="w-8" />
      </AnimatedView>

      <ScrollView className="flex-1">
        <AnimatedView entering={FadeInUp.delay(100).duration(500)} className="px-5 py-6">
          <View className="flex-row bg-coffee-dark rounded-full p-1 mb-6">
            {["Deliver", "Pick Up"].map((type, idx) => (
              <Pressable
                key={type}
                onPress={() => setDeliveryType(type.toLowerCase())}
                className={`flex-1 py-3 rounded-full items-center ${
                  deliveryType === type.toLowerCase() ? "bg-primary" : ""
                }`}
              >
                <Text
                  className={`font-semibold ${deliveryType === type.toLowerCase() ? "text-white" : "text-gray-400"}`}
                >
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(200).duration(500)} className="px-5">
          <Text className="text-white font-bold text-lg mb-4">Delivery Address</Text>
          <View className="bg-coffee-dark rounded-2xl p-4 mb-6">
            <Text className="text-white font-semibold mb-1">Jl. Kpg Sutoyo</Text>
            <Text className="text-gray-400 text-sm">Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.</Text>
            <View className="flex-row mt-4 gap-2">
              <Pressable className="flex-1 border border-primary rounded-full py-2 items-center">
                <Text className="text-primary font-semibold text-sm">✏️ Edit Address</Text>
              </Pressable>
              <Pressable className="flex-1 border border-primary rounded-full py-2 items-center">
                <Text className="text-primary font-semibold text-sm">📝 Add Note</Text>
              </Pressable>
            </View>
          </View>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(300).duration(500)} className="px-5">
          <View className="bg-coffee-dark rounded-2xl p-4 flex-row items-center mb-6">
            <Image
              source={{
                uri: "/images/screenshot-202026-01-10-20at-2023.png",
              }}
              style={{ width: 60, height: 60, borderRadius: 10, marginRight: 12 }}
            />
            <View className="flex-1">
              <Text className="text-white font-semibold">Caffe Mocha</Text>
              <Text className="text-gray-400 text-sm">Deep Foam</Text>
            </View>
            <View className="flex-row items-center bg-secondary rounded-full px-2 py-1">
              <Pressable onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Text className="text-primary font-bold text-lg px-2">−</Text>
              </Pressable>
              <Text className="text-white font-semibold px-2">{quantity}</Text>
              <Pressable onPress={() => setQuantity(quantity + 1)}>
                <Text className="text-primary font-bold text-lg px-2">+</Text>
              </Pressable>
            </View>
          </View>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(400).duration(500)} className="px-5 mb-6">
          <Pressable className="bg-coffee-dark rounded-2xl p-4 flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">🎁</Text>
              <Text className="text-white font-semibold">1 Discount is Applies</Text>
            </View>
            <Text className="text-gray-400">›</Text>
          </Pressable>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(500).duration(500)} className="px-5">
          <Text className="text-white font-bold text-lg mb-4">Payment Summary</Text>
          <View className="bg-coffee-dark rounded-2xl p-4 mb-6">
            <View className="flex-row justify-between mb-3 pb-3 border-b border-gray-700">
              <Text className="text-gray-400">Price</Text>
              <Text className="text-white font-semibold">$4.53</Text>
            </View>
            <View className="flex-row justify-between mb-4 pb-3 border-b border-gray-700">
              <Text className="text-gray-400">Delivery Fee</Text>
              <View className="flex-row items-center">
                <Text className="text-gray-500 line-through mr-2">$2.0</Text>
                <Text className="text-white font-semibold">$1.0</Text>
              </View>
            </View>
            <Pressable className="py-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-2">💳</Text>
                  <View>
                    <Text className="text-white font-semibold">Cash/Wallet</Text>
                    <Text className="text-primary text-sm">$5.53</Text>
                  </View>
                </View>
                <Text className="text-gray-400">›</Text>
              </View>
            </Pressable>
          </View>
        </AnimatedView>

        <View className="h-4" />
      </ScrollView>

      <AnimatedView
        entering={FadeInUp.delay(600).duration(500)}
        className="px-5 pb-6 bg-secondary border-t border-gray-700"
      >
        <AnimatedPressable onPress={handleOrder} className="coffee-button bg-primary justify-center items-center py-4">
          <Text className="text-white text-lg font-semibold">Order</Text>
        </AnimatedPressable>
      </AnimatedView>
    </View>
  )
}
