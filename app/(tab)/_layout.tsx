
import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";

export default function TabLayout() {
  // Animated tab icon component
  const AnimatedTabIcon: React.FC<{ name: keyof typeof Ionicons.glyphMap; color: string; size: number; focused: boolean }> = ({ name, color, size, focused }) => {
    const scale = useSharedValue(focused ? 1.2 : 1);
    React.useEffect(() => {
      scale.value = withTiming(focused ? 1.2 : 1, { duration: 300 });
    }, [focused]);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));
    return (
      <Animated.View style={animatedStyle}>
        <Ionicons name={name} size={size} color={color} />
      </Animated.View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#C67C4E",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1A1A1A",
          borderTopWidth: 1,
          borderTopColor: "#2D2D2D",
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="home" color={color} size={size} focused={focused} />
          ),
        }}
      />
          <Tabs.Screen
            name="home/[id]"
            options={{
              title: "Details",
              href: null, // Hidden from tab bar
            }}
          />
      <Tabs.Screen
        name="order"
        options={{
          title: "Order",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="cart" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          title: "Tracking",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="location" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon name="settings" color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}