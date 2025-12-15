"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { XCircle, CheckCircle, FileText } from "lucide-react";

export default function StatusFormPage() {
  return (
    <div className="max-w-4xl mx-auto p">
      <div className="w-full bg-white border border-gray-200 rounded-lg p-8">

        {/* Header Tab */}
        <div className="flex justify-center gap-60 border-b pb-3 mb-6">
          <div className="text-lg font-semibold text-orange-500 border-b-2 border-orange-500 pb-2 -mb-3">
            Status Form
          </div>
          <div className="text-lg font-medium text-gray-400 pb-2">
            Status Pembayaran
          </div>
        </div>

        {/* Order Header Box */}
        <Card className="border-orange-200 bg-orange-50 mb-6">
          <CardContent className="py-4 px-5 flex justify-between items-center">
            <div>
              <div className="text-base font-semibold text-gray-900">#96459761</div>
              <div className="text-sm text-gray-600 mt-1">
                1 Hewan • Form pengajuan kemungkinan dibaca 1-3 hari
              </div>
            </div>

            <div className="text-2xl font-bold text-blue-600">
              RP2.000.000
            </div>
          </CardContent>
        </Card>

        {/* Estimation */}
        <div className="text-sm text-gray-700 mb-1">
          Perkiraan kedatangan pesanan <span className="font-semibold">23 Oktober 2025</span>
        </div>
        {/* Progress Section */}
        <div className="flex items-center justify-between max-w-3xl mx-auto mb-10">

          {/* STEP 1 – Form Masuk */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full bg-orange-500 relative left-12.75 top-5.25"></div>
            <div className="text-xs font-medium mt-3 text-center relative left-12.75 top-5.25">
              Form Masuk
            </div>
          </div>

          {/* LINE 1 */}
          <div className="h-2 w-150 relative left-11 bg-orange-500"></div>

          {/* STEP 2 – Form Ditolak */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border-2 border-orange-500 bg-white relative left-8.5 top-5.25"></div>
            <div className="text-xs font-medium mt-3 text-gray-500 text-center relative left-8.5 top-5.25">
              Form Ditolak
            </div>
          </div>

          {/* LINE 2 */}
          <div className="h-2 w-150 relative left-3.75 bg-gray-300 mx-3"></div>

          {/* STEP 3 – Lanjutkan Pembayaran */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white relative right-9 top-5.25"></div>
            <div className="text-xs font-medium mt-3 text-gray-400 text-center relative right-9 top-5.25">
              Lanjutkan Pembayaran
            </div>
          </div>
        </div>


        {/* ORDER ACTIVITY */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-1">
            <div className="text-base font-semibold">Order Activity</div>
          </CardHeader>

          <CardContent className="space-y-5">

            {/* ITEM 1 - Ditolak */}
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                <XCircle className="text-red-600" size={20} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">
                  Penjual sudah menolak data diri anda
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  23 Jan, 2025 pada 07:32 WIB
                </div>
              </div>
            </div>

            {/* ITEM 2 - Dibaca */}
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">
                  Form anda sudah dibaca penjual
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  20 Jan, 2025 pada 07:32 WIB
                </div>
              </div>
            </div>

            {/* ITEM 3 - Masuk */}
            <div className="flex gap-3 items-start">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FileText className="text-blue-600" size={20} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-900">
                  Form sudah masuk di notif penjual
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  19 Jan, 2025 pada 07:00 WIB
                </div>
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}