"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { actualizar, usuarios } from "@/conexionApi/peticiones";

export default function EditarUsuario() {
    const router = useRouter();
    const { id } = router.query; // Cambié esto de useParams a router.query ya que estás usando Next.js
    const [usuario, setUsuario] = useState({
        username: "",
        email: "",
        tipoUsuario: ""
    });

    useEffect(() => {
        if (id) obtenerUsuario(); // Asegurarse de que id está disponible
    }, [id]);

    const obtenerUsuario = async () => {
        try {
            const respuesta = await usuarios(); // Asumir que la función usuarios() está definida
            const usuarioEncontrado = respuesta.data.token.find(u => u._id === id);
            if (usuarioEncontrado) {
                setUsuario(usuarioEncontrado);
            }
        } catch (error) {
            console.error("Error al obtener usuario:", error);
        }
    };

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await actualizar(id, usuario); // Asumir que la función actualizar() está definida
            router.push("/usuarios");
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg transform transition duration-500 hover:scale-105">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center animate__animated animate__fadeIn">
                    Editar Usuario
                </h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <input
                        type="text"
                        name="username"
                        value={usuario.username}
                        onChange={handleChange}
                        required
                        placeholder="Nombre de usuario"
                        className="border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                    <input
                        type="email"
                        name="email"
                        value={usuario.email}
                        onChange={handleChange}
                        required
                        placeholder="Correo electrónico"
                        className="border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    />
                    <select 
                        name="tipoUsuario" 
                        value={usuario.tipoUsuario} 
                        onChange={handleChange} 
                        required 
                        className="border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                    >
                        <option value="admin">Admin</option>
                        <option value="usuario">Usuario</option>
                    </select>
                    <button 
                        type="submit" 
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transform transition duration-300 ease-in-out shadow-lg hover:scale-105"
                    >
                        Actualizar
                    </button>
                </form>
            </div>
        </div>
    );
}