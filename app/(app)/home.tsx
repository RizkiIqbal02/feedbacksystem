import Layout from "@/components/Layout";
import {Link} from "expo-router";
import {Text, View, StyleSheet, TouchableOpacity, TextInput, Button, Image} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Rating} from "react-native-ratings";
import {Picker} from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios/index";
import {useAuth} from "@/context/authContext";

type User = {
    id: number;
    nama: string;
    nama_ayah: string;
    nama_ibu: string;
    nik: string;
    agama: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    jenis_kelamin: string;
    kewarganegaraan: string;
    pendidikan: string;
    pekerjaan: string;
    status_perkawinan: string;
    status_dalam_keluarga: string;
    alamat: string;
    created_at: string;
    updated_at: string;
};

type Category = {
    id: number;
    nama: string;
    created_at: string;
    updated_at: string;
}

export default function Home() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentToken, setCurrentToken] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [image, setImage] = useState<string | null>(null);
    const [categoryList, setCategoryList] = useState<Category[]>([])
    const [rating, setRating] = useState(1)
    const [komentar, setKomentar] = useState('')
    const {setError, setIsLoading, setSuccess, logout} = useAuth()

    const pickImage = async () => {
        setIsLoading(true)
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
        setIsLoading(false)
    };

    useEffect(() => {
        setIsLoading(true)

        async function getLocalData() {
            const userInfo = await AsyncStorage.getItem('userInfo');
            const token = await AsyncStorage.getItem('token');
            if (userInfo) {
                setCurrentUser(JSON.parse(userInfo));
            }
            if (token) {
                setCurrentToken(token);
                await getCategory(token)
            }
            setIsLoading(false)
        }

        getLocalData();
    }, []);

    async function getCategory(token: string) {
        const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setCategoryList(response.data.data)
    }

    const sendData = async () => {
        setIsLoading(true)
        const formData = new FormData();

        formData.append('penduduk_id', currentUser?.id.toString() || '');
        formData.append('kategori_id', selectedCategory.toString());
        formData.append('rating', rating.toString());
        formData.append('komentar', komentar);
        if (image) {
            const imageParts = image.split('.');
            const fileType = imageParts[imageParts.length - 1];
            formData.append('gambar', {
                uri: image,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            } as any);
        }

        try {
            const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + '/feedback', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${currentToken}`
                }
            });
            console.log(response.data)
            setSuccess(`${response.data.message} Terimakasih, ulasan anda sangat berarti bagi kami`)
            setRating(1)
            setKomentar('')
            setImage(null)
            setIsLoading(false)
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setError(e.response?.data.message || 'An error occurred');
            } else {
                setError('An unexpected error occurred');
            }
            setIsLoading(false);
        }
    }


    return (
        <Layout>
            <View style={styles.container}>
                <Text style={styles.header}>KOMPLAIN DAN MASUKKAN MASYARAKAT</Text>
                <View style={styles.formContainer}>
                    <Text style={{fontWeight: 'bold'}}>TINGKAT KEPUASAN TERHADAP PEMERINTAH</Text>
                    <Rating
                        startingValue={rating}
                        showRating={false}
                        imageSize={25}
                        onFinishRating={(rating: number) => {
                            setRating(rating);
                        }}
                        style={{paddingVertical: 10, alignItems: 'flex-start'}}
                    />
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {image && <Image source={{uri: image}} style={{
                            width: '100%',
                            height: 200,
                        }}/>}
                        <TouchableOpacity style={{borderWidth: 1, margin: 10, borderRadius: 5}} onPress={pickImage}>
                            <Text style={{
                                padding: 10,
                                borderRadius: 5,
                                color: '#000',
                            }}>Upload an image</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderWidth: 0.2, marginBottom: 10, borderRadius: 5, backgroundColor: '#eaeaea'}}>
                        <Picker
                            style={{height: 50}}
                            itemStyle={{fontSize: 2}}
                            selectedValue={selectedCategory}

                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedCategory(itemValue)
                            }>
                            {categoryList.map((category) => (
                                <Picker.Item key={category.id} label={category.nama} value={category.id}/>
                            ))}
                        </Picker>
                    </View>
                    <TextInput inputMode={'text'} multiline={true} style={styles.input}
                               onChangeText={(text) => setKomentar(text)}
                               value={komentar}
                               placeholder={'Tambahkan komentar'}/>
                    <TouchableOpacity onPress={() => sendData()} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>Kirim</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => logout()} style={{
                    position: 'absolute',
                    top: 30,
                    right: 20,
                    backgroundColor: '#7F93E3',
                    padding: 10,
                    borderRadius: 5,
                    alignItems: 'center',
                    elevation: 3,
                    borderColor: '#000',
                    borderWidth: 1
                }}>
                    <Text style={{color: '#fff'}}>Keluar</Text>
                </TouchableOpacity>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 20,
    },
    formContainer: {
        zIndex: 999,
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#fff"
    },
    submitButton: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});
