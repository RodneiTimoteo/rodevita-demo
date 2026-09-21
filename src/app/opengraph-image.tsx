import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "RodeVita — Drogaria & Bem-estar. Cuidado para todos os dias.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public", "brand", "rodevita-logo-horizontal.png"),
  );
  const logoDataUrl = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#f8faf9",
        color: "#0b3d4a",
        padding: "76px 88px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: 580,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoDataUrl}
          alt=""
          width={360}
          height={126}
          style={{ objectFit: "contain", objectPosition: "left center" }}
        />
        <div
          style={{
            marginTop: 58,
            fontSize: 58,
            lineHeight: 1.12,
            fontWeight: 700,
            letterSpacing: "-2px",
          }}
        >
          Cuidado para todos os dias.
        </div>
        <div style={{ marginTop: 28, fontSize: 24, color: "#66777d" }}>
          Uma experiência digital de drogaria e bem-estar.
        </div>
      </div>
      <div
        style={{
          width: 360,
          height: 360,
          borderRadius: 180,
          background: "#eaf4ef",
          border: "2px solid #d4b574",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 190,
            height: 250,
            borderRadius: 28,
            background: "#ffffff",
            boxShadow: "0 24px 60px rgba(11, 61, 74, 0.14)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(8deg)",
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 700 }}>RodeVita</div>
          <div
            style={{
              marginTop: 14,
              width: 110,
              height: 4,
              background: "#d4b574",
            }}
          />
          <div style={{ marginTop: 18, fontSize: 17, color: "#2e7d6b" }}>
            BEM-ESTAR
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 14,
          background: "#2e7d6b",
        }}
      />
    </div>,
    size,
  );
}
