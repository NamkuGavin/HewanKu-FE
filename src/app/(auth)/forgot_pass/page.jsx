"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { IconAssets, ImageAssets } from "@/common/constant/assets";
import { SizedBox, Text, Row } from "@/components/shared/custom_widget";
import { FloatingInput } from "@/components/shared/floating_input";
import { Button } from "@/components/ui/button";
import { useNavigator } from "@/utils/helper";

import SocialLogin from "@/app/(auth)/login/components/social_login";

export default function ForgotpassPage() {
  const nav = useNavigator();

  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
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
        <button
          onClick={() => nav.pushAndRemoveUntil("/login")}
          className="flex flex-row items-center cursor-pointer"
        >
          <Image src={IconAssets.back} alt="backIcon" width={20} height={20} />
          <SizedBox width={8} />
          <Text className="text-sm font-[500]">Back to Login</Text>
        </button>
        <SizedBox height={30} />
        <Text className="text-3xl font-[600]">Forgot your password?</Text>
        <SizedBox height={15} />
        <Text className="text-base font-[400]">
          Don’t worry, happens to all of us. Enter your email below to recover
          your password
        </Text>
        <SizedBox height={50} />
        <FloatingInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <SizedBox height={30} />
        <Button
          onClick={() => nav.replace("/verify_code")}
          className="h-[45px] w-full bg-[#FF8D28] hover:bg-[#FBA81F] cursor-pointer rounded-sm"
        >
          Submit
        </Button>
        <SizedBox height={50} />
        <SocialLogin />
      </div>

      {/* Sisi Kanan */}
      <div className="flex justify-center items-center w-2/5 px-4">
        <Image
          src={ImageAssets.forgotPassMockup}
          alt="forgotPassMock"
          width={425}
          height={0}
          className="rounded-2xl object-cover"
        />
      </div>
    </div>
  );
}
