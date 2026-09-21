"use client";

import { useState } from "react";
import { Loader2, Megaphone, Phone, Save, Type } from "lucide-react";
import { toast } from "sonner";
import type { SiteSettings } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImageUpload } from "@/components/admin/image-upload";
import { Field } from "@/components/admin/field";

export function SiteTab({
  settings,
  onSaved,
}: {
  settings: SiteSettings;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);

  function set(key: keyof SiteSettings, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        toast.error("Não foi possível salvar.");
        return;
      }
      toast.success("Configurações salvas! O site já reflete as mudanças.");
      onSaved();
    } catch {
      toast.error("Erro de conexão.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <Card className="border-zinc-800 bg-zinc-900/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Phone className="h-4 w-4 text-red-500" /> Dados de contato e
            atendimento
          </CardTitle>
          <CardDescription>
            Estes dados alimentam o site inteiro (topo, rodapé, contato,
            WhatsApp e Google).
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome do site">
            <Input
              className="bg-zinc-950 border-zinc-800"
              value={form.siteName}
              onChange={(e) => set("siteName", e.target.value)}
            />
          </Field>
          <Field label="Telefone exibido">
            <Input
              className="bg-zinc-950 border-zinc-800"
              value={form.phoneDisplay}
              onChange={(e) => set("phoneDisplay", e.target.value)}
            />
          </Field>
          <Field
            label="Telefone (só números, com DDI)"
            hint="Ex.: 5517981708538 — usado no botão do WhatsApp e no tel:"
          >
            <Input
              className="bg-zinc-950 border-zinc-800"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>
          <Field label="Horário de atendimento">
            <Input
              className="bg-zinc-950 border-zinc-800"
              value={form.hours}
              onChange={(e) => set("hours", e.target.value)}
            />
          </Field>
          <Field label="Endereço completo" className="sm:col-span-2">
            <Input
              className="bg-zinc-950 border-zinc-800"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
            />
          </Field>
          <Field label="ID do vídeo Vimeo" hint="Somente o número do vídeo">
            <Input
              className="bg-zinc-950 border-zinc-800"
              value={form.vimeoId}
              onChange={(e) => set("vimeoId", e.target.value)}
            />
          </Field>
          <Field label="Mensagem padrão do WhatsApp">
            <Input
              className="bg-zinc-950 border-zinc-800"
              value={form.whatsappDefaultMessage}
              onChange={(e) => set("whatsappDefaultMessage", e.target.value)}
            />
          </Field>
          <Field
            label="Mensagem do botão flutuante"
            className="sm:col-span-2"
          >
            <Input
              className="bg-zinc-950 border-zinc-800"
              value={form.whatsappFloatingMessage}
              onChange={(e) => set("whatsappFloatingMessage", e.target.value)}
            />
          </Field>
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Megaphone className="h-4 w-4 text-red-500" /> Banners (imagens de
            topo)
          </CardTitle>
          <CardDescription>
            Envie imagens largas (1920×1080 recomendado). Deixe vazio para usar
            o banner padrão de cada página.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <ImageUpload
            label="Página inicial"
            value={form.bannerHome}
            onChange={(url) => set("bannerHome", url)}
            hint="banner-home"
          />
          <ImageUpload
            label="Página Serviços"
            value={form.bannerServicos}
            onChange={(url) => set("bannerServicos", url)}
            hint="banner-servicos"
          />
          <ImageUpload
            label="Página Sobre"
            value={form.bannerSobre}
            onChange={(url) => set("bannerSobre", url)}
            hint="banner-sobre"
          />
          <ImageUpload
            label="Página Contato"
            value={form.bannerContato}
            onChange={(url) => set("bannerContato", url)}
            hint="banner-contato"
          />
          <ImageUpload
            label="Seção CTA final (todas as páginas)"
            value={form.bannerFinalCta}
            onChange={(url) => set("bannerFinalCta", url)}
            hint="banner-cta-final"
          />
        </CardContent>
      </Card>

      <Card className="border-zinc-800 bg-zinc-900/60">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Type className="h-4 w-4 text-red-500" /> Textos editáveis
          </CardTitle>
          <CardDescription>
            Principais chamadas do site, sempre com a identidade visual
            preservada.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="CTA final — sobrelinha">
            <Input
              className="bg-zinc-950 border-zinc-800"
              value={form.textFinalCtaEyebrow}
              onChange={(e) => set("textFinalCtaEyebrow", e.target.value)}
            />
          </Field>
          <Field label="CTA final — título">
            <Input
              className="bg-zinc-950 border-zinc-800"
              value={form.textFinalCtaTitle}
              onChange={(e) => set("textFinalCtaTitle", e.target.value)}
            />
          </Field>
          <Field label="CTA final — subtítulo">
            <Textarea
              className="bg-zinc-950 border-zinc-800"
              rows={2}
              value={form.textFinalCtaSubtitle}
              onChange={(e) => set("textFinalCtaSubtitle", e.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="CTA final — texto do botão">
              <Input
                className="bg-zinc-950 border-zinc-800"
                value={form.textFinalCtaButton}
                onChange={(e) => set("textFinalCtaButton", e.target.value)}
              />
            </Field>
            <Field label="Rodapé — descrição do site">
              <Input
                className="bg-zinc-950 border-zinc-800"
                value={form.textFooterAbout}
                onChange={(e) => set("textFooterAbout", e.target.value)}
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      <SaveBar saving={saving} onSave={save} />
    </div>
  );
}

export function SaveBar({
  saving,
  onSave,
}: {
  saving: boolean;
  onSave: () => void;
}) {
  return (
    <div className="sticky bottom-4 flex justify-end">
      <Button
        onClick={onSave}
        disabled={saving}
        className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-950/40"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        Salvar alterações
      </Button>
    </div>
  );
}

export function Label2({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Label className="text-zinc-300">{children}</Label>;
}
