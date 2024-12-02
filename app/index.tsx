import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useAuth } from '@/context/authContext';
import Layout from '@/components/Layout';

export default function StartUpPage() {
    return (
        <Layout />
    );
}