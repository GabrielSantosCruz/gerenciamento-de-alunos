export interface FiltroAlunos {
  nome?: string | null;
  media?: number | null;
  faltas?: number | null;
  preset?: 'aprovados' | 'reprovados' | null;
}