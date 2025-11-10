import Image from "next/image";
import { ImageAssets, IconAssets } from "@/common/constant/assets";
import {
  Text,
  Column,
  Container,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";

export default function FooterBeranda() {
  return (
    <Container bg="bg-gray-100">
      <div
        className={`bg-[url('/images/background_footer.png')] bg-no-repeat bg-[size:85%] bg-right`}
      >
        <Container className="max-w-6xl mx-auto pt-15 pb-8">
          <Row mainAxisAlignment="between" crossAxisAlignment="start">
            {/* Brand */}
            <Column
              mainAxisAlignment="start"
              crossAxisAlignment="start"
              className="w-1/3"
            >
              <Image
                src={ImageAssets.logoApp}
                alt="Logo"
                width={100}
                height={100}
                className="mb-4"
              />
              <Text className="text-sm leading-relaxed mb-8">
                Jutaan hewan menanti rumah penuh kasih. Berikan kesempatan kedua
                dan rasakan kebahagiaan sejati. Proses adopsi yang mudah dan
                aman.
              </Text>
              <Row
                mainAxisAlignment="start"
                crossAxisAlignment="center"
                className="w-auto gap-3"
              >
                <Image
                  src={IconAssets.facebookBlackIcon}
                  alt="facebook"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
                <Image
                  src={IconAssets.instagramIcon}
                  alt="instagram"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
                <Image
                  src={IconAssets.twitterIcon}
                  alt="twitter"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
                <Image
                  src={IconAssets.youtubeIcon}
                  alt="youtube"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
              </Row>
            </Column>

            {/* Company Links */}
            <Column
              mainAxisAlignment="start"
              crossAxisAlignment="start"
              className="w-1/6"
            >
              <Text size={16} className="mb-4 font-semibold">
                Company
              </Text>
              <Column
                mainAxisAlignment="start"
                crossAxisAlignment="start"
                className="gap-2"
              >
                <Text className="text-sm hover:text-gray-400 cursor-pointer">
                  About Us
                </Text>
                <Text className="text-sm hover:text-gray-400 cursor-pointer">
                  Blog
                </Text>
                <Text className="text-sm hover:text-gray-400 cursor-pointer">
                  Gift Cards
                </Text>
                <Text className="text-sm hover:text-gray-400 cursor-pointer">
                  Careers
                </Text>
              </Column>
            </Column>

            {/* Useful Links */}
            <Column
              mainAxisAlignment="start"
              crossAxisAlignment="start"
              className="w-1/6"
            >
              <Text size={16} className="mb-4 font-semibold">
                Useful Links
              </Text>
              <Column
                mainAxisAlignment="start"
                crossAxisAlignment="start"
                className="gap-2"
              >
                <Text className="text-sm hover:text-gray-400  cursor-pointer">
                  New products
                </Text>
                <Text className="text-sm hover:text-gray-400 cursor-pointer">
                  Best sellers
                </Text>
                <Text className="text-sm hover:text-gray-400 cursor-pointer">
                  Discount
                </Text>
                <Text className="text-sm hover:text-gray-400 cursor-pointer">
                  F.A.Q
                </Text>
              </Column>
            </Column>

            {/* Customer Service */}
            <Column
              mainAxisAlignment="start"
              crossAxisAlignment="start"
              className="w-1/6"
            >
              <Text size={16} className="mb-4 font-semibold">
                Customer Service
              </Text>
              <Column
                mainAxisAlignment="start"
                crossAxisAlignment="start"
                className="gap-2"
              >
                <Text className="text-sm hover:text-gray-400 cursor-pointer">
                  Contact Us
                </Text>
                <Text className="text-sm hover:text-gray-400 cursor-pointer">
                  Shipping
                </Text>
                <Text className="text-sm hover:text-gray-400 cursor-pointer">
                  Returns
                </Text>
                <Text className="text-sm hover:text-gray-400 cursor-pointer">
                  Order tracking
                </Text>
              </Column>
            </Column>

            {/* Store */}
            <Column
              mainAxisAlignment="start"
              crossAxisAlignment="start"
              className="w-1/4"
            >
              <Text size={16} className="mb-4 font-semibold">
                Store
              </Text>
              <Text className="text-sm leading-relaxed font-medium">
                Jl. Telekomunikasi No. 1, Bandung, Terusan Buahbatu -
                Bojongsoang, Sukapura, Dayeuh Kolot 40257 Bandung West Java
              </Text>
              <SizedBox height={12} />
              <Text className="text-sm font-medium">+6282170677488</Text>
              <Text className="text-sm font-medium mb-4">
                pratistozuhri@gmail.com
              </Text>
              <Row
                mainAxisAlignment="start"
                crossAxisAlignment="center"
                className="w-auto gap-3"
              >
                <Image
                  src={ImageAssets.gopayLogo}
                  alt="gopay"
                  width={75}
                  height={75}
                />
                <Image
                  src={ImageAssets.qrisLogo}
                  alt="instagram"
                  width={75}
                  height={75}
                />
                <Image
                  src={ImageAssets.mandiriLogo}
                  alt="mandiri"
                  width={75}
                  height={75}
                />
                <Image
                  src={ImageAssets.danaLogo}
                  alt="dana"
                  width={75}
                  height={75}
                />
              </Row>
            </Column>
          </Row>
        </Container>
      </div>
    </Container>
  );
}
