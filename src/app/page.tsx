'use client'
import { useEffect, useState } from "react";
import { AlunoComStatus } from "./api/model/StatusAluno";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as React from 'react';

export default function Home() {
  const [alunos, setAlunos] = useState<AlunoComStatus[] | null>(null);

  useEffect(() => {
    async function fetchAlunos() {
      const res = await fetch("/api");
      const data: AlunoComStatus[] = await res.json();
      setAlunos(data);
    }
    fetchAlunos();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] flex items-center justify-items-center min-h-screen p-8 pb-20 gap-160">
      <ScrollArea className="h-[900px] w-[750px] rounded-md border p-4">
        {alunos && alunos.map((aluno) => (
          <React.Fragment key={aluno.id}>
            <div className="text-sm">{aluno.primeiro_nome}</div>
            <div className="text-sm">{aluno.media}</div>
          </React.Fragment>
        ))}
      </ScrollArea>
    </div>
  );
}