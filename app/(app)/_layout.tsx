import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

export default function RootLayout() {
    console.log("RootLayout (app)");
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" />
            <Stack.Screen
                name="details"
                options={{
                    presentation: 'modal',
                    animation: 'ios_from_right',
                }}
            />
        </Stack>
    )
}