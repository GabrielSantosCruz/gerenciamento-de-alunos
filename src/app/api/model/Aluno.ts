export interface Aluno {
    id:         number;
    primeiro_nome: string;
    ultimo_nome:  string;
    nota_1:      number | null;
    nota_2:      number | null;
    nota_3:      number | null;
    nota_4:      number | null;
    faltas:     number | null;
}