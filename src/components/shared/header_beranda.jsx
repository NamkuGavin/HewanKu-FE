"use client";

import { cn } from "@/lib/utils";
import { Heart, Search, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { ImageAssets } from "@/common/constant/assets";
import { Row, Container } from "@/components/shared/custom_widget";

export default function HeaderBeranda() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = React.useState(
    searchParams.get("search") ?? ""
  );

  // sync kalau user back/forward atau query berubah
  React.useEffect(() => {
    setKeyword(searchParams.get("search") ?? "");
  }, [searchParams]);

  const leftItems = [
    { name: "Home", label: "Home", href: "/home" },
    { name: "Adopsi", label: "Adopsi", href: "/adopsi" },
    { name: "About Us", label: "About Us", href: "/about_us" },
    { name: "Contact Us", label: "Contact Us", href: "/contact_us" },
  ];

  const rightItems = [
    { name: "Favorite", label: "Favorite", href: "/favorite" },
    { name: "Profile", label: "Profile", href: "/profile" },
  ];

  const isActive = (href) => pathname === href;

  const onSubmitSearch = () => {
    const q = keyword.trim();
    if (!q) {
      router.push("/adopsi"); // balik normal
      return;
    }
    router.push(`/adopsi?search=${encodeURIComponent(q)}`);
  };

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
          {leftItems.map((item) => (
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
          {/* SEARCH */}
          <div className="flex items-center bg-gray-50 rounded-full w-full max-w-md">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSubmitSearch();
              }}
              placeholder="Cari Hewan..."
              className="flex-1 pl-4 bg-transparent outline-none text-gray-600 placeholder-gray-400 text-sm"
            />
            <button
              onClick={onSubmitSearch}
              className="bg-black text-white rounded-full p-2 flex items-center justify-center hover:bg-gray-800 transition cursor-pointer"
            >
              <Search size={15} />
            </button>
          </div>

          {rightItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                {item.name === "Favorite" ? (
                  <Heart
                    className={`w-5 h-5 ${
                      isActive(item.href) ? "text-orange-500" : "text-gray-700"
                    }`}
                  />
                ) : (
                  <User
                    className={`w-5 h-5 ${
                      isActive(item.href) ? "text-orange-500" : "text-gray-700"
                    }`}
                  />
                )}
              </button>
            </Link>
          ))}
        </Row>
      </Row>
    </Container>
  );
}
