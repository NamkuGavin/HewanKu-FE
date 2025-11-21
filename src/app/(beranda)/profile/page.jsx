import {
  Text,
  Row,
  Container,
  Column,
  SizedBox,
} from "@/components/shared/custom_widget";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AkunSayaPage() {
  return (
    <Container className="bg-white border border-gray-200 rounded-lg">
      <Container className="border-b">
        <Text size={15} className="font-medium p-4">
          PENGATURAN AKUN
        </Text>
      </Container>

      <Row crossAxisAlignment="start" className="gap-8 p-8">
        {/* Profile Picture */}
        <Container className="w-40 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl">
          😊
        </Container>
        <Column className="w-full">
          <Row mainAxisAlignment="between" className="gap-8">
            <div className="grid w-full gap-2">
              <Label htmlFor="displayName">Display name</Label>
              <Input
                id="displayName"
                placeholder="Display name"
                defaultValue="Gavin"
                className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Username"
                defaultValue="MGA"
                className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
            </div>
          </Row>
          <SizedBox height={20} />
          <Row mainAxisAlignment="between" className="gap-8">
            <div className="grid w-full gap-2">
              <Label htmlFor="namaLengkap">Nama Lengkap</Label>
              <Input
                id="namaLengkap"
                placeholder="Nama Lengkap"
                defaultValue="Muhammad Gavin Arasyi"
                className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
            </div>
            <div className="grid w-full gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                defaultValue="m.gavin.aga10@gmail.com"
                className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
            </div>
          </Row>
          <SizedBox height={20} />
          <Row mainAxisAlignment="between" className="gap-8">
            <div className="grid w-full gap-2">
              <Label htmlFor="noTelp">Nomor Telephone</Label>
              <Input
                id="noTelp"
                placeholder="Nomor Telephone"
                defaultValue="+6282170677488"
                className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
            </div>
            <div className="grid w-full gap-2">
              <Container></Container>
            </div>
          </Row>
        </Column>
      </Row>
    </Container>
  );
}
