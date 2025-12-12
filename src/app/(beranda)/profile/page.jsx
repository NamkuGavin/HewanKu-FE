"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
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
import { Button } from "@/components/ui/button";

export default function AkunSayaPage() {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? "text" : "password";

  return (
    <Column>
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
            <div className="w-full grid grid-cols-2 gap-8">
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
              <div className="grid w-full gap-2">
                <Label htmlFor="displayName">Nama Lengkap</Label>
                <Input
                  id="namaLengkap"
                  placeholder="Nama Lengkap"
                  defaultValue="Muhammad Gavin Arasyi"
                  className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                />
              </div>
              <div className="grid w-full gap-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  id="email"
                  placeholder="Email"
                  defaultValue="m.gavin.aga10@gmail.com"
                  className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                />
              </div>
              <div className="grid w-full gap-2">
                <Label htmlFor="username">No. Telephone</Label>
                <Input
                  id="noTelephone"
                  placeholder="No Telephone"
                  defaultValue="+6282170677488"
                  className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                />
              </div>
              <SizedBox />
              <div className="grid w-full gap-2">
                <Label htmlFor="username">Negara/Daerah</Label>
                <Select defaultValue="indonesia">
                  <SelectTrigger className="w-full bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500">
                    <SelectValue placeholder="Pilih Negara/Daerah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Negara/Daerah</SelectLabel>
                      <SelectItem value="indonesia">Indonesia</SelectItem>
                      <SelectItem value="malaysia">Malaysia</SelectItem>
                      <SelectItem value="singapure">Singapure</SelectItem>
                      <SelectItem value="thailand">Thailand</SelectItem>
                      <SelectItem value="myanmar">Myanmar</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Row className="gap-4">
                <div className="grid w-full gap-2">
                  <Label htmlFor="username">Jalan</Label>
                  <Select defaultValue="telekomunikasi">
                    <SelectTrigger className="w-full bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500">
                      <SelectValue placeholder="Pilih Jalan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Jalan</SelectLabel>
                        <SelectItem value="telekomunikasi">
                          Telekomunikasi
                        </SelectItem>
                        <SelectItem value="marditomo">Mardi Utomo</SelectItem>
                        <SelectItem value="diponegoro">Diponegoro</SelectItem>
                        <SelectItem value="jendralSudirman">
                          Jendral Sudirman
                        </SelectItem>
                        <SelectItem value="bojongsoang">Bojongosang</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full grid gap-2">
                  <Label htmlFor="username">Zip Code</Label>
                  <Input
                    id="zipCode"
                    placeholder="Zip Code"
                    defaultValue="1207"
                    className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                  />
                </div>
              </Row>
            </div>
          </Column>
        </Row>
      </Container>
      <SizedBox height={25} />
      <Container className="w-full bg-white border border-gray-200 rounded-lg">
        <Container className="border-b">
          <Text size={15} className="font-medium p-4">
            UBAH PASSWORD
          </Text>
        </Container>
        <Column className="w-full p-4">
          {" "}
          <div className="grid w-full gap-2">
            <Label htmlFor="currentPassword">Password Sekarang</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password saat ini"
                className="bg-white rounded-sm pr-10 focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </Column>
      </Container>
    </Column>
  );
}
