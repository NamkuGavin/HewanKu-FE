import {
  Text,
  Column,
  Container,
  SizedBox,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import FavoriteGrid from "./components/favorite_grid";

export default function FavoritePage() {
  return (
    <>
      <HeroSectionBeranda showButton={true} />

      <Container bg="bg-white" className="pt-32 pb-16" px={8}>
        <Container className="max-w-6xl mx-auto">
          <Column
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            className="pt-8 pb-6"
          >
            <Text size={20} className="font-semibold">
              Favorit Kamu
            </Text>
            <SizedBox height={20} />
          </Column>

          {/* GRID FAVORITE + PAGINATION */}
          <FavoriteGrid />
        </Container>
      </Container>
    </>
  );
}
