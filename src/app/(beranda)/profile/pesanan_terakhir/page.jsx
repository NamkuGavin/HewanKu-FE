"use client";

import * as React from "react";
import { Text } from "@/components/shared/custom_widget";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { dummyOrderAdopsi } from "@/data/dummy/data_dummy";
import { formatRupiah } from "@/utils/helper";

export default function PesananTerakhirPage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = React.useState(1);
  const [postPerPage, setPostPerPage] = React.useState(6);
  const endIndex = currentPage * postPerPage;
  const startIndex = endIndex - postPerPage;
  const paginate = (page) => setCurrentPage(page);

  const totalPosts = dummyOrderAdopsi.length;
  const totalPages = Math.ceil(totalPosts / postPerPage);
  const currentPosts = dummyOrderAdopsi.slice(startIndex, endIndex);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg py-5">
      {/* Header */}
      <Text size={18} weight="600" className="mb-6 px-5">
        PESANAN TERAKHIR
      </Text>

      {/* Table */}
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
            {currentPosts.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="py-3 px-4 font-medium text-xs">
                  {item.orderId}
                </td>

                {/* STATUS warna dinamis */}
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

                {/* Action */}
                <td className="py-3 px-4 text-xs">
                  <button
                    onClick={() =>
                      router.push(
                        `/profile/pesanan_terakhir/${item.orderId}/detail_pesanan_terakhir`
                      )
                    }
                    className="cursor-pointer text-blue-600 hover:underline flex items-center gap-1"
                  >
                    Lihat Detail →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-6">
        {/* Left */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center border rounded-full transition
            ${
              currentPage === 1
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white"
            }
            `}
        >
          <ArrowLeft size={16} />
        </button>

        {/* Current page */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`w-8 h-8 flex items-center justify-center rounded-full 
          ${
            currentPage === number
              ? "bg-orange-500 text-white border-none shadow-sm"
              : "bg-white text-gray-500 border border-gray-300 hover:bg-gray-50"
          }`}
          >
            {number}
          </button>
        ))}

        {/* Right */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center border rounded-full transition
            ${
              currentPage === totalPages
                ? "border-gray-200 text-gray-300 cursor-not-allowed"
                : "border-orange-500 text-orange-500 cursor-pointer hover:bg-orange-500 hover:text-white"
            }
            `}
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
