import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";

type AuthContextType = {
    isAuthenticated: boolean | undefined;
    user: User | null;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void,
    error: string | null;
    success: string | null;
    confirmation: string | null;
    setConfirmation: (confirmation: string | null) => void;
    setSuccess: (success: string | null) => void;
    setError: (error: string | null) => void;
    token: string | null;
    login: (nik: number, tanggal_lahir: string) => void;
    logout: () => void;
}

type User = {
    id: number,
    nik: number,
    nama: string,
    tempat_lahir: string,
    tanggal_lahir: string,
    jenis_kelamin: string,
    agama: string,
    alamat: string,
    pendidikan: string,
    pekerjaan: string,
    status_perkawinan: string,
    status_dalam_keluarga: string,
    kewarganegaraan: string,
    nama_ayah: string,
    nama_ibu: string,
    created_at: string,
    updated_at: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthContextProvider = ({children}: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState(null)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [confirmation, setConfirmation] = useState<string | null>(null)

    useEffect(() => {
        setIsLoading(true)
        const getData = async () => {
            const token = await AsyncStorage.getItem('token');
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (!token || !userInfo) {
                setIsAuthenticated(false)
                setIsLoading(false)
                return
            }
            setIsAuthenticated(true)
            setIsLoading(false)
        };
        getData()
    }, [])

    const login = async (nik: number, tanggal_lahir: string) => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.post('/login', {
                nik,
                tanggal_lahir
            })

            const {token, userInfo} = response.data

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));

            router.replace('/home')

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

    const logout = async () => {
        setIsLoading(true)
        try {
            const currentToken = await AsyncStorage.getItem('token');
            await axios.post(process.env.EXPO_PUBLIC_API_URL + '/logout', '', {
                headers: {
                    Authorization: `Bearer ${currentToken}`
                }
            });
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userInfo');
            setIsAuthenticated(false)
            setIsLoading(false)
            router.replace('/login')
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
        <AuthContext.Provider
            value={{
                isAuthenticated,
                user,
                login,
                logout,
                isLoading,
                token,
                error,
                setError,
                setIsLoading,
                success,
                setSuccess,
                confirmation,
                setConfirmation
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const value = useContext(AuthContext)

    if (value === undefined) {
        throw new Error('useAuth must be used within AuthContextProvider')
    }

    return value
}