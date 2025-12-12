"use client";

import { Text } from "@/components/shared/custom_widget";
import { useRouter } from "next/navigation";

// CONTOH DATA SAAT DITAMPILKAN SAJA
export default function PesananTerakhirPage() {
  const router = useRouter();

  const data = [
    {
      orderId: "#51746385",
      status: "BERHASIL",
      date: "Dec 30, 2025 07:52",
      total: "Rp2.000.000",
    },
    {
      orderId: "#51746385",
      status: "GAGAL",
      date: "Dec 4, 2025 21:42",
      total: "Rp2.000.000",
    },
    {
      orderId: "#673971743",
      status: "BERHASIL",
      date: "Feb 2, 2025 19:28",
      total: "Rp1.000.000",
    },
    {
      orderId: "#673971743",
      status: "BERHASIL",
      date: "Mar 20, 2025 23:14",
      total: "Rp1.500.000",
    },
  ];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg p-8">
      {/* Header */}
      <Text size={18} weight="600" className="mb-6">
        PESANAN TERAKHIR
      </Text>

      {/* Table */}
      <div className="w-full overflow-hidden rounded-md border border-gray-200">
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
            {data.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="py-3 px-4">{item.orderId}</td>

                {/* STATUS warna dinamis */}
                <td
                  className={`py-3 px-4 font-semibold ${
                    item.status === "BERHASIL"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {item.status}
                </td>

                <td className="py-3 px-4">{item.date}</td>
                <td className="py-3 px-4">{item.total}</td>

                {/* Action */}
                <td className="py-3 px-4">
                  <button 
                    onClick={() => router.push("/(beranda)/profile/pesanan_terakhir/detail_pesanan")
                    }
                    className="text-blue-600 hover:underline flex items-center gap-1">
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
        <button className="w-8 h-8 flex items-center justify-center border rounded-full  hover:bg-orange-500 hover:text-white transition">
          ←
        </button>

        {/* Current page */}
        <button className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full">
          01
        </button>

        {/* Another page */}
        <button className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-orange-500 hover:text-white transition">
          02
        </button>

        {/* Right */}
        <button className="w-8 h-8 flex items-center justify-center border rounded-full  hover:bg-orange-500 hover:text-white transition">
          →
        </button>

      </div>
    </div>
  );
}
