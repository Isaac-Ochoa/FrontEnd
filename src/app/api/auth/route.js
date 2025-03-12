import { NextResponse } from "next/server";
import { usuarioAutorizado } from "@/lib/auth";

export async function GET() {    
    const estado = await usuarioAutorizado();
    return NextResponse.json({ estado });
}