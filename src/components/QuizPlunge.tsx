"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PREGUNTAS, recomendar, type Respuestas } from "@/lib/quiz";
import { ArrowRight, ChevronLeft } from "@/components/icons";

/*
  Interfaz del quiz. Una pregunta a la vez, avanza al elegir.

  Sin captura de correo antes del resultado: encerrar la recomendación
  detrás de un formulario es la forma más rápida de que alguien cierre la
  pestaña. El correo se pide DESPUÉS, cuando ya vio algo que le sirve.

  PENDIENTE DE BACKEND: hoy el sitio es export estático, no hay a dónde
  mandar un formulario. El resultado se envía por WhatsApp con el resumen ya
  escrito, que funciona sin servidor y además abre conversación. Cuando el
  sitio esté en Shopify, el mismo resumen es lo que hay que mandar a Klaviyo
  junto con el correo.
*/

const WHATSAPP = "https://wa.me/5215616471386";

export function QuizPlunge() {
  const [paso, setPaso] = useState(0);
  const [resp, setResp] = useState<Respuestas>({});

  const total = PREGUNTAS.length;
  const terminado = paso >= total;
  const resultado = useMemo(
    () => (terminado ? recomendar(resp) : null),
    [terminado, resp],
  );

  function elegir(id: string, valor: string) {
    setResp((r) => ({ ...r, [id]: valor }));
    setPaso((p) => p + 1);
  }

  function reiniciar() {
    setResp({});
    setPaso(0);
  }

  /* ── Resultado ─────────────────────────────────────────────── */
  if (terminado && resultado) {
    const { modelo, motor, razones, advertencias, b2b } = resultado;
    const resumen = PREGUNTAS.map((q) => {
      const op = q.opciones.find((o) => o.valor === resp[q.id]);
      return `· ${q.pregunta} ${op?.etiqueta ?? "—"}`;
    }).join("\n");
    const mensaje = encodeURIComponent(
      `Hola, hice el quiz en la página y me recomendó la ${modelo.nombre}` +
        (motor ? ` con Motor ${motor === "premium" ? "Premium" : "Pro"} 2.0` : "") +
        `.\n\nEsto fue lo que contesté:\n${resumen}\n\n¿Me ayudan a confirmarlo?`,
    );

    return (
      <div className="mwrap">
        <div className="mx-auto max-w-3xl">
          <p className="m-eyebrow accent">Tu resultado</p>
          <h2
            className="mdisplay mt-3 text-[clamp(30px,4.4vw,54px)]"
            style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
          >
            La {modelo.nombre}
            {motor && (
              <span style={{ color: "var(--fg-subtle)" }}>
                {" "}
                con Motor {motor === "premium" ? "Premium" : "Pro"} 2.0
              </span>
            )}
          </h2>
          <p
            className="mt-5 text-[17px] leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            {modelo.resumen}
          </p>

          <div
            className="mt-9 overflow-hidden rounded-[20px] border"
            style={{ borderColor: "var(--line-1)", background: "var(--m-white)" }}
          >
            <div
              className="grid place-items-center p-8"
              style={{ background: "var(--grad-silver)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={modelo.img}
                alt={modelo.nombre}
                className="max-h-[260px] w-auto max-w-full object-contain"
              />
            </div>
            <div className="p-8">
              <p className="m-eyebrow accent">{modelo.precio}</p>

              <h3
                className="mt-6 text-[15px] font-semibold"
                style={{ color: "var(--fg-metal)" }}
              >
                Por qué esta
              </h3>
              <ul className="mt-3 space-y-2.5">
                {razones.map((x) => (
                  <li key={x} className="flex gap-3 text-[14.5px] leading-relaxed">
                    <span
                      aria-hidden
                      className="mt-[8px] h-1.5 w-1.5 flex-none rounded-full"
                      style={{ background: "var(--accent-ice)" }}
                    />
                    <span style={{ color: "var(--fg-muted)" }}>{x}</span>
                  </li>
                ))}
              </ul>

              {advertencias.length > 0 && (
                <div
                  className="mt-7 rounded-[14px] border p-5"
                  style={{ borderColor: "var(--line-2)", background: "var(--bg-panel)" }}
                >
                  <h3
                    className="text-[15px] font-semibold"
                    style={{ color: "var(--fg-metal)" }}
                  >
                    Lo que tienes que saber antes
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {advertencias.map((x) => (
                      <li key={x} className="text-[14px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={modelo.href} className="mbtn mbtn-primary">
                  Ver la {modelo.nombre}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`${WHATSAPP}?text=${mensaje}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mbtn mbtn-ghost"
                >
                  Mándanos el resultado
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <button
              onClick={reiniciar}
              className="text-[13.5px] font-semibold underline underline-offset-4"
              style={{ color: "var(--fg-metal)" }}
            >
              Volver a empezar
            </button>
            <Link
              href="/productos"
              className="text-[13.5px]"
              style={{ color: "var(--fg-muted)" }}
            >
              Comparar los tres modelos
            </Link>
            {b2b && (
              <Link
                href="/negocios"
                className="text-[13.5px] font-semibold"
                style={{ color: "var(--accent-ice)" }}
              >
                Ver el esquema para negocios
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Preguntas ─────────────────────────────────────────────── */
  const q = PREGUNTAS[paso];

  return (
    <div className="mwrap">
      <div className="mx-auto max-w-2xl">
        {/* Progreso */}
        <div className="flex items-center gap-4">
          <div
            className="h-[3px] flex-1 overflow-hidden rounded-full"
            style={{ background: "var(--line-1)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(paso / total) * 100}%`,
                background: "var(--m-ink)",
              }}
            />
          </div>
          <span
            className="text-[12px] tabular-nums"
            style={{ color: "var(--fg-subtle)" }}
          >
            {paso + 1} / {total}
          </span>
        </div>

        {paso > 0 && (
          <button
            onClick={() => setPaso((p) => p - 1)}
            className="mt-7 inline-flex items-center gap-1.5 text-[13px]"
            style={{ color: "var(--fg-muted)" }}
          >
            <ChevronLeft className="h-4 w-4" />
            Atrás
          </button>
        )}

        <h2
          className="mdisplay mt-6 text-[clamp(26px,3.4vw,42px)] leading-tight"
          style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
        >
          {q.pregunta}
        </h2>
        {q.ayuda && (
          <p
            className="mt-4 max-w-[52ch] text-[14.5px] leading-relaxed"
            style={{ color: "var(--fg-muted)" }}
          >
            {q.ayuda}
          </p>
        )}

        <div className="mt-8 grid gap-3">
          {q.opciones.map((o) => {
            const activa = resp[q.id] === o.valor;
            return (
              <button
                key={o.valor}
                onClick={() => elegir(q.id, o.valor)}
                className="group flex items-center justify-between gap-5 rounded-[14px] border px-6 py-5 text-left transition-colors hover:border-[var(--m-ink)]"
                style={{
                  borderColor: activa ? "var(--m-ink)" : "var(--line-1)",
                  background: "var(--m-white)",
                }}
              >
                <span>
                  <span
                    className="block text-[16px] font-semibold"
                    style={{ color: "var(--fg-metal)" }}
                  >
                    {o.etiqueta}
                  </span>
                  {o.nota && (
                    <span
                      className="mt-1 block text-[13.5px]"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {o.nota}
                    </span>
                  )}
                </span>
                <ArrowRight
                  className="h-4 w-4 flex-none transition-transform group-hover:translate-x-1"
                  style={{ color: "var(--fg-subtle)" }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
