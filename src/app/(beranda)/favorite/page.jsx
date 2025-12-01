import {
  Text,
  Column,
  Container,
  Padding,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";

export default function FavoritePage() {
  return (
    <>
      <HeroSectionBeranda showButton={true} />

      {/* Content Section */}
      <Container bg="bg-white" className="pt-32 pb-16" px={8}>
        <Container className="max-w-6xl mx-auto">
          <Column
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            className="min-h-96"
          >
            <Text size={32} weight="600" className="mb-4">
              Halaman Favorite
            </Text>
          </Column>
        </Container>
      </Container>
    </>
  );
}
