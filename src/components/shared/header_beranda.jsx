"use client";

import { cn } from "@/lib/utils";
import { Heart, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ImageAssets } from "@/common/constant/assets";
import { Row, Container } from "@/components/shared/custom_widget";

export default function HeaderBeranda() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Home", label: "Home", href: "/home" },
    { name: "Adopsi", label: "Adopsi", href: "/adopsi" },
    { name: "About Us", label: "About Us", href: "/about_us" },
    { name: "Contact Us", label: "Contact Us", href: "/contact_us" },
  ];

  const isActive = (href) => pathname === href;

  return (
    <Container
      px={8}
      py={2}
      className="fixed top-5 left-1/2 -translate-x-1/2 w-3/4 bg-white/95 backdrop-blur-sm shadow-md rounded-4xl z-50"
    >
      <Row mainAxisAlignment="between" crossAxisAlignment="center">
        {/* Logo */}
        <Link href="/home">
          <Image
            src={ImageAssets.logoApp}
            alt="Logo"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        </Link>

        {/* Menu Navigation */}
        <Row
          mainAxisAlignment="center"
          crossAxisAlignment="center"
          className="w-auto gap-8"
        >
          {menuItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <button
                className={cn(
                  "text-sm font-medium transition-colors relative pb-1 cursor-pointer",
                  isActive(item.href)
                    ? "text-orange-500"
                    : "text-gray-700 hover:text-orange-400"
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"></div>
                )}
              </button>
            </Link>
          ))}
        </Row>

        {/* Right Actions */}
        <Row
          mainAxisAlignment="end"
          crossAxisAlignment="center"
          className="w-auto gap-4"
        >
          <div className="flex items-center bg-gray-50 rounded-full w-full max-w-md">
            <input
              type="text"
              placeholder="Cari Hewan..."
              className="flex-1 pl-4 bg-transparent outline-none text-gray-600 placeholder-gray-400 text-sm"
            />
            <button className="bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-gray-800 transition cursor-pointer">
              <Search size={15} />
            </button>
          </div>
          <button className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <Heart className="w-5 h-5 text-gray-700" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            <User className="w-5 h-5 text-gray-700" />
          </button>
        </Row>
      </Row>
    </Container>
  );
}
