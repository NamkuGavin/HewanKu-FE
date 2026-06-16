"use client";

import * as React from "react";
import { CreditCard, Handshake, Star } from "lucide-react";
import { Text } from "@/components/shared/custom_widget";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { viewUserOrders } from "@/actions/order.action";
import { useApiRequest } from "@/hooks/use-api-request";
import { toast } from "sonner";
import {
  buildPaymentActivities,
  clearPaymentTimer,
  findOrderById,
  formatPaymentCountdown,
  getPaymentDeadline,
  getPaymentStepStatus,
  isAcceptedForm,
  isFailedPayment,
  isPendingPayment,
  isSuccessfulPayment,
  resolvePaymentUrl,
  startPaymentTimer,
  withLocalPaymentExpiry,
} from "../components/order_progress_utils";
import {
  ProgressContentShell,
  ProgressSteps,
} from "../components/order_progress_components";

function PaymentAction({ order, isExpired, onStartPayment }) {
  const paymentUrl = resolvePaymentUrl(order);

  if (
    !isAcceptedForm(order?.status) ||
    isSuccessfulPayment(order?.statusPembayaran) ||
    isFailedPayment(order?.statusPembayaran)
  ) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-center">
      <Button
        type="button"
        className="rounded-full px-12 bg-orange-500 hover:bg-orange-600 cursor-pointer"
        onClick={() => {
          if (!paymentUrl) {
            toast.error("Link pembayaran belum tersedia.");
            return;
          }

          if (isExpired) {
            toast.error("Waktu pembayaran sudah habis.");
            return;
          }

          onStartPayment();
          window.open(paymentUrl, "_blank", "noopener,noreferrer");
        }}
      >
        Lanjutkan Pembayaran
      </Button>
    </div>
  );
}

function StatusPembayaranDetail({
  order,
  isExpired,
  onStartPayment,
  timeLeftText,
}) {
  const paymentSteps = [
    { id: "silahkan_bayar", label: "Silahkan membayar", icon: CreditCard },
    { id: "pembayaran_berhasil", label: "Pembayaran Berhasil", icon: Handshake },
    { id: "beri_ulasan", label: "Beri ulasan di Pesanan Terakhir", icon: Star },
  ];

  return (
    <ProgressContentShell
      order={order}
      activities={buildPaymentActivities(order)}
    >
      {!isAcceptedForm(order?.status) ? (
        <Alert className="mb-6">
          <AlertDescription>
            Pembayaran belum bisa dibuka sampai form diterima oleh shelter.
          </AlertDescription>
        </Alert>
      ) : null}

      {isFailedPayment(order?.statusPembayaran) ? (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            Pembayaran gagal diproses. Silakan lakukan pembayaran ulang atau
            hubungi shelter.
          </AlertDescription>
        </Alert>
      ) : null}

      {isPendingPayment(order?.statusPembayaran) ? (
        <Alert className="mb-6">
          <AlertDescription>
            Silakan lanjutkan pembayaran melalui Midtrans. Status akan berubah
            otomatis setelah pembayaran berhasil dikonfirmasi.
            {timeLeftText ? (
              <span className="mt-2 block font-semibold text-orange-600">
                Sisa waktu pembayaran: {timeLeftText}
              </span>
            ) : null}
          </AlertDescription>
        </Alert>
      ) : null}

      <ProgressSteps
        steps={paymentSteps}
        getStatus={(stepId) => getPaymentStepStatus(order, stepId)}
      />

      <PaymentAction
        order={order}
        isExpired={isExpired}
        onStartPayment={onStartPayment}
      />
    </ProgressContentShell>
  );
}

export default function StatusPembayaranPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { run } = useApiRequest();
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [now, setNow] = React.useState(Date.now());

  const loadOrders = React.useCallback(
    async ({ silent = false } = {}) => {
      if (!silent) {
        setIsLoading(true);
        setErrorMessage("");
      }

      try {
        const response = await run(() => viewUserOrders(), {
          errorMessage: "Gagal mengambil status pembayaran",
        });

        if (response?.success === false) {
          setOrders([]);
          setErrorMessage(
            response?.message || "Gagal mengambil status pembayaran"
          );
          return;
        }

        setOrders(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        setOrders([]);
        setErrorMessage(error?.message || "Gagal mengambil status pembayaran");
      } finally {
        if (!silent) {
          setIsLoading(false);
        }
      }
    },
    [run]
  );

  React.useEffect(() => {
    let ignore = false;

    const load = async () => {
      await loadOrders();

      if (!ignore) {
        setNow(Date.now());
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [loadOrders]);

  const selectedOrder = orderId ? findOrderById(orders, orderId) : null;
  const displayedOrder = withLocalPaymentExpiry(selectedOrder, now);
  const paymentDeadline = selectedOrder?.id
    ? getPaymentDeadline(selectedOrder.id)
    : null;
  const timeLeftMs = paymentDeadline ? paymentDeadline - now : 0;
  const isExpired =
    Boolean(displayedOrder) && isFailedPayment(displayedOrder?.statusPembayaran);
  const timeLeftText =
    paymentDeadline &&
    isAcceptedForm(displayedOrder?.status) &&
    isPendingPayment(displayedOrder?.statusPembayaran)
      ? formatPaymentCountdown(timeLeftMs)
      : "";

  React.useEffect(() => {
    if (!selectedOrder?.id) {
      return;
    }

    if (
      isSuccessfulPayment(selectedOrder.statusPembayaran) ||
      isFailedPayment(selectedOrder.statusPembayaran)
    ) {
      clearPaymentTimer(selectedOrder.id);
    }
  }, [selectedOrder]);

  React.useEffect(() => {
    if (
      !selectedOrder?.id ||
      !isAcceptedForm(selectedOrder.status) ||
      !isPendingPayment(selectedOrder.statusPembayaran) ||
      !getPaymentDeadline(selectedOrder.id)
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);
    const polling = window.setInterval(() => {
      loadOrders({ silent: true });
    }, 15000);

    return () => {
      window.clearInterval(timer);
      window.clearInterval(polling);
    };
  }, [selectedOrder, loadOrders]);

  React.useEffect(() => {
    if (!isLoading && selectedOrder && !isAcceptedForm(selectedOrder.status)) {
      router.replace(`/profile/pesanan/status_form?orderId=${selectedOrder.id}`);
    }
  }, [isLoading, selectedOrder, router]);

  if (isLoading) {
    return (
      <div className="p-6">
        <Text className="text-gray-500">Memuat status pembayaran...</Text>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="p-6">
        <Text className="text-sm text-red-500">{errorMessage}</Text>
      </div>
    );
  }

  if (!orderId) {
    return (
      <div className="p-6">
        <Text className="text-gray-500">
          Pilih pesanan dari tabel Status Form terlebih dahulu.
        </Text>
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <div className="p-6">
        <Text className="text-gray-500">Pesanan tidak ditemukan.</Text>
      </div>
    );
  }

  return (
    <StatusPembayaranDetail
      order={displayedOrder}
      isExpired={isExpired}
      timeLeftText={timeLeftText}
      onStartPayment={() => {
        startPaymentTimer(displayedOrder.id);
        setNow(Date.now());
      }}
    />
  );
}
