"use client";

import { cn } from "@/lib/utils";
import { Row, Container } from "@/components/shared/custom_widget";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

// ambil data global dummy kamu
import { dummyOrderData } from "@/data/dummy/data_dummy";

export default function TrackPesananLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const tabsItem = [
    {
      name: "Status Form",
      label: "Status Form",
      href: "/profile/pesanan/status_form",
    },
    {
      name: "Status Pembayaran",
      label: "Status Pembayaran",
      href: "/profile/pesanan/status_pembayaran",
    },
  ];

  const isActive = (href) => pathname === href;

  const isPaymentTabDisabled = !dummyOrderData.isPaymentAccessible;

  // ✅ Guard: kalau user buka URL payment langsung tapi belum approved
  useEffect(() => {
    if (
      pathname === "/profile/pesanan/status_pembayaran" &&
      isPaymentTabDisabled
    ) {
      router.replace("/profile/pesanan/status_form");
    }
  }, [pathname, isPaymentTabDisabled, router]);

  return (
    <Container className="bg-white border border-gray-200 rounded-lg">
      <Container className="border-b">
        <Row
          mainAxisAlignment="center"
          crossAxisAlignment="center"
          className="w-auto gap-50 py-4"
        >
          {tabsItem.map((item) => {
            const disabled =
              item.href === "/profile/pesanan/status_pembayaran" &&
              isPaymentTabDisabled;

            return (
              <Link
                key={item.name}
                href={disabled ? "/profile/pesanan/status_form" : item.href}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                className={cn(disabled && "pointer-events-none")}
              >
                <button
                  className={cn(
                    "text-sm font-medium transition-colors relative pb-1",
                    disabled
                      ? "text-gray-300 cursor-not-allowed"
                      : isActive(item.href)
                      ? "text-orange-500"
                      : "text-gray-700 hover:text-orange-400"
                  )}
                >
                  {item.label}
                  {!disabled && isActive(item.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                  )}
                </button>
              </Link>
            );
          })}
        </Row>
      </Container>

      <div className="w-full">{children}</div>
    </Container>
  );
}
