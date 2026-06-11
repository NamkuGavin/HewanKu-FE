"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuthSession as getAuthSessionAction,
  login as loginAction,
  logout as logoutAction,
  register as registerAction,
  forgotPassword as forgotPasswordAction,
  verifyOTP as verifyOTPAction,
  changePass as changePassAction,
} from "@/actions/auth.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  isAuthErrorStatus,
  isSuccessStatus,
  resolveApiMessage,
  resolveApiTitle,
  toStatusCode,
} from "@/utils/apiStatus";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const AuthContext = createContext(null);
const LOGIN_PATH = "/login";

function getResponseStatus(response) {
  return toStatusCode(response, null);
}

function isExpectedResponse(response, expectedStatuses) {
  if (response?.success === false) {
    return false;
  }

  const statusCode = getResponseStatus(response);

  if (statusCode === null) {
    return true;
  }

  if (expectedStatuses?.length) {
    return expectedStatuses.includes(statusCode);
  }

  return isSuccessStatus(statusCode);
}

function buildFailureResult(response, fallbackMessage) {
  const statusCode = getResponseStatus(response);

  return {
    success: false,
    statusCode,
    message: resolveApiMessage(response, fallbackMessage, statusCode ?? 500),
    details: response?.details ?? null,
  };
}

function buildSuccessResult(response, fallbackMessage) {
  return {
    success: true,
    data: response?.data,
    message: response?.message || fallbackMessage,
  };
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiAlert, setApiAlert] = useState(null);

  useEffect(() => {
    let ignore = false;

    const syncSession = async () => {
      try {
        const session = await getAuthSessionAction();

        if (!ignore && !session?.isAuthenticated) {
          setUser(null);
        }
      } catch (error) {
        if (!ignore) {
          setUser(null);
        }
      }
    };

    syncSession();

    return () => {
      ignore = true;
    };
  }, []);

  const showApiError = (response, fallbackMessage) => {
    const statusCode = getResponseStatus(response);

    setApiAlert({
      statusCode,
      title: resolveApiTitle(statusCode),
      message: resolveApiMessage(response, fallbackMessage, statusCode ?? 500),
    });
  };

  const clearAuthState = () => {
    setUser(null);
  };

  const redirectToLogin = (message) => {
    clearAuthState();

    if (message) {
      toast.error(message);
    }

    router.replace(LOGIN_PATH);
  };

  const handleApiError = async (response, fallbackMessage) => {
    const statusCode = getResponseStatus(response);

    if (!isAuthErrorStatus(statusCode)) {
      return false;
    }

    await logoutAction();
    redirectToLogin(
      resolveApiMessage(
        response,
        fallbackMessage || "Sesi login sudah berakhir. Silakan login ulang.",
        statusCode ?? 401,
      ),
    );

    return true;
  };

  const runAuthRequest = async ({
    request,
    successStatuses,
    successMessage,
    errorMessage,
    onSuccess,
    requireSession = false,
    redirectOnAuthError = false,
  }) => {
    setIsLoading(true);

    try {
      const res = await request();

      if (!isExpectedResponse(res, successStatuses)) {
        if (redirectOnAuthError && (await handleApiError(res, errorMessage))) {
          return buildFailureResult(res, errorMessage);
        }

        showApiError(res, errorMessage);
        return buildFailureResult(res, errorMessage);
      }

      if (requireSession && res?.session?.isAuthenticated === false) {
        const sessionError = {
          ...res,
          success: false,
          code: 401,
          statusCode: 401,
          message:
            res.session?.message ||
            "Token login tidak ditemukan dari response API.",
        };

        await logoutAction();
        showApiError(sessionError, errorMessage);
        return buildFailureResult(sessionError, errorMessage);
      }

      if (successMessage) {
        toast.success(res?.message || successMessage);
      }

      if (onSuccess) {
        await onSuccess(res);
      }

      return buildSuccessResult(res, successMessage);
    } catch (error) {
      if (redirectOnAuthError && (await handleApiError(error, errorMessage))) {
        return buildFailureResult(error, errorMessage);
      }

      showApiError(error, errorMessage);
      return buildFailureResult(error, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async ({ body }) =>
    runAuthRequest({
      request: () => loginAction({ body }),
      successStatuses: [200],
      requireSession: true,
      errorMessage: "Login failed",
      onSuccess: (res) => {
        setUser(res.user ?? res.data);
        router.push("/home");
        router.refresh();
      },
    });

  const logout = async () => {
    setIsLoading(true);

    try {
      await logoutAction();
      redirectToLogin();
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload) =>
    runAuthRequest({
      request: () => registerAction({ body: payload }),
      successStatuses: [200, 201],
      successMessage: "Register berhasil, silakan login",
      errorMessage: "Register failed",
    });

  const forgotPassword = async (data) =>
    runAuthRequest({
      request: () => forgotPasswordAction({ body: data }),
      successMessage: "OTP berhasil dikirim",
      errorMessage: "Send OTP failed",
    });

  const verifyOTP = async (data) =>
    runAuthRequest({
      request: () => verifyOTPAction({ body: data }),
      successMessage: "OTP berhasil diverifikasi",
      errorMessage: "Verify OTP failed",
    });

  const changePass = async (data) =>
    runAuthRequest({
      request: () => changePassAction({ body: data }),
      successMessage: "Password berhasil diubah",
      errorMessage: "Change password failed",
    });

  const authState = {
    user,
    isLoading,
    login,
    logout,
    register,
    forgotPassword,
    verifyOTP,
    changePass,
    handleApiError,
  };

  return (
    <AuthContext.Provider value={authState}>
      {children}

      <AlertDialog
        open={Boolean(apiAlert)}
        onOpenChange={(open) => {
          if (!open) {
            setApiAlert(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{apiAlert?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {apiAlert?.message}
              {apiAlert?.statusCode !== null &&
              apiAlert?.statusCode !== undefined ? (
                <span className="mt-2 block text-xs">
                  Status code: {apiAlert.statusCode}
                </span>
              ) : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setApiAlert(null)}
              className="bg-[#FF8D28] hover:bg-[#FBA81F]"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
