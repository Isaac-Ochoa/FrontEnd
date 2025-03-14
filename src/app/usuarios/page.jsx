"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usuarios, eliminar, cerrarSesion } from "@/conexionApi/peticiones";
import "../CSS/usuariosU.css";

export default function VerUsuarios() {
    const [listaUsuarios, setListaUsuarios] = useState([]);
    const router = useRouter();

    useEffect(() => {
        UsuariosObtenidos();
    }, []);

    const UsuariosObtenidos = async () => {
        try {
            const respuesta = await usuarios(); 
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-elegant-gradient p-6">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-4xl text-center">
                <h1 className="text-3xl font-extrabold text-elegant mb-6 animate__animated animate__fadeIn">Pagina de los Usuarios</h1>
                
                {listaUsuarios.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="table-header">
                                <th className="table-cell">ID</th>
                                <th className="table-cell">Nombre de Usuario</th>
                                <th className="table-cell">Email</th>
                                <th className="table-cell">Tipo de Usuario</th>
                                <th className="table-cell">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaUsuarios.map((usuario) => (
                                <tr key={usuario._id} className="table-row">
                                    <td className="table-cell">{usuario._id}</td>
                                    <td className="table-cell">{usuario.username}</td>
                                    <td className="table-cell">{usuario.email}</td>
                                    <td className="table-cell">{usuario.tipoUsuario}</td>
                                    <td className="table-cell">
                                        <button 
                                            onClick={() => handleEliminar(usuario._id)} 
                                            className="button-delete"
                                        >
                                            ❌ Eliminar
                                        </button>
                                        <button 
                                            onClick={() => router.push(`/usuarios/editar/${usuario._id}`)} 
                                            className="button-update"
                                        >
                                            🚀Actualizar
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
                    className="button-elegant-danger mt-6"
                >
                    ❌ Cerrar Sesión
                </button>
            </div>
        </div>
    );
}