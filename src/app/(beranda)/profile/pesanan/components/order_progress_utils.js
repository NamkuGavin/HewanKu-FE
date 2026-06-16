import { Check, Clock, X } from "lucide-react";

export const PAYMENT_TIMEOUT_MS = 15 * 60 * 1000;

export function normalizeText(value) {
  return String(value || "").trim();
}

export function normalizeApiString(value) {
  const text = normalizeText(value);

  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    try {
      return JSON.parse(text);
    } catch {
      return text.slice(1, -1);
    }
  }

  return text;
}

export function formatOrderDate(value) {
  const text = normalizeText(value);

  if (!text) {
    return "-";
  }

  return text;
}

export function isAcceptedForm(status) {
  return normalizeText(status).toUpperCase() === "DITERIMA";
}

export function isRejectedForm(status) {
  return normalizeText(status).toUpperCase() === "DITOLAK";
}

export function isSuccessfulPayment(statusPembayaran) {
  const status = normalizeText(statusPembayaran).toLowerCase();

  return ["berhasil", "sukses", "success", "settlement", "capture"].includes(
    status
  );
}

export function isFailedPayment(statusPembayaran) {
  const status = normalizeText(statusPembayaran).toLowerCase();

  return [
    "gagal",
    "failed",
    "failure",
    "deny",
    "cancel",
    "expire",
    "expired",
  ].includes(status);
}

export function isPendingPayment(statusPembayaran) {
  const status = normalizeText(statusPembayaran).toLowerCase();

  return !status || ["pending", "process", "processing"].includes(status);
}

export function getOrderProcessStatus(order) {
  if (isRejectedForm(order?.status)) {
    return "Form Ditolak";
  }

  if (isSuccessfulPayment(order?.statusPembayaran) && isReviewSubmitted(order?.id)) {
    return "Selesai";
  }

  if (isSuccessfulPayment(order?.statusPembayaran)) {
    return "Pembayaran Berhasil";
  }

  if (isFailedPayment(order?.statusPembayaran)) {
    return "Pembayaran Gagal";
  }

  if (isAcceptedForm(order?.status)) {
    return "Menunggu Pembayaran";
  }

  return "Menunggu Persetujuan Form";
}

export function getOrderStatusClass(order) {
  if (isRejectedForm(order?.status) || isFailedPayment(order?.statusPembayaran)) {
    return "text-red-600";
  }

  if (isSuccessfulPayment(order?.statusPembayaran)) {
    return "text-green-600";
  }

  if (isAcceptedForm(order?.status)) {
    return "text-blue-600";
  }

  return "text-orange-600";
}

export function getOrderDate(order) {
  return formatOrderDate(order?.hewan?.updatedDate || order?.form?.tanggalHewan);
}

export function getOrderTotal(order) {
  const total = Number(order?.hewan?.harga);

  return Number.isFinite(total) ? total : 0;
}

export function getOrderCode(order) {
  return normalizeText(order?.kodePemesanan) || `#${order?.id || "-"}`;
}

export function getOrderTitle(order) {
  const animalName = normalizeText(order?.hewan?.nama) || "Hewan";
  const animalType = normalizeText(order?.hewan?.jenis);

  return animalType ? `${animalName} - ${animalType}` : animalName;
}

export function findOrderById(orders, orderId) {
  return orders.find((order) => String(order?.id) === String(orderId));
}

export function getPaymentTimerKey(orderId) {
  return `hewanku-payment-deadline:${orderId}`;
}

export function getPaymentDeadline(orderId) {
  if (typeof window === "undefined" || !orderId) {
    return null;
  }

  const value = Number(window.localStorage.getItem(getPaymentTimerKey(orderId)));

  return Number.isFinite(value) && value > 0 ? value : null;
}

export function startPaymentTimer(orderId) {
  if (typeof window === "undefined" || !orderId) {
    return null;
  }

  const existingDeadline = getPaymentDeadline(orderId);

  if (existingDeadline && Date.now() < existingDeadline) {
    return existingDeadline;
  }

  const deadline = Date.now() + PAYMENT_TIMEOUT_MS;
  window.localStorage.setItem(getPaymentTimerKey(orderId), String(deadline));

  return deadline;
}

export function clearPaymentTimer(orderId) {
  if (typeof window === "undefined" || !orderId) {
    return;
  }

  window.localStorage.removeItem(getPaymentTimerKey(orderId));
}

export function getReviewSubmittedKey(orderId) {
  return `hewanku-review-submitted:${orderId}`;
}

export function markReviewSubmitted(orderId) {
  if (typeof window === "undefined" || !orderId) {
    return;
  }

  window.localStorage.setItem(getReviewSubmittedKey(orderId), "true");
}

export function isReviewSubmitted(orderId) {
  if (typeof window === "undefined" || !orderId) {
    return false;
  }

  return window.localStorage.getItem(getReviewSubmittedKey(orderId)) === "true";
}

export function isPaymentExpiredLocally(order, now = Date.now()) {
  if (
    !order?.id ||
    !isAcceptedForm(order?.status) ||
    !isPendingPayment(order?.statusPembayaran)
  ) {
    return false;
  }

  const deadline = getPaymentDeadline(order.id);

  return Boolean(deadline && now >= deadline);
}

export function withLocalPaymentExpiry(order, now = Date.now()) {
  if (!order || !isPaymentExpiredLocally(order, now)) {
    return order;
  }

  return {
    ...order,
    statusPembayaran: "expired",
  };
}

export function formatPaymentCountdown(milliseconds) {
  const safeValue = Math.max(0, Number(milliseconds) || 0);
  const totalSeconds = Math.ceil(safeValue / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export function resolvePaymentUrl(order) {
  const directUrl =
    order?.linkPembayaran ||
    order?.paymentUrl ||
    order?.redirectUrl ||
    order?.redirect_url ||
    order?.urlPembayaran ||
    order?.midtransRedirectUrl ||
    order?.snapUrl;

  if (normalizeApiString(directUrl)) {
    return normalizeApiString(directUrl);
  }

  const snapToken =
    order?.tokenPembayaran ||
    order?.snapToken ||
    order?.token ||
    order?.paymentToken;

  if (normalizeApiString(snapToken)) {
    return `https://app.sandbox.midtrans.com/snap/v4/redirection/${normalizeApiString(
      snapToken
    )}`;
  }

  return "";
}

export function getNowText() {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date());
}

export function getFormStepStatus(order, stepId) {
  if (stepId === "form_masuk") {
    return "completed";
  }

  if (isRejectedForm(order?.status)) {
    return stepId === "form_disetujui" ? "rejected" : "pending";
  }

  if (isAcceptedForm(order?.status)) {
    return "completed";
  }

  if (stepId === "form_disetujui") {
    return "current";
  }

  return "pending";
}

export function getPaymentStepStatus(order, stepId) {
  if (!isAcceptedForm(order?.status)) {
    return "disabled";
  }

  if (stepId === "silahkan_bayar") {
    return isPendingPayment(order?.statusPembayaran) ? "current" : "completed";
  }

  if (stepId === "pembayaran_berhasil") {
    if (isFailedPayment(order?.statusPembayaran)) {
      return "rejected";
    }

    if (isSuccessfulPayment(order?.statusPembayaran)) {
      return "completed";
    }

    return "current";
  }

  if (stepId === "beri_ulasan") {
    if (!isSuccessfulPayment(order?.statusPembayaran)) {
      return "pending";
    }

    return isReviewSubmitted(order?.id) ? "completed" : "current";
  }

  return "pending";
}

export function buildFormActivities(order) {
  const activities = [
    {
      title: "Form adopsi berhasil dikirim.",
      status: "completed",
    },
  ];

  if (isRejectedForm(order?.status)) {
    activities.push({
      title: "Form adopsi ditolak oleh shelter.",
      status: "rejected",
    });
    return activities;
  }

  if (isAcceptedForm(order?.status)) {
    activities.push({
      title: "Form adopsi diterima oleh shelter.",
      status: "completed",
    });
    activities.push({
      title: "Silakan lanjutkan ke pembayaran.",
      status: "completed",
    });
    return activities;
  }

  activities.push({
    title: "Menunggu shelter menyetujui form adopsi.",
    status: "current",
  });

  return activities;
}

export function buildPaymentActivities(order) {
  if (!isAcceptedForm(order?.status)) {
    return [
      {
        title: "Pembayaran belum tersedia sampai form diterima shelter.",
        status: "pending",
      },
    ];
  }

  const activities = [
    {
      title: "Form diterima. Silakan melakukan pembayaran.",
      status: "current",
    },
  ];

  if (isFailedPayment(order?.statusPembayaran)) {
    activities.push({
      title: "Pembayaran gagal diproses.",
      status: "rejected",
    });
    return activities;
  }

  if (isSuccessfulPayment(order?.statusPembayaran)) {
    const reviewDone = isReviewSubmitted(order?.id);

    activities[0] = {
      title: "Instruksi pembayaran sudah diberikan.",
      status: "completed",
    };
    activities.push({
      title: "Pembayaran berhasil dikonfirmasi.",
      status: "completed",
    });
    activities.push({
      title: reviewDone
        ? "Ulasan berhasil diberikan. Proses order selesai."
        : "Pesanan masuk ke Pesanan Terakhir untuk diberikan ulasan.",
      status: reviewDone ? "completed" : "current",
    });
    return activities;
  }

  if (isPendingPayment(order?.statusPembayaran)) {
    activities.push({
      title: "Menunggu pembayaran dari adopter.",
      status: "current",
    });
  }

  return activities;
}

export function ActivityIcon({ status }) {
  if (status === "completed") {
    return (
      <div className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0 bg-green-100">
        <Check className="w-5 h-5 text-green-600" />
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0 bg-red-100">
        <X className="w-5 h-5 text-red-600" />
      </div>
    );
  }

  return (
    <div className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0 bg-blue-100">
      <Clock className="w-5 h-5 text-blue-600" />
    </div>
  );
}
