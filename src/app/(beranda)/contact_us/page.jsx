import {
  Text,
  Column,
  Container,
  Padding,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";

export default function ContactUsPage() {
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
              Hubungi Kami
            </Text>
            <Text className="text-gray-600 text-center mb-8">
              Ada pertanyaan? Jangan ragu untuk menghubungi kami
            </Text>
            <Column
              mainAxisAlignment="start"
              crossAxisAlignment="start"
              className="gap-4"
            >
              <Text className="text-sm">
                <strong>Email:</strong> pratistozuhri@gmail.com
              </Text>
              <Text className="text-sm">
                <strong>Phone:</strong> +6282170677488
              </Text>
              <Text className="text-sm">
                <strong>Alamat:</strong> Jl. Telekomunikasi No. 1, Bandung
              </Text>
            </Column>
          </Column>
        </Container>
      </Container>
    </>
  );
}
