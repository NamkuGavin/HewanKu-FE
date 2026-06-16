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
            src={ImageAssets.gavinProfile}
            alt="gavinProfile"
            width={350}
            height={350}
            className="rounded-2xl object-cover"
          />
          <SizedBox height={15} />
          <Text size={20} className="font-semibold text-left">
            Muhammad Gavin Arasyi
          </Text>
          <Text size={15} className="font-semibold text-left text-stone-500">
            FrontEnd Mobile + Web
          </Text>
        </Column>
        <Column crossAxisAlignment="center" mainAxisAlignment="center">
          <Image
            src={ImageAssets.aliProfile}
            alt="aliProfile"
            width={350}
            height={350}
            className="h-88 rounded-2xl object-cover"
          />
          <SizedBox height={15} />
          <Text size={20} className="font-semibold text-center">
            Ali Luqmanul Hakim
          </Text>
          <Text size={15} className="font-semibold text-left text-stone-500">
            Quality Assurance - UI/UX
          </Text>
        </Column>
        <Column crossAxisAlignment="center" mainAxisAlignment="center">
          <Image
            src={ImageAssets.rakaProfile}
            alt="rakaProfile"
            width={350}
            height={350}
            className="rounded-2xl object-cover"
          />
          <SizedBox height={15} />
          <Text size={20} className="font-semibold text-center">
            Redemtus De Ferento Raka
          </Text>
          <Text size={15} className="font-semibold text-left text-stone-500">
            BackEnd Developer
          </Text>
        </Column>
      </Row>
      <SizedBox height={50} />
      <Row mainAxisAlignment="between">
        <Column crossAxisAlignment="center" mainAxisAlignment="center">
          <Image
            src={ImageAssets.zuhriProfile2}
            alt="gavinProfile"
            width={350}
            height={350}
            className="h-88 rounded-2xl object-cover"
          />
          <SizedBox height={15} />
          <Text size={20} className="font-semibold text-left">
            Zuhri Pratisto Basuki
          </Text>
          <Text size={15} className="font-semibold text-left text-stone-500">
            PM - UI/UX - FrontEnd Mobile
          </Text>
        </Column>
        <Column crossAxisAlignment="center" mainAxisAlignment="center">
          <Image
            src={ImageAssets.aliRole}
            alt="aliProfile"
            width={350}
            height={350}
            className="h-88 rounded-2xl object-cover"
          />
          <SizedBox height={15} />
          <Text size={20} className="font-semibold text-center">
            Abdullah Al Arifi
          </Text>
          <Text size={15} className="font-semibold text-left text-stone-500">
            FrontEnd Web
          </Text>
        </Column>
        <Column crossAxisAlignment="center" mainAxisAlignment="center">
          <Image
            src={ImageAssets.aliRole}
            alt="rakaProfile"
            width={350}
            height={350}
            className="rounded-2xl object-cover"
          />
          <SizedBox height={15} />
          <Text size={20} className="font-semibold text-center">
            Riyan Permana Purba
          </Text>
          <Text size={15} className="font-semibold text-left text-stone-500">
            FrontEnd Mobile - UI/UX
          </Text>
        </Column>
      </Row>
    </>
  );
}
