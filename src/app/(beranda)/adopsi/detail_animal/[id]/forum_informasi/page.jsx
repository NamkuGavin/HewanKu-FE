"use client";

import { useEffect, useState } from "react";
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
import { Container } from "@/components/shared/custom_widget";
import { useNavigator } from "@/utils/helper";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { getAnimalById } from "@/actions/animal.action";
import { useApiRequest } from "@/hooks/use-api-request";

const defaultForm = {
  namaDepan: "",
  namaBelakang: "",
  email: "",
  noTelepon: "",
  tanggalLahir: "",
  jenisKelamin: "",
  daerah: "",
  jalan: "",
  zipCode: "",
  pekerjaanStatus: "",
  tempatTinggal: "",
};

const requiredFields = [
  "namaDepan",
  "namaBelakang",
  "email",
  "noTelepon",
  "tanggalLahir",
  "jenisKelamin",
  "daerah",
  "jalan",
  "zipCode",
  "pekerjaanStatus",
  "tempatTinggal",
];

const pekerjaanOptions = ["Karyawan", "Mahasiswa", "Pengangguran", "Lainnya"];
const tempatTinggalOptions = ["Kos", "Rumah Pribadi", "Kontrakan", "Lainnya"];

function getStorageKey(animalId) {
  return `adoption-form:${animalId}`;
}

function hasEmptyRequiredField(form) {
  return requiredFields.some((field) => !String(form[field] || "").trim());
}

function isSoldAnimal(status) {
  return String(status || "").trim().toLowerCase() === "terjual";
}

export default function ForumInformasi() {
  const nav = useNavigator();
  const { run } = useApiRequest();
  const params = useParams();
  const animalId = params.id;
  const [form, setForm] = useState(defaultForm);
  const [isCheckingAnimal, setIsCheckingAnimal] = useState(true);
  const [isAnimalSold, setIsAnimalSold] = useState(false);

  useEffect(() => {
    let ignore = false;

    const checkAnimal = async () => {
      setIsCheckingAnimal(true);

      try {
        const response = await run(() => getAnimalById(animalId), {
          errorMessage: "Gagal mengecek status hewan",
        });
        const sold = isSoldAnimal(response?.data?.status);

        if (ignore) {
          return;
        }

        setIsAnimalSold(sold);

        if (sold) {
          toast.error("Hewan ini sudah diadopsi dan tidak bisa dipesan.");
          nav.replace(`/adopsi/detail_animal/${animalId}`);
        }
      } catch (error) {
        if (!ignore) {
          toast.error(error?.message || "Gagal mengecek status hewan");
        }
      } finally {
        if (!ignore) {
          setIsCheckingAnimal(false);
        }
      }
    };

    if (animalId) {
      checkAnimal();
    }

    return () => {
      ignore = true;
    };
  }, [animalId, run]);

  useEffect(() => {
    const savedForm = window.sessionStorage.getItem(getStorageKey(animalId));

    if (!savedForm) {
      return;
    }

    try {
      const parsedForm = JSON.parse(savedForm);
      setForm((prev) => ({ ...prev, ...parsedForm }));
    } catch {
      window.sessionStorage.removeItem(getStorageKey(animalId));
    }
  }, [animalId]);

  const setFormField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isAnimalSold) {
      toast.error("Hewan ini sudah diadopsi dan tidak bisa dipesan.");
      nav.replace(`/adopsi/detail_animal/${animalId}`);
      return;
    }

    if (hasEmptyRequiredField(form)) {
      toast.error("Semua data informasi pribadi wajib diisi.");
      return;
    }

    window.sessionStorage.setItem(getStorageKey(animalId), JSON.stringify(form));
    nav.push(`/adopsi/detail_animal/${animalId}/forum_pengalaman`);
  };

  const inputClass =
    "bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500";
  const selectClass =
    "w-full focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500 data-[state=open]:border-orange-500 data-[state=open]:ring-orange-500/20";

  return (
    <>
      <HeroSectionBeranda showButton={false} />
      <Container bg="bg-white" className="py-16 px-50">
        <div className="w-full bg-white rounded-2xl p-10 border-2 border-[#E0E8FF]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">A. Informasi Pribadi</h2>
            <button
              type="button"
              className="text-xl font-bold cursor-pointer"
              onClick={() => nav.pop()}
            >
              X
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Nama Depan</Label>
                <Input
                  value={form.namaDepan}
                  onChange={(e) => setFormField("namaDepan", e.target.value)}
                  placeholder="Muhammad Gavin"
                  className={inputClass}
                />
              </div>
              <div>
                <Label className="mb-2 block">Nama Belakang</Label>
                <Input
                  value={form.namaBelakang}
                  onChange={(e) => setFormField("namaBelakang", e.target.value)}
                  placeholder="Arasyl"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Email</Label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setFormField("email", e.target.value)}
                  placeholder="gavinganteng@gmail.com"
                  className={inputClass}
                />
              </div>
              <div>
                <Label className="mb-2 block">Nomor Telephone</Label>
                <Input
                  type="tel"
                  value={form.noTelepon}
                  onChange={(e) => setFormField("noTelepon", e.target.value)}
                  placeholder="081234567890"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Tanggal Lahir</Label>
                <Input
                  type="date"
                  value={form.tanggalLahir}
                  onChange={(e) => setFormField("tanggalLahir", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <Label className="mb-2 block">Jenis Kelamin</Label>
                <Select
                  value={form.jenisKelamin}
                  onValueChange={(value) => setFormField("jenisKelamin", value)}
                >
                  <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Pilih" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="mb-2 block">Daerah</Label>
                <Select
                  value={form.daerah}
                  onValueChange={(value) => setFormField("daerah", value)}
                >
                  <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Pilih daerah" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="Bandung">Bandung</SelectItem>
                    <SelectItem value="Jakarta">Jakarta</SelectItem>
                    <SelectItem value="Surabaya">Surabaya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="mb-2 block">Jalan</Label>
                <Input
                  value={form.jalan}
                  onChange={(e) => setFormField("jalan", e.target.value)}
                  placeholder="Jl. Telekomunikasi No. 1"
                  className={inputClass}
                />
              </div>

              <div>
                <Label className="mb-2 block">Zip Code</Label>
                <Input
                  value={form.zipCode}
                  onChange={(e) => setFormField("zipCode", e.target.value)}
                  placeholder="40257"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-10">
              <Label className="block mb-6 text-center font-semibold">
                Pekerjaan / Status
              </Label>

              <div className="grid grid-cols-4 mt-4 flex justify-center gap-14 items-center">
                {pekerjaanOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Checkbox
                      checked={form.pekerjaanStatus === option}
                      onCheckedChange={(checked) =>
                        checked && setFormField("pekerjaanStatus", option)
                      }
                      className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <Label>{option}</Label>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <Label className="block mb-6 text-center font-semibold">
                Tempat Tinggal
              </Label>

              <div className="grid grid-cols-4 mt-4 flex justify-center gap-14 items-center">
                {tempatTinggalOptions.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Checkbox
                      checked={form.tempatTinggal === option}
                      onCheckedChange={(checked) =>
                        checked && setFormField("tempatTinggal", option)
                      }
                      className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                    />
                    <Label>{option}</Label>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-6 pt-6">
              <Button
                type="button"
                variant="secondary"
                className="rounded-full px-20 bg-black text-white hover:bg-black/80 cursor-pointer"
                onClick={() => nav.pop()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isCheckingAnimal || isAnimalSold}
                className="rounded-full px-20 bg-orange-500 hover:bg-orange-600 cursor-pointer"
              >
                {isCheckingAnimal ? "Mengecek..." : "Lanjutkan"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
