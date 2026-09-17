/*
  RESEÑAS

  Lo que había antes en el mosaico del inicio y en /resenas era un esqueleto
  que dejó Rafa: nombres, ciudades y textos inventados. Se reemplazó completo
  en sep 2026.

  Origen de estas: las primeras once las tenía Saul directamente; el resto
  estaban guardadas en Revie, la app de reseñas que usa Posiblex, y las
  recuperó de ahí.

  **Regla de privacidad.** Van con nombre de pila y la inicial del apellido,
  sin ciudad y sin foto. Los clientes no dieron permiso explícito para
  publicarlas con su nombre completo.

  NO agregar ciudades. Varios de estos nombres aparecen en el documento de
  base instalada con su ubicación: cruzar las dos cosas volvería
  identificable a gente que no lo autorizó.
*/

export type Resena = {
  /** Nombre de pila + inicial. Nunca el apellido completo. */
  nombre: string;
  texto: string;
  /** Lo que calificó esa persona. No todas son de cinco. */
  estrellas: 3 | 4 | 5;
};

export const RESENAS: Resena[] = [
  { nombre: "Rafael B.", texto: "Me compré la MF ONE y, por mucho, es el mejor cold plunge que he tenido. Sin duda la recomendaría.", estrellas: 5 },
  { nombre: "Fernanda de la M.", texto: "Me encanta la practicidad y la calidad de la tina. Sin duda la recomiendo.", estrellas: 5 },
  { nombre: "Alberto C.", texto: "Las puse en mi negocio y ha sido la mejor decisión que he tomado.", estrellas: 5 },
  { nombre: "Ethan L.", texto: "Muy buen producto. Estoy encantado con los resultados.", estrellas: 5 },
  { nombre: "Isaac G.", texto: "Súper plus para recuperación de entrenos y para uso de toda la familia. Fácil de montar y de usar.", estrellas: 5 },
  { nombre: "Javier S.", texto: "Producto eficiente para lograr la disciplina diaria.", estrellas: 5 },
  { nombre: "Alfredo V.", texto: "100% lo recomiendo. La calidad y el funcionamiento superaron lo que esperaba.", estrellas: 5 },
  { nombre: "Luis", texto: "Buen producto. Cumple perfecto con lo que promete para el uso diario.", estrellas: 5 },
  { nombre: "Luis G.", texto: "Excelente producto. Lo recomiendo 100%.", estrellas: 5 },
  { nombre: "Mario M.", texto: "Muy buen producto. Se nota la durabilidad y es muy fácil de mantener.", estrellas: 5 },
  { nombre: "Jorge S.", texto: "Califico con cinco estrellas. Excelente experiencia de compra y de uso.", estrellas: 5 },
  { nombre: "Carlos M.", texto: "Me decidí por la MF ONE y ha sido una excelente inversión para la recuperación muscular después de correr.", estrellas: 5 },
  { nombre: "Sofía R.", texto: "Llevo usándola varias semanas y mantiene la temperatura perfecta. Muy práctica para tener en casa.", estrellas: 5 },
  { nombre: "Sofía P.", texto: "Funciona excelente para el día a día y el material se ve bastante resistente. Valió totalmente la pena.", estrellas: 5 },
  { nombre: "Andrea G.", texto: "La calidad se nota desde el primer momento en que la instalas. De lo mejor que he probado para mis rutinas.", estrellas: 5 },
  { nombre: "Johann T.", texto: "Me ha ayudado muchísimo con el descanso y la energía por las mañanas. Súper recomendable.", estrellas: 5 },
  { nombre: "Daniela S.", texto: "Una maravilla para los baños de contraste. No ocupa tanto espacio y cumple con todo.", estrellas: 5 },
  { nombre: "Rodrigo P.", texto: "Práctica, fácil de armar y con un diseño muy limpio. Superó mis expectativas.", estrellas: 5 },
  { nombre: "Alberto V.", texto: "El tamaño es ideal y el equipo rinde excelente para dar servicio constante en el centro de recuperación.", estrellas: 5 },
  { nombre: "Patricio L.", texto: "La recomiendo ampliamente si buscas algo funcional para la recuperación diaria sin complicaciones.", estrellas: 5 },
  { nombre: "Marisa C.", texto: "Excelente equipo para el frío, el material es sólido y rinde muy bien para los clientes del estudio.", estrellas: 5 },
  { nombre: "Silvia N.", texto: "Se la compré a mi hijo para su centro deportivo y está encantado con el rendimiento.", estrellas: 5 },

  /* Segunda tanda, recolectada por Saul en sep 2026. Aquí empiezan las
     calificaciones que no son de cinco: se publican tal cual las dieron. */
  { nombre: "Johan N.", texto: "El producto ha sido muy bueno, pero se atrasaron en el tiempo de entrega dos semanas.", estrellas: 3 },
  { nombre: "Octavio A.", texto: "Desde que lo metí en mi negocio, gasto mucha menos agua de la que gastaba antes de comprarla.", estrellas: 4 },
  { nombre: "Gabriela A.", texto: "Cumple con lo que promete. Me gustaría que enfriara un poco más rápido.", estrellas: 4 },
  { nombre: "Luis O.", texto: "Practicaba la terapia antes de manera esporádica porque era muy tardada. Ahora, en promedio, tardo cinco minutos.", estrellas: 5 },
  { nombre: "Frank S.", texto: "La compré porque mis clientes me la pedían mucho en mi centro wellness y ha sido una gran adición. Me hubiera gustado que tuvieran más meses sin intereses.", estrellas: 4 },
  { nombre: "Victor O.", texto: "Soy fisioterapeuta desde hace 12 años y he hecho muchas más prácticas de terapias en frío para mis pacientes.", estrellas: 5 },
  { nombre: "Ilse S.", texto: "Es funcional y cumple con lo que promete, pero no es tan fácil de cargar si no tienes mucha fuerza.", estrellas: 3 },
  { nombre: "Juan B.", texto: "Mi doctor me sugirió hacer la terapia por problemas en la rodilla. Esto, junto con los ejercicios, me ha ayudado considerablemente.", estrellas: 4 },
];

/* El promedio SE CALCULA. Estuvo fijo en 5 mientras todas las reseñas eran de
   cinco estrellas; con la segunda tanda ya no lo son. Si se agregan más, esto
   se mueve solo: nunca escribir aquí una cifra a mano. */
export const PROMEDIO =
  Math.round((RESENAS.reduce((s, r) => s + r.estrellas, 0) / RESENAS.length) * 10) / 10;
export const TOTAL_RESENAS = RESENAS.length;
