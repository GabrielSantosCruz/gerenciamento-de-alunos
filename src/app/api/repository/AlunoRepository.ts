import fs from 'fs';
import path from 'path';
import { Aluno } from '../model/Aluno';

export function getAlunosFromJSON(): Aluno[] {
    const filePath = path.join(process.cwd(), 'src', 'public', 'alunos.json')

    try {
        const fileContents = fs.readFileSync(filePath, 'utf-8');
        const alunos: Aluno[] = JSON.parse(fileContents);

        return alunos
        
    } catch (error) {
        throw new Error(`Erro ao ler arquivo JSON: ${error}`);
    }
}