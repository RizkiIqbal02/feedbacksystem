import React from 'react'
import {Stack} from 'expo-router';

export default function RootLayout() {
    console.log("RootLayout (auth)");
    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="login"/>
            <Stack.Screen
                name="gettingstarted"
                options={{
                    presentation: 'modal',
                    animation: 'ios_from_right',
                }}
            />
        </Stack>
    )
}