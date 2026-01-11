import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#000000",
            tabBarInactiveTintColor: "#9ca3af",
            tabBarStyle: {
              backgroundColor: "#ffffff",
              borderTopWidth: 1,
              borderTopColor: "#f3f4f6",
              paddingBottom: 8,
              paddingTop: 8,
              height: 80,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "500",
            },
          }}
        >
          <Tabs.Screen
            name="home/index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="home/[id]"
            options={{
              title: "Details",
              href: null, // Hidden from tab bar
            }}
          />
        </Tabs>
  );
}