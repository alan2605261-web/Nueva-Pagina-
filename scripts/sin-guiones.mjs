/* Revisa que no quede un solo guion largo (—) o medio (–) en el texto que se
   ve en la página. Saul, sep 2026: "no deben de haber en ningún lado".

   Se corre sobre el export ya construido, no sobre el código, porque así
   atrapa también lo que entra desde datos, desde el blog o desde una
   plantilla, no solo lo que está escrito a mano en un componente.

   Uso: npm run build && node scripts/sin-guiones.mjs
*/
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
import { join } from "node:path";

const archivos = globSync("out/**/*.html");
let fallas = 0;

for (const archivo of archivos) {
  const html = readFileSync(archivo, "utf8");
  // fuera scripts, estilos y etiquetas: queda el texto visible
  const texto = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ");
  const lineas = texto.split(/\s{2,}|\n/);
  for (const linea of lineas) {
    if (/[—–]/.test(linea)) {
      fallas++;
      console.log(`${archivo}: ${linea.trim().slice(0, 120)}`);
    }
  }
}

if (fallas) {
  console.log(`\n${fallas} guiones en texto visible.`);
  process.exit(1);
}
console.log(`Sin guiones largos ni medios en ${archivos.length} páginas.`);
