import { View, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useAuth } from '@/context/authContext';

export default function Layout({ children }: PropsWithChildren) {
    const { isLoading } = useAuth()
    return (
        <View style={[styles.container]}>
            <StatusBar style="light" />
            {/* <LinearGradient
                // Background Linear Gradient
                colors={['#7F93E3', '#7B5DB0', '#66166D']}
                style={styles.background}
            /> */}
            {isLoading ?
                <LottieView
                    style={{ width: 250, height: 250, position: 'absolute', zIndex: 10, top: '50%', left: '50%', transform: [{ translateX: -125 }, { translateY: -125 }] }}
                    autoPlay
                    loop
                    source={require('../assets/lottie/tangan.json')}
                />
                :
                ''
            }
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7F93E3', // Fallback color
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,  // Mulai dari atas layar
        bottom: 0, // Sampai bawah layar
    },
});
