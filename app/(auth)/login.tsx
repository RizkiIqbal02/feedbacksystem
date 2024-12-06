import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, SafeAreaView, Platform, Alert } from 'react-native';
import React from 'react';
import Layout from '@/components/Layout';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAuth } from '@/context/authContext';

export default function LogIn() {
    const [date, setDate] = React.useState('');
    const [nik, setNik] = React.useState('');
    const [show, setShow] = React.useState(false);
    const { login, isLoading } = useAuth();

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        setShow(false);
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0]; // Format YYYY-MM-DD
            setDate(formattedDate);
        }
    };

    const validateInputs = () => {
        if (!nik) {
            Alert.alert('Error', 'NIK tidak boleh kosong.');
            return false;
        }
        if (!/^\d{16}$/.test(nik)) {
            Alert.alert('Error', 'NIK harus 16 digit angka.');
            return false;
        }
        if (!date) {
            Alert.alert('Error', 'Tanggal lahir tidak boleh kosong.');
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateInputs()) {
            login(parseInt(nik), date);
        }
    };

    return (
        <Layout style={styles.layout}>
            <SafeAreaView>
                <View style={{ alignItems: 'center' }}>
                    <Image style={styles.image} source={require('../../assets/images/baca-buku.png')} />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>
                    KOMPLAIN DAN MASUKKAN MASYARAKAT
                </Text>
                <View style={styles.container}>
                    <View style={{ backgroundColor: '#fff' }}>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>NIK</Text>
                            <TextInput
                                value={nik}
                                onChangeText={setNik}
                                inputMode='numeric'
                                style={styles.input}
                                placeholder='Masukkan NIK'
                                keyboardType="numeric"
                                editable={isLoading ? false : true}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontWeight: 'bold' }}>Tanggal lahir</Text>
                            <TouchableOpacity onPress={() => setShow(true)}>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Masukkan Tanggal lahir'
                                    value={date}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            {show && (
                                <RNDateTimePicker
                                    mode='date'
                                    display={Platform.OS === 'ios' ? 'inline' : 'default'}
                                    value={date ? new Date(date) : new Date()}
                                    onChange={handleDateChange}
                                />
                            )}
                        </View>
                        <View style={styles.buttonRow}>
                            <TouchableOpacity style={[styles.submitButton, { marginRight: 10 }]}>
                                <Text style={{ color: '#0096FF' }}>Keluar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={isLoading}
                                style={[styles.submitButton, { backgroundColor: '#0096FF' }]}
                                onPress={handleSubmit}
                            >
                                <Text style={{ color: '#fff' }}>Lanjutkan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    layout: {
        justifyContent: 'flex-end',
        padding: 20,
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain', // Menjaga proporsi gambar
    },
    container: {
        marginTop: 20,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        elevation: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    submitButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#eaeaea',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        borderBottomWidth: 4,
    },
});
