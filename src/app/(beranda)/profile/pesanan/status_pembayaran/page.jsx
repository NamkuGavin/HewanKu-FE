"use client";

import React, { useEffect } from "react";
import {
  Check,
  X,
  FileText,
  Handshake,
  Truck,
  Package,
  Clock,
} from "lucide-react";
import {
  Text,
  Row,
  Container,
  Column,
  Padding,
} from "@/components/shared/custom_widget";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import { dummyOrderData } from "@/data/dummy/data_dummy";

export default function StatusPembayaranPage() {
  const router = useRouter();
  const orderData = dummyOrderData;

  useEffect(() => {
    if (!orderData.isPaymentAccessible) {
      router.replace("/profile/pesanan/status_form");
    }
  }, [orderData, router]);

  if (!orderData.isPaymentAccessible) return null;

  const paymentSteps = [
    { id: "silahkan_bayar", label: "Silahkan membayar", icon: FileText },
    { id: "proses", label: "Pembayaran Sedang di Proses", icon: Truck },
    { id: "berhasil", label: "Pembayaran Berhasil", icon: Handshake },
    { id: "chat", label: "Chat Penjual", icon: Package },
  ];

  const getPaymentStepStatus = (stepId, index) => {
    if (orderData.formStatus !== "approved") return "disabled";

    if (orderData.paymentStatus === "failed" && stepId === "proses") {
      return "rejected";
    }

    if (orderData.paymentStatus === "processing") {
      if (index <= 1) return "completed";
      if (index === 2) return "current";
      return "pending";
    }

    if (orderData.paymentStatus === "success") {
      return "completed";
    }

    if (index === 0) return "current";
    return "pending";
  };

  const StepIcon = ({ status }) => {
    const circleClasses =
      "w-6 h-6 rounded-full flex items-center justify-center transition-all";

    if (status === "completed") {
      return (
        <div className={`${circleClasses} bg-orange-500 text-white`}>
          <Check className="w-4 h-4" strokeWidth={3} />
        </div>
      );
    }

    if (status === "rejected") {
      return (
        <div className={`${circleClasses} bg-red-500 text-white`}>
          <X className="w-4 h-4" strokeWidth={3} />
        </div>
      );
    }

    if (status === "current") {
      return (
        <div className={`${circleClasses} bg-orange-500 text-white`}>
          <div className="w-5 h-5 rounded-full bg-white" />
        </div>
      );
    }

    return (
      <div className={`${circleClasses} bg-white border-2 border-gray-300`}>
        <div className="w-3 h-3 rounded-full bg-gray-300" />
      </div>
    );
  };

  return (
    <>
      <Padding horizontal={25} top={25}>
        <Card className="bg-yellow-50 border-yellow-200 rounded-none mb-4">
          <CardContent>
            <Row mainAxisAlignment="between">
              <Column crossAxisAlignment="start">
                <Text className="text-xl font-medium mb-2">
                  {orderData.orderId}
                </Text>
                <Text className="text-sm text-gray-600 font-normal">
                  {orderData.animalCount} · {orderData.estimatedTime}
                </Text>
              </Column>
              <Text className="text-xl font-semibold text-[#2DA5F3]">
                {orderData.price}
              </Text>
            </Row>
          </CardContent>
        </Card>

        <div className="mb-8">
          <Text className="text-sm mb-8">
            Perkiraan kedatangan pesanan {orderData.orderDate}
          </Text>

          {orderData.paymentStatus === "failed" && (
            <Alert variant="destructive">
              <AlertDescription>
                Pembayaran gagal diproses. Silakan hubungi penjual atau coba
                lakukan pembayaran ulang.
              </AlertDescription>
            </Alert>
          )}

          <div className="relative">
            <div className="flex items-start justify-between">
              {paymentSteps.map((step, index) => {
                const status = getPaymentStepStatus(step.id, index);
                const StepIconComponent = step.icon;

                return (
                  <div
                    key={step.id}
                    className="flex flex-col items-center flex-1"
                  >
                    {/* Circle + garis */}
                    <div className="relative flex items-center w-full">
                      {index > 0 && (
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 h-2 w-full ${
                            getPaymentStepStatus(
                              paymentSteps[index - 1].id,
                              index - 1
                            ) === "completed" && status !== "pending"
                              ? "bg-orange-500"
                              : getPaymentStepStatus(
                                  paymentSteps[index - 1].id,
                                  index - 1
                                ) === "rejected"
                              ? "bg-red-500"
                              : "bg-gray-200"
                          }`}
                          style={{ right: "50%" }}
                        />
                      )}

                      <div className="relative z-10 mx-auto">
                        <StepIcon status={status} />
                      </div>

                      {index < paymentSteps.length - 1 && (
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 h-2 w-full ${
                            status === "completed"
                              ? "bg-orange-500"
                              : status === "rejected"
                              ? "bg-red-500"
                              : "bg-gray-200"
                          }`}
                          style={{ left: "50%" }}
                        />
                      )}
                    </div>

                    {/* Icon kecil bawah */}
                    <div
                      className={`mt-4 p-2 rounded-lg ${
                        status === "completed"
                          ? "bg-green-50"
                          : status === "current"
                          ? "bg-orange-50"
                          : status === "rejected"
                          ? "bg-red-50"
                          : "bg-gray-50"
                      }`}
                    >
                      <StepIconComponent
                        className={`w-5 h-5 ${
                          status === "completed"
                            ? "text-green-500"
                            : status === "current"
                            ? "text-orange-500"
                            : status === "rejected"
                            ? "text-red-500"
                            : "text-gray-300"
                        }`}
                      />
                    </div>

                    {/* Label */}
                    <div className="text-center mt-4">
                      <p
                        className={`text-xs text-center mt-1 max-w-[140px] ${
                          status === "completed" || status === "current"
                            ? "text-gray-900 font-medium"
                            : status === "rejected"
                            ? "text-red-600 font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>

                      {/* tampilkan nomor telp kalau step chat sudah aktif */}
                      {step.id === "chat" &&
                        status !== "pending" &&
                        status !== "disabled" && (
                          <p className="text-xs text-orange-500 mt-1 flex items-center justify-center gap-1">
                            <span>📞</span>{" "}
                            {orderData.activities.payment.find((a) => a.phone)
                              ?.phone ?? "+62xxxx"}
                          </p>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Padding>

      <Container className="border-t p-5">
        <Text className="text-lg font-medium mb-4">Order Activity</Text>
        <div className="space-y-4">
          {orderData.activities.payment.map((activity, index) => (
            <div key={index} className="flex gap-4">
              <div
                className={`w-11 h-11 rounded flex items-center justify-center flex-shrink-0 ${
                  activity.status === "completed"
                    ? "bg-green-100"
                    : activity.status === "warning"
                    ? "bg-blue-100"
                    : "bg-gray-100"
                }`}
              >
                {activity.status === "completed" ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : activity.status === "warning" ? (
                  <FileText className="w-5 h-5 text-blue-600" />
                ) : (
                  <Clock className="w-5 h-5 text-gray-600" />
                )}
              </div>

              <div className="flex-1">
                <Text className="text-sm font-normal">
                  {activity.title}
                  {activity.note && (
                    <span className="ml-2 text-orange-500 text-sm">
                      {activity.note}
                    </span>
                  )}
                </Text>
                <Text className="text-sm font-normal text-[#77878F]">
                  {activity.date}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
