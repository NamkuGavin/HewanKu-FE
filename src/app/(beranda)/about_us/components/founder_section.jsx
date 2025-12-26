"use client";

import { useState } from "react";
import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
  ReadMoreText,
} from "@/components/shared/custom_widget";
import Image from "next/image";
import { ImageAssets } from "@/common/constant/assets";

export default function FounderSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Row
      mainAxisAlignment="center"
      crossAxisAlignment="center"
      className="w-full"
    >
      <Image
        src={ImageAssets.zuhriProfile}
        alt="zuhriBlur"
        width={1750}
        height={1750}
        className="rounded-2xl object-cover"
      />
      <SizedBox width={150} />
      <Column crossAxisAlignment="start">
        <Text size={30} className="font-semibold text-left">
          Zuhri
        </Text>
        <Text size={15} className="font-semibold text-left text-stone-500">
          Founder, Project Manager, UI/UX Designer
        </Text>
        <SizedBox height={30} />
        <Text
          size={15}
          className="font-semibold text-left text-stone-500 italic line-clamp-none"
        >
          Sebagai founder, saya melihat bahwa teknologi dapat berperan lebih
          dari sekadar media informasi. Teknologi seharusnya mampu menjadi
          sistem yang mengatur proses, menjaga akuntabilitas, dan melindungi
          kepentingan semua pihak, terutama kesejahteraan hewan. Dari pemikiran
          tersebut, HewanKu dirancang sebagai platform yang tidak hanya
          menampilkan data hewan, tetapi juga mengelola proses adopsi secara
          terstruktur, terverifikasi, dan bertanggung jawab.
        </Text>
      </Column>
    </Row>
  );
}
