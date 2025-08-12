export interface Aluno {
    id:         number;
    first_name: string;
    last_name:  string;
    nota1:      number | null;
    nota2:      number | null;
    nota3:      number | null;
    faltas:     number | null;
}