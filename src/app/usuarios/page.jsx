"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usuarios, eliminar, cerrarSesion } from "@/conexionApi/peticiones";

export default function VerUsuarios() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const router = useRouter();

    useEffect(() => {
        UsuariosObtenidos();
    }, []);

    const UsuariosObtenidos = async () => {
        try {
            const respuesta = await usuarios(); // Asegúrate de que la función usuarios() esté definida
            if (Array.isArray(respuesta.data.token)) {
                setListaUsuarios(respuesta.data.token);
            } else {
                setListaUsuarios([]);
            }
        } catch (error) {
            console.error("Error para obtener al usuario pana", error);
            setListaUsuarios([]);
        }
    };

    const handleEliminar = async (id) => {
        try {
            await eliminar(id); // Asegúrate de que la función eliminar() esté definida
            setListaUsuarios(prevState => prevState.filter(usuario => usuario._id !== id));
        } catch (error) {
            console.error("Error para eliminar al usuario pana", error);
        }
    };

    const handleCerrarSesion = async () => {
        try {
            await cerrarSesion(); // Asegúrate de que la función cerrarSesion() esté definida
            router.push("/");
        } catch (error) {
            console.error("Error no se pudo cerrar la sesión", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl text-center">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6 animate__animated animate__fadeIn">Página De Usuarios</h1>
                
                {listaUsuarios.length > 0 ? (
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 border-b-2 border-gray-300">
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Nombre de Usuario</th>
                                <th className="border border-gray-300 p-2">Email</th>
                                <th className="border border-gray-300 p-2">Tipo de Usuario</th>
                                <th className="border border-gray-300 p-2">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaUsuarios.map((usuario) => (
                                <tr key={usuario._id} className="border-b border-gray-300 hover:bg-gray-100 transition">
                                    <td className="border border-gray-300 p-2">{usuario._id}</td>
                                    <td className="border border-gray-300 p-2">{usuario.username}</td>
                                    <td className="border border-gray-300 p-2">{usuario.email}</td>
                                    <td className="border border-gray-300 p-2">{usuario.tipoUsuario}</td>
                                    <td className="border border-gray-300 p-2">
                                        <button 
                                            onClick={() => handleEliminar(usuario._id)} 
                                            className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 transition m-1"
                                        >
                                            Eliminar
                                        </button>
                                        <button 
                                            onClick={() => router.push(`/usuarios/editar/${usuario._id}`)} 
                                            className="bg-blue-600 text-white py-1 px-3 rounded-lg hover:bg-blue-700 transition m-1"
                                        >
                                            Actualizar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600">No hay ningún registro</p>
                )}
                
                <button 
                    onClick={handleCerrarSesion} 
                    className="mt-6 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition w-full"
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}