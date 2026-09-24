import { Clock, Mail } from "lucide-react";

/*
  Tarjeta de contacto.

  Vivía suelta dentro de /soporte y era puro texto: el número de WhatsApp y el
  correo se veían pero no se podían tocar, había que copiarlos a mano. Ahora las
  dos primeras filas son enlaces reales —wa.me y mailto— y la tarjeta es un
  componente, para que /contacto y /soporte muestren exactamente lo mismo.

  El horario no es enlace: no hay a dónde ir.
*/

export const WHATSAPP_NUM = "+52 56 1647 1386";
export const WHATSAPP_URL =
  "https://wa.me/5215616471386?text=" +
  encodeURIComponent("Hola, necesito ayuda con mi Mente Fria.");
export const CORREO = "soporte@mentefria.com";
export const CORREO_URL =
  `mailto:${CORREO}?subject=` + encodeURIComponent("Soporte Mente Fria");

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.657 1.438 5.168L2.051 21.95l4.902-1.374A9.944 9.944 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.944 7.944 0 01-4.053-1.107l-.29-.173-3.01.843.852-2.93-.19-.301A7.944 7.944 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const marco =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[var(--line-1)] bg-white";

export function ContactoCard() {
  return (
    <div className="rounded-3xl border border-[var(--line-1)] bg-[var(--bg-panel)] p-4 sm:p-5">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-2xl p-4 transition-colors duration-200 hover:bg-white"
      >
        <span className={marco}>
          <WhatsAppIcon className="h-5 w-5 text-[var(--fg-metal)]" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold">WhatsApp</span>
          <span className="mt-0.5 block text-sm text-[var(--fg-muted)]">{WHATSAPP_NUM}</span>
          <span className="mt-0.5 block text-xs text-[var(--fg-subtle)]">
            Abre la conversación con nosotros
          </span>
        </span>
      </a>

      <a
        href={CORREO_URL}
        className="flex items-center gap-4 rounded-2xl p-4 transition-colors duration-200 hover:bg-white"
      >
        <span className={marco}>
          <Mail size={20} strokeWidth={1.6} className="text-[var(--fg-metal)]" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold">Correo</span>
          <span className="mt-0.5 block break-all text-sm text-[var(--fg-muted)]">{CORREO}</span>
          <span className="mt-0.5 block text-xs text-[var(--fg-subtle)]">
            Abre tu correo con el mensaje listo
          </span>
        </span>
      </a>

      <div className="flex items-center gap-4 p-4">
        <span className={marco}>
          <Clock size={20} strokeWidth={1.6} className="text-[var(--fg-metal)]" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold">Horario de atención</span>
          <span className="mt-0.5 block text-sm text-[var(--fg-muted)]">24/7</span>
          <span className="mt-0.5 block text-xs text-[var(--fg-subtle)]">
            Cobertura técnica nacional
          </span>
        </span>
      </div>
    </div>
  );
}
