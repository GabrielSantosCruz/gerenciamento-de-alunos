import { Aluno } from "../model/Aluno";
import { getAlunosFromJSON } from "../repository/AlunoRepository";

export function calcularMedia(aluno: Aluno): number {
    const notas = [aluno.nota_1, aluno.nota_2, aluno.nota_3, aluno.nota_4];

    const notasTratadas = notas.map(nota => nota === null ? 0 : nota);

    const notasValidas = notasTratadas.filter(nota => typeof nota === 'number') as number[]

    if(notasValidas.length === 0) return 0;

    const media = notasValidas.reduce((soma, nota) => soma + nota, 0) / notasValidas.length

    return parseFloat(media.toFixed(1));
}