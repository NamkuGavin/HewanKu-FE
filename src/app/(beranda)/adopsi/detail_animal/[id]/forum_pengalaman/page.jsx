"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import { Container } from "@/components/shared/custom_widget";
import { useNavigator } from "@/utils/helper";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ForumPengalaman() {
  const nav = useNavigator();
  const { id: animalId } = useParams();

  // STATE UNTUK SINGLE CHOICE SETIAP PERTANYAAN
  const [pernahPelihara, setPernahPelihara] = useState(""); // iya / tidak
  const [hewanLain, setHewanLain] = useState(""); // iya / tidak
  const [alergi, setAlergi] = useState(""); // iya / tidak
  const [aman, setAman] = useState(""); // iya / tidak

  return (
    <>
      <HeroSectionBeranda showButton={false} />

      <Container bg="bg-white" className="py-16 px-50">
        <div className="w-full bg-white rounded-2xl p-10 border-2 border-[#E0E8FF]">
          
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">B. Pengalaman & Kondisi Lingkungan</h2>
            <button
              type="button"
              className="text-xl font-bold cursor-pointer"
              onClick={() => nav.pop()}
            >
              X
            </button>
          </div>

          {/* FORM */}
          <form className="space-y-10">

            {/* 1. Pernah memelihara hewan? */}
            <div>
              <p className="font-medium mb-3">
                Apakah Anda pernah memelihara hewan sebelumnya?
              </p>

              <div className="grid grid-cols-2 gap-10 pl-2">

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={pernahPelihara === "iya"}
                    onCheckedChange={() => setPernahPelihara("iya")}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Iya</Label>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={pernahPelihara === "tidak"}
                    onCheckedChange={() => setPernahPelihara("tidak")}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Tidak</Label>
                </label>

              </div>
            </div>

            {/* 2. Jika Ya → Hewan & Lama */}
            <div>
              <p className="font-medium mb-3">
                Jika ya, hewan apa yang pernah Anda pelihara dan berapa lama?
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Hewan dan Ras</Label>
                  <Input className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500" />
                </div>

                <div>
                  <Label className="mb-2 block">Hari, Bulan, Tahun</Label>
                  <Input
                  type="date"
                  className="bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
                />
                </div>
              </div>
            </div>

            {/* 3. Punya hewan lain? */}
            <div>
              <p className="font-medium mb-3">
                Saat ini apakah Anda memiliki hewan peliharaan lain?
              </p>

              <div className="grid grid-cols-2 gap-10 pl-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={hewanLain === "iya"}
                    onCheckedChange={() => setHewanLain("iya")}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Iya</Label>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={hewanLain === "tidak"}
                    onCheckedChange={() => setHewanLain("tidak")}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Tidak</Label>
                </label>
              </div>
            </div>

            {/* 4. Keluarga alergi? */}
            <div>
              <p className="font-medium mb-3">
                Apakah ada anggota keluarga atau teman serumah yang alergi terhadap hewan?
              </p>

              <div className="grid grid-cols-2 gap-10 pl-2">

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={alergi === "iya"}
                    onCheckedChange={() => setAlergi("iya")}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Iya</Label>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={alergi === "tidak"}
                    onCheckedChange={() => setAlergi("tidak")}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Tidak</Label>
                </label>

              </div>
            </div>

            {/* 5. Lingkungan aman? */}
            <div>
              <p className="font-medium mb-3">
                Apakah lingkungan tempat tinggal Anda aman untuk hewan?
              </p>

              <div className="grid grid-cols-2 gap-10 pl-2">

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={aman === "iya"}
                    onCheckedChange={() => setAman("iya")}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Iya</Label>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={aman === "tidak"}
                    onCheckedChange={() => setAman("tidak")}
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Tidak</Label>
                </label>

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
