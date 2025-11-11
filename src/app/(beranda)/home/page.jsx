import {
  Text,
  Column,
  Container,
  Padding,
  SizedBox,
  Row,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import HewanUnggulan from "./components/hewan_unggulan";
import KategoriHewan from "./components/kategori_hewan";
import NewsBlog from "./components/news_blog";

export default function HomePage() {
  return (
    <>
      <HeroSectionBeranda showButton={true} />

      {/* Content Section */}
      <Container bg="bg-white">
        <Container className="max-w-6xl mx-auto">
          <Column
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            className="py-12"
          >
            <HewanUnggulan />
            <SizedBox height={50} />
            <KategoriHewan />
            <SizedBox height={50} />
            <NewsBlog />
          </Column>
        </Container>
      </Container>
    </>
  );
}
