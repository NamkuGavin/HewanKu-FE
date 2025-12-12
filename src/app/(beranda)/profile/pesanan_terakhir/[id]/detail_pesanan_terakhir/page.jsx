"use client";

import * as React from "react";
import { ArrowLeft } from "lucide-react";
import { Text, Row } from "@/components/shared/custom_widget";
import { dummyOrderAdopsi } from "@/data/dummy/data_dummy";
import { formatRupiah } from "@/utils/helper";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import RatingDialog from "./components/rating_dialog";

export default function DetailPesananTerakhirPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = String(params?.id);
  const [isRatingOpen, setIsRatingOpen] = React.useState(false);
  const [selectedAnimal, setSelectedAnimal] = React.useState(null);

  const openRating = (animal) => {
    setSelectedAnimal(animal);
    setIsRatingOpen(true);
  };

  const closeRating = () => {
    setIsRatingOpen(false);
    setSelectedAnimal(null);
  };

  const handleSubmitRating = ({ rating, review, animal }) => {
    console.log("SUBMIT RATING:", {
      orderId,
      animalId: animal?.id,
      rating,
      review,
    });

    // TODO: panggil API / simpan state
    // await submitRating(...)

    closeRating();
  };

  const order = React.useMemo(
    () => dummyOrderAdopsi.find((o) => String(o.orderId) === orderId),
    [orderId]
  );

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
                  Order tidak ditemukan.
                </td>
              </tr>
            ) : (
              order.items.map((it, idx) => (
                <tr key={`${it.id}-${idx}`} className="border-b">
                  {/* Kolom: Hewan */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Image
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
                      onClick={() => openRating(it)}
                      className="cursor-pointer text-blue-600 hover:underline flex items-center gap-1"
                    >
                      Silahkan Rating <span>→</span>
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
      />
    </div>
  );
}
