"use client";

import * as React from "react";
import { FileText, Handshake, Truck } from "lucide-react";
import { Text } from "@/components/shared/custom_widget";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter, useSearchParams } from "next/navigation";
import { formatRupiah } from "@/utils/helper";
import { viewUserOrders } from "@/actions/order.action";
import { useApiRequest } from "@/hooks/use-api-request";
import {
  buildFormActivities,
  findOrderById,
  getFormStepStatus,
  getOrderCode,
  getOrderDate,
  getOrderProcessStatus,
  getOrderStatusClass,
  getOrderTotal,
  isRejectedForm,
  withLocalPaymentExpiry,
} from "../components/order_progress_utils";
import {
  ProgressContentShell,
  ProgressSteps,
} from "../components/order_progress_components";

const ITEMS_PER_PAGE = 6;

function OrdersTable({ orders }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPosts = orders.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const currentOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [orders]);

  return (
    <>
      <div className="w-full overflow-hidden border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="py-3 px-4 text-left">ORDER ID</th>
              <th className="py-3 px-4 text-left">STATUS PROSES</th>
              <th className="py-3 px-4 text-left">TANGGAL</th>
              <th className="py-3 px-4 text-left">TOTAL</th>
              <th className="py-3 px-4 text-left">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td className="py-6 px-4 text-sm text-gray-500" colSpan={5}>
                  Belum ada pesanan.
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => {
                const displayedOrder = withLocalPaymentExpiry(order);

                return (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-4 font-medium text-xs">
                      {getOrderCode(displayedOrder)}
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold text-xs ${getOrderStatusClass(
                        displayedOrder
                      )}`}
                    >
                      {getOrderProcessStatus(displayedOrder)}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      {getOrderDate(displayedOrder)}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      {formatRupiah(getOrderTotal(displayedOrder))}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/profile/pesanan/status_form?orderId=${order.id}`
                          )
                        }
                        className="cursor-pointer text-blue-600 hover:underline flex items-center gap-1"
                      >
                        Lihat Progress
                        <span aria-hidden="true">-&gt;</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPosts > ITEMS_PER_PAGE ? (
        <div className="flex justify-center items-center gap-3 mt-6">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  safeCurrentPage === page
                    ? "bg-orange-500 text-white border-none shadow-sm"
                    : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
      ) : null}
    </>
  );
}

function StatusFormDetail({ order }) {
  const formSteps = [
    { id: "form_masuk", label: "Form Masuk", icon: FileText },
    { id: "form_disetujui", label: "Form disetujui", icon: Handshake },
    { id: "lanjutkan", label: "Lanjutkan Pembayaran", icon: Truck },
  ];

  return (
    <ProgressContentShell order={order} activities={buildFormActivities(order)}>
      {isRejectedForm(order?.status) ? (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            Form Anda ditolak oleh shelter. Silakan cek kembali data atau
            hubungi shelter untuk informasi lebih lanjut.
          </AlertDescription>
        </Alert>
      ) : null}

      <ProgressSteps
        steps={formSteps}
        getStatus={(stepId) => getFormStepStatus(order, stepId)}
      />
    </ProgressContentShell>
  );
}

function StatusFormContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { run } = useApiRequest();
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    let ignore = false;

    const loadOrders = async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await run(() => viewUserOrders(), {
          errorMessage: "Gagal mengambil pesanan",
        });

        if (ignore) {
          return;
        }

        if (response?.success === false) {
          setOrders([]);
          setErrorMessage(response?.message || "Gagal mengambil pesanan");
          return;
        }

        setOrders(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        if (!ignore) {
          setOrders([]);
          setErrorMessage(error?.message || "Gagal mengambil pesanan");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      ignore = true;
    };
  }, [run]);

  const selectedOrder = orderId ? findOrderById(orders, orderId) : null;

  if (isLoading) {
    return (
      <div className="p-6">
        <Text className="text-gray-500">Memuat pesanan...</Text>
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

  if (orderId && !selectedOrder) {
    return (
      <div className="p-6">
        <Text className="text-gray-500">Pesanan tidak ditemukan.</Text>
      </div>
    );
  }

  if (selectedOrder) {
    return <StatusFormDetail order={selectedOrder} />;
  }

  return (
    <div className="w-full py-5">
      <Text size={18} weight="600" className="mb-6 px-5">
        PESANAN SAYA
      </Text>
      <OrdersTable orders={orders} />
    </div>
  );
}

export default function StatusFormView() {
  return (
    <React.Suspense
      fallback={
        <div className="p-6">
          <Text className="text-gray-500">Memuat pesanan...</Text>
        </div>
      }
    >
      <StatusFormContent />
    </React.Suspense>
  );
}
