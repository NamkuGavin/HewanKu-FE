"use client";
import { useEffect, useState } from "react";
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
import { viewProfile } from "@/actions/profile.action";
import { useApiRequest } from "@/hooks/use-api-request";
import { isAuthErrorStatus, toStatusCode } from "@/utils/apiStatus";
import { toast } from "sonner";

const defaultProfile = {
  displayName: "",
  email: "",
  noTelephone: "",
  negaraDaerah: "",
  jalan: "",
  zipCode: "",
};

function mapProfileResponse(data) {
  return {
    ...defaultProfile,
    displayName: data?.displayName || "",
    email: data?.email || "",
    noTelephone: data?.noTelepon || data?.noTelephone || "",
    negaraDaerah: data?.negaraDaerah || "",
    jalan: data?.jalan || "",
    zipCode: data?.zipCode || "",
  };
}

export default function AkunSayaPage() {
  const { run } = useApiRequest();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  // ====== PROFILE STATE ======
  const [isEditing, setIsEditing] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const [profile, setProfile] = useState(defaultProfile);
  const [draft, setDraft] = useState(defaultProfile);

  useEffect(() => {
    let ignore = false;

    const loadProfile = async () => {
      setIsProfileLoading(true);

      try {
        const res = await run(() => viewProfile(), {
          errorMessage: "Gagal mengambil profile",
        });

        if (ignore) {
          return;
        }

        if (res?.success === false) {
          const statusCode = toStatusCode(res);

          if (!isAuthErrorStatus(statusCode)) {
            toast.error(res?.message || "Gagal mengambil profile");
          }

          return;
        }

        const nextProfile = mapProfileResponse(res?.data);

        setProfile(nextProfile);
        setDraft(nextProfile);
        setIsEditing(false);
      } catch (error) {
        if (!ignore) {
          toast.error(error?.message || "Gagal mengambil profile");
        }
      } finally {
        if (!ignore) {
          setIsProfileLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [run]);

  const setDraftField = (key, value) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const onClickEdit = () => {
    setDraft(profile); // mulai edit dari data yang tersimpan
    setIsEditing(true);
  };

  const onCancel = () => {
    setDraft(profile); // balikin ke data terakhir
    setIsEditing(false);
  };

  const onSave = (e) => {
    e.preventDefault();

    // TODO: nanti kalau sudah ada API, panggil API di sini
    setProfile(draft);
    setIsEditing(false);
  };

  const inputBaseClass =
    "bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500";

  const readOnlyClass = !isEditing ? "bg-gray-50 text-gray-600" : "";

  return (
    <Column>
      {/* ====== PENGATURAN AKUN ====== */}
      <Container className="bg-white border border-gray-200 rounded-lg">
        <Container className="border-b">
          <Text size={15} className="font-medium p-4">
            PENGATURAN AKUN
          </Text>
        </Container>

        <form onSubmit={onSave}>
          <Row crossAxisAlignment="start" className="gap-8 p-8">
            {/* Profile Picture */}
            <Container className="w-40 h-32 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl">
              😊
            </Container>

            <Column className="w-full" crossAxisAlignment="start">
              <div className="w-full grid grid-cols-2 gap-8">
                <div className="grid w-full gap-2">
                  <Label htmlFor="displayName">Display name</Label>
                  <Input
                    id="displayName"
                    value={draft.displayName}
                    readOnly={!isEditing || isProfileLoading}
                    onChange={(e) =>
                      setDraftField("displayName", e.target.value)
                    }
                    className={`${inputBaseClass} ${readOnlyClass}`}
                  />
                </div>

                <div className="grid w-full gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={draft.email}
                    readOnly={!isEditing || isProfileLoading}
                    onChange={(e) => setDraftField("email", e.target.value)}
                    className={`${inputBaseClass} ${readOnlyClass}`}
                  />
                </div>

                <div className="grid w-full gap-2">
                  <Label htmlFor="noTelephone">No. Telepon</Label>
                  <Input
                    id="noTelephone"
                    value={draft.noTelephone}
                    readOnly={!isEditing || isProfileLoading}
                    onChange={(e) =>
                      setDraftField("noTelephone", e.target.value)
                    }
                    className={`${inputBaseClass} ${readOnlyClass}`}
                  />
                </div>

                <SizedBox />

                <div className="grid w-full gap-2">
                  <Label>Negara/Daerah</Label>
                  <Select
                    value={draft.negaraDaerah || undefined}
                    onValueChange={(v) => setDraftField("negaraDaerah", v)}
                    disabled={!isEditing || isProfileLoading}
                  >
                    <SelectTrigger
                      className={`w-full bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500 ${
                        !isEditing ? "bg-gray-50 text-gray-600" : ""
                      }`}
                    >
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
                    <Label>Jalan</Label>
                    <Select
                      value={draft.jalan || undefined}
                      onValueChange={(v) => setDraftField("jalan", v)}
                      disabled={!isEditing || isProfileLoading}
                    >
                      <SelectTrigger
                        className={`w-full bg-white rounded-sm focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500 ${
                          !isEditing ? "bg-gray-50 text-gray-600" : ""
                        }`}
                      >
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
                          <SelectItem value="bojongsoang">
                            Bojongosang
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full grid gap-2">
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      value={draft.zipCode}
                      readOnly={!isEditing || isProfileLoading}
                      onChange={(e) => setDraftField("zipCode", e.target.value)}
                      className={`${inputBaseClass} ${readOnlyClass}`}
                    />
                  </div>
                </Row>
              </div>

              <SizedBox height={25} />

              {/* Tombol: Edit vs Save/Cancel */}
              {!isEditing ? (
                <Button
                  type="button"
                  onClick={onClickEdit}
                  disabled={isProfileLoading}
                  className="h-[40px] w-1/4 bg-[#FF8D28] hover:bg-[#FBA81F] cursor-pointer rounded-sm"
                >
                  {isProfileLoading ? "Loading..." : "Update profile"}
                </Button>
              ) : (
                <Row className="gap-3">
                  <Button
                    type="submit"
                    className="h-[40px] w-1/4 bg-[#FF8D28] hover:bg-[#FBA81F] cursor-pointer rounded-sm"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="h-[40px] rounded-sm"
                  >
                    Cancel
                  </Button>
                </Row>
              )}
            </Column>
          </Row>
        </form>
      </Container>

      {/* ====== UBAH PASSWORD (punyamu biarin) ====== */}
      <SizedBox height={25} />
      <Container className="w-full bg-white border border-gray-200 rounded-lg">
        <Container className="border-b">
          <Text size={15} className="font-medium p-4">
            UBAH PASSWORD
          </Text>
        </Container>
        <Column className="w-full p-4" crossAxisAlignment="start">
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

          <SizedBox height={20} />

          <div className="grid w-full gap-2">
            <Label htmlFor="newPassword">Password Baru</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="8+ Karakter"
                className="bg-white rounded-sm pr-10 focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <SizedBox height={20} />

          <div className="grid w-full gap-2">
            <Label htmlFor="confirmNewPassword">Konfirmasi Password</Label>
            <div className="relative">
              <Input
                id="confirmNewPassword"
                type={showConfirmNewPassword ? "text" : "password"}
                placeholder=""
                className="bg-white rounded-sm pr-10 focus-visible:ring-[3px] focus-visible:ring-orange-500/20 focus-visible:border-orange-500"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showConfirmNewPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <SizedBox height={20} />

          <Button
            type="submit"
            className="h-[40px] w-1/4 bg-[#FF8D28] hover:bg-[#FBA81F] cursor-pointer rounded-sm"
          >
            Change Password
          </Button>
        </Column>
      </Container>
    </Column>
  );
}
