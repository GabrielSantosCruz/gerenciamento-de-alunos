import { NextResponse } from "next/server";
import { getAlunosFromJSON } from "./repository/AlunoRepository";

export async function GET(request: Request){
    try {
        const alunos = await getAlunosFromJSON();
        return NextResponse.json(alunos)
    } catch (error) {
        console.error("Erro: ", error);
    }
}