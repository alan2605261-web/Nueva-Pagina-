/*
  Motores — fuente única.

  ─── De dónde salen estos datos ────────────────────────────────────────────
  De las fichas oficiales que Saul entregó en sep 2026:
  MOTOR PRO FICHA.pdf (MOT-PRO) y MOTOR PREMIUM FICHA.pdf (MOT-PREM), más sus
  dos pólizas de garantía.

  ─── Ojo: hay DOS generaciones circulando ─────────────────────────────────
  Estos son los motores NUEVOS. Quedan alrededor de 30 unidades de la
  generación anterior en stock, y a los próximos clientes les puede tocar
  esa. Saul lo dijo así: "vale la pena que empieces a poner este consumo,
  pero no lo dejes como ya hecho al 100%".

  Las diferencias entre generaciones NO son cosméticas:

                        anterior (Manual v6)      nueva (fichas 2026)
    Pro — medidas       55 × 42.5 × 53 cm         40 × 34 × 35 cm
    Pro — peso          39 kg                     30 kg
    Pro — enfriamiento  —                         2,050 W
    Premium — medidas   58.5 × 42.5 × 53 cm       61.9 × 40.2 × 47.5 cm
    Premium — peso      41.5 kg                   41.5 kg
    Premium — rango     hasta 42 °C (Saul)        1 a 40 °C

  Por eso cada dato lleva marcado a qué generación pertenece, y la página
  avisa que hay unidades de la anterior. Publicar la ficha nueva como si
  fuera la única sería vender algo distinto a lo que llega.

  Lo que NO cambia entre generaciones: la garantía es de 6 meses en ambas y
  se rige por la misma póliza.
*/

export type FilaSpec = {
  label: string;
  pro: string;
  premium: string;
  /** Grupo de la ficha técnica. */
  grupo: "Desempeño" | "Eléctrico" | "Circuito de agua" | "Físico";
};

/* Ficha de la generación nueva. Todo verificado contra los PDF oficiales. */
export const SPECS_NUEVOS: FilaSpec[] = [
  { grupo: "Desempeño", label: "Compresor", pro: "0.8 HP", premium: "1 HP" },
  { grupo: "Desempeño", label: "Capacidad de enfriamiento", pro: "2,050 W", premium: "2,600 W" },
  { grupo: "Desempeño", label: "Capacidad de calentamiento", pro: "No incluye", premium: "3,416 W" },
  { grupo: "Desempeño", label: "Rango de temperatura", pro: "Enfría el agua de la tina", premium: "1 a 40 °C" },
  { grupo: "Desempeño", label: "Desinfección", pro: "No incluye", premium: "Ozono integrado" },
  { grupo: "Desempeño", label: "Nivel de ruido", pro: "60 dB(A)", premium: "63 dB(A)" },

  { grupo: "Eléctrico", label: "Alimentación", pro: "106–127 V / 60 Hz", premium: "106–127 V / 60 Hz" },
  { grupo: "Eléctrico", label: "Potencia de entrada", pro: "790 W", premium: "1,150 W" },
  { grupo: "Eléctrico", label: "Corriente nominal en enfriamiento", pro: "7 A", premium: "9 A" },
  { grupo: "Eléctrico", label: "Corriente máxima de entrada", pro: "—", premium: "12.8 A" },
  { grupo: "Eléctrico", label: "Circuito requerido", pro: "Dedicado, 15 A o más, con tierra", premium: "Dedicado, 20 A, con tierra" },

  { grupo: "Circuito de agua", label: "Bomba de circulación", pro: "80 W", premium: "120 W" },
  { grupo: "Circuito de agua", label: "Columna de agua", pro: "6 m", premium: "10 m" },
  { grupo: "Circuito de agua", label: "Flujo", pro: "1.0 m³/h", premium: "1.5 m³/h" },
  { grupo: "Circuito de agua", label: "Conexión", pro: "DN 25", premium: "DN 25" },
  { grupo: "Circuito de agua", label: "Filtro", pro: "Papel plisado de 20 micras", premium: "Papel plisado de 20 micras" },

  { grupo: "Físico", label: "Largo × ancho × alto", pro: "400 × 340 × 350 mm", premium: "619 × 402 × 475 mm" },
  { grupo: "Físico", label: "Peso en vacío", pro: "30 kg", premium: "41.5 kg" },
  { grupo: "Físico", label: "Control", pro: "Panel de cuatro teclas y Wi-Fi", premium: "Panel y app Smart Life" },
  { grupo: "Físico", label: "Garantía", pro: "6 meses", premium: "6 meses" },
  { grupo: "Físico", label: "Compatibilidad", pro: "MF Barrel y MF Horizon", premium: "MF Barrel y MF Horizon" },
];

/* Espacios libres que pide cada ficha. Son iguales en los dos modelos. */
export const ESPACIOS = [
  { d: "100 cm", donde: "por donde entra el aire" },
  { d: "100 cm", donde: "por donde sale el aire" },
  { d: "50 cm", donde: "libre por arriba" },
  { d: "20 cm", donde: "a cada costado" },
];

/*
  Diferencias de la generación anterior, para no publicar como único lo que
  todavía no lo es. Sólo se listan los datos que de verdad cambian.
*/
export const GENERACION_ANTERIOR = {
  aviso:
    "Quedan unidades de la generación anterior en inventario. Si te toca una, la garantía es la misma y funciona igual; lo que cambia son las medidas, el peso y, en el Premium, el rango de temperatura.",
  filas: [
    { label: "Pro · medidas", antes: "55 × 42.5 × 53 cm", ahora: "400 × 340 × 350 mm" },
    { label: "Pro · peso", antes: "39 kg", ahora: "30 kg" },
    { label: "Premium · medidas", antes: "58.5 × 42.5 × 53 cm", ahora: "619 × 402 × 475 mm" },
    { label: "Premium · calentamiento", antes: "Hasta 42 °C", ahora: "1 a 40 °C" },
  ],
};
