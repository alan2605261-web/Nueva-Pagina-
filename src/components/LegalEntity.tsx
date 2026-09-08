/*
  Identidad legal de Mente Fria.

  Datos tomados textualmente de la póliza de garantía oficial de la MF ONE
  (documento del 31 de agosto de 2026). La Ley Federal de Protección al
  Consumidor exige que la póliza identifique a quien la otorga con domicilio,
  y la LFPDPPP exige nombrar al responsable del tratamiento de datos: por eso
  este bloque vive en /garantia, /terminos y /privacidad.

  Nota: la razón social se escribe "Wellnes" con una sola s, tal como aparece
  en el documento legal. No corregir sin confirmar el acta constitutiva.

  Si cambia cualquiera de estos datos, se cambia AQUÍ y se actualiza en las
  tres páginas a la vez.
*/

export const LEGAL = {
  razonSocial: "MFMF Wellnes and Lifestyle, S.A. de C.V.",
  rfc: "MWL260414PHA",
  domicilio:
    "Calle Agustín Manuel Chávez 1, int. 102, Col. Santa Fe, C.P. 01210, Álvaro Obregón, Ciudad de México",
  telefono: "+52 56 1647 1386",
  telefonoHref: "tel:+525616471386",
  soporte: "soporte@mentefria.com",
  privacidad: "privacidad@mentefria.com",
  importador: "Laplace Business & Consulting, S.A. de C.V.",
  rfcImportador: "LBA260414C93",
} as const;

type Rol = "garantia" | "terminos" | "privacidad";

const INTRO: Record<Rol, string> = {
  garantia: "Comercializado por y garantía otorgada por",
  terminos: "Responsable de este sitio y de la venta de los productos",
  privacidad: "Responsable del tratamiento de tus datos personales",
};

export function LegalEntity({ rol }: { rol: Rol }) {
  const correo = rol === "privacidad" ? LEGAL.privacidad : LEGAL.soporte;

  return (
    <div className="mt-10 rounded-xl border border-[var(--line-1)] p-6">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
        {INTRO[rol]}
      </p>
      <p className="mt-3 text-base font-semibold text-foreground">
        {LEGAL.razonSocial}
      </p>
      <dl className="mt-4 space-y-1.5 text-sm leading-relaxed text-[var(--fg-muted)]">
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium text-foreground">RFC:</dt>
          <dd>{LEGAL.rfc}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium text-foreground">Domicilio:</dt>
          <dd>{LEGAL.domicilio}</dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium text-foreground">Teléfono:</dt>
          <dd>
            <a href={LEGAL.telefonoHref} className="underline">
              {LEGAL.telefono}
            </a>
          </dd>
        </div>
        <div className="flex flex-wrap gap-x-2">
          <dt className="font-medium text-foreground">Correo:</dt>
          <dd>
            <a href={`mailto:${correo}`} className="underline">
              {correo}
            </a>
          </dd>
        </div>
      </dl>

      {rol === "garantia" && (
        <p className="mt-5 border-t border-[var(--line-1)] pt-4 text-xs leading-relaxed text-[var(--fg-subtle)]">
          Importado por: {LEGAL.importador} · RFC {LEGAL.rfcImportador} · mismo
          domicilio. Hecho en China. Esta garantía se hace efectiva en el
          domicilio señalado, donde también se obtienen refacciones, partes,
          componentes y consumibles, o en los centros de servicio que te
          indiquemos al reportar la falla. Es adicional a los derechos que
          otorga la Ley Federal de Protección al Consumidor y no los limita ni
          los sustituye; para cualquier controversia puedes acudir a la
          Procuraduría Federal del Consumidor.
        </p>
      )}
    </div>
  );
}
