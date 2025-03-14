"use client"
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import { inicioSesion } from "@/conexionApi/peticiones";

export default function Login() {
    const router = useRouter();
    const [mensaje, setMensaje] = useState("");
    const { register, handleSubmit, reset, setFocus } = useForm();

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            <div className="bg-white p-8 rounded-xl shadow-xl w-96 transform transition duration-500 hover:scale-105">
                <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6 animate__animated animate__fadeIn">
                🚀 Iniciar Sesión
                </h1>
                
                <form 
                    className="flex flex-col"
                    onSubmit={handleSubmit(async (usuario) => {
                        const respuesta = await inicioSesion(usuario);
                        
                        if (respuesta.tipoUsuario === "usuario") {
                            router.push("/usuarioLogueado");
                        } else if (respuesta.tipoUsuario === "admin") {
                            router.push("/administradores");
                        } else {
                            setMensaje("Datos incorrectos");
                            toast.error("Usuario o contraseña incorrectos");
                            reset();
                            setTimeout(() => setFocus("username"), 100);
                        }
                    })}
                >
                    <input 
                        type="text" 
                        placeholder="Usuario" 
                        {...register("username")} 
                        className="px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                    
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        {...register("password")} 
                        className="px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                    
                    <button 
                        type="submit" 
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105"
                    >
                        🚀 Ingresar
                    </button>
                </form>
                
                {mensaje && <p className="text-red-500 text-center mt-4">{mensaje}</p>}
            </div>
        </div>
    );
}