"use client";

import { useState } from "react";
import { IconAssets, ImageAssets } from "@/common/constant/assets";
import { Button } from "@/components/ui/button";
import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import Image from "next/image";
import RatingIndex from "./components/rating_index";
import ReviewList from "./components/review_list";

export default function ReviewAnimal() {
  return (
    <>
      <HeroSectionBeranda showButton={false} />

      <Container bg="bg-white" className="py-16 px-50">
        <Container className="w-full bg-white border border-gray-200 rounded-lg">
          <Container className="border-b">
            <Text size={15} className="font-medium p-4">
              Review
            </Text>
          </Container>
          <Column className="w-full p-4 gap-4" crossAxisAlignment="start">
            <RatingIndex />
            <SizedBox height={15} />
            <Text size={15} className="font-medium">
              Balasan Pengguna
            </Text>
            <ReviewList />
          </Column>
        </Container>
      </Container>
    </>
  );
}
