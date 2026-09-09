"use client";

import { useMemo, useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { CATEGORIAS, TOTAL_PREGUNTAS } from "@/lib/ayuda";

/*
  Centro de ayuda: buscador + navegación por categoría + acordeones.
  Todo el filtrado ocurre en el cliente sobre el mismo arreglo que se
  renderiza en el HTML estático, así que las preguntas siguen siendo
  indexables aunque el buscador no cargue.
*/

const normalizar = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function CentroAyuda() {
  const [q, setQ] = useState("");
  const [abierta, setAbierta] = useState<string | null>(null);

  const term = normalizar(q.trim());

  const resultados = useMemo(() => {
    if (term.length < 2) return CATEGORIAS;
    return CATEGORIAS.map((c) => ({
      ...c,
      preguntas: c.preguntas.filter(
        (p) => normalizar(p.q).includes(term) || normalizar(p.a).includes(term),
      ),
    })).filter((c) => c.preguntas.length > 0);
  }, [term]);

  const encontradas = resultados.reduce((n, c) => n + c.preguntas.length, 0);
  const buscando = term.length >= 2;

  return (
    <div>
      {/* Buscador */}
      <div className="mx-auto max-w-[640px]">
        <div className="relative">
          <Search
            size={18}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[var(--fg-subtle)]"
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Busca entre ${TOTAL_PREGUNTAS} preguntas`}
            aria-label="Buscar en el centro de ayuda"
            className="w-full rounded-full border border-[var(--line-1)] bg-white py-4 pl-[52px] pr-12 text-[15px] outline-none transition-colors duration-200 placeholder:text-[var(--fg-subtle)] focus:border-[var(--accent-ice)]"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              aria-label="Limpiar búsqueda"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--fg-subtle)] hover:text-[var(--fg-metal)]"
            >
              <X size={17} strokeWidth={2} />
            </button>
          )}
        </div>

        {buscando && (
          <p className="mt-3 text-center text-[13px] text-[var(--fg-muted)]">
            {encontradas === 0
              ? "Nada por aquí. Escríbenos por WhatsApp y te contestamos."
              : `${encontradas} ${encontradas === 1 ? "resultado" : "resultados"}`}
          </p>
        )}
      </div>

      {/* Índice de categorías */}
      {!buscando && (
        <nav className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
          {CATEGORIAS.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="flex-none rounded-full border border-[var(--line-1)] bg-white px-4 py-2 text-[13px] font-medium transition-colors duration-200 hover:border-[var(--accent-ice)] hover:text-[var(--accent-ice)]"
            >
              {c.nombre}
            </a>
          ))}
        </nav>
      )}

      {/* Categorías */}
      <div className="mt-12 space-y-14">
        {resultados.map((c) => (
          <section key={c.slug} id={c.slug} className="scroll-mt-28">
            <div className="border-b border-[var(--line-2)] pb-4">
              <h2 className="mdisplay text-[clamp(20px,2.2vw,27px)]">{c.nombre}</h2>
              <p className="mt-1.5 text-[14px] text-[var(--fg-muted)]">{c.dek}</p>
            </div>

            <ul className="mt-1">
              {c.preguntas.map((p) => {
                const id = `${c.slug}::${p.q}`;
                const open = abierta === id;
                return (
                  <li key={id} className="border-b border-[var(--line-1)]">
                    <button
                      onClick={() => setAbierta(open ? null : id)}
                      aria-expanded={open}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left"
                    >
                      <span
                        className={`text-[15.5px] font-semibold leading-snug transition-colors duration-200 ${
                          open ? "text-[var(--accent-ice)]" : ""
                        }`}
                      >
                        {p.q}
                      </span>
                      <Plus
                        size={19}
                        strokeWidth={1.8}
                        className={`mt-[2px] flex-none text-[var(--accent-ice)] transition-transform duration-300 ${
                          open ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p
                          lang="es"
                          className="max-w-[70ch] pb-6 pr-10 text-[15px] leading-relaxed text-[var(--fg-muted)] hyphens-auto text-justify"
                        >
                          {p.a}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
