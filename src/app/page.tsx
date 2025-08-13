'use client'
import { useEffect, useState } from "react";
import { AlunoComStatus } from "./api/model/StatusAluno";

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
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16">
      {
        alunos && alunos.map((aluno) => (
          <div key={aluno.id}>{aluno.primeiro_nome} - {aluno.media}</div>
        ))
      }
    </div>
  );
}