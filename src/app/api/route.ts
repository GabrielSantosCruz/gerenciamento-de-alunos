import { NextResponse } from 'next/server';
import { AlunosService } from './service/AlunoService';
import { AlunoComStatus } from './model/StatusAluno';
import { FiltroAlunos } from './model/Filtro';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const nome = searchParams.get('nome');
    const preset = searchParams.get('preset');

    let presetValue: 'aprovados' | 'reprovados' | null = null;

    if (preset === 'aprovados' || preset === 'reprovados') {
      presetValue = preset;
    }

    const filtro: FiltroAlunos = {
      nome: nome,
      preset: presetValue,
    };

    console.log(presetValue);

    const alunosFiltrados: AlunoComStatus[] = AlunosService.filtrarAlunos(filtro);
    const alunosStatus = AlunosService.obterTodosOsAlunosComStatus()

    return NextResponse.json(alunosFiltrados);

  } catch (error) {
    console.error('Erro na requisição GET:', error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}