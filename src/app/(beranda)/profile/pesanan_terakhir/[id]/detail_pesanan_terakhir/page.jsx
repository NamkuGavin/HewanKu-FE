"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { Text, Row } from "@/components/shared/custom_widget";
import { formatRupiah } from "@/utils/helper";
import { useParams, useRouter } from "next/navigation";
import { ImageAssets } from "@/common/constant/assets";
import { viewUserOrders } from "@/actions/order.action";
import { createAnimalReview } from "@/actions/review.action";
import { useApiRequest } from "@/hooks/use-api-request";
import { toast } from "sonner";
import {
  findOrderById,
  isReviewSubmitted,
  isSuccessfulPayment,
  markReviewSubmitted,
  normalizeText,
  withLocalPaymentExpiry,
} from "../../../pesanan/components/order_progress_utils";
import RatingDialog from "./components/rating_dialog";

function parseRatingValue(value) {
  const normalizedValue = String(value || "").replace(",", ".");
  const number = Number(normalizedValue);

  return Number.isFinite(number) ? number : 0;
}

function mapAnimal(order) {
  const animal = order?.hewan || {};
  const age = Number(animal?.umur);

  return {
    id: animal?.id,
    image: normalizeText(animal?.urlFoto) || ImageAssets.placeholderAnimal,
    name: normalizeText(animal?.nama) || "Hewan",
    gender: normalizeText(animal?.jenisKelamin) || "-",
    ageText: Number.isFinite(age) ? `${age} Tahun` : "-",
    category: normalizeText(animal?.jenis) || "-",
    price: Number(animal?.harga || 0),
    quantity: 1,
    healthStatus: "Telah di Vaksin",
  };
}

export default function DetailPesananTerakhirPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = String(params?.id);
  const { run } = useApiRequest();
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSubmittingRating, setIsSubmittingRating] = React.useState(false);
  const [isRatingOpen, setIsRatingOpen] = React.useState(false);
  const [selectedAnimal, setSelectedAnimal] = React.useState(null);

  const loadOrders = React.useCallback(
    async ({ silent = false } = {}) => {
      if (!silent) {
        setIsLoading(true);
        setErrorMessage("");
      }

      try {
        const response = await run(() => viewUserOrders(), {
          errorMessage: "Gagal mengambil detail pesanan",
        });

        if (response?.success === false) {
          setOrders([]);
          setErrorMessage(
            response?.message || "Gagal mengambil detail pesanan"
          );
          return;
        }

        setOrders(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        setOrders([]);
        setErrorMessage(error?.message || "Gagal mengambil detail pesanan");
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
      if (!ignore) {
        await loadOrders();
      }
    };

    load();

    return () => {
      ignore = true;
    };
  }, [loadOrders]);

  const openRating = (animal) => {
    setSelectedAnimal(animal);
    setIsRatingOpen(true);
  };

  const closeRating = () => {
    setIsRatingOpen(false);
    setSelectedAnimal(null);
  };

  const rawOrder = React.useMemo(
    () => findOrderById(orders, orderId),
    [orders, orderId]
  );
  const displayedOrder = rawOrder ? withLocalPaymentExpiry(rawOrder) : null;
  const animal = displayedOrder ? mapAnimal(displayedOrder) : null;
  const order = animal ? { ...displayedOrder, items: [animal] } : null;
  const canReview = isSuccessfulPayment(order?.statusPembayaran);
  const reviewSubmitted = isReviewSubmitted(order?.id);

  const handleSubmitRating = async ({ rating, review, animal }) => {
    const ratingValue = parseRatingValue(rating);
    const reviewText = normalizeText(review);

    if (!animal?.id) {
      toast.error("Data hewan tidak ditemukan.");
      return;
    }

    if (ratingValue <= 0 || ratingValue > 5) {
      toast.error("Rating wajib diisi antara 0,1 sampai 5.");
      return;
    }

    if (!reviewText) {
      toast.error("Ulasan wajib diisi.");
      return;
    }

    setIsSubmittingRating(true);

    try {
      const response = await run(
        () =>
          createAnimalReview({
            animalId: animal.id,
            body: {
              rating: ratingValue,
              komen: reviewText,
            },
          }),
        { errorMessage: "Gagal mengirim ulasan" }
      );

      if (response?.success === false) {
        toast.error(response?.message || "Gagal mengirim ulasan");
        return;
      }

      markReviewSubmitted(order?.id);
      toast.success(response?.message || "Ulasan berhasil dikirim.");
      closeRating();
      await loadOrders({ silent: true });
      router.refresh();
    } catch (error) {
      toast.error(error?.message || "Gagal mengirim ulasan");
    } finally {
      setIsSubmittingRating(false);
    }
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg pt-5">
      {/* Header */}
      <Row className="mb-5 px-5">
        <button
          type="button"
          className="cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft size={20} />
        </button>
        <Text size={18} className="font-medium ml-5">
          Hewan Detail
        </Text>
      </Row>

      <div className="w-full overflow-hidden border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="py-3 px-4 text-left">
                HEWAN YANG TELAH DI ADOPSI
              </th>
              <th className="py-3 px-4 text-left">HARGA</th>
              <th className="py-3 px-4 text-left">KUANTITAS</th>
              <th className="py-3 px-4 text-left">SEHAT</th>
              <th className="py-3 px-4 text-left">RATING</th>
            </tr>
          </thead>

          <tbody>
            {!order ? (
              <tr>
                <td className="py-6 px-4 text-sm text-gray-500" colSpan={5}>
                  {isLoading
                    ? "Memuat detail pesanan..."
                    : errorMessage || "Order tidak ditemukan."}
                </td>
              </tr>
            ) : (
              order.items.map((it, idx) => (
                <tr key={`${it.id}-${idx}`} className="border-b">
                  {/* Kolom: Hewan */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={it.image}
                        alt={it.name}
                        width={100}
                        height={100}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-blue-500">
                          {it.name} ({it.gender}, {it.ageText})
                        </span>
                        <span className="text-xs text-gray-700">
                          {it.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Harga */}
                  <td className="py-4 px-4 text-xs text-gray-700">
                    {formatRupiah(it.price)}
                  </td>

                  {/* Kuantitas */}
                  <td className="py-4 px-4 text-xs text-gray-700">
                    x{it.quantity}
                  </td>

                  {/* Sehat */}
                  <td className="py-4 px-4 text-xs text-gray-700">
                    {it.healthStatus}
                  </td>

                  {/* Rating (link) */}
                  <td className="py-4 px-4 text-xs">
                    <button
                      type="button"
                      onClick={() => openRating(it)}
                      disabled={!canReview || reviewSubmitted}
                      className={`flex items-center gap-1 ${
                        canReview && !reviewSubmitted
                          ? "cursor-pointer text-blue-600 hover:underline"
                          : "cursor-not-allowed text-gray-400"
                      }`}
                    >
                      <span className="hidden">
                      Silahkan Rating <span>→</span>
                      </span>
                      {reviewSubmitted ? "Ulasan Terkirim" : "Silahkan Rating"}
                      {!reviewSubmitted ? (
                        <span aria-hidden="true">-&gt;</span>
                      ) : null}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <RatingDialog
        open={isRatingOpen}
        onClose={closeRating}
        animal={selectedAnimal}
        onSubmit={handleSubmitRating}
        isSubmitting={isSubmittingRating}
      />
    </div>
  );
}
