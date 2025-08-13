import { Aluno } from "./Aluno";

export interface StatusAluno {
    status: 'Aprovado' | 'Reprovado' | 'Indefinido';
    motivo: string | null;
    media: number;
}

export interface AlunoComStatus extends Aluno, StatusAluno {}