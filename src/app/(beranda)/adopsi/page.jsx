import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import AdopsiByKategori from "./components/adopsi_by_kategori";

export default function AdopsiPage() {
  return (
    <>
      <HeroSectionBeranda showButton={false} />

      {/* Content Section */}
      <Container bg="bg-white" className="pt-16 pb-16">
        <Container className="max-w-6xl mx-auto">
          <Column
            mainAxisAlignment="start"
            crossAxisAlignment="start"
            className="min-h-96"
          >
            <AdopsiByKategori />
            <SizedBox height={50} />
          </Column>
        </Container>
      </Container>
    </>
  );
}
