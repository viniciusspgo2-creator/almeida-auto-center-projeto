"use client";

import { useCallback, useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

type ButtonState = "idle" | "busy" | "done";

/**
 * BOTÃO TEMPORÁRIO — baixa o código-fonte completo do projeto em .zip.
 * Para removê-lo: apague este arquivo, a rota /api/download e a linha
 * <TempDownloadButton /> em src/app/layout.tsx.
 */
export function TempDownloadButton() {
  const [state, setState] = useState<ButtonState>("idle");

  const handleDownload = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (state === "busy") return;
      setState("busy");
      try {
        const response = await fetch("/api/download");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = "almeida-auto-center-projeto.zip";
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        window.setTimeout(() => URL.revokeObjectURL(url), 15_000);
        setState("done");
        toast.success("Download iniciado! Verifique sua pasta de downloads.");
        window.setTimeout(() => setState("idle"), 2600);
      } catch (error) {
        console.error("[temp-download] falha ao gerar o ZIP:", error);
        setState("idle");
        toast.error("Não foi possível gerar o ZIP. Tente novamente.");
      }
    },
    [state],
  );

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={state === "busy"}
      title="Botão temporário — baixa o código-fonte completo do projeto (.zip)"
      aria-label="Baixar projeto completo em ZIP (botão temporário)"
      className="fixed bottom-[82px] left-3 z-[960] inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-[#0a0a0b]/95 py-2.5 pl-3.5 pr-2.5 text-[12px] font-extrabold text-white shadow-[0_14px_34px_rgba(0,0,0,0.35)] backdrop-blur transition hover:-translate-y-0.5 hover:border-white/40 disabled:cursor-wait disabled:opacity-75 md:bottom-[22px] md:left-[22px] md:text-[13px]"
    >
      {state === "busy" ? (
        <Loader2 className="size-[17px] shrink-0 animate-spin text-[#ed1c24]" aria-hidden />
      ) : (
        <Download className="size-[17px] shrink-0 text-[#ed1c24]" aria-hidden />
      )}
      <span className="whitespace-nowrap">
        {state === "busy" ? "Gerando ZIP…" : state === "done" ? "Baixado!" : "Projeto .zip"}
      </span>
      <span className="rounded-full bg-[#ed1c24]/15 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider text-[#ff6b70]">
        temp
      </span>
    </button>
  );
}
