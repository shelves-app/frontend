import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export const GET = (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Frontend Starter Kit";

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#09090b",
        color: "#fafafa",
      }}
    >
      <div
        style={{
          fontSize: 60,
          fontWeight: 700,
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 24,
          marginTop: 20,
          color: "#a1a1aa",
        }}
      >
        Production-ready Next.js starter kit
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
};
