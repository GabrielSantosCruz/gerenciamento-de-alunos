'use client'
import { useEffect, useState } from "react";
import { AlunoComStatus } from "./api/model/StatusAluno";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlunoCard } from "@/components/ui/AlunoCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [alunos, setAlunos] = useState<AlunoComStatus[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");

  useEffect(() => {
    async function fetchAlunos() {
      try {
        const res = await fetch("/api");
        const data: AlunoComStatus[] = await res.json();
        setAlunos(data);
      } catch (error) {
        console.error("Erro ao carregar alunos:", error);
        setAlunos([]);
      }
    }
    fetchAlunos();
  }, []);

  const filteredAlunos = alunos?.filter(aluno => {
    const matchesSearch = aluno.primeiro_nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aluno.ultimo_nome.includes(searchTerm);
    const matchesStatus = statusFilter === "todos" || aluno.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen p-8 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Controle de Alunos</h1>

        {/* Filtros e Busca */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Buscar por nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os status</SelectItem>
              <SelectItem value="aprovado">Aprovados</SelectItem>
              <SelectItem value="reprovado">Reprovados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lista de Alunos */}
        <ScrollArea className="h-[calc(100vh-220px)] rounded-md border bg-white p-4 shadow-sm">
          {alunos === null ? (
            // Skeleton loading
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          ) : filteredAlunos?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm || statusFilter !== "todos"
                ? "Nenhum aluno encontrado com os filtros aplicados."
                : "Nenhum aluno cadastrado."}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAlunos?.map((aluno) => (
                <AlunoCard key={aluno.id} aluno={aluno} />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Contador de resultados */}
        {alunos && (
          <div className="text-sm text-gray-500 text-right">
            Exibindo {filteredAlunos?.length} de {alunos.length} alunos
          </div>
        )}
      </div>
    </div>
  );
}