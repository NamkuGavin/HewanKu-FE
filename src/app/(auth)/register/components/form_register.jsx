"use client";

import { useState } from "react";
import { SizedBox, Text, Row } from "@/components/shared/custom_widget";
import { FloatingInput } from "@/components/shared/floating_input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FormRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPass: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Row>
        <div className="flex-1">
          <FloatingInput
            id="firstName"
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <SizedBox width={15} />
        <div className="flex-1">
          <FloatingInput
            id="lastName"
            name="lastName"
            type="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </Row>
      <SizedBox height={15} />
      <Row>
        <div className="flex-1">
          <FloatingInput
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <SizedBox width={15} />
        <div className="flex-1">
          <FloatingInput
            id="phone"
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </Row>
      <SizedBox height={15} />
      <FloatingInput
        id="password"
        name="password"
        type="password"
        label="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <SizedBox height={15} />
      <FloatingInput
        id="confirmPass"
        name="confirmPass"
        type="password"
        label="Confirm Password"
        value={formData.confirmPass}
        onChange={handleChange}
        required
      />
      <SizedBox height={15} />
      <div className="flex items-center gap-3">
        <Checkbox
          id="agreeTerms"
          className="cursor-pointer data-[state=checked]:bg-[#FF8D28] data-[state=checked]:border-bg-[#FF8D28]"
        />
        <Label htmlFor="agreeTerms" className="text-center font-[500] text-sm">
          I agree to all the{""}
          <Link
            href="/terms"
            className="font-[500] hover:underline text-[#FF8D28]"
          >
            Terms
          </Link>
          and{""}
          <Link
            href="/privacy"
            className="font-[500] hover:underline text-[#FF8D28]"
          >
            Privacy Policies
          </Link>
        </Label>
      </div>
      <SizedBox height={30} />
      <Button
        type="submit"
        className="h-[45px] w-full bg-[#FF8D28] hover:bg-[#FBA81F] cursor-pointer rounded-sm"
      >
        Create account
      </Button>
      <SizedBox height={12} />
      <p className="text-center font-[500] text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-[500] hover:underline text-[#FF8D28]"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
