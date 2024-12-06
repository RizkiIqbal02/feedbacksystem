import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Layout from "@/components/Layout";
import {Link} from "expo-router";

export default function Gettingstarted() {
    return (
        <Layout>
            <View style={styles.container}>
                <Image style={styles.image} source={require('../../assets/images/loading-image.png')}/>
                <Text style={{fontSize: 24, fontWeight: 'bold', color: '#eaeaea', textAlign: 'center'}}>KOMPLAIN DAN
                    MASUKKAN MASYARAKAT</Text>
                <Link style={styles.button} href={'/login'}>
                    <Text style={styles.buttonTitle}>Ayo mulai</Text>
                </Link>
            </View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain', // Menjaga proporsi gambar
    },

    button: {
        backgroundColor: '#7F93E3',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 80,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        width: '100%',
        marginHorizontal: 20,
        borderColor: '#000',
        borderWidth: 0.2
    },
    buttonTitle: {
        color: '#eaeaea',
        textAlign: 'center',
    },
});