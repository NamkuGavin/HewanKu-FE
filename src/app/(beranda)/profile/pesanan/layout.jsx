"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Row, Container } from "@/components/shared/custom_widget";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { viewUserOrders } from "@/actions/order.action";
import { useApiRequest } from "@/hooks/use-api-request";
import {
  findOrderById,
  isAcceptedForm,
} from "./components/order_progress_utils";

export default function TrackPesananLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { run } = useApiRequest();
  const orderId = searchParams.get("orderId");
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [isCheckingOrder, setIsCheckingOrder] = React.useState(false);

  React.useEffect(() => {
    let ignore = false;

    const loadSelectedOrder = async () => {
      if (!orderId) {
        setSelectedOrder(null);
        return;
      }

      setIsCheckingOrder(true);

      try {
        const response = await run(() => viewUserOrders(), {
          errorMessage: "Gagal mengambil status pesanan",
        });

        if (ignore) {
          return;
        }

        const orders = Array.isArray(response?.data) ? response.data : [];
        setSelectedOrder(findOrderById(orders, orderId) || null);
      } finally {
        if (!ignore) {
          setIsCheckingOrder(false);
        }
      }
    };

    loadSelectedOrder();

    return () => {
      ignore = true;
    };
  }, [orderId, run]);

  const tabsItem = [
    {
      name: "Status Form",
      label: "Status Form",
      href: orderId
        ? `/profile/pesanan/status_form?orderId=${encodeURIComponent(orderId)}`
        : "/profile/pesanan/status_form",
    },
    {
      name: "Status Pembayaran",
      label: "Status Pembayaran",
      href: orderId
        ? `/profile/pesanan/status_pembayaran?orderId=${encodeURIComponent(
            orderId
          )}`
        : "/profile/pesanan/status_pembayaran",
    },
  ];

  const isActive = (href) => pathname === href.split("?")[0];
  const isPaymentTabDisabled =
    !orderId || isCheckingOrder || !isAcceptedForm(selectedOrder?.status);

  React.useEffect(() => {
    if (
      pathname === "/profile/pesanan/status_pembayaran" &&
      isPaymentTabDisabled
    ) {
      router.replace(
        orderId
          ? `/profile/pesanan/status_form?orderId=${encodeURIComponent(
              orderId
            )}`
          : "/profile/pesanan/status_form"
      );
    }
  }, [pathname, isPaymentTabDisabled, orderId, router]);

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
              item.name === "Status Pembayaran" && isPaymentTabDisabled;

            return (
              <Link
                key={item.name}
                href={disabled ? tabsItem[0].href : item.href}
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
