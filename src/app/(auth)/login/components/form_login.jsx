"use client";

import { useState } from "react";
import { SizedBox, Text } from "@/components/shared/custom_widget";
import { FloatingInput } from "@/components/shared/floating_input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FormLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <FloatingInput
        id="email"
        name="email"
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <SizedBox height={20} />
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
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            id="rememberMe"
            className="cursor-pointer data-[state=checked]:bg-[#FF8D28] data-[state=checked]:border-bg-[#FF8D28]"
          />
          <Label htmlFor="rememberMe">Remember Me</Label>
        </div>
        <Link
          href="/forgot_pass"
          className="text-base font-[500] cursor-pointer text-[#FF8D28]"
        >
          Forgot Password
        </Link>
      </div>
      <SizedBox height={30} />
      <Button
        type="submit"
        className="h-[45px] w-full bg-[#FF8D28] hover:bg-[#FBA81F] cursor-pointer rounded-sm"
      >
        Login
      </Button>
      <SizedBox height={15} />
      <p className="text-center font-[500] text-sm">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="font-[500] hover:underline text-[#FF8D28]"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
