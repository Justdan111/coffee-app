
import { useState } from "react"
import { View, Text, ScrollView, Pressable, Image, TextInput, Switch } from "react-native"
import { useRouter } from "expo-router"
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated"
import { ChevronLeft, Edit2, Camera, LogOut } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const AnimatedView = Animated.createAnimatedComponent(View)
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function SettingsScreen() {
  const router = useRouter()
  const [profile, setProfile] = useState({
    name: "James Bond",
    email: "james@bond.com",
    phone: "+123 456 7890",
    address: "221B Baker Street, Abuja ",
  })
  const [notifications, setNotifications] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(profile)
    const insets = useSafeAreaInsets()

  const handleSave = () => {
    setProfile(editedProfile)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  const SettingItem = ({ label, value }: { label: string; value: string }) => (
    <AnimatedView entering={FadeInUp.duration(500)} className="mb-4">
      <Text className="text-gray-400 text-sm mb-2">{label}</Text>
      <View className="bg-coffee-dark rounded-lg px-4 py-3">
        <Text className="text-white text-base">{value}</Text>
      </View>
    </AnimatedView>
  )

  const EditableInput = ({ label, value, placeholder }: { label: string; value: string; placeholder: string }) => (
    <AnimatedView entering={FadeInUp.duration(500)} className="mb-4">
      <Text className="text-gray-400 text-sm mb-2">{label}</Text>
      <View className="bg-coffee-dark rounded-lg px-4 py-3 border border-gray-600">
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#666"
          className="text-white text-base"
          onChangeText={(text) => setEditedProfile({ ...editedProfile, [label.toLowerCase()]: text })}
        />
      </View>
    </AnimatedView>
  )

  return (
     <View className="flex-1 bg-secondary" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <AnimatedView
        entering={FadeInDown.duration(400)}
        className="flex-row justify-between items-center px-5 pt-6 pb-4 border-b border-gray-700"
      >
        <Pressable onPress={() => router.back()} className="p-2 rounded-full bg-gray-800 active:bg-gray-700">
          <ChevronLeft size={24} color="#fff" />
        </Pressable>
        <Text className="text-white font-bold text-lg flex-1 text-center">Settings</Text>
        <View className="w-10" />
      </AnimatedView>

      <ScrollView className="flex-1">
        {/* Profile Picture Section */}
        <AnimatedView entering={FadeInUp.delay(100).duration(500)} className="items-center pt-8 pb-6">
          <View className="relative">
            <Image
              source={require("@/assets/images/avatar.avif")}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Pressable className="absolute bottom-0 right-0 bg-primary p-2 rounded-full">
              <Camera size={20} color="#fff" />
            </Pressable>
          </View>
        </AnimatedView>

        {/* Profile Information */}
        <AnimatedView entering={FadeInUp.delay(150).duration(500)} className="px-5 pb-8">
          {!isEditing ? (
            <>
              {/* Display Mode */}
              <SettingItem label="Full Name" value={profile.name} />
              <SettingItem label="Email" value={profile.email} />
              <SettingItem label="Phone Number" value={profile.phone} />
              <SettingItem label="Address" value={profile.address} />

              <AnimatedPressable
                entering={FadeInUp.delay(300).duration(500)}
                onPress={() => setIsEditing(true)}
                className="coffee-button bg-primary flex-row justify-center items-center py-3 mt-6 active:opacity-80"
              >
                <Edit2 size={20} color="#fff" />
                <Text className="text-white text-base font-semibold ml-2">Edit Profile</Text>
              </AnimatedPressable>
            </>
          ) : (
            <>
              {/* Edit Mode */}
              <EditableInput label="name" value={editedProfile.name} placeholder="Enter your full name" />
              <EditableInput label="email" value={editedProfile.email} placeholder="Enter your email" />
              <EditableInput label="phone" value={editedProfile.phone} placeholder="Enter your phone number" />
              <EditableInput label="address" value={editedProfile.address} placeholder="Enter your address" />

              <View className="flex-row gap-3 mt-6">
                <AnimatedPressable
                  onPress={handleSave}
                  className="flex-1 coffee-button bg-primary justify-center items-center py-3 active:opacity-80"
                >
                  <Text className="text-white text-base font-semibold">Save Changes</Text>
                </AnimatedPressable>
                <AnimatedPressable
                  onPress={handleCancel}
                  className="flex-1 coffee-button bg-coffee-dark border border-gray-600 justify-center items-center py-3 active:opacity-80"
                >
                  <Text className="text-white text-base font-semibold">Cancel</Text>
                </AnimatedPressable>
              </View>
            </>
          )}
        </AnimatedView>

        {/* Preferences Section */}
        <AnimatedView entering={FadeInUp.delay(200).duration(500)} className="px-5 pb-8 border-t border-gray-700 pt-6">
          <Text className="text-white font-bold text-lg mb-4">Preferences</Text>

          <View className="bg-coffee-dark rounded-lg p-4 flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-white font-semibold">Push Notifications</Text>
              <Text className="text-gray-400 text-sm">Order updates & promotions</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#666", true: "#A0826D" }}
            />
          </View>
        </AnimatedView>

        {/* Additional Settings */}
        <AnimatedView entering={FadeInUp.delay(250).duration(500)} className="px-5 pb-8 border-t border-gray-700 pt-6">
          <Text className="text-white font-bold text-lg mb-4">More</Text>

          <Pressable className="bg-coffee-dark rounded-lg p-4 mb-3 flex-row justify-between items-center active:opacity-70">
            <Text className="text-white font-semibold">Payment Methods</Text>
            <Text className="text-gray-400">→</Text>
          </Pressable>

          <Pressable className="bg-coffee-dark rounded-lg p-4 mb-3 flex-row justify-between items-center active:opacity-70">
            <Text className="text-white font-semibold">Order History</Text>
            <Text className="text-gray-400">→</Text>
          </Pressable>

          <Pressable className="bg-coffee-dark rounded-lg p-4 mb-3 flex-row justify-between items-center active:opacity-70">
            <Text className="text-white font-semibold">Help & Support</Text>
            <Text className="text-gray-400">→</Text>
          </Pressable>

          <Pressable className="bg-coffee-dark rounded-lg p-4 mb-3 flex-row justify-between items-center active:opacity-70">
            <Text className="text-white font-semibold">About Us</Text>
            <Text className="text-gray-400">→</Text>
          </Pressable>
        </AnimatedView>

        {/* Logout Button */}
        <AnimatedView entering={FadeInUp.delay(300).duration(500)} className="px-5 pb-8">
          <AnimatedPressable
            onPress={() => router.push("/")}
            className="coffee-button bg-red-600 flex-row justify-center items-center py-3 active:opacity-80 rounded-xl"
          >
            <LogOut size={20} color="#fff" />
            <Text className="text-white text-base font-semibold ml-2">Logout</Text>
          </AnimatedPressable>
        </AnimatedView>

        <View className="h-10" />
      </ScrollView>
    </View>
  )
}
