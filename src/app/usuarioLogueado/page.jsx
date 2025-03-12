"use client";
import { useRouter } from "next/navigation";
import { cerrarSesion } from "@/conexionApi/peticiones"; // Asegúrate de tener esta función

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
        <div>
            <h1>Bienvenido, Usuario</h1>
            <p>Esta es la página para usuarios logueados.</p>
            <button onClick={handleCerrarSesion}>Cerrar Sesión</button>
        </div>
    );
}
