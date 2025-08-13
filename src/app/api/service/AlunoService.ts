import { Aluno } from "../model/Aluno";
import { getAlunosFromJSON } from "../repository/AlunoRepository";

export function getAllAlunos(): Aluno[]{
    try {
        return getAlunosFromJSON();
    } catch (error) {
        throw new Error(`Erro ao pegar alunos: ${error}`)
    }
}

export function calcularMedia(aluno: Aluno): number {
    try{
        const notas = [aluno.nota_1, aluno.nota_2, aluno.nota_3, aluno.nota_4];
        const notasTratadas = notas.map(nota => nota === null ? 0 : nota);
        const notasValidas = notasTratadas.filter(nota => typeof nota === 'number') as number[]
    
        if(notasValidas.length === 0) return 0;
    
        const media = notasValidas.reduce((soma, nota) => soma + nota, 0) / notasValidas.length
    
        return parseFloat(media.toFixed(1));
    } catch(error){
        throw new Error(`Erro ao calcular média do aluno: ${error}`);
    }
}