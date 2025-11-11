"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Text,
  Column,
  Container,
  Padding,
  SizedBox,
  Row,
} from "@/components/shared/custom_widget";
import Link from "next/link";

export default function HeroSectionBeranda({ showButton = true }) {
  return (
    <Container className="relative overflow-hidden">
      <div className="bg-[url('/images/background_header.png')] bg-no-repeat bg-[size:75%] bg-right">
        <Padding vertical={85}>
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
                Jutaan hewan menanti rumah penuh kasih. Berikan kesempatan kedua
                <br />
                dan rasakan kebahagiaan sejati. Proses adopsi yang mudah dan
                aman.
              </Text>
              {showButton && (
                <Button
                  asChild
                  className="bg-black text-white px-8 py-5 rounded-lg font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <Link href="/adopsi">Adopsi Sekarang</Link>
                </Button>
              )}
            </Column>
          </Container>
        </Padding>
      </div>
    </Container>
  );
}
