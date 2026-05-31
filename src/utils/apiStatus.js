export const API_STATUS_MESSAGES = {
  0: "Tidak dapat terhubung ke server.",
  400: "Permintaan tidak valid.",
  401: "Sesi login tidak valid atau sudah berakhir.",
  403: "Anda tidak memiliki akses untuk aksi ini.",
  404: "Data atau endpoint tidak ditemukan.",
  408: "Waktu permintaan habis.",
  409: "Data konflik dengan kondisi saat ini.",
  422: "Data yang dikirim tidak valid.",
  429: "Terlalu banyak permintaan. Coba lagi nanti.",
  500: "Terjadi kesalahan pada server.",
  502: "Gateway server bermasalah.",
  503: "Layanan belum tersedia atau server tidak dapat dijangkau.",
  504: "Server terlalu lama merespon.",
};

export const API_STATUS_TITLES = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  408: "Request Timeout",
  409: "Conflict",
  422: "Validation Error",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

export function toStatusCode(value, fallback = null) {
  const rawValue =
    typeof value === "object" && value !== null
      ? value.code ?? value.statusCode ?? value.status
      : value;

  const statusCode = Number(rawValue);
  return Number.isFinite(statusCode) ? statusCode : fallback;
}

export function isSuccessStatus(statusCode) {
  return statusCode >= 200 && statusCode < 300;
}

export function isAuthErrorStatus(statusCode) {
  return [401, 403, 419].includes(Number(statusCode));
}

function getErrorsMessage(errors) {
  if (!Array.isArray(errors)) {
    return null;
  }

  const messages = errors
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      return item?.message;
    })
    .filter(Boolean);

  return messages.length ? messages.join(", ") : null;
}

export function resolveApiMessage(
  payload,
  fallback = "Terjadi kesalahan. Silakan coba lagi.",
  fallbackStatusCode = 500
) {
  const data = payload?.details ?? payload?.data ?? payload;
  const statusCode = toStatusCode(payload, fallbackStatusCode);
  const directMessage =
    typeof data === "string" ? data : data?.message ?? data?.error;
  const errorsMessage = getErrorsMessage(data?.errors);

  return (
    directMessage ||
    errorsMessage ||
    API_STATUS_MESSAGES[statusCode] ||
    fallback
  );
}

export function resolveApiTitle(statusCode) {
  return API_STATUS_TITLES[statusCode] || "API Error";
}
