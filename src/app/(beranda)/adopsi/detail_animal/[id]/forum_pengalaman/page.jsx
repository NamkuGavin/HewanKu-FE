"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import { Container } from "@/components/shared/custom_widget";
import { useNavigator } from "@/utils/helper";
import { useParams } from "next/navigation";
import { createOrder } from "@/actions/order.action";
import { getAnimalById } from "@/actions/animal.action";
import { useApiRequest } from "@/hooks/use-api-request";
import { toast } from "sonner";

const defaultExperienceForm = {
  pernahPelihara: "",
  jenisHewan: "",
  tanggalHewan: "",
  hewanLain: "",
  alergi: "",
  aman: "",
};

const stageARequiredFields = [
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

const stageBRequiredFields = [
  "pernahPelihara",
  "jenisHewan",
  "tanggalHewan",
  "hewanLain",
  "alergi",
  "aman",
];

function getStorageKey(animalId) {
  return `adoption-form:${animalId}`;
}

function hasEmptyRequiredField(data, fields) {
  return fields.some((field) => !String(data?.[field] || "").trim());
}

function toBoolean(value) {
  return value === "iya";
}

function normalizeText(value) {
  return String(value || "").trim();
}

function isSoldAnimal(status) {
  return normalizeText(status).toLowerCase() === "terjual";
}

export default function ForumPengalaman() {
  const nav = useNavigator();
  const { run } = useApiRequest();
  const { id: animalId } = useParams();
  const [personalForm, setPersonalForm] = useState(null);
  const [form, setForm] = useState(defaultExperienceForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      toast.error("Lengkapi informasi pribadi terlebih dahulu.");
      nav.replace(`/adopsi/detail_animal/${animalId}/forum_informasi`);
      return;
    }

    try {
      const parsedForm = JSON.parse(savedForm);

      if (hasEmptyRequiredField(parsedForm, stageARequiredFields)) {
        toast.error("Lengkapi informasi pribadi terlebih dahulu.");
        nav.replace(`/adopsi/detail_animal/${animalId}/forum_informasi`);
        return;
      }

      setPersonalForm(parsedForm);
    } catch {
      window.sessionStorage.removeItem(getStorageKey(animalId));
      toast.error("Lengkapi informasi pribadi terlebih dahulu.");
      nav.replace(`/adopsi/detail_animal/${animalId}/forum_informasi`);
    }
  }, [animalId]);

  const setFormField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isAnimalSold) {
      toast.error("Hewan ini sudah diadopsi dan tidak bisa dipesan.");
      nav.replace(`/adopsi/detail_animal/${animalId}`);
      return;
    }

    if (!personalForm || hasEmptyRequiredField(personalForm, stageARequiredFields)) {
      toast.error("Lengkapi informasi pribadi terlebih dahulu.");
      nav.replace(`/adopsi/detail_animal/${animalId}/forum_informasi`);
      return;
    }

    if (hasEmptyRequiredField(form, stageBRequiredFields)) {
      toast.error("Semua data pengalaman dan lingkungan wajib diisi.");
      return;
    }

    const payload = {
      daerah: normalizeText(personalForm.daerah),
      email: normalizeText(personalForm.email),
      hewanSebelumnya: toBoolean(form.pernahPelihara),
      jalan: normalizeText(personalForm.jalan),
      jenisHewan: normalizeText(form.jenisHewan),
      jenisKelamin: normalizeText(personalForm.jenisKelamin),
      keluargaAlergi: toBoolean(form.alergi),
      lingkunganAman: toBoolean(form.aman),
      memilikiHewan: toBoolean(form.hewanLain),
      nama: `${normalizeText(personalForm.namaDepan)} ${normalizeText(
        personalForm.namaBelakang
      )}`.trim(),
      noTelepon: normalizeText(personalForm.noTelepon),
      pekerjaanStatus: normalizeText(personalForm.pekerjaanStatus),
      tanggalHewan: normalizeText(form.tanggalHewan),
      tanggalLahir: normalizeText(personalForm.tanggalLahir),
      tempatTinggal: normalizeText(personalForm.tempatTinggal),
      zipCode: normalizeText(personalForm.zipCode),
    };

    setIsSubmitting(true);

    try {
      const response = await run(
        () =>
          createOrder({
            animalId,
            body: payload,
          }),
        {
          errorMessage: "Gagal mengirim form adopsi",
        }
      );

      if (response?.success === false) {
        toast.error(response?.message || "Gagal mengirim form adopsi");
        return;
      }

      window.sessionStorage.removeItem(getStorageKey(animalId));
      toast.success(response?.message || "Form adopsi berhasil dikirim.");
      nav.push("/profile/pesanan/status_form");
    } catch (error) {
      toast.error(error?.message || "Gagal mengirim form adopsi");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500";

  return (
    <>
      <HeroSectionBeranda showButton={false} />

      <Container bg="bg-white" className="py-16 px-50">
        <div className="w-full bg-white rounded-2xl p-10 border-2 border-[#E0E8FF]">
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

          <form className="space-y-10" onSubmit={handleSubmit}>
            <div>
              <p className="font-medium mb-3">
                Apakah Anda pernah memelihara hewan sebelumnya?
              </p>

              <div className="grid grid-cols-2 gap-10 pl-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={form.pernahPelihara === "iya"}
                    onCheckedChange={(checked) =>
                      checked && setFormField("pernahPelihara", "iya")
                    }
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Iya</Label>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={form.pernahPelihara === "tidak"}
                    onCheckedChange={(checked) =>
                      checked && setFormField("pernahPelihara", "tidak")
                    }
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Tidak</Label>
                </label>
              </div>
            </div>

            <div>
              <p className="font-medium mb-3">
                Jika ya, hewan apa yang pernah Anda pelihara dan berapa lama?
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Hewan dan Ras</Label>
                  <Input
                    value={form.jenisHewan}
                    onChange={(e) => setFormField("jenisHewan", e.target.value)}
                    placeholder="Anjing"
                    className={inputClass}
                  />
                </div>

                <div>
                  <Label className="mb-2 block">Hari, Bulan, Tahun</Label>
                  <Input
                    type="date"
                    value={form.tanggalHewan}
                    onChange={(e) =>
                      setFormField("tanggalHewan", e.target.value)
                    }
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="font-medium mb-3">
                Saat ini apakah Anda memiliki hewan peliharaan lain?
              </p>

              <div className="grid grid-cols-2 gap-10 pl-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={form.hewanLain === "iya"}
                    onCheckedChange={(checked) =>
                      checked && setFormField("hewanLain", "iya")
                    }
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Iya</Label>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={form.hewanLain === "tidak"}
                    onCheckedChange={(checked) =>
                      checked && setFormField("hewanLain", "tidak")
                    }
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Tidak</Label>
                </label>
              </div>
            </div>

            <div>
              <p className="font-medium mb-3">
                Apakah ada anggota keluarga atau teman serumah yang alergi
                terhadap hewan?
              </p>

              <div className="grid grid-cols-2 gap-10 pl-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={form.alergi === "iya"}
                    onCheckedChange={(checked) =>
                      checked && setFormField("alergi", "iya")
                    }
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Iya</Label>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={form.alergi === "tidak"}
                    onCheckedChange={(checked) =>
                      checked && setFormField("alergi", "tidak")
                    }
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Tidak</Label>
                </label>
              </div>
            </div>

            <div>
              <p className="font-medium mb-3">
                Apakah lingkungan tempat tinggal Anda aman untuk hewan?
              </p>

              <div className="grid grid-cols-2 gap-10 pl-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={form.aman === "iya"}
                    onCheckedChange={(checked) =>
                      checked && setFormField("aman", "iya")
                    }
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Iya</Label>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <Checkbox
                    checked={form.aman === "tidak"}
                    onCheckedChange={(checked) =>
                      checked && setFormField("aman", "tidak")
                    }
                    className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <Label>Tidak</Label>
                </label>
              </div>
            </div>

            <div className="flex justify-center gap-6 pt-6">
              <Button
                type="button"
                variant="secondary"
                className="rounded-full px-20 bg-black text-white hover:bg-black/80 cursor-pointer"
                onClick={() => nav.pop()}
                disabled={isSubmitting}
              >
                Kembali
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting || isCheckingAnimal || isAnimalSold}
                className="rounded-full px-20 bg-orange-500 hover:bg-orange-600 cursor-pointer disabled:opacity-60"
              >
                {isCheckingAnimal
                  ? "Mengecek..."
                  : isSubmitting
                    ? "Mengirim..."
                    : "Kirim Form"}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
