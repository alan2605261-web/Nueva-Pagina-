/*
  Envío de leads del quiz.

  **Los leads llegan a respond.io, y llegan por WhatsApp.** El WhatsApp de
  Mente Fria está conectado ahí (confirmado por Saul, sep 2026), así que
  cuando el cliente termina el quiz y deja su número, el botón abre WhatsApp
  con su teléfono, la recomendación y todas sus respuestas ya escritas. Ese
  mensaje entra a la bandeja de respond.io como una conversación normal, con
  el número del cliente. No hace falta integración ni token.

  Ventaja de fondo: el lead llega dentro de una conversación abierta, no como
  un registro muerto en una hoja. El asesor contesta ahí mismo.

  ENDPOINT_LEADS existe por si algún día se quiere ADEMÁS un registro
  automático que no dependa de que el cliente mande el mensaje. Requiere un
  intermediario propio (Apps Script o Cloudflare Worker) que guarde el token:
  la API de respond.io NO puede llamarse desde el navegador, porque el token
  quedaría visible para cualquiera que abra la página y podría escribir a la
  bandeja. Mientras esté vacío, todo sale por WhatsApp, que es lo acordado.
*/
export const ENDPOINT_LEADS = "";

export const WHATSAPP_NUMERO = "5215616471386";

export type Lead = {
  telefono: string;
  modelo: string;
  motor: string | null;
  respuestas: Record<string, string>;
  origen: string;
  fecha: string;
};

/** Diez dígitos, que es lo que trae un celular mexicano. */
export function telefonoValido(v: string) {
  return v.replace(/\D/g, "").length === 10;
}

export function formatearTelefono(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `${d.slice(0, 2)} ${d.slice(2)}`;
  return `${d.slice(0, 2)} ${d.slice(2, 6)} ${d.slice(6)}`;
}

/**
 * Manda el lead. Devuelve true si salió por el endpoint; false si no había
 * endpoint configurado y hay que caer al plan B de WhatsApp.
 */
export async function enviarLead(lead: Lead): Promise<boolean> {
  if (!ENDPOINT_LEADS) return false;
  try {
    await fetch(ENDPOINT_LEADS, {
      method: "POST",
      // Apps Script no responde cabeceras CORS: con no-cors el POST sí llega,
      // aunque no podamos leer la respuesta.
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(lead),
    });
    return true;
  } catch {
    return false;
  }
}
