"use client";
import { useRouter } from "next/navigation";
import { cerrarSesion } from "@/conexionApi/peticiones";
import { useAuth } from "@/hooks/useAuth";

export default function Administradores() {
    const autorizado = useAuth(["admin"]);
    const router = useRouter();

    if (autorizado === null) {
        return <p className="text-center text-purple-700 text-lg font-semibold animate-pulse">Estamos verificando si no eres un robot...</p>;
    }
    
    const handleCerrarSesion = async () => {
        try {
            await cerrarSesion();
            router.push("/");
        } catch (error) {
            console.error("Error para cerrar sesión pana", error);
        }
    };

    const handleVerUsuarios = () => {
        router.push("/usuarios"); 
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-fixed">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center border-4 border-purple-500 transform transition duration-500 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-purple-700 mb-4 animate__animated animate__fadeIn">¡Bienvenido Mi Admin!</h1>
                <p className="text-gray-600 mb-6 text-lg italic animate__animated animate__fadeIn animate__delay-1s">Estás en la página de Jefes de Jefes Pana</p>
                <button 
                    onClick={handleVerUsuarios} 
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-xl hover:scale-110 transition-transform duration-300 w-full font-semibold shadow-lg transform hover:shadow-xl"
                >
                    🚀 Ver Usuarios
                </button>
                <button 
                    onClick={handleCerrarSesion} 
                    className="bg-gradient-to-r from-red-500 to-red-700 text-white py-3 px-6 rounded-xl hover:scale-110 transition-transform duration-300 w-full mt-3 font-semibold shadow-lg transform hover:shadow-xl"
                >
                    ❌ Cerrar Sesión
                </button>
            </div>
        </div>
    );
}
