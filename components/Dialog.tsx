import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LottieView from "lottie-react-native";
import React from "react";
import {useAuth} from "@/context/authContext";

export default function Dialog({onContinue}: { onContinue: () => void }) {
    const {confirmation, setConfirmation} = useAuth();
    return (
        <View style={styles.overlay}>
            <View style={styles.errorMessageOverlay}>
                <LottieView
                    style={styles.lottie}
                    autoPlay
                    loop
                    source={require('../assets/lottie/confirmation.json')}
                />
                <Text style={{textAlign: 'center', color: '#000', fontSize: 18, fontWeight: 'bold'}}>
                    {confirmation}
                </Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '90%', gap: 20}}>
                    <TouchableOpacity onPress={() => setConfirmation(null)}
                                      style={[styles.okButton, {backgroundColor: 'red'}]}>
                        <Text style={{color: '#fff', textAlign: 'center'}}>Batalkan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onContinue}
                                      style={[styles.okButton, {backgroundColor: '#7F93E3'}]}>
                        <Text style={{color: '#fff', textAlign: 'center'}}>Lanjutkan</Text>
                    </TouchableOpacity>
                </View>
            </View>
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
        zIndex: 9999999999, // Ensures overlay is above other elements
    },
    errorMessageOverlay: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 25,
        borderRadius: 5,
    },
    lottie: {
        width: 250,
        height: 250, // Lottie animation size
    },
    okButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        elevation: 2,
        flex: 1,
    },
});