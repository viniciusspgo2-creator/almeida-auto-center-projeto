"use client";

import { useState } from "react";
import { Shield } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/whatsapp-icon";

type Props = {
  phone: string; // digits only, e.g. 5517981708538
};

/**
 * Pre-scheduling form — same UX as the original PHP site: assembles the
 * message and opens WhatsApp. As an improvement, the lead is also stored
 * (fire-and-forget) so the admin can follow up.
 */
export function WhatsAppForm({ phone }: Props) {
  const [sending, setSending] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("nome") || "");
    const vehicle = String(data.get("veiculo") || "");
    const km = String(data.get("km") || "");
    const service = String(data.get("servico") || "");
    const message = String(data.get("mensagem") || "");

    const text = [
      "Olá! Gostaria de solicitar um atendimento no Almeida Auto Center.",
      "",
      `Nome: ${name}`,
      `Veículo: ${vehicle}`,
      km ? `Quilometragem: ${km}` : "",
      `Serviço: ${service}`,
      `Sintoma/necessidade: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    // Store lead (best-effort, never blocks the WhatsApp flow)
    setSending(true);
    fetch("/api/admin/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, vehicle, km, service, message }),
      keepalive: true,
    })
      .catch(() => {})
      .finally(() => setSending(false));

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener"
    );
  };

  return (
    <form onSubmit={handleSubmit} data-whatsapp-form>
      <label>
        <span>Seu nome</span>
        <input
          type="text"
          name="nome"
          autoComplete="name"
          required
          placeholder="Como podemos chamar você?"
        />
      </label>
      <div className="form-row">
        <label>
          <span>Veículo</span>
          <input
            type="text"
            name="veiculo"
            required
            placeholder="Ex.: Onix 2020"
          />
        </label>
        <label>
          <span>Quilometragem</span>
          <input
            type="text"
            name="km"
            inputMode="numeric"
            placeholder="Ex.: 85.000 km"
          />
        </label>
      </div>
      <label>
        <span>Serviço desejado</span>
        <select name="servico" required defaultValue="">
          <option value="">Selecione uma opção</option>
          <option>Diagnóstico por scanner</option>
          <option>Mecânica geral</option>
          <option>Elétrica automotiva</option>
          <option>Injeção eletrônica</option>
          <option>Câmbio automático</option>
          <option>Airbag ou ABS</option>
          <option>Manutenção preventiva</option>
          <option>Outro</option>
        </select>
      </label>
      <label>
        <span>O que está acontecendo?</span>
        <textarea
          name="mensagem"
          rows={5}
          required
          placeholder="Descreva luzes no painel, ruídos, falhas ou comportamento do veículo."
        />
      </label>
      <button
        className="btn btn--red btn--full btn--pulse"
        type="submit"
        disabled={sending}
      >
        <WhatsAppIcon /> Enviar para o WhatsApp
      </button>
      <small className="form-note">
        <Shield className="icon" /> Seus dados não são armazenados neste site.
      </small>
    </form>
  );
}
