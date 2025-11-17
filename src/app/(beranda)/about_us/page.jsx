import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
  ReadMoreText,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import About from "./components/about";
import FounderSection from "./components/founder_section";
import OurTeamSection from "./components/our_team_section";

export default function AboutUsPage() {
  return (
    <>
      <HeroSectionBeranda showButton={true} />

      {/* Content Section */}
      <Container bg="bg-white" className="pt-4 pb-16" px={8}>
        <Container className="max-w-6xl mx-auto">
          <Column
            mainAxisAlignment="start"
            crossAxisAlignment="start"
            className="pt-8 pb-25"
          >
            <About />
            <SizedBox height={75} />
            <FounderSection />
            <SizedBox height={75} />
            <OurTeamSection />
          </Column>
        </Container>
      </Container>
    </>
  );
}
