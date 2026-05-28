import type { HealthResponse, ServiceName } from "./types";

export function createHealthResponse(service: ServiceName, now: Date = new Date()): HealthResponse {
  return {
    service,
    status: "ok",
    timestamp: now.toISOString(),
  };
}
