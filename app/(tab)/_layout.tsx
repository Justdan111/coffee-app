import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
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
          <Tabs.Screen
            name="order"
            options={{
              title: "Order",
              
              tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="tracking"
            options={{
              title: "Tracking",

              tabBarIcon: ({ color, size }) => <Ionicons name="location" size={size} color={color} />,
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
            }}
          />
        </Tabs>
  );
}