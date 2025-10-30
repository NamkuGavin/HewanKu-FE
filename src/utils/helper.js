"use client";

import { useRouter } from "next/navigation";

export function useNavigator() {
  const router = useRouter();

  return {
    // ✅ push → Navigator.push()
    push: (path) => {
      router.push(path);
    },

    // ✅ replace → Navigator.pushReplacement()
    replace: (path) => {
      router.replace(path);
    },

    // ✅ pop → Navigator.pop()
    pop: () => {
      router.back();
    },

    // ✅ push + remove all history → Navigator.pushAndRemoveUntil()
    pushAndRemoveUntil: (path) => {
      // Clear stack by full reload to new routes
      window.location.replace(path);
    },

    // ✅ goHome / reset stack custom
    resetTo: (path) => {
      window.location.href = path;
    },
  };
}
