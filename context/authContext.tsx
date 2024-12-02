import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type AuthContextType = {
    isAuthenticated: boolean | undefined;
    user: User | null;
    isLoading: boolean;
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


export const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsAuthenticated(false)
            setIsLoading(false)
        }, 4000)
    }, [])

    const login = (nik: number, tanggal_lahir: string) => {
        setIsLoading(true)
        setTimeout(() => {
            setIsAuthenticated(false)
            console.log(nik, tanggal_lahir)
            setIsLoading(false)
        }, 4000)
    }

    const logout = () => {

    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading, token }}>
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