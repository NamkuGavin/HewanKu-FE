import {
  Text,
  Column,
  Container,
  Padding,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";

export default function AboutUsPage() {
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
              Tentang Kami
            </Text>
            <Text className="text-gray-600 text-center max-w-2xl">
              Kami adalah platform adopsi hewan yang berkomitmen untuk
              menghubungkan hewan-hewan yang membutuhkan rumah dengan keluarga
              yang penuh kasih sayang.
            </Text>
          </Column>
        </Container>
      </Container>
    </>
  );
}
