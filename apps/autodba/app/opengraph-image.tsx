import { ImageResponse } from "next/og";

export const alt = "AutoDBA — Agentic SQL Diagnostics & Query Optimization";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#020617",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(2,6,23,0) 70%)",
          }}
        />

        {/* Header brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(129,140,248,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#818CF8",
              fontSize: "26px",
              fontWeight: 800,
            }}
          >
            ⚡
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "36px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
              }}
            >
              AutoDBA
            </span>
            <span
              style={{
                fontSize: "14px",
                fontFamily: "monospace",
                color: "#818CF8",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Agentic SQL Diagnostic & Index Synthesis Platform
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 900,
              color: "#F8FAFC",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Autonomous Query Tuning & AST Plan Diagnostics
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#94A3B8",
              lineHeight: 1.4,
            }}
          >
            Detect non-SARGable clauses, Cartesian products, and execution plan spools across T-SQL, PostgreSQL, and MySQL with zero-downtime DDL synthesis.
          </div>
        </div>

        {/* Footer badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {[
            "Python 3.12",
            "sqlglot AST",
            "Gemini 2.0 Flash",
            "Next.js 16",
            "Zero Cost Serverless",
          ].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(30,41,59,0.7)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#E2E8F0",
                fontSize: "14px",
                fontFamily: "monospace",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
