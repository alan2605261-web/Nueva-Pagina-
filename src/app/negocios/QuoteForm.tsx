"use client";

import { useState } from "react";

/*
  Formulario de cotización B2B — sin backend.
  Al enviar muestra un estado de éxito local.
*/

const INPUT_CLASSES =
  "w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-black/20";

const BUSINESS_TYPES = [
  "Gimnasio / CrossFit Box",
  "Hotel / Spa",
  "Equipo deportivo profesional",
  "Clínica / Fisioterapia",
  "Centro de recuperación / Biohacking",
  "Inmobiliaria / Desarrollo",
  "Corporativo / Wellness empresarial",
  "Otro",
];

const UNIT_OPTIONS = ["1 unidad", "2-4", "5-9", "10+"];

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="eyebrow mb-2 block !text-[11px]">
        {label}
      </label>
      {children}
    </div>
  );
}

export function QuoteForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-line bg-background p-10 text-center">
        <p className="eyebrow mb-4">Solicitud recibida</p>
        <h3 className="heading-sm">
          Gracias — te contactamos en menos de 24 horas hábiles.
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
          Un especialista B2B de Mente Fria revisará tu proyecto y te enviará
          una propuesta con modelo recomendado, plan de leasing y proyección de
          ROI.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="rounded-3xl border border-line bg-background p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre completo" htmlFor="qf-nombre">
          <input
            id="qf-nombre"
            name="nombre"
            type="text"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className={INPUT_CLASSES}
          />
        </Field>
        <Field label="Empresa" htmlFor="qf-empresa">
          <input
            id="qf-empresa"
            name="empresa"
            type="text"
            required
            autoComplete="organization"
            placeholder="Nombre de tu negocio"
            className={INPUT_CLASSES}
          />
        </Field>
        <Field label="Correo" htmlFor="qf-correo">
          <input
            id="qf-correo"
            name="correo"
            type="email"
            required
            autoComplete="email"
            placeholder="tu@empresa.com"
            className={INPUT_CLASSES}
          />
        </Field>
        <Field label="Teléfono / WhatsApp" htmlFor="qf-telefono">
          <input
            id="qf-telefono"
            name="telefono"
            type="tel"
            required
            autoComplete="tel"
            placeholder="55 1234 5678"
            className={INPUT_CLASSES}
          />
        </Field>
        <Field label="Tipo de negocio" htmlFor="qf-tipo">
          <select id="qf-tipo" name="tipo" required className={INPUT_CLASSES} defaultValue="">
            <option value="" disabled>
              Selecciona una opción
            </option>
            {BUSINESS_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Unidades estimadas" htmlFor="qf-unidades">
          <select id="qf-unidades" name="unidades" required className={INPUT_CLASSES} defaultValue="1 unidad">
            {UNIT_OPTIONS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field label="Ciudad / Estado" htmlFor="qf-ciudad">
            <input
              id="qf-ciudad"
              name="ciudad"
              type="text"
              required
              placeholder="CDMX, Guadalajara, Monterrey…"
              className={INPUT_CLASSES}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Cuéntanos sobre tu proyecto" htmlFor="qf-proyecto">
            <textarea
              id="qf-proyecto"
              name="proyecto"
              rows={4}
              placeholder="Espacio disponible, número de sucursales, fechas estimadas…"
              className={INPUT_CLASSES}
            />
          </Field>
        </div>
      </div>
      <button type="submit" className="mbtn mbtn-primary mt-6 w-full justify-center">
        Solicitar cotización
      </button>
    </form>
  );
}
