"use client";

import * as React from "react";
import { Text } from "@/components/shared/custom_widget";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatRupiah } from "@/utils/helper";
import { viewUserOrders } from "@/actions/order.action";
import { useApiRequest } from "@/hooks/use-api-request";
import { toast } from "sonner";
import {
  isFailedPayment,
  isSuccessfulPayment,
  normalizeText,
  withLocalPaymentExpiry,
} from "../pesanan/components/order_progress_utils";

const ITEMS_PER_PAGE = 6;

function resolveOrderStatus(order) {
  const formStatus = normalizeText(order?.status).toUpperCase();

  if (formStatus === "DITOLAK") {
    return "GAGAL";
  }

  if (isSuccessfulPayment(order?.statusPembayaran)) {
    return "BERHASIL";
  }

  if (isFailedPayment(order?.statusPembayaran)) {
    return "GAGAL";
  }

  return null;
}

function resolveOrderDate(order) {
  return (
    normalizeText(order?.hewan?.updatedDate) ||
    normalizeText(order?.form?.tanggalHewan) ||
    "-"
  );
}

function mapOrder(order) {
  const displayedOrder = withLocalPaymentExpiry(order);
  const status = resolveOrderStatus(displayedOrder);

  if (!status) {
    return null;
  }

  return {
    id: displayedOrder.id,
    orderId:
      normalizeText(displayedOrder.kodePemesanan) || `#${displayedOrder.id}`,
    status,
    dateTimeText: resolveOrderDate(displayedOrder),
    total: Number(displayedOrder?.hewan?.harga || 0),
  };
}

export default function PesananTerakhirPage() {
  const router = useRouter();
  const { run } = useApiRequest();
  const [currentPage, setCurrentPage] = React.useState(1);
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
          errorMessage: "Gagal mengambil pesanan terakhir",
        });

        if (ignore) {
          return;
        }

        if (response?.success === false) {
          setOrders([]);
          setErrorMessage(
            response?.message || "Gagal mengambil pesanan terakhir"
          );
          return;
        }

        const orderList = Array.isArray(response?.data) ? response.data : [];
        const mappedOrders = orderList.map(mapOrder).filter(Boolean);

        setOrders(mappedOrders);
        setCurrentPage(1);
      } catch (error) {
        if (!ignore) {
          setOrders([]);
          setErrorMessage(
            error?.message || "Gagal mengambil pesanan terakhir"
          );
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

  const totalPosts = orders.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const endIndex = safeCurrentPage * ITEMS_PER_PAGE;
  const startIndex = endIndex - ITEMS_PER_PAGE;
  const currentPosts = orders.slice(startIndex, endIndex);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const paginate = (page) => {
    setCurrentPage(Math.min(Math.max(page, 1), totalPages));
  };

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  React.useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg py-5">
      <Text size={18} weight="600" className="mb-6 px-5">
        PESANAN TERAKHIR
      </Text>

      <div className="w-full overflow-hidden border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="py-3 px-4 text-left">ORDER ID</th>
              <th className="py-3 px-4 text-left">STATUS</th>
              <th className="py-3 px-4 text-left">TANGGAL</th>
              <th className="py-3 px-4 text-left">TOTAL</th>
              <th className="py-3 px-4 text-left">ACTION</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td className="py-6 px-4 text-sm text-gray-500" colSpan={5}>
                  Memuat pesanan terakhir...
                </td>
              </tr>
            ) : null}

            {!isLoading && errorMessage ? (
              <tr>
                <td className="py-6 px-4 text-sm text-red-500" colSpan={5}>
                  {errorMessage}
                </td>
              </tr>
            ) : null}

            {!isLoading && !errorMessage && currentPosts.length === 0 ? (
              <tr>
                <td className="py-6 px-4 text-sm text-gray-500" colSpan={5}>
                  Belum ada pesanan terakhir yang berhasil atau gagal.
                </td>
              </tr>
            ) : null}

            {!isLoading && !errorMessage
              ? currentPosts.map((item) => (
                  <tr key={item.id || item.orderId} className="border-b">
                    <td className="py-3 px-4 font-medium text-xs">
                      {item.orderId}
                    </td>

                    <td
                      className={`py-3 px-4 font-semibold text-xs ${
                        item.status === "BERHASIL"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.status}
                    </td>

                    <td className="py-3 px-4 text-xs">{item.dateTimeText}</td>
                    <td className="py-3 px-4 text-xs">
                      {formatRupiah(item.total)}
                    </td>

                    <td className="py-3 px-4 text-xs">
                      <button
                        onClick={() =>
                          router.push(
                            `/profile/pesanan_terakhir/${item.id}/detail_pesanan_terakhir`
                          )
                        }
                        className="cursor-pointer text-blue-600 hover:underline flex items-center gap-1"
                      >
                        Lihat Detail
                        <span aria-hidden="true">-&gt;</span>
                      </button>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>

      {!isLoading && !errorMessage && totalPosts > ITEMS_PER_PAGE ? (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => paginate(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
            className={`w-8 h-8 flex items-center justify-center border rounded-full transition
            ${
              safeCurrentPage === 1
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white"
            }
            `}
          >
            <ArrowLeft size={16} />
          </button>

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`w-8 h-8 flex items-center justify-center rounded-full
          ${
            safeCurrentPage === number
              ? "bg-orange-500 text-white border-none shadow-sm"
              : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"
          }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() => paginate(safeCurrentPage + 1)}
            disabled={safeCurrentPage === totalPages}
            className={`w-8 h-8 flex items-center justify-center border rounded-full transition
            ${
              safeCurrentPage === totalPages
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white"
            }
            `}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
