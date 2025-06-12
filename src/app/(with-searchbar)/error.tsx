"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  // useEffect(() => {
  //   console.error(error?.message || error);
  // }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "#e74c3c",
          marginBottom: "20px",
          fontSize: "24px",
        }}
      >
        오류가 발생했습니다
      </h1>
      <p
        style={{
          color: "#666",
          marginBottom: "30px",
          fontSize: "16px",
        }}
      >
        {error?.message || "알 수 없는 오류가 발생했습니다."}
      </p>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
        style={{
          backgroundColor: "#3498db",
          color: "white",
          border: "none",
          padding: "12px 24px",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
      >
        다시 시도
      </button>
    </div>
  );
}
