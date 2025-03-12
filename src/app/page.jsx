"use client";
import { useRouter } from "next/navigation";

export default function Libre() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <h1 className="text-4xl font-extrabold mb-6">Bienvenidos Amigos</h1>
            <div className="space-x-4">
                <button 
                    onClick={() => router.push("/inicioSesion")} 
                    className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
                >
                    Inicia Sesión
                </button>
                <button 
                    onClick={() => router.push("/registro")} 
                    className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105"
                >
                    Regístrate
                </button>
            </div>
        </div>
    );
}