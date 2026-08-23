import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05060a",
          border: "3px solid #22e6c4",
          borderRadius: 14,
          color: "#22e6c4",
          fontSize: 28,
          fontWeight: 700,
          fontFamily: "monospace",
        }}
      >
        SR
      </div>
    ),
    { ...size }
  );
}
