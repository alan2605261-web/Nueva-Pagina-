import { Announcement } from "@/components/Announcement";
import { Navbar } from "@/components/Navbar";
import { LandingV2 } from "@/components/LandingV2";
import { B2BBand } from "@/components/B2BBand";
import { Footer } from "@/components/Footer";

/*
  Landing — merged design:
  · Layout / flow / info = mentefria.com
  · Visual system + sections = Claude Design "site_v2" (metal + ice blue)
  · Structure inspiration = Eight Sleep clone
  · Plus the comparison section that was missing from the Cloud Design page.
*/

export const metadata = {
  description:
    "Tinas de inmersión en frío con enfriamiento activo, sin hielo. MF ONE de acrílico, MF Horizon y MF Barrel inflables. Envío y soporte en todo México.",
};

export default function Home() {
  return (
    <>
      <Announcement />
      <Navbar />
      <LandingV2 />
      <B2BBand />
      <Footer />
    </>
  );
}
