import { PageShell } from "@/components/PageShell";
import { CarritoVista } from "@/components/CarritoVista";

export const metadata = {
  title: "Tu carrito",
  description: "Revisa tu configuración antes de pagar.",
};

export default function CarritoPage() {
  return (
    <PageShell>
      <div className="bg-[var(--bg-metal)] text-[var(--fg-metal)]">
        <section className="msection">
          <div className="mwrap">
            <CarritoVista />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
