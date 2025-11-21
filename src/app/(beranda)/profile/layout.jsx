"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Container, Row } from "@/components/shared/custom_widget";
import HeroSectionBeranda from "@/components/shared/hero_section_beranda";
import { IconAssets, ImageAssets } from "@/common/constant/assets";
import Image from "next/image";

export default function ProfileLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    {
      id: "akun",
      label: "Akun Saya",
      icon: IconAssets.profileIcon,
      iconActive: IconAssets.profileActiveIcon,
      href: "/profile",
    },
    {
      id: "pesanan",
      label: "Pesanan Saya",
      icon: IconAssets.mappinIcon,
      iconActive: IconAssets.mappinActiveActiveIcon,
      href: "/profile/pesanan",
    },
    {
      id: "terakhir",
      label: "Pesanan Terakhir",
      icon: IconAssets.storeIcon,
      iconActive: IconAssets.storeActiveIcon,
      href: "/profile/pesanan_terakhir",
    },
    {
      id: "logout",
      label: "Log-out",
      icon: IconAssets.signOutIcon,
      iconActive: IconAssets.signOutActiveIcon,
      href: "/logout",
    },
  ];

  return (
    <>
      <HeroSectionBeranda showButton={true} />

      {/* Content Section */}
      <Container bg="bg-white" className="pt-16 pb-16" px={8}>
        <Container className="max-w-6xl mx-auto">
          <Row crossAxisAlignment="start" className="gap-8">
            {/* Sidebar Navigation */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white border border-gray-200 overflow-hidden shadow-sm">
                {menuItems.map((item, index) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
                        ${isActive ? "bg-[#FA8232] text-white" : ""}
                        ${!isActive ? "hover:bg-gray-50" : ""}
                        ${
                          index !== menuItems.length - 1
                            ? "border-b border-gray-200"
                            : ""
                        }
                      `}
                    >
                      <span className="text-lg">
                        <Image
                          src={isActive ? item.iconActive : item.icon}
                          alt={item.label}
                          width={15}
                          height={15}
                        />
                      </span>
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">{children}</div>
          </Row>
        </Container>
      </Container>
    </>
  );
}
