'use client'
import { AlunoComStatus } from "@/app/api/model/StatusAluno";
import { Divider } from "@mui/material";

interface AlunoCardProps {
    aluno: AlunoComStatus;
}

export function AlunoCard({ aluno }: AlunoCardProps) {
    // Função para determinar a cor com base no status
    const getStatusColor = () => {
        switch (aluno.status) {
            case 'Aprovado':
                return 'bg-green-100 text-green-800';
            case 'Reprovado':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">
                    {aluno.primeiro_nome} {aluno.ultimo_nome}
                </h3>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getStatusColor()}`}>
                    {aluno.status}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-sm text-gray-600">Média</p>
                    <p className="font-medium">{aluno.media}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-600">Faltas</p>
                    <p className="font-medium">{aluno.faltas}</p>
                </div>
            </div>
            <Divider />

        </div>
    );
}