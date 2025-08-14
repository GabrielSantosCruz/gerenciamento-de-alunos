import { Aluno } from "../model/Aluno";
import { AlunoComStatus, StatusAluno } from "../model/StatusAluno";
import { getAlunosFromJSON } from "../repository/AlunoRepository";
import { FiltroAlunos } from "../model/Filtro";

export function getAllAlunos(): Aluno[] {
    try {
        return getAlunosFromJSON();
    } catch (error) {
        throw new Error(`Erro ao pegar alunos: ${error}`)
    }
}

export function calcularMedia(aluno: Aluno): number {
    try {
        const notas = [aluno.nota_1, aluno.nota_2, aluno.nota_3, aluno.nota_4];
        const notasTratadas = notas.map((nota) => nota === null ? 0 : nota);
        const notasValidas = notasTratadas.filter(nota => typeof nota === 'number') as number[]

        if (notasValidas.length === 0) return 0;

        const media = notasValidas.reduce((soma, nota) => soma + nota, 0) / notasValidas.length

        return parseFloat(media.toFixed(1));
    } catch (error) {
        throw new Error(`Erro ao calcular média do aluno: ${error}`);
    }
}

export function verificarStatus(aluno: Aluno): StatusAluno {
    try {
        const media = calcularMedia(aluno);
        const faltas = aluno.faltas;

        if (media >= 7.0 && faltas < 7) {
            return { status: 'Aprovado', motivo: null, media };
        }

        if (media < 7.0) {
            return { status: 'Reprovado', motivo: 'Média insuficiente', media };
        }

        if (faltas >= 7) {
            return { status: 'Reprovado', motivo: 'Excesso de faltas', media };
        }

        return { status: 'Indefinido', motivo: null, media };
    } catch (error) {
        throw new Error(`Erro ao verificar status do aluno: ${error}`);
    }
}

export const AlunosService = {
    obterTodosOsAlunosComStatus(): AlunoComStatus[] {
        const alunosBrutos = getAlunosFromJSON();
        return alunosBrutos.map(aluno => ({
            ...aluno,
            ...verificarStatus(aluno),
        }));
    },

    filtrarAlunos(filtro: FiltroAlunos): AlunoComStatus[] {
        let alunosProcessados = this.obterTodosOsAlunosComStatus();

        if (filtro.nome) { // O TypeScript já trata 'undefined' e 'null' aqui
            alunosProcessados = alunosProcessados.filter(aluno =>
                aluno.primeiro_nome.toLowerCase().includes(filtro.nome!.toLowerCase()) ||
                aluno.ultimo_nome.toLowerCase().includes(filtro.nome!.toLowerCase())
            );
        }

        if (filtro.media !== null && filtro.media !== undefined) {
            alunosProcessados = alunosProcessados.filter(aluno =>
                aluno.media >= filtro.media!
            );
        }

        if (filtro.faltas !== null && filtro.faltas !== undefined) {
            alunosProcessados = alunosProcessados.filter(aluno =>
                aluno.faltas <= filtro.faltas!
            );
        }

        if (filtro.preset === 'aprovados') {
            alunosProcessados = alunosProcessados.filter(aluno =>
                aluno.status === 'Aprovado'
            );
        } else if (filtro.preset === 'reprovados') {
            alunosProcessados = alunosProcessados.filter(aluno =>
                aluno.status === 'Reprovado'
            );
        }

        return alunosProcessados;
    },
};