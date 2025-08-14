'use client'
import { useEffect, useState } from "react";
import { AlunoComStatus } from "./api/model/StatusAluno";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlunoCard } from "@/components/ui/AlunoCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [alunos, setAlunos] = useState<AlunoComStatus[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [filterType, setFilterType] = useState<"nome" | "media" | "faltas">("nome");
  const [filtroMedia, setfiltroMedia] = useState("");
  const [mediaComparator, setMediaComparator] = useState<">" | "<" | "=">(">");
  const [faltasFilter, setFaltasFilter] = useState("");
  const [faltasComparator, setFaltasComparator] = useState<">" | "<" | "=">(">");

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

  const alunosFiltrados = alunos?.filter(aluno => {
    const matchesStatus = statusFilter === "todos" || 
                         aluno.status.toLowerCase() === statusFilter.toLowerCase();
    
    if (filterType === "nome") {
      const matchesSearch = aluno.primeiro_nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          aluno.ultimo_nome.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
      return matchesStatus && matchesSearch;
    }
    
    if (filterType === "media") {
      if (!filtroMedia) return matchesStatus;
      const mediaValue = parseFloat(filtroMedia);
      const alunoMedia = aluno.media;
      
      switch (mediaComparator) {
        case ">": return matchesStatus && alunoMedia > mediaValue;
        case "<": return matchesStatus && alunoMedia < mediaValue;
        case "=": return matchesStatus && alunoMedia === mediaValue;
        default: return matchesStatus;
      }
    }
    
    if (filterType === "faltas") {
      if (!faltasFilter) return matchesStatus;
      const faltasValue = parseInt(faltasFilter);
      const alunoFaltas = aluno.faltas;
      
      switch (faltasComparator) {
        case ">": return matchesStatus && alunoFaltas > faltasValue;
        case "<": return matchesStatus && alunoFaltas < faltasValue;
        case "=": return matchesStatus && alunoFaltas === faltasValue;
        default: return matchesStatus;
      }
    }
    
    return matchesStatus;
  });

  return (
    <div className="min-h-screen p-5 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-4xl space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Controle de Alunos</h1>
        
        <RadioGroup 
          defaultValue="nome" 
          className="flex gap-4"
          onValueChange={(value: "nome" | "media" | "faltas") => setFilterType(value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nome" id="r1" />
            <Label htmlFor="r1">Buscar por nome</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="media" id="r2" />
            <Label htmlFor="r2">Filtrar por média</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="faltas" id="r3" />
            <Label htmlFor="r3">Filtrar por faltas</Label>
          </div>
        </RadioGroup>

        <div className="flex flex-col gap-4">
          {filterType === "nome" && (
            <Input
              placeholder="Buscar por nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}

          {filterType === "media" && (
            <div className="flex gap-2">
              <Select value={mediaComparator} onValueChange={(value: ">" | "<" | "=") => setMediaComparator(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="">
                  <SelectItem value=">">Maior que</SelectItem>
                  <SelectItem value="<">Menor que</SelectItem>
                  <SelectItem value="=">Igual a</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Valor da média"
                value={filtroMedia}
                onChange={(e) => setfiltroMedia(e.target.value)}
                step="0.1"
                min="0"
                max="10"
              />
            </div>
          )}

          {filterType === "faltas" && (
            <div className="flex gap-2">
              <Select value={faltasComparator} onValueChange={(value: ">" | "<" | "=") => setFaltasComparator(value)}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=">">Maior que</SelectItem>
                  <SelectItem value="<">Menor que</SelectItem>
                  <SelectItem value="=">Igual a</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Número de faltas"
                value={faltasFilter}
                onChange={(e) => setFaltasFilter(e.target.value)}
                min="0"
              />
            </div>
          )}

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os alunos</SelectItem>
              <SelectItem value="Aprovado">Aprovados</SelectItem>
              <SelectItem value="Reprovado">Reprovados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Lista de Alunos */}
        <ScrollArea className="h-[calc(100vh-300px)] rounded-md border bg-white p-4 shadow-sm">
          {alunos === null ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          ) : alunosFiltrados?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum aluno encontrado com os filtros aplicados.
            </div>
          ) : (
            <div className="space-y-4">
              {alunosFiltrados?.map((aluno) => (
                <AlunoCard key={aluno.id} aluno={aluno} />
              ))}
            </div>
          )}
        </ScrollArea>

        {alunos && (
          <div className="text-sm text-gray-500 text-right">
            Exibindo {alunosFiltrados?.length} de {alunos.length} alunos
          </div>
        )}
      </div>
    </div>
  );
}