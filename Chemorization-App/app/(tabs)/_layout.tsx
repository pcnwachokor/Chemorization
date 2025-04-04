import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useCustomTheme } from "@/app/_layout";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { mode } = useCustomTheme(); // Get the custom dark/light mode state

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          height: 100,
          paddingTop: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="one"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
          headerShown: true,
          headerTitleStyle: { color: mode === 'dark' ? '#fff' : '#000' },

        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Notes",
          headerShown: true,
          headerTitleStyle: { color: mode === 'dark' ? '#fff' : '#000' },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="sticky-note" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="six"
        options={{
          title: "Formula Solver",
          headerShown: true,
          headerTitleStyle: { color: mode === 'dark' ? '#fff' : '#000' },
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="plus" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: "Braille Print",
          headerShown: true,
          headerTitleStyle: { color: mode === 'dark' ? '#fff' : '#000' },
          tabBarIcon: ({ color }) => <TabBarIcon name="print" color={color} />,
        }}
      />
      <Tabs.Screen
        name="five"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: true,
          headerTitleStyle: { color: mode === 'dark' ? '#fff' : '#000' },
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="seven"
        options={{
          title: "Summarizer",
          tabBarIcon: ({ color }) => <TabBarIcon name="file" color={color} />,
        }}
      />
    </Tabs>
  );
}