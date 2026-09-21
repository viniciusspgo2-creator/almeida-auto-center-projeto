import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

const PROJECT_ROOT = process.cwd();
const ZIP_NAME = "almeida-auto-center-projeto.zip";

/**
 * BOTÃO TEMPORÁRIO — gera o ZIP do projeto completo sob demanda.
 * Remova esta rota (e o componente TempDownloadButton) quando não for mais necessária.
 */
const EXCLUDES = [
  "node_modules/*",
  ".next/*",
  ".git/*",
  ".pgdata/*",
  ".zscripts/*",
  "skills/*",
  "examples/*",
  "tests/*",
  "download/*",
  "dev.log",
  "*.zip",
  "db/*.db",
  "*.db",
  "*.sqlite*",
  ".DS_Store",
  "tsconfig.tsbuildinfo",
];

async function buildProjectZip(): Promise<Buffer> {
  const workDir = await mkdtemp(path.join(tmpdir(), "aac-projeto-"));
  try {
    const zipPath = path.join(workDir, ZIP_NAME);
    await new Promise<void>((resolve, reject) => {
      const child = spawn(
        "zip",
        ["-r", "-q", "-X", zipPath, ".", "-x", ...EXCLUDES],
        { cwd: PROJECT_ROOT, stdio: ["ignore", "ignore", "pipe"] },
      );
      let stderr = "";
      child.stderr?.on("data", (chunk: Buffer) => {
        stderr += chunk.toString();
      });
      child.on("error", reject);
      child.on("exit", (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(
            new Error(`zip saiu com código ${code}: ${stderr.slice(0, 300)}`),
          );
        }
      });
    });
    return await readFile(zipPath);
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

export async function GET() {
  try {
    const buffer = await buildProjectZip();
    const body = new Uint8Array(buffer);
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Length": String(body.byteLength),
        "Content-Disposition": `attachment; filename="${ZIP_NAME}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[api/download] falha ao gerar o ZIP do projeto:", error);
    return NextResponse.json(
      { error: "Não foi possível gerar o ZIP do projeto." },
      { status: 500 },
    );
  }
}
