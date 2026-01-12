
import { View, Text, Image, Pressable, ImageSourcePropType, StyleSheet } from "react-native"
import { useRouter } from "expo-router"
import Animated, { FadeInUp, FadeInDown } from "react-native-reanimated"
import { ChevronLeft, Phone } from "lucide-react-native"
import MapView, { Marker, UrlTile, PROVIDER_DEFAULT } from "react-native-maps"
import { useSafeAreaInsets } from "react-native-safe-area-context"

interface trackingData {
  estimatedTime: string
  deliveryAddress: string
  progress: number
  customer: {
    name: string
    avatar: ImageSourcePropType
    phone: string
  }
  coordinates: {
    latitude: number
    longitude: number
  }
}

// mockdata for tracking screen
const TRACKING_DATA: trackingData = {
  estimatedTime: "10 minutes left",
  deliveryAddress: "Abuja Nigeria.",
  progress: 3,
  customer: {
    name: "Dane Emmanuel",
    avatar: require("@/assets/images/avatar.avif"),
    phone: "+234 801 234 5678",
  },
  coordinates: {
    latitude: 9.0579,
    longitude: 7.4951,
  },
}

const AnimatedView = Animated.createAnimatedComponent(View)

export default function TrackingScreen() {
  const router = useRouter()
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-secondary" style={{ paddingTop: insets.top }}>
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
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          initialRegion={{
            latitude: TRACKING_DATA.coordinates.latitude,
            longitude: TRACKING_DATA.coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          mapType="standard"
        >
          {/* OpenStreetMap tiles overlay */}
          <UrlTile
            urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maximumZ={19}
            flipY={false}
          />
          <Marker
            coordinate={{
              latitude: TRACKING_DATA.coordinates.latitude,
              longitude: TRACKING_DATA.coordinates.longitude,
            }}
            title="Delivery Location"
            description={TRACKING_DATA.deliveryAddress}
          >
            <View className="bg-primary p-2 rounded-full">
              <Text className="text-lg">📍</Text>
            </View>
          </Marker>
        </MapView>
      </AnimatedView>

      <AnimatedView entering={FadeInUp.delay(200).duration(500)} className="px-5 mb-6 items-center">
        <Text className="text-white text-xl font-bold mb-1">{TRACKING_DATA.estimatedTime}</Text>
        <Text className="text-gray-400 text-base">Delivery to {TRACKING_DATA.deliveryAddress}</Text>
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
            source={TRACKING_DATA.customer.avatar}
            style={{ width: 60, height: 60, borderRadius: 30, marginRight: 12 }}
          />
          <View className="flex-1">
            <Text className="text-white font-semibold">{TRACKING_DATA.customer.name}</Text>
            <Text className="text-gray-400 text-sm">Personal Courier</Text>
          </View>
          <Pressable className="p-2 bg-gray-700 rounded-full">
            <Phone size={20} color="#A0826D" />
          </Pressable>
        </View>

      </AnimatedView>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
})
