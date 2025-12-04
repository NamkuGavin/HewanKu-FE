"use client";

import { use } from "react";
import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import AnimalImageSlider from "./components/animal_image_slider";
import AnimalInfo from "./components/animal_info";

export default function DetailAnimal({ params }) {
  const resolvedParams = use(params);
  const animalId = resolvedParams.id;

  return (
    <>
      <HeroSectionBeranda showButton={false} />

      {/* Content Section */}
      <Container bg="bg-white" className="py-16 px-25">
        <Column
          mainAxisAlignment="start"
          crossAxisAlignment="start"
          className="min-h-96"
        >
          <Row className="w-full gap-8" mainAxisAlignment="center">
            <AnimalImageSlider />
            <AnimalInfo />
          </Row>
        </Column>
      </Container>
    </>
  );
}
