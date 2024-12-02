import { View, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useAuth } from '@/context/authContext';

interface LayoutProps extends PropsWithChildren {
    style?: any;
}

export default function Layout({ children, style }: LayoutProps) {
    const { isLoading } = useAuth();

    return (
        <View style={[styles.container, style]}>
            <StatusBar style="light" />

            {/* Linear Gradient Background */}
            {/* <LinearGradient
                colors={['#7F93E3', '#7B5DB0', '#66166D']}
                style={styles.background}
            /> */}

            {/* Lottie loading animation covering entire screen when loading */}
            {isLoading && (
                <View style={styles.overlay}>
                    <LottieView
                        style={styles.lottie}
                        autoPlay
                        loop
                        source={require('../assets/lottie/tangan.json')}
                    />
                </View>
            )}

            {/* Child components */}
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7F93E3', // Fallback background color
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,  // Covers from top of the screen
        bottom: 0, // To bottom of the screen
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Fullscreen overlay
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10, // Ensures overlay is above other elements
    },
    lottie: {
        width: 250,
        height: 250, // Lottie animation size
    },
});
