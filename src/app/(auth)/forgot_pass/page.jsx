"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageAssets } from "@/common/constant/assets";
import { SizedBox, Text } from "@/components/shared/custom_widget";
import { FloatingInput } from "@/components/shared/floating_input";
import { Button } from "@/components/ui/button";

import SocialLogin from "@/app/(auth)/login/components/social_login";

export default function ForgotpassPage() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex flex-row bg-white">
      {/* Sisi Kiri */}
      <div className="relative flex flex-col justify-center w-3/5 px-12">
        <div className="absolute top-8 left-8">
          <Image
            src={ImageAssets.logoApp}
            alt="Logo"
            width={175}
            height={175}
          />
        </div>

        <SizedBox height={50} />
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
          type="submit"
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
          width={475}
          height={0}
          className="rounded-2xl object-cover"
        />
      </div>
    </div>
  );
}
