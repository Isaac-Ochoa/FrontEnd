"use client";
import { useRouter } from "next/navigation";
import "./CSS/principal.css";

export default function Libre() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-elegant-gradient text-elegant">
            <h1 className="text-4xl font-extrabold mb-6">Bienvenidos Amigos A mi App</h1>
            <h1 className="text-4xl font-extrabold mb-6">Esta es la mejor app xD</h1>
            <div className="space-x-4">
                <button 
                    onClick={() => router.push("/inicioSesion")} 
                    className="button-elegant"
                >
                    🚀 Inicia Sesión
                </button>
                <button 
                    onClick={() => router.push("/registro")} 
                    className="button-elegant-danger"
                >
                    ❌ Regístrate
                </button>
            </div>
        </div>
    );
}