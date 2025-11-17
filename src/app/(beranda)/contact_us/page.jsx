"use client";

import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import dynamic from "next/dynamic";
import FormContactUs from "./components/form_contact_us";

const MapComponent = dynamic(() => import("@/components/shared/map_widget"), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function ContactUsPage() {
  const customMarkers = [
    {
      lat: -6.973213942396474,
      lng: 107.63094244362806,
      popup: "Telkom University",
    },
  ];

  return (
    <>
      <HeroSectionBeranda showButton={true} />

      {/* Content Section */}
      <Container bg="bg-white" className="pt-12 pb-16" px={8}>
        <Container className="max-w-6xl mx-auto">
          <Column
            mainAxisAlignment="center"
            crossAxisAlignment="center"
            className="min-h-96"
          >
            <FormContactUs />
            <SizedBox height={25} />
            <MapComponent
              center={[-6.973213942396474, 107.63094244362806]}
              zoom={15}
              markers={customMarkers}
            />
          </Column>
        </Container>
      </Container>
    </>
  );
}
