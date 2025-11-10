"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { IconAssets, ImageAssets } from "@/common/constant/assets";
import { SizedBox, Text, Row } from "@/components/shared/custom_widget";
import { FloatingInput } from "@/components/shared/floating_input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useNavigator } from "@/utils/helper";

export default function SetnewpassPage() {
  const nav = useNavigator();

  const router = useRouter();
  const [formData, setFormData] = useState({
    pass: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-row bg-white">
      {/* Sisi Kiri */}
      <div className="relative flex flex-col justify-start w-3/5 px-12 pt-15">
        <div className="absolute top-8 left-8">
          <Image
            src={ImageAssets.logoApp}
            alt="Logo"
            width={175}
            height={175}
          />
        </div>

        <SizedBox height={50} />
        <Text className="text-3xl font-[600]">Set a password</Text>
        <SizedBox height={15} />
        <Text className="text-base font-[400]">
          Your previous password has been reseted. Please set a new password for
          your account.
        </Text>
        <SizedBox height={50} />
        <FloatingInput
          id="password"
          name="password"
          type="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <SizedBox height={20} />
        <FloatingInput
          id="confirmPass"
          name="confirmPass"
          type="password"
          label="Confirm Password"
          value={formData.confirmPass}
          onChange={handleChange}
          required
        />
        <SizedBox height={30} />
        <Button
          onClick={() => nav.pushAndRemoveUntil("/login")}
          className="h-[45px] w-full bg-[#FF8D28] hover:bg-[#FBA81F] cursor-pointer rounded-sm"
        >
          Set password
        </Button>
      </div>

      {/* Sisi Kanan */}
      <div className="flex justify-center items-center w-2/5 px-4">
        <Image
          src={ImageAssets.setPassMockup}
          alt="setPassMock"
          width={425}
          height={0}
          className="rounded-2xl object-cover"
        />
      </div>
    </div>
  );
}
