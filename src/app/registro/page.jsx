"use client";
import { registro } from "@/conexionApi/peticiones";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import "../CSS/editar.css";

export default function Registro1() {
    const { register, handleSubmit } = useForm();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-elegant-gradient p-6">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg transform transition duration-500 hover:scale-105">
                <h1 className="text-3xl font-extrabold text-elegant mb-6 text-center animate__animated animate__fadeIn">
                    🚀 Registrate
                </h1>
                <form 
                    onSubmit={handleSubmit(async (usuario) => {
                        const respuesta = await registro(usuario);
                        redirect("/usuarioLogueado");
                    })}
                    className="flex flex-col"
                >
                    <input 
                        type="text" 
                        placeholder="Usuario" 
                        {...register("username")} 
                        className="input-elegant"
                    />
                    <input 
                        type="text" 
                        placeholder="Correo" 
                        {...register("email")} 
                        className="input-elegant"
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña" 
                        {...register("password")} 
                        className="input-elegant"
                    />
                    <button 
                        type="submit" 
                        className="button-elegant"
                    >
                        🚀 Guardar usuario
                    </button>
                </form>
            </div>
        </div>
    );
}