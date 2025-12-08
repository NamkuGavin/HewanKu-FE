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

export default function ForumInformasi() {
  return (
    <>
    <HeroSectionBeranda showButton={false}/>
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl p-8 shadow-md">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">A. Informasi Pribadi</h2>
          <button className="text-xl font-bold">×</button>
        </div>

        {/* FORM */}
        <form className="space-y-5">

          {/* Nama */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nama Depan</Label>
              <Input placeholder="Muhammad Gavin" />
            </div>
            <div>
              <Label>Nama Belakang</Label>
              <Input placeholder="Arasyl" />
            </div>
          </div>

          {/* Email & Telepon */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="gavinganteng@gmail.com" />
            </div>
            <div>
              <Label>Nomor Telephone</Label>
              <Input type="tel" placeholder="+6282170677488" />
            </div>
          </div>

          {/* Tanggal Lahir & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tanggal Lahir</Label>
              <Input type="date" />
            </div>
            <div>
              <Label>Jenis Kelamin</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pria">Pria</SelectItem>
                  <SelectItem value="wanita">Wanita</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Daerah, Jalan, Zip */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Daerah</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Bandung" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bandung">Bandung</SelectItem>
                  <SelectItem value="jakarta">Jakarta</SelectItem>
                  <SelectItem value="surabaya">Surabaya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Jalan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Telekomunikasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="telekomunikasi">Telekomunikasi</SelectItem>
                  <SelectItem value="dipatiukur">Dipatiukur</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Zip Code</Label>
              <Input placeholder="13456" />
            </div>
          </div>

          {/* Pekerjaan */}
          <div>
            <Label className="block mb-2">Pekerjaan / Status</Label>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <Checkbox id="karyawan" />
                <Label htmlFor="karyawan">Karyawan</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="pelajar" />
                <Label htmlFor="pelajar">Pelajar</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="pengangguran" defaultChecked />
                <Label htmlFor="pengangguran">Pengangguran</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="lainnya" />
                <Label htmlFor="lainnya">Lainnya</Label>
              </div>
            </div>
          </div>

          {/* Tempat Tinggal */}
          <div>
            <Label className="block mb-2">Tempat Tinggal</Label>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <Checkbox id="kos" />
                <Label htmlFor="kos">Kos</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="rumah" />
                <Label htmlFor="rumah">Rumah</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="kontrakan" defaultChecked />
                <Label htmlFor="kontrakan">Kontrakan</Label>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox id="tempat-lainnya" />
                <Label htmlFor="tempat-lainnya">Lainnya</Label>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-between pt-6">
            <Button variant="secondary" className="rounded-full px-10">
              Cancel
            </Button>
            <Button className="rounded-full px-10 bg-orange-500 hover:bg-orange-600">
              Lanjutkan
            </Button>
          </div>

        </form>
      </div>
    </div>
    </>
  );
}
