import { View, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';

export default function StartUpPage() {
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient
                // Background Linear Gradient
                colors={['#7F93E3', '#7B5DB0', '#66166D']}
                style={styles.background}
            />
            <LottieView
                style={{ width: 300, height: 300 }}
                autoPlay
                loop
                source={require('../assets/lottie/tangan.json')}
            />

            {/* <ActivityIndicator size={50} color={'#fff'} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
