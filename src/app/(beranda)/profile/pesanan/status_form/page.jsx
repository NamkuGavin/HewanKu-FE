"use client";

import React from "react";
import { Check, X, FileText, Handshake, Truck, Clock } from "lucide-react";
import {
  Text,
  Row,
  Container,
  Column,
  Padding,
} from "@/components/shared/custom_widget";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { dummyOrderData } from "@/data/dummy/data_dummy";

export default function StatusFormView() {
  const orderData = dummyOrderData;

  const formSteps = [
    { id: "form_masuk", label: "Form Masuk", icon: FileText },
    { id: "form_disetujui", label: "Form disetujui", icon: Handshake },
    { id: "lanjutkan", label: "Lanjutkan Pembayaran", icon: Truck },
  ];

  const getFormStepStatus = (stepId) => {
    if (orderData.formStatus === "rejected") {
      return stepId === "form_masuk" ? "completed" : "rejected";
    }
    if (orderData.formStatus === "approved") {
      return "completed";
    }
    if (stepId === "form_masuk") return "completed";
    if (stepId === "form_disetujui") return "current";
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

          {orderData.formStatus === "rejected" && (
            <Alert variant="destructive">
              <AlertDescription>
                Form Anda ditolak oleh penjual. Silakan periksa data Anda atau
                hubungi penjual untuk informasi lebih lanjut.
              </AlertDescription>
            </Alert>
          )}

          <div className="relative">
            <div className="flex items-start justify-between">
              {formSteps.map((step, index) => {
                const status = getFormStepStatus(step.id);
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
                            getFormStepStatus(formSteps[index - 1].id) ===
                              "completed" && status !== "pending"
                              ? "bg-orange-500"
                              : getFormStepStatus(formSteps[index - 1].id) ===
                                "rejected"
                              ? "bg-red-500"
                              : "bg-gray-200"
                          }`}
                          style={{ right: "50%" }}
                        />
                      )}

                      <div className="relative z-10 mx-auto">
                        <StepIcon status={status} />
                      </div>

                      {index < formSteps.length - 1 && (
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
          {orderData.activities.form.map((activity, index) => (
            <div key={index} className="flex gap-4">
              <div
                className={`w-11 h-11 rounded flex items-center justify-center flex-shrink-0 ${
                  activity.status === "completed"
                    ? "bg-green-100"
                    : "bg-blue-100"
                }`}
              >
                {activity.status === "completed" ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <Clock className="w-5 h-5 text-blue-600" />
                )}
              </div>

              <div className="flex-1">
                <Text className="text-sm font-normal">{activity.title}</Text>
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
