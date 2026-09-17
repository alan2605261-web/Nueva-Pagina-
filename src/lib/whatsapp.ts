/*
  Enlaces de WhatsApp con mensaje ya escrito.

  El número vive aquí una sola vez. Antes cada ficha de producto declaraba su
  propia constante con el número pegado a mano.
*/

export const WHATSAPP_NUMERO = "5215616471386";

/**
 * Botón "Agendar llamada" de las fichas de producto.
 *
 * Sustituye al "Agendar demo": no existe una demo que agendar, pero sí una
 * llamada (Saul, sep 2026). El mensaje sale con el nombre del producto desde
 * donde se tocó el botón, para que quien conteste sepa de qué equipo se trata
 * sin tener que preguntar.
 */
export function agendarLlamada(producto: string): string {
  const texto =
    `Hola, vi la ${producto} en su página y me interesa saber más información. ` +
    `Quiero programar una llamada.`;
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
}
