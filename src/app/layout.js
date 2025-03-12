export const metadata = {
    title: "Frontend",
    description: "Sitio del frontend"
}
export default function Rootlayout({children}){
    return(
        <html lang="es">
        <body>
            {children}
        </body>
    </html>
    );
}