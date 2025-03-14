"use client";
import { useRouter } from "next/navigation";
import { cerrarSesion } from "@/conexionApi/peticiones"; // Asegúrate de tener esta función
import "../CSS/usuario.css";

export default function UsuarioLogueado() {
    const router = useRouter();

    const handleCerrarSesion = async () => {
        try {
            // Llamamos a la función para cerrar sesión
            await cerrarSesion();
            // Después de cerrar sesión, redirigimos al usuario a la página principal
            router.push("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-elegant-gradient p-6">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg text-center">
                <h1 className="text-3xl font-extrabold text-elegant mb-6 animate__animated animate__fadeIn">
                    Bienvenido Mi Usuario
                </h1>
                <p className="text-gray-600 mb-6 text-lg italic animate__animated animate__fadeIn animate__delay-1s">
                    Esta es la página de los usuarios pana
                </p>
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