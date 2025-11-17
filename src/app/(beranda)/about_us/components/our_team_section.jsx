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

export default function OurTeamSection() {
  return (
    <>
      <Text size={30} className="font-semibold text-left">
        Our Team
      </Text>
      <SizedBox height={25} />
      <Row mainAxisAlignment="between">
        <Column crossAxisAlignment="center" mainAxisAlignment="center">
          <Image
            src={ImageAssets.gavinBlur}
            alt="gavinBlur"
            width={350}
            height={350}
            className="rounded-2xl object-cover"
          />
          <SizedBox height={15} />
          <Text size={20} className="font-semibold text-left">
            Muhammad Gavin Arasyi
          </Text>
          <Text size={15} className="font-semibold text-left text-stone-500">
            Front-End
          </Text>
        </Column>
        <Column crossAxisAlignment="center" mainAxisAlignment="center">
          <Image
            src={ImageAssets.rakaBlur}
            alt="rakaBlur"
            width={350}
            height={350}
            className="rounded-2xl object-cover"
          />
          <SizedBox height={15} />
          <Text size={20} className="font-semibold text-center">
            Redemtus De Ferento Raka
          </Text>
          <Text size={15} className="font-semibold text-left text-stone-500">
            Back-End
          </Text>
        </Column>
        <Column crossAxisAlignment="center" mainAxisAlignment="center">
          <Image
            src={ImageAssets.aliBlur}
            alt="aliBlur"
            width={350}
            height={350}
            className="rounded-2xl object-cover"
          />
          <SizedBox height={15} />
          <Text size={20} className="font-semibold text-center">
            Ali Luqmanul Hakim
          </Text>
          <Text size={15} className="font-semibold text-left text-stone-500">
            ???
          </Text>
        </Column>
      </Row>
    </>
  );
}
