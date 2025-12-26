import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageAssets, IconAssets } from "@/common/constant/assets";

export default function FormContactUs() {
  return (
    <Row
      mainAxisAlignment="between"
      crossAxisAlignment="start"
      className="gap-12"
    >
      <Container bg="bg-[#F8F9FA]" className="w-3/4 p-8">
        <Column crossAxisAlignment="start">
          <Row mainAxisAlignment="between" className="gap-8">
            <div className="grid w-full gap-2">
              <Label htmlFor="namaDepan">Nama Depan</Label>
              <Input
                id="namaDepan"
                placeholder="Nama Depan"
                className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="namaBelakang">Nama Belakang</Label>
              <Input
                id="namaBelakang"
                placeholder="Nama Belakang"
                className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
            </div>
          </Row>
          <SizedBox height={20} />
          <div className="grid w-full gap-2">
            <Label htmlFor="email">Alamat Email</Label>
            <Input
              id="email"
              placeholder="Alamat Email"
              className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
            />
          </div>
          <SizedBox height={20} />
          <div className="grid w-full gap-2">
            <Label htmlFor="pesan">Pesan</Label>
            <Textarea
              id="pesan"
              placeholder="Pesan"
              className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
            />
          </div>
          <SizedBox height={20} />
          <Button className="h-[35px] w-1/2 bg-[#FF8D28] hover:bg-[#FBA81F] cursor-pointer rounded-sm">
            Kirim Pesan
          </Button>
        </Column>
      </Container>
      <Column crossAxisAlignment="start">
        <Text size={30} className="font-semibold text-left">
          Feel free to contact us
        </Text>
        <SizedBox height={12} />
        <Text size={15} className="font-normal text-left">
          Hubungi kami untuk mendapatkan informasi, bantuan, atau dukungan
          terkait proses adopsi dan layanan HewanKu. Kami siap membantu Anda
          dengan respon yang cepat dan terpercaya.
        </Text>
        <SizedBox height={20} />
        <Row className="gap-4">
          <Container className="bg-[#FD7E14] rounded-full p-1.5">
            <Image
              src={IconAssets.mapPinIcon}
              alt="mapPin"
              width={20}
              height={20}
            />
          </Container>
          <Text size={15} className="font-semibold">
            Telkom University
          </Text>
        </Row>
        <SizedBox height={15} />
        <Row className="gap-4">
          <Container className="bg-[#FD7E14] rounded-full p-1.5">
            <Image
              src={IconAssets.mailIcon}
              alt="mailIcon"
              width={20}
              height={20}
            />
          </Container>
          <Text size={15} className="font-semibold">
            pratistozuhri@gmail.com
          </Text>
        </Row>
        <SizedBox height={15} />
        <Row className="gap-4">
          <Container className="bg-[#FD7E14] rounded-full p-1.5">
            <Image
              src={IconAssets.phoneIcon}
              alt="phoneIcon"
              width={20}
              height={20}
            />
          </Container>
          <Text size={15} className="font-semibold">
            +628217067488
          </Text>
        </Row>
        <SizedBox height={15} />
        <Row className="gap-4">
          <Container className="bg-[#FD7E14] rounded-full p-1.5">
            <Image
              src={IconAssets.clockIcon}
              alt="clockIcon"
              width={20}
              height={20}
            />
          </Container>
          <Text size={15} className="font-semibold">
            Mon - Fri: 10AM - 10PM
          </Text>
        </Row>
      </Column>
    </Row>
  );
}
