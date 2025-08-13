interface StatusAluno {
    status: 'Aprovado' | 'Reprovado' | 'Indefinido';
    motivo: string | null;
    media: number;
}