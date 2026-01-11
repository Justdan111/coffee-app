
import { useState, useCallback } from "react"
import { View, Text, ScrollView, Pressable, Image, TextInput } from "react-native"
import { useRouter } from "expo-router"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { Search, ShoppingCart, MapPin } from "lucide-react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const COFFEE_DATA = [
  {
    id: 1,
    name: "Caffe Mocha",
    type: "Deep Foam",
    price: 40.53,
    rating: 4.8,
    reviews: 230,
    image: require("@/assets/Coffee/2.png"),
  },
  {
    id: 2,
    name: "Flat White",
    type: "Espresso",
    price: 30.53,
    rating: 4.8,
    reviews: 230,
    image: require("@/assets/Coffee/3.png"),
  },
  {
    id: 3,
    name: "Cappuccino",
    type: "With Oat Milk",
    price: 25.0,
    rating: 4.5,
    reviews: 150,
    image: require("@/assets/Coffee/5.png"),
  },
  {
    id: 4,
    name: "Espresso",
    type: "Strong & Bold",
    price: 20.0,
    rating: 4.7,
    reviews: 180,
    image: require("@/assets/Coffee/6.png"),
  },
]

const CATEGORIES = ["All Coffee", "Machiato", "Latte", "Americano"]

export default function HomeScreen() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("All Coffee")
  const [searchText, setSearchText] = useState("")

  const navigateToDetail = useCallback(
    (coffee: (typeof COFFEE_DATA)[0]) => {
      router.push({
        pathname: "/home/[id]",
        params: { id: coffee.id.toString(), name: coffee.name },
      })
    },
    [router],
  )

  const CoffeeCard = ({ item, index }: { item: (typeof COFFEE_DATA)[0]; index: number }) => (
    <AnimatedView entering={FadeInUp.delay(index * 100).duration(500)} className="w-[48%] mb-4">
      <Pressable onPress={() => navigateToDetail(item)} className=" ">
        <View className="relative">
          <Image source={item.image} style={{ width: "100%", height: 180, borderRadius: 12, marginBottom: 8 }} />
          <View className="absolute top-2 right-2 flex-row items-center  px-2 py-1 rounded-full">
            <Text className="text-yellow-500 mr-1">⭐</Text>
            <Text className="text-white font-semibold">{item.rating}</Text>
          </View>
        </View>
        <Text className="text-white font-semibold text-base mb-1">{item.name}</Text>
        <Text className="text-gray-400 text-sm mb-3">{item.type}</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-primary text-lg font-bold">₦{item.price}</Text>
         <Pressable className="bg-primary px-3 py-1 rounded-lg">
            <Text className="text-white font-semibold">+</Text>
          </Pressable>
        </View>
      </Pressable>
    </AnimatedView>
  )

  return (
    <SafeAreaView className="flex-1 bg-secondary">
      <AnimatedView entering={FadeInDown.duration(500)} className="px-5 pt-6 pb-4  rounded-xl p-4">
        <View className="flex-row justify-between items-center mb-6 ">
          <View>
            <Text className="text-gray-400 text-sm">Location</Text>
            <View className="flex-row items-center mt-1">
              <MapPin size={20} color="#A0826D" />
              <Text className="text-white font-semibold ml-2">Abuja, Nigeria</Text>
            </View>
          </View>
          <View className="bg-primary rounded-xl p-3">
            <ShoppingCart size={24} color="#fff" />
          </View>
        </View>

        <View className="flex-row items-center bg-coffee-dark rounded-full px-4 py-3 mb-6">
          <Search size={20} color="#888" />
          <TextInput
            placeholder="Search coffee"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
            className="ml-3 flex-1 text-white"
          />
        </View>

        <View className="bg-primary/55 rounded-2xl p-3 mb-6 flex-row items-center overflow-hidden">
          <View className="flex-1">
            <Text className="text-white bg-red-500 px-2 py-1 rounded-xl inline-block mb-2 w-16 text-center font-semibold text-sm">
              Promo
            </Text>
            <Text className="text-white text-3xl font-bold">Buy one get</Text>
            <Text className="text-white text-3xl font-bold">one FREE</Text>
          </View>
          <View className="rounded-full overflow-hidden">
            <Image
              source={require("@/assets/Coffee/1.png")}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
          </View>
        </View>
      </AnimatedView>

      <ScrollView className="px-5">
        <View className="mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            {CATEGORIES.map((category, index) => (
              <AnimatedView key={category} entering={FadeInUp.delay(index * 50).duration(400)} className="mr-3">
                <Pressable
                  onPress={() => setSelectedCategory(category)}
                  className={`px-5 py-3 rounded-full ${
                    selectedCategory === category ? "bg-primary" : "bg-coffee-dark"
                  }`}
                >
                  <Text className={`font-semibold ${selectedCategory === category ? "text-white" : "text-gray-400"}`}>
                    {category}
                  </Text>
                </Pressable>
              </AnimatedView>
            ))}
          </ScrollView>
        </View>

        <View className="flex-row flex-wrap justify-between gap-3">
          {COFFEE_DATA.map((item, index) => (
            <CoffeeCard key={item.id} item={item} index={index} />
          ))}
        </View>

        <View className="h-10" />
      </ScrollView>

    </SafeAreaView>
  )
}
