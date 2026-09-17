"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PREGUNTAS, preguntasAplicables, recomendar, type Respuestas } from "@/lib/quiz";
import { enviarLead, telefonoValido, formatearTelefono, WHATSAPP_NUMERO } from "@/lib/leads";
import { FOTOS } from "@/components/QuizCarousel";
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
  const [telefono, setTelefono] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);

  /* La lista se recalcula con cada respuesta: hay preguntas que dejan de
     importar según lo ya contestado, y preguntarlas de todos modos alarga el
     quiz sin cambiar el resultado. Por eso el total se mueve. */
  const aplicables = useMemo(() => preguntasAplicables(resp), [resp]);
  const total = aplicables.length;
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
    setTelefono("");
    setEnviado(false);
  }

  /* ── Teléfono ───────────────────────────────────────────────
     Va entre la última pregunta y el resultado, como en el quiz de Plunge.
     El resultado no se esconde detrás del dato: se calcula igual y se
     enseña completo en la pantalla siguiente. Lo que el teléfono habilita
     es que un asesor le dé seguimiento. */
  if (terminado && !enviado) {
    const puedeSeguir = telefonoValido(telefono) && !enviando;

    async function mandar() {
      if (!telefonoValido(telefono)) return;
      setEnviando(true);
      const r = recomendar(resp);
      const salio = await enviarLead({
        telefono: telefono.replace(/\D/g, ""),
        modelo: r.modelo.nombre,
        motor: r.motor,
        respuestas: resp,
        origen: "quiz",
        fecha: new Date().toISOString(),
      });
      if (!salio) {
        // Plan B mientras no haya endpoint: el resumen se va por WhatsApp.
        const resumen = PREGUNTAS.filter((q) => resp[q.id])
          .map((q) => `· ${q.pregunta} ${q.opciones.find((o) => o.valor === resp[q.id])?.etiqueta ?? "—"}`)
          .join("\n");
        const texto = encodeURIComponent(
          `Hola, hice el quiz y me recomendó la ${r.modelo.nombre}` +
            (r.motor ? ` con Motor ${r.motor === "premium" ? "Premium" : "Pro"} 2.0` : "") +
            `.\n\nMi teléfono: ${telefono}\n\nEsto contesté:\n${resumen}`,
        );
        window.open(`https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`, "_blank", "noopener");
      }
      setEnviando(false);
      setEnviado(true);
    }

    return (
      <div className="mwrap">
        <div className="mx-auto max-w-xl text-center">
          <h2
            className="mdisplay text-[clamp(28px,3.8vw,46px)] leading-tight"
            style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
          >
            Tu resultado está listo
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed" style={{ color: "var(--fg-muted)" }}>
            Déjanos tu WhatsApp y un asesor te acompaña con lo que sigue.
          </p>

          <div className="mt-9">
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={telefono}
              onChange={(e) => setTelefono(formatearTelefono(e.target.value))}
              onKeyDown={(e) => { if (e.key === "Enter" && puedeSeguir) void mandar(); }}
              placeholder="55 1234 5678"
              aria-label="Tu número de WhatsApp"
              className="w-full max-w-[360px] rounded-full border px-7 py-4 text-center text-[16px] outline-none transition-colors duration-200 focus:border-[var(--m-ink)]"
              style={{ borderColor: "var(--line-2)", background: "var(--m-white)" }}
            />
          </div>

          <button
            onClick={() => void mandar()}
            disabled={!puedeSeguir}
            className="mbtn mbtn-primary mt-6"
            style={{ opacity: puedeSeguir ? 1 : 0.4, pointerEvents: puedeSeguir ? "auto" : "none" }}
          >
            {enviando ? "Enviando" : "Ver mi resultado"}
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mx-auto mt-6 max-w-[46ch] text-[12.5px] leading-relaxed" style={{ color: "var(--fg-subtle)" }}>
            Usamos tu número solo para darte seguimiento a este resultado. Puedes pedir
            que lo borremos cuando quieras.{" "}
            <Link href="/privacidad" className="underline underline-offset-2">
              Aviso de privacidad
            </Link>
          </p>

          <button
            onClick={() => { setEnviado(true); }}
            className="mt-8 text-[13px] underline underline-offset-4"
            style={{ color: "var(--fg-subtle)" }}
          >
            Ver el resultado sin dejar mi número
          </button>
        </div>
      </div>
    );
  }

  /* ── Resultado ─────────────────────────────────────────────── */
  if (terminado && enviado && resultado) {
    const { modelo, alternativas, motor, precio, razones, advertencias, b2b } = resultado;
    const fotos = FOTOS[modelo.nombre] ?? [{ src: modelo.img, color: "Negra" }];
    const resumen = PREGUNTAS.filter((q) => resp[q.id]).map((q) => {
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
          {/* Solo si dejó su número. Quien lo saltó ve su resultado igual,
              sin una promesa de contacto que nadie va a cumplir. */}
          {telefono && (
            <div
              className="mb-8 rounded-[14px] border px-6 py-4"
              style={{ borderColor: "var(--accent-ice)", background: "var(--m-white)" }}
            >
              <p className="text-[14.5px] leading-relaxed" style={{ color: "var(--fg-metal)" }}>
                Listo. En breve uno de nuestros asesores te contacta al{" "}
                <span className="font-semibold">{telefono}</span> para acompañarte
                con lo que sigue.
              </p>
            </div>
          )}
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
            {/* Los colores del modelo recomendado, para que vea que puede
                elegir. La MF ONE solo tiene negra confirmada del modelo nuevo. */}
            <div className="p-6" style={{ background: "var(--grad-silver)" }}>
              <div className="relative mx-auto aspect-[4/3] max-w-[520px]">
                {fotos.map((f, n) => (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    key={f.src}
                    src={f.src}
                    alt={`${modelo.nombre} ${f.color.toLowerCase()}`}
                    loading="lazy"
                    decoding="async"
                    aria-hidden={n !== colorIdx}
                    className="absolute inset-0 h-full w-full object-contain mix-blend-multiply transition-opacity duration-500"
                    style={{ opacity: n === colorIdx ? 1 : 0 }}
                  />
                ))}
              </div>
              {fotos.length > 1 && (
                <div className="mt-4 flex items-center justify-center gap-2.5">
                  {fotos.map((f, n) => (
                    <button
                      key={f.src}
                      onClick={() => setColorIdx(n)}
                      aria-label={`Ver ${modelo.nombre} ${f.color.toLowerCase()}`}
                      aria-current={n === colorIdx}
                      className="rounded-full border px-4 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] transition-colors duration-200"
                      style={{
                        borderColor: n === colorIdx ? "var(--m-ink)" : "var(--line-2)",
                        background: n === colorIdx ? "var(--m-ink)" : "transparent",
                        color: n === colorIdx ? "#fff" : "var(--fg-muted)",
                      }}
                    >
                      {f.color}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="p-8">
              {/* El precio es el de la combinación tina + motor, no el del modelo
                  suelto: entre Pro y Premium hay $15,000 de diferencia. */}
              <p className="m-eyebrow accent">${precio.toLocaleString("en-US")} MXN</p>

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

          {alternativas.length > 0 && (
            <div className="mt-10">
              <p className="m-eyebrow accent">
                {alternativas.length === 1 ? "Tu segunda opción" : "Otras opciones"}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {alternativas.map((alt, n) => (
                  <Link
                    key={alt.modelo.id}
                    href={alt.modelo.href}
                    className="rounded-[16px] border p-6 transition-colors duration-200 hover:border-[var(--accent-ice)]"
                    style={{ borderColor: "var(--line-1)", background: "var(--m-white)" }}
                  >
                    <p
                      className="text-[11px] uppercase tracking-[0.16em]"
                      style={{ color: "var(--fg-subtle)" }}
                    >
                      {n === 0 ? "Segunda opción" : "Tercera opción"}
                    </p>
                    <p className="mt-3 text-[17px] font-semibold" style={{ color: "var(--fg-metal)" }}>
                      {alt.modelo.nombre}
                      {alt.motor && (
                        <span style={{ color: "var(--fg-subtle)" }}>
                          {" "}con Motor {alt.motor === "premium" ? "Premium" : "Pro"} 2.0
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-[13px]" style={{ color: "var(--accent-ice)" }}>
                      ${alt.precio.toLocaleString("en-US")} MXN
                    </p>
                    <p
                      className="mt-3 text-[13.5px] leading-relaxed"
                      style={{ color: "var(--fg-muted)" }}
                    >
                      {alt.contraste}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

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
  const q = aplicables[Math.min(paso, total - 1)];

  return (
    <div className="mwrap">
      <div className="mx-auto max-w-2xl">
        {/* Progreso. Sin contador "3 de 7": como el quiz salta preguntas que
            dejaron de importar, el total se mueve y ver "1/6" y luego "2/4"
            se lee como un error. La barra sola comunica el avance. */}
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
          className="mdisplay mt-5 text-center text-[clamp(26px,3.4vw,42px)] leading-tight"
          style={{ WebkitTextStroke: "var(--bold-stroke) currentColor" }}
        >
          {q.pregunta}
        </h2>

        {/* Pastillas, no tarjetas. Las tarjetas grandes con nota debajo se
            quitaron en sep 2026: Plunge usa botones simples y Saul los
            prefiere. Sin flecha ni descripción, la opción se lee de un golpe. */}
        <div className="mt-8 flex flex-col items-center gap-3">
          {q.opciones.map((o) => {
            const activa = resp[q.id] === o.valor;
            return (
              <button
                key={o.valor}
                onClick={() => elegir(q.id, o.valor)}
                className="w-full max-w-[420px] rounded-full border px-7 py-4 text-[15.5px] font-semibold transition-colors duration-200"
                style={{
                  borderColor: activa ? "var(--m-ink)" : "var(--line-2)",
                  background: activa ? "var(--m-ink)" : "transparent",
                  color: activa ? "#fff" : "var(--fg-metal)",
                }}
              >
                {o.etiqueta}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
