
import { useState } from "react"
import { View, Text, TextInput, Pressable, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import Animated, { FadeInUp } from "react-native-reanimated"
import { LinearGradient } from "expo-linear-gradient"

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export default function LoginScreen() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState({ email: "", password: "" })

  const validateForm = () => {
    let isValid = true
    const newErrors = { email: "", password: "" }

    if (!email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    }

    if (!password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleLogin = () => {
    if (validateForm()) {
      router.push("/home")
    }
  }

  const handleSignUp = () => {
    router.push("/signup")
  }

  return (
    <LinearGradient colors={["#000000", "#2D2D2D"]} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
        <View className="flex-1 justify-center pt-12">
          {/* Header */}
          <Animated.View entering={FadeInUp.delay(0).duration(800)} className="mb-8">
            <Text className="text-4xl font-bold text-white mb-2">Welcome Back</Text>
            <Text className="text-base text-gray-400">Sign in to your coffee account</Text>
          </Animated.View>

          {/* Email Input */}
          <Animated.View entering={FadeInUp.delay(100).duration(800)} className="mb-6">
            <Text className="text-sm font-semibold text-gray-300 mb-2">Email Address</Text>
            <TextInput
              placeholder="your@email.com"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700"
            />
            {errors.email ? <Text className="text-red-500 text-xs mt-1">{errors.email}</Text> : null}
          </Animated.View>

          {/* Password Input */}
          <Animated.View entering={FadeInUp.delay(200).duration(800)} className="mb-2">
            <Text className="text-sm font-semibold text-gray-300 mb-2">Password</Text>
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#888"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="bg-gray-900 text-white px-4 py-3 rounded-lg border border-gray-700"
            />
            {errors.password ? <Text className="text-red-500 text-xs mt-1">{errors.password}</Text> : null}
          </Animated.View>

          {/* Forgot Password */}
          <Animated.View entering={FadeInUp.delay(300).duration(800)} className="mb-8">
            <Pressable>
              <Text className="text-primary text-sm font-semibold">Forgot Password?</Text>
            </Pressable>
          </Animated.View>

          {/* Login Button */}
          <Animated.View entering={FadeInUp.delay(400).duration(800)} className="mb-4">
            <AnimatedPressable
              onPress={handleLogin}
              className="coffee-button bg-primary flex items-center justify-center py-4"
            >
              <Text className="text-white text-lg font-bold">Sign In</Text>
            </AnimatedPressable>
          </Animated.View>

          {/* Divider */}
          <Animated.View entering={FadeInUp.delay(500).duration(800)} className="flex-row items-center mb-4">
            <View className="flex-1 h-px bg-gray-700" />
            <Text className="text-gray-500 mx-3 text-sm">or</Text>
            <View className="flex-1 h-px bg-gray-700" />
          </Animated.View>

          {/* Sign Up Link */}
          <Animated.View entering={FadeInUp.delay(600).duration(800)}>
            <Pressable onPress={handleSignUp} className="flex-row items-center justify-center py-4">
              <Text className="text-gray-400">Don&apos;t have an account? </Text>
              <Text className="text-primary font-bold">Sign Up</Text>
            </Pressable>
          </Animated.View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}
