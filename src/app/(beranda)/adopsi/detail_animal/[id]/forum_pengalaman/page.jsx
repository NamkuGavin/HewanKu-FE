"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import {
  Text,
  Column,
  Container,
  Padding,
  Row,
  SizedBox,
} from "@/components/shared/custom_widget";
import { useNavigator } from "@/utils/helper";
import { useParams } from "next/navigation";

export default function ForumPengalaman() {
  const nav = useNavigator();
  const { id: animalId } = useParams();

  return (
    <>
      <HeroSectionBeranda showButton={false} />
      {/* Content Section */}
      <Container bg="bg-white" className="py-16 px-50">
        <div className="w-full bg-white rounded-2xl p-10 border-2 border-[#E0E8FF]">
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              B. Pengalaman & Kondisi Lingkungan
            </h2>
            <button
              type="button"
              className="text-xl font-bold cursor-pointer"
              onClick={() => nav.pop()}
            >
              X
            </button>
          </div>

          {/* FORM */}
          <form className="space-y-5">
            {/* Nama */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Nama Depan </Label>
                <Input
                  placeholder="Muhammad Gavin"
                  className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                />
              </div>
              <div>
                <Label className="mb-2 block">Nama Belakang</Label>
                <Input
                  placeholder="Arasyl"
                  className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                />
              </div>
            </div>

            {/* Email & Telepon */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Email</Label>
                <Input
                  type="email"
                  placeholder="gavinganteng@gmail.com"
                  className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                />
              </div>
              <div>
                <Label className="mb-2 block">Nomor Telephone</Label>
                <Input
                  type="tel"
                  placeholder="+6282170677488"
                  className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                />
              </div>
            </div>

            {/* Tanggal Lahir & Gender */}
            <div className="w-full grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Tanggal Lahir</Label>
                <Input
                  type="date"
                  className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                />
              </div>
              <div>
                <Label className="mb-2 block">Jenis Kelamin</Label>
                <Select>
                  <SelectTrigger className="w-full focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500 data-[state=open]:border-orange-500 data-[state=open]:ring-orange-500/20">
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="pria">Pria</SelectItem>
                    <SelectItem value="wanita">Wanita</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Daerah, Jalan, Zip */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="mb-2 block">Daerah</Label>
                <Select>
                  <SelectTrigger className="w-full focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500 data-[state=open]:border-orange-500 data-[state=open]:ring-orange-500/20">
                    <SelectValue placeholder="Bandung" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="bandung">Bandung</SelectItem>
                    <SelectItem value="jakarta">Jakarta</SelectItem>
                    <SelectItem value="surabaya">Surabaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Jalan</Label>
                <Select>
                  <SelectTrigger className="w-full focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500 data-[state=open]:border-orange-500 data-[state=open]:ring-orange-500/20">
                    <SelectValue placeholder="Telekomunikasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="telekomunikasi">
                      Telekomunikasi
                    </SelectItem>
                    <SelectItem value="dipatiukur">Dipatiukur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Zip Code</Label>
                <Input
                  placeholder="13456"
                  className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                />
              </div>
            </div>

            {/* Pekerjaan */}
            <div className="mt-10">
              <Label className="block mb-6 text-center font-semibold">
                Pekerjaan / Status
              </Label>

              <div className="grid grid-cols-4 mt-4 flex justify-center gap-14 items-center">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="karyawan"
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label htmlFor="karyawan">Karyawan</Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="pelajar"
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label htmlFor="pelajar">Pelajar</Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="pengangguran"
                    defaultChecked
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label htmlFor="pengangguran">Pengangguran</Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="lainnya"
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label htmlFor="lainnya">Lainnya</Label>
                </div>
              </div>
            </div>

            {/* Tempat Tinggal */}
            <div className="mt-8">
              <Label className="block mb-6 text-center font-semibold">
                Tempat Tinggal
              </Label>

              <div className="grid grid-cols-4 mt-4 flex justify-center gap-14 items-center">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="kos"
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label htmlFor="kos">Kos</Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="rumah"
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label htmlFor="rumah">Rumah</Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="kontrakan"
                    defaultChecked
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label htmlFor="kontrakan">Kontrakan</Label>
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox
                    id="tempat-lainnya"
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label htmlFor="tempat-lainnya">Lainnya</Label>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <div className="flex justify-center gap-6 pt-6">
              <Button
                type="button"
                variant="secondary"
                className="rounded-full px-20 bg-black text-white hover:bg-black/80 cursor-pointer"
                onClick={() => nav.pop()}
              >
                Kembali
              </Button>
              <Button
                type="submit"
                className="rounded-full px-20 bg-orange-500 hover:bg-orange-600 cursor-pointer"
              >
                Kirim Form
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
