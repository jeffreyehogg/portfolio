/**
 * AutoDBA typed API client.
 */

import type {
  AnalyzeRequest,
  AnalyzeResponse,
  FormatRequest,
  FormatResponse,
  HealthResponse,
  OptimizationResult,
  OptimizeRequest,
  PresetDetail,
  PresetListResponse,
  QuotaInfo,
} from "./types";

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(code: string, message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let code = "UNKNOWN_ERROR";
    let message = `HTTP ${res.status}: ${res.statusText}`;

    try {
      const data = await res.json();
      if (data && data.error) {
        code = data.error.code || code;
        message = data.error.message || message;
      }
    } catch {
      // Non-json response
    }

    throw new ApiError(code, message, res.status);
  }

  return res.json() as Promise<T>;
}

export async function getHealth(): Promise<HealthResponse> {
  const res = await fetch("/api/py/health", { cache: "no-store" });
  return handleResponse<HealthResponse>(res);
}

export async function getPresets(): Promise<PresetListResponse> {
  const res = await fetch("/api/py/presets", { next: { revalidate: 3600 } });
  return handleResponse<PresetListResponse>(res);
}

export async function getPresetDetail(id: string): Promise<PresetDetail> {
  const res = await fetch(`/api/py/presets/${id}`, { next: { revalidate: 3600 } });
  return handleResponse<PresetDetail>(res);
}

export async function getQuota(byokKey?: string | null): Promise<QuotaInfo> {
  const headers: Record<string, string> = {};
  if (byokKey) {
    headers["X-Gemini-Key"] = byokKey;
  }
  const res = await fetch("/api/py/quota", { headers, cache: "no-store" });
  return handleResponse<QuotaInfo>(res);
}

export async function analyzeQuery(payload: AnalyzeRequest): Promise<AnalyzeResponse> {
  const res = await fetch("/api/py/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  return handleResponse<AnalyzeResponse>(res);
}

export async function optimizeQuery(
  payload: OptimizeRequest,
  byokKey?: string | null
): Promise<OptimizationResult> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (byokKey) {
    headers["X-Gemini-Key"] = byokKey;
  }

  const res = await fetch("/api/py/optimize", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  return handleResponse<OptimizationResult>(res);
}

export async function formatQuery(payload: FormatRequest): Promise<string> {
  try {
    const res = await fetch("/api/py/format", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (res.ok) {
      const data: FormatResponse = await res.json();
      if (data && data.formatted_sql) {
        return data.formatted_sql;
      }
    }
  } catch {
    // Graceful fallback to original SQL
  }
  return payload.sql;
}
