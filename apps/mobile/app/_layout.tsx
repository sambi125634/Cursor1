import { Tabs } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="services" options={{ title: 'Services' }} />
      <Tabs.Screen name="booking" options={{ title: 'Booking' }} />
      <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

