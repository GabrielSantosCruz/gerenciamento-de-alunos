import { NextResponse } from "next/server";
import { getAlunosFromJSON } from "./repository/AlunoRepository";
import { calcularMedia } from "./service/AlunoService";

export async function GET(request: Request){
    try {
        const alunos = await getAlunosFromJSON();
        alunos.map((aluno) => {
            console.log(calcularMedia(aluno));
        })

        return NextResponse.json(alunos)
    } catch (error) {
        console.error("Erro: ", error);
    }
}