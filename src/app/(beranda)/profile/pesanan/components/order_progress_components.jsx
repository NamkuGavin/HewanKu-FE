"use client";

import { Check, X } from "lucide-react";
import {
  Text,
  Row,
  Container,
  Column,
  Padding,
} from "@/components/shared/custom_widget";
import { Card, CardContent } from "@/components/ui/card";
import { formatRupiah } from "@/utils/helper";
import {
  ActivityIcon,
  getNowText,
  getOrderCode,
  getOrderDate,
  getOrderTitle,
  getOrderTotal,
} from "./order_progress_utils";

function StepIcon({ status }) {
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
}

function getLineClass(status, previousStatus) {
  if (previousStatus === "completed" && status !== "pending") {
    return "bg-orange-500";
  }

  if (previousStatus === "rejected" || status === "rejected") {
    return "bg-red-500";
  }

  return "bg-gray-200";
}

export function OrderSummaryCard({ order }) {
  return (
    <Card className="bg-yellow-50 border-yellow-200 rounded-none mb-4">
      <CardContent>
        <Row mainAxisAlignment="between">
          <Column crossAxisAlignment="start">
            <Text className="text-xl font-medium mb-2">
              {getOrderCode(order)}
            </Text>
            <Text className="text-sm text-gray-600 font-normal">
              {getOrderTitle(order)}
            </Text>
          </Column>
          <Text className="text-xl font-semibold text-[#2DA5F3]">
            {formatRupiah(getOrderTotal(order))}
          </Text>
        </Row>
      </CardContent>
    </Card>
  );
}

export function ProgressSteps({ steps, getStatus }) {
  return (
    <div className="relative">
      <div className="flex items-start justify-between">
        {steps.map((step, index) => {
          const status = getStatus(step.id, index);
          const previousStatus =
            index > 0 ? getStatus(steps[index - 1].id, index - 1) : null;
          const StepIconComponent = step.icon;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="relative flex items-center w-full">
                {index > 0 ? (
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 h-2 w-full ${getLineClass(
                      status,
                      previousStatus
                    )}`}
                    style={{ right: "50%" }}
                  />
                ) : null}

                <div className="relative z-10 mx-auto">
                  <StepIcon status={status} />
                </div>

                {index < steps.length - 1 ? (
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
                ) : null}
              </div>

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
  );
}

export function ActivityList({ activities }) {
  return (
    <Container className="border-t p-5">
      <Text className="text-lg font-medium mb-4">Order Activity</Text>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={`${activity.title}-${index}`} className="flex gap-4">
            <ActivityIcon status={activity.status} />

            <div className="flex-1">
              <Text className="text-sm font-normal">{activity.title}</Text>
              <Text className="text-sm font-normal text-[#77878F]">
                {activity.date || getNowText()}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

export function ProgressContentShell({ order, children, activities }) {
  return (
    <>
      <Padding horizontal={25} top={25}>
        <OrderSummaryCard order={order} />

        <div className="mb-8">
          <Text className="text-sm mb-8">
            Tanggal pesanan {getOrderDate(order)}
          </Text>

          {children}
        </div>
      </Padding>

      <ActivityList activities={activities} />
    </>
  );
}
