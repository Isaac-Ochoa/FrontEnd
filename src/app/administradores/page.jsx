"use client";
import { useRouter } from "next/navigation";
import { cerrarSesion } from "@/conexionApi/peticiones";
import { useAuth } from "@/hooks/useAuth";
import "../CSS/admin.css";

export default function Administradores() {
    const autorizado = useAuth(["admin"]);
    const router = useRouter();

    if (autorizado === null) {
        return <p className="text-center text-gray-700 text-lg font-semibold animate-pulse">Estamos verificando si no eres un robot...</p>;
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-elegant-gradient bg-fixed">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center border-4 border-gray-300 transform transition duration-500 hover:scale-105">
                <h1 className="text-4xl font-extrabold text-elegant mb-4 animate__animated animate__fadeIn">¡Bienvenido Mi Admin!</h1>
                <p className="text-gray-600 mb-6 text-lg italic animate__animated animate__fadeIn animate__delay-1s">Estás en la página de Jefes de Jefes Pana</p>
                <button 
                    onClick={handleVerUsuarios} 
                    className="button-elegant"
                >
                    🚀 Ver Usuarios
                </button>
                <button 
                    onClick={handleCerrarSesion} 
                    className="button-elegant-danger"
                >
                    ❌ Cerrar Sesión
                </button>
            </div>
        </div>
    );
}