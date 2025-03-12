"use client"
import { registro } from "@/conexionApi/peticiones";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";

export default function Registro1(){
    const {register, handleSubmit} = useForm()
    return(
        <form action="" onSubmit={handleSubmit(async(usuario)=>{
            //console.log(usuario);
            const respuesta = await registro(usuario);
            //console.log(respuesta);
            redirect("/usuarioLogueado")
            
            
        })}>
            <h1>Registrate</h1>
            <input type="text" placeholder="Usuario" {... register("username")} /><br /> <br />
           <input type="text" placeholder="Correo" {... register("email")} /><br /> <br />
           <input type="text" placeholder="Contraseña" {... register("password")} /><br /> <br />
           <button type="submit">Guardar usuario</button>
        </form>
        
    );
}