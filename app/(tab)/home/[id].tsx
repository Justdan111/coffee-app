
import { useState } from "react"
import { View, Text, Image, Pressable, ScrollView } from "react-native"
import { useRouter, useLocalSearchParams } from "expo-router"
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated"
import { ChevronLeft, Heart } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const COFFEE_DETAILS = {
  1: {
    name: "Caffe Mocha",
    type: "Deep Foam",
    price: 40.53,
    rating: 4.8,
    reviews: 230,
    image: require("@/assets/Coffee/2.png"),
    description:
      "A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo...",
    details: [
      { icon: "⏱️", label: "4 minutes" },
      { icon: "☕", label: "High Caffeine" },
      { icon: "🔥", label: "230 Calories" },
    ],
  },
  2: {
    name: "Flat White",
    type: "Espresso",
    price: 30.53,
    rating: 4.8,
    reviews: 230,
   image: require("@/assets/Coffee/3.png"),
    description:
      "A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo...",
    details: [
      { icon: "⏱️", label: "3 minutes" },
      { icon: "☕", label: "Medium Caffeine" },
      { icon: "🔥", label: "180 Calories" },
    ],
  },
}

export default function DetailScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  const coffee = COFFEE_DETAILS[params.id as unknown as keyof typeof COFFEE_DETAILS]
  const [selectedSize, setSelectedSize] = useState("M")
  const [isFavorite, setIsFavorite] = useState(false)
   const insets = useSafeAreaInsets();

  if (!coffee) {
    return (
      <View className="flex-1 bg-secondary justify-center items-center">
        <Text className="text-white">Product not found</Text>
      </View>
    )
  }

  const handleBuyNow = () => {
    router.push("/order")
  }

  return (
    <View className="flex-1 bg-secondary" style={{ paddingTop: insets.top }}>
      <AnimatedView
        entering={FadeInDown.duration(400)}
        className="absolute right-0 z-10 flex-row justify-between items-center px-5 pt-4 pb-4"
        style={{ top: insets.top }}
      >
        <Pressable onPress={() => router.back()} className="p-2 rounded-full bg-gray-800 active:bg-gray-700">
          <ChevronLeft size={24} color="#fff" />
        </Pressable>
        <Text className="text-white font-bold text-lg flex-1 text-center">Detail</Text>
        <Pressable
          onPress={() => setIsFavorite(!isFavorite)}
          className="p-2 rounded-full bg-gray-800 active:bg-gray-700"
        >
          <Heart size={24} color={isFavorite ? "#FF6B6B" : "#fff"} fill={isFavorite ? "#FF6B6B" : "none"} />
        </Pressable>
      </AnimatedView>

      <ScrollView className="flex-1 pt-20">
        <AnimatedView entering={FadeInUp.delay(100).duration(500)} className="px-5 mb-6">
          <Image source={coffee.image} style={{ width: "100%", height: 300, borderRadius: 20 }} />
        </AnimatedView>

        <AnimatedView
          entering={FadeInUp.delay(200).duration(500)}
          className="px-5 mb-6 flex-row justify-between items-start"
        >
          <View>
            <Text className="text-white text-3xl font-bold mb-2">{coffee.name}</Text>
            <Text className="text-gray-400 text-base">{coffee.type}</Text>
          </View>
          <View className="flex-row items-center">
            <Text className="text-yellow-500 mr-1">⭐</Text>
            <View>
              <Text className="text-white font-bold">{coffee.rating}</Text>
              <Text className="text-gray-500 text-xs">({coffee.reviews})</Text>
            </View>
          </View>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(300).duration(500)} className="px-5 mb-6">
          <Text className="text-white font-bold text-lg mb-4">Description</Text>
          <Text className="text-gray-400 text-sm leading-6 mb-2">{coffee.description}</Text>
          <Pressable>
            <Text className="text-primary font-semibold">Read More</Text>
          </Pressable>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(400).duration(500)} className="px-5 mb-6">
          <Text className="text-white font-bold text-lg mb-4">Size</Text>
          <View className="flex-row justify-between">
            {["S", "M", "L"].map((size) => (
              <Pressable
                key={size}
                onPress={() => setSelectedSize(size)}
                className={`flex-1 mx-2 py-4 rounded-full border-2 items-center ${
                  selectedSize === size ? "bg-transparent border-primary" : "bg-transparent border-gray-600"
                }`}
              >
                <Text className={`font-semibold text-base ${selectedSize === size ? "text-primary" : "text-white"}`}>
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>
        </AnimatedView>

        <AnimatedView entering={FadeInUp.delay(500).duration(500)} className="px-5">
          <View className="flex-row justify-between items-center mb-6 pb-4 border-b border-gray-700">
            <Text className="text-gray-400">Price</Text>
            <Text className="text-primary text-2xl font-bold">₦{coffee.price}</Text>
          </View>
        </AnimatedView>
      </ScrollView>

      <AnimatedView
        entering={FadeInUp.delay(600).duration(500)}
        className="px-5 pb-6 bg-secondary border-t border-gray-700"
      >
        <AnimatedPressable onPress={handleBuyNow} className="coffee-button bg-primary justify-center items-center py-4">
          <Text className="text-white text-lg font-semibold">Buy Now</Text>
        </AnimatedPressable>
      </AnimatedView>
    </View>
  )
}
