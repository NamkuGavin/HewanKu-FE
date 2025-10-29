"use client";

import Image from "next/image";
import { ImageAssets } from "@/common/constant/assets";
import { SizedBox, Padding, Text } from "@/components/shared/custom_widget";

import SocialLogin from "./components/social_login";
import FormLogin from "./components/form_login";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-row bg-white">
      {/* Sisi Kiri */}
      <div className="flex flex-col justify-center w-1/2 p-12">
        <Image src={ImageAssets.logoApp} alt="Logo" width={175} height={175} />
        <SizedBox height={50} />
        <Padding horizontal={25}>
          <Text className="text-3xl font-[600]">Login</Text>
          <SizedBox height={15} />
          <Text className="text-base font-[400]">
            Login to access your travelwise account
          </Text>
          <SizedBox height={30} />
          <FormLogin />
          <SizedBox height={30} />
          <SocialLogin />
        </Padding>
      </div>
      {/* Sisi Kanan */}
      <div className="flex justify-center w-1/2 p-12">
        <Image
          src={ImageAssets.loginMockup}
          alt="loginMock"
          width={475}
          height={0}
        />
      </div>
    </div>
  );
}
