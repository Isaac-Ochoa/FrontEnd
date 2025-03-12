import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.withCredentials = true;

export const registro = async (usuario) => {
    console.log(`${API}/registro`);
    return await axios.post(`${API}/registro`, usuario,{withCredentials: true});
}

export const inicioSesion = async (usuario) => {
    try {
        const rutaLogin = `${API}/inicioSesion`
        const respuesta =  await axios.post(rutaLogin,{usuario},{withCredentials: true});
        //console.log(respuesta);
        
        if (!respuesta.data) return {estado:false}
        return {estado:true,tipoUsuario:respuesta.data}        
    } catch (error) {
        //console.log(error);
        return {estado:false}
    }
}

export const libre = async() => {
    return await axios.get(`${API}/libre`)
}

export const usuarioLogueado = async() => {
    return await axios.get(`${API}/usuarioLogueado`)
}

export const administradores = async() => {
    return await axios.get(`${API}/administradores`)
}

export const cerrarSesion = async() => {
    return await axios.get(`${API}/cerrarSesion`)
}

export const usuarios = async() => {
    return await axios.get(`${API}/usuarios`)
}

export const eliminar = async (id) => {
    return await axios.delete(`${API}/usuarios/${id}`);
};

export const actualizar = async (id, datos) => {
    return await axios.put(`${API}/usuarios/${id}`, datos);
};