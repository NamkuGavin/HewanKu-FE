import { Button } from "@/components/ui/button";
import {
  Text,
  Column,
  Container,
  Padding,
} from "@/components/shared/custom_widget";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <>
      {/* Hero Section */}
      <Container className="relative overflow-hidden">
        <div className="bg-[url('/images/background_header.png')] bg-no-repeat bg-[size:75%] bg-right">
          <Padding vertical={125}>
            <Container px={8} py={12}>
              <Column
                mainAxisAlignment="start"
                crossAxisAlignment="start"
                className="w-1/2"
              >
                <Text className="text-orange-500 text-sm font-bold mb-4">
                  Adopsi Hewan
                </Text>
                <Text size={32} className="leading-tight font-bold mb-4">
                  Temukan Pasangan Sempurna Anda.
                  <br />
                  Adopsi Hewan Peliharaan Hari Ini.
                </Text>
                <Text size={16} className="mb-8 leading-relaxed font-normal">
                  Jutaan hewan menanti rumah penuh kasih. Berikan kesempatan
                  kedua
                  <br />
                  dan rasakan kebahagiaan sejati. Proses adopsi yang mudah dan
                  aman.
                </Text>
                <Button
                  asChild
                  className="bg-black text-white px-8 py-5 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <Link href="/adopsi">Adopsi Sekarang</Link>
                </Button>
              </Column>
            </Container>
          </Padding>
        </div>
      </Container>

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
